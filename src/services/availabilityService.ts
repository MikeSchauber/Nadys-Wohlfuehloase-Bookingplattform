import { supabase } from "@/supabase/supabase";
import type { AvailabilityRule } from "@/interfaces/interfaces";
import {
  type BusyInterval,
  type DaySlot,
  addDays,
  eachDay,
  generateDaySlots,
  germanWeekdayShort,
  startOfDay,
  toDateKey,
} from "@/lib/slots";

export interface DayAvailability {
  date: Date;
  dateKey: string; // 'YYYY-MM-DD'
  weekdayShort: string; // 'Mo', 'Di', ...
  slots: DaySlot[];
  hasAvailable: boolean;
}

export interface AvailabilityParams {
  locationId: string;
  serviceId: string;
  durationMin: number;
  from: Date; // erster Tag (inkl.)
  to: Date; // letzter Tag (inkl.)
}

// Solange die Edge Function `available-slots` (Google-Kalender) noch nicht
// deployt ist, rechnet das Frontend die Slots als Übergangslösung selbst aus
// den Öffnungszeiten (availability_rules) + bestehenden Buchungen. Nach dem
// Deploy: VITE_USE_EDGE_AVAILABILITY=true -> "Wrap kommt aus dem Backend".
const USE_EDGE = import.meta.env.VITE_USE_EDGE_AVAILABILITY === "true";

const STEP_MIN = 30; // Takt der Startzeiten
const BUFFER_MIN = 15; // Default-Puffer nach Terminen (später admin-einstellbar)

export async function getAvailability(
  params: AvailabilityParams,
): Promise<DayAvailability[]> {
  if (USE_EDGE) {
    try {
      return await fetchFromEdge(params);
    } catch (err) {
      console.warn("[availability] Edge Function nicht erreichbar, Fallback:", err);
    }
  }
  return computeFromDatabase(params);
}

// ── Edge Function (Google freebusy) ─────────────────────────────────────────
async function fetchFromEdge(params: AvailabilityParams): Promise<DayAvailability[]> {
  const { data, error } = await supabase.functions.invoke("available-slots", {
    body: {
      location_id: params.locationId,
      service_id: params.serviceId,
      duration_min: params.durationMin,
      from: toDateKey(params.from),
      to: toDateKey(params.to),
    },
  });
  if (error) throw error;

  const days = (data?.days ?? []) as Array<{
    date: string;
    slots: Array<{ start: string; end: string; available: boolean }>;
  }>;
  return days.map((d) => {
    const date = new Date(`${d.date}T00:00:00`);
    const slots: DaySlot[] = d.slots.map((s) => ({
      start: new Date(s.start),
      end: new Date(s.end),
      available: s.available,
    }));
    return {
      date,
      dateKey: d.date,
      weekdayShort: germanWeekdayShort(date),
      slots,
      hasAvailable: slots.some((s) => s.available),
    };
  });
}

// ── Fallback: aus availability_rules + bookings berechnen ────────────────────
async function computeFromDatabase(
  params: AvailabilityParams,
): Promise<DayAvailability[]> {
  const { locationId, durationMin, from, to } = params;

  const rules = await fetchRules(locationId);
  const busy = await fetchBusyIntervals(locationId, from, to);
  const now = new Date();

  return eachDay(from, to).map((date) => {
    const rule = rules.find(
      (r) => r.weekday === date.getDay() && r.closed !== true,
    );
    const dayBusy = busy.filter((b) => sameLocalDay(b.start, date));

    const slots = rule
      ? generateDaySlots({
          date,
          openStart: rule.start_time,
          openEnd: rule.end_time,
          durationMin,
          stepMin: STEP_MIN,
          bufferMin: BUFFER_MIN,
          busy: dayBusy,
          now,
        })
      : [];

    return {
      date,
      dateKey: toDateKey(date),
      weekdayShort: germanWeekdayShort(date),
      slots,
      hasAvailable: slots.some((s) => s.available),
    };
  });
}

async function fetchRules(locationId: string): Promise<AvailabilityRule[]> {
  const { data, error } = await supabase
    .from("availability_rules")
    .select("*")
    .eq("location_id", locationId);
  if (error) {
    console.warn("[availability] availability_rules Fehler:", error.message);
    return [];
  }
  return (data ?? []) as AvailabilityRule[];
}

/** Belegte Intervalle aus bestehenden (nicht stornierten) Buchungen. */
async function fetchBusyIntervals(
  locationId: string,
  from: Date,
  to: Date,
): Promise<BusyInterval[]> {
  try {
    const fromISO = startOfDay(from).toISOString();
    const toISO = addDays(startOfDay(to), 1).toISOString();
    const { data, error } = await supabase
      .from("time_slots")
      .select("start_datetime, end_datetime, bookings(status)")
      .eq("location_id", locationId)
      .gte("start_datetime", fromISO)
      .lt("start_datetime", toISO);
    if (error) throw error;

    return (data ?? [])
      .filter((row: any) => {
        const bk = row.bookings;
        const list = Array.isArray(bk) ? bk : bk ? [bk] : [];
        return list.some(
          (b: any) => b?.status === "requested" || b?.status === "confirmed",
        );
      })
      .map((row: any) => ({
        start: new Date(row.start_datetime),
        end: new Date(row.end_datetime),
      }));
  } catch (err: any) {
    console.warn("[availability] busy-Abfrage Fehler:", err?.message ?? err);
    return [];
  }
}

function sameLocalDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b);
}

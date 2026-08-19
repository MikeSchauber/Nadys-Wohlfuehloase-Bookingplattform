// Reine Slot-/Datums-Logik — keine Abhängigkeiten, damit sie 1:1 in die
// Edge Function (Deno) übernommen werden kann. Alle Zeiten lokal (Europe/Berlin
// wird über die Browser-Locale angenommen; der Server nutzt BOOKING_TIMEZONE).

export interface BusyInterval {
  start: Date;
  end: Date;
}

export interface DaySlot {
  start: Date;
  end: Date;
  available: boolean;
}

export interface GenerateDaySlotsInput {
  date: Date; // der Tag (lokale Mitternacht ist egal, es zählt das Datum)
  openStart: string; // 'HH:MM' oder 'HH:MM:SS'
  openEnd: string; // 'HH:MM' oder 'HH:MM:SS'
  durationMin: number; // Länge des Termins
  stepMin?: number; // Raster der Startzeiten (Default 30)
  bufferMin?: number; // Puffer nach jedem Termin (Default 15)
  busy?: BusyInterval[]; // belegte Intervalle (Google-Busy + bestehende Buchungen)
  now?: Date; // um vergangene Slots am heutigen Tag zu deaktivieren
}

const DE_WEEKDAYS_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const DE_MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

export function germanWeekdayShort(date: Date): string {
  return DE_WEEKDAYS_SHORT[date.getDay()];
}

export function germanMonthName(monthIndex: number): string {
  return DE_MONTHS[monthIndex];
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** Lokaler Datums-Key 'YYYY-MM-DD' (ohne Zeitzonen-Verschiebung). */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b);
}

/** Mitternacht (lokal) des angegebenen Tages. */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Setzt 'HH:MM[:SS]' auf das Datum und gibt ein Date zurück. */
export function timeOnDate(date: Date, time: string): Date {
  const [h, m, s] = time.split(":").map((n) => parseInt(n, 10));
  const d = startOfDay(date);
  d.setHours(h || 0, m || 0, s || 0, 0);
  return d;
}

function overlapsWithBuffer(
  start: Date,
  end: Date,
  bufferMin: number,
  busy: BusyInterval[],
): boolean {
  const bufMs = bufferMin * 60_000;
  const s = start.getTime();
  const e = end.getTime();
  for (const b of busy) {
    const bs = b.start.getTime();
    const be = b.end.getTime();
    // Konflikt, wenn zwischen Kandidat und belegtem Intervall kein Puffer passt.
    if (s < be + bufMs && e + bufMs > bs) return true;
  }
  return false;
}

/**
 * Erzeugt alle Start-Slots eines Tages im Raster `stepMin`, deren Termin
 * (`durationMin`) innerhalb der Öffnungszeit liegt. Jeder Slot bekommt ein
 * `available`-Flag (false, wenn er mit `busy`+Puffer kollidiert oder in der
 * Vergangenheit liegt).
 */
export function generateDaySlots(input: GenerateDaySlotsInput): DaySlot[] {
  const {
    date,
    openStart,
    openEnd,
    durationMin,
    stepMin = 30,
    bufferMin = 15,
    busy = [],
    now = new Date(),
  } = input;

  const open = timeOnDate(date, openStart);
  const close = timeOnDate(date, openEnd);
  const durMs = durationMin * 60_000;
  const stepMs = stepMin * 60_000;

  const slots: DaySlot[] = [];
  for (let t = open.getTime(); t + durMs <= close.getTime(); t += stepMs) {
    const start = new Date(t);
    const end = new Date(t + durMs);
    const inPast = start.getTime() <= now.getTime();
    const blocked = overlapsWithBuffer(start, end, bufferMin, busy);
    slots.push({ start, end, available: !inPast && !blocked });
  }
  return slots;
}

/** Formatiert eine Uhrzeit als 'HH:MM'. */
export function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** Alle Tage im Bereich [from, to] (inklusive), als lokale Date-Objekte. */
export function eachDay(from: Date, to: Date): Date[] {
  const out: Date[] = [];
  let cur = startOfDay(from);
  const end = startOfDay(to);
  while (cur.getTime() <= end.getTime()) {
    out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
}

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBookingStore } from '@/stores/bookingStore';
import { getAvailability, type DayAvailability } from '@/services/availabilityService';
import { addDays, formatTime, germanMonthName, startOfDay, toDateKey, type DaySlot } from '@/lib/slots';
import LoadingBanner from '@/components/shared/LoadingBanner.vue';

const { n } = useI18n();
const bookingStore = useBookingStore();

const viewMode = ref<'week' | 'month'>('week');
const loading = ref(false);

const today = startOfDay(new Date());
const weekAnchor = ref<Date>(startOfDay(new Date())); // erster Tag des 7-Tage-Fensters
const monthAnchor = ref<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

const weekAvailability = ref<DayAvailability[]>([]);
const monthAvailability = ref<DayAvailability[]>([]);
const selectedDateKey = ref<string | null>(null);

const durationMin = computed(() =>
  parseInt(bookingStore.duration || bookingStore.activeService?.durations?.[0] || '30', 10),
);
const priceCents = computed(() => bookingStore.activeService?.price_cents ?? 0);

onMounted(async () => {
  await ensureSelection();
  await loadWeek();
});

// Falls man ohne Step-1-Auswahl hier landet (Direktaufruf/Reload): ersten
// Standort/Service als Default laden, damit die Ansicht nie leer bricht.
async function ensureSelection() {
  if (bookingStore.activeService && bookingStore.activeLocation) return;
  try {
    const locations = await bookingStore.getLocations();
    if (!locations?.[0]) return;
    await bookingStore.setLocation(locations[0]);
    const services = await bookingStore.getServicesByLocation();
    if (services?.[0]) {
      bookingStore.setService(services[0]);
      bookingStore.setDuration(services[0].durations?.[0] ?? '30');
    }
  } catch (e) {
    console.warn('[FindAppointment] ensureSelection:', e);
  }
}

async function load(from: Date, to: Date): Promise<DayAvailability[]> {
  const locationId = bookingStore.activeLocation?.id;
  const serviceId = bookingStore.activeService?.id;
  if (!locationId || !serviceId) return [];
  return getAvailability({ locationId, serviceId, durationMin: durationMin.value, from, to });
}

async function loadWeek() {
  loading.value = true;
  try {
    weekAvailability.value = await load(weekAnchor.value, addDays(weekAnchor.value, 6));
    autoSelectFirst(weekAvailability.value);
  } finally {
    loading.value = false;
  }
}

async function loadMonth() {
  loading.value = true;
  try {
    const y = monthAnchor.value.getFullYear();
    const m = monthAnchor.value.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const from = first.getTime() < today.getTime() ? today : first; // keine Vergangenheit
    monthAvailability.value = await load(from, last);
    autoSelectFirst(monthAvailability.value);
  } finally {
    loading.value = false;
  }
}

function autoSelectFirst(days: DayAvailability[]) {
  // Aktuelle Auswahl behalten, falls im Fenster noch verfügbar.
  if (selectedDateKey.value && days.some((d) => d.dateKey === selectedDateKey.value && d.hasAvailable)) return;
  const firstFree = days.find((d) => d.hasAvailable);
  selectedDateKey.value = firstFree ? firstFree.dateKey : null;
}

// ── Wochen-Navigation ──
const canGoPrevWeek = computed(() => weekAnchor.value.getTime() > today.getTime());
async function prevWeek() {
  const candidate = addDays(weekAnchor.value, -7);
  weekAnchor.value = candidate.getTime() < today.getTime() ? today : candidate;
  await loadWeek();
}
async function nextWeek() {
  weekAnchor.value = addDays(weekAnchor.value, 7);
  await loadWeek();
}
const weekRangeLabel = computed(() => {
  const from = weekAnchor.value;
  const to = addDays(from, 6);
  return `${from.getDate()}.–${to.getDate()}. ${germanMonthName(to.getMonth())}`;
});

// ── Monats-Navigation ──
const canGoPrevMonth = computed(() => {
  const first = new Date(monthAnchor.value.getFullYear(), monthAnchor.value.getMonth(), 1);
  return first.getTime() > today.getTime();
});
async function prevMonth() {
  monthAnchor.value = new Date(monthAnchor.value.getFullYear(), monthAnchor.value.getMonth() - 1, 1);
  await loadMonth();
}
async function nextMonth() {
  monthAnchor.value = new Date(monthAnchor.value.getFullYear(), monthAnchor.value.getMonth() + 1, 1);
  await loadMonth();
}
const monthLabel = computed(
  () => `${germanMonthName(monthAnchor.value.getMonth())} ${monthAnchor.value.getFullYear()}`,
);

// Monatsgitter (Montag-Start) inkl. führender Leerzellen.
interface MonthCell {
  date: Date | null;
  dateKey?: string;
  hasAvailable?: boolean;
  isToday?: boolean;
}
const monthCells = computed<MonthCell[]>(() => {
  const year = monthAnchor.value.getFullYear();
  const month = monthAnchor.value.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7; // Mo=0 … So=6
  const map = new Map(monthAvailability.value.map((d) => [d.dateKey, d]));
  const cells: MonthCell[] = [];
  for (let i = 0; i < lead; i++) cells.push({ date: null });
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = toDateKey(date);
    cells.push({
      date,
      dateKey: key,
      hasAvailable: !!map.get(key)?.hasAvailable,
      isToday: key === toDateKey(today),
    });
  }
  return cells;
});

// ── Auswahl ──
const selectedDay = computed<DayAvailability | null>(() => {
  if (!selectedDateKey.value) return null;
  const source = viewMode.value === 'week' ? weekAvailability.value : monthAvailability.value;
  return source.find((d) => d.dateKey === selectedDateKey.value) ?? null;
});
const selectedDayLabel = computed(() => {
  const d = selectedDay.value?.date;
  return d ? `${d.getDate()}. ${germanMonthName(d.getMonth())}` : '';
});

function selectDay(dateKey?: string) {
  if (dateKey) selectedDateKey.value = dateKey;
}
function selectTime(slot: DaySlot) {
  if (!slot.available) return;
  bookingStore.setSlot(slot.start.toISOString(), slot.end.toISOString());
}
function isSelectedSlot(slot: DaySlot): boolean {
  return bookingStore.selectedSlot?.start === slot.start.toISOString();
}

async function setView(mode: 'week' | 'month') {
  if (viewMode.value === mode) return;
  viewMode.value = mode;
  if (mode === 'month') await loadMonth();
  else await loadWeek();
}
</script>

<template>
  <div class="appointment-container">
    <div class="infobar-container">
      <!-- ── Info-Leiste: Standort · Service · Dauer · Preis ── -->
      <div class="info-bar">
        <span class="info-location">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ bookingStore.activeLocation?.name ?? '–' }}
        </span>
        <span class="info-divider">·</span>
        <span class="info-service">{{ bookingStore.activeService?.name ?? '–' }}</span>
        <span class="info-divider">·</span>
        <span class="info-meta">{{ durationMin }} Min.</span>
        <span class="info-divider">·</span>
        <span class="info-price">{{ n(priceCents / 100, 'currency', 'de-DE') }}</span>
      </div>
    </div>

    <!-- ── Ansicht-Umschalter + Zeitraum-Navigation ── -->
    <div class="view-controls">
      <div class="view-toggle">
        <button type="button" :class="{ active: viewMode === 'week' }" @click="setView('week')">Woche</button>
        <button type="button" :class="{ active: viewMode === 'month' }" @click="setView('month')">Monat</button>
      </div>
      <div class="range-nav">
        <button type="button" class="nav-arrow" :disabled="viewMode === 'week' ? !canGoPrevWeek : !canGoPrevMonth"
          @click="viewMode === 'week' ? prevWeek() : prevMonth()" aria-label="Zurück">‹</button>
        <span class="range-label">{{ viewMode === 'week' ? weekRangeLabel : monthLabel }}</span>
        <button type="button" class="nav-arrow" @click="viewMode === 'week' ? nextWeek() : nextMonth()"
          aria-label="Weiter">›</button>
      </div>
    </div>

    <!-- ── Wochenansicht ── -->
    <template v-if="viewMode === 'week'">
      <div class="section-label">Datum wählen</div>
      <div class="calendar-strip">
        <button v-for="day in weekAvailability" :key="day.dateKey" type="button" class="cal-day"
          :class="{ selected: selectedDateKey === day.dateKey, unavail: !day.hasAvailable }"
          :disabled="!day.hasAvailable" @click="selectDay(day.dateKey)">
          <div class="cal-day-name">{{ day.weekdayShort }}</div>
          <div class="cal-day-num">{{ day.date.getDate() }}</div>
        </button>
      </div>
    </template>

    <!-- ── Monatsansicht ── -->
    <template v-else>
      <div class="section-label">Tag wählen</div>
      <div class="month-grid">
        <div v-for="dow in ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']" :key="dow" class="month-dow">{{ dow }}</div>
        <template v-for="(cell, i) in monthCells" :key="i">
          <div v-if="!cell.date" class="month-cell empty"></div>
          <button v-else type="button" class="month-cell"
            :class="{ selected: selectedDateKey === cell.dateKey, unavail: !cell.hasAvailable, today: cell.isToday }"
            :disabled="!cell.hasAvailable" @click="selectDay(cell.dateKey)">
            {{ cell.date.getDate() }}
          </button>
        </template>
      </div>
    </template>

    <!-- ── Uhrzeiten für den gewählten Tag ── -->
    <div v-if="selectedDay && selectedDay.slots.length">
      <div class="section-label">Uhrzeit wählen — {{ selectedDayLabel }}</div>
      <div class="time-grid">
        <button v-for="slot in selectedDay.slots" :key="slot.start.toISOString()" type="button" class="time-btn"
          :class="{ selected: isSelectedSlot(slot), busy: !slot.available }" :disabled="!slot.available"
          @click="selectTime(slot)">
          {{ formatTime(slot.start) }}
        </button>
      </div>
    </div>
    <div v-else-if="!loading" class="empty-hint">
      Keine freien Termine in diesem Zeitraum. Bitte einen anderen Zeitraum wählen.
    </div>

    <LoadingBanner v-if="loading" />
  </div>
</template>

<style scoped>
.appointment-container {
  width: 100%;
}

.infobar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

/* ── Info-Leiste ── */
.info-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-bg);
  border: 1px solid var(--primary);
  border-radius: 999px;
  gap: 12px;
  padding: 5px 34px;
  font-size: 11px;
  color: var(--primary-dark);
  font-weight: 500;
  flex-wrap: wrap;
}

.info-location {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--muted-fg);
}

.info-divider {
  color: var(--primary);
  font-weight: 300;
}

.info-price {
  font-weight: 600;
  color: var(--primary);
}

/* ── Ansicht-Umschalter + Navigation ── */
.view-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.view-toggle {
  display: inline-flex;
  border: 1.5px solid var(--border);
  border-radius: 999px;
  padding: 2px;
  background: #fff;
}

.view-toggle button {
  border: none;
  background: none;
  font-family: var(--ff-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--muted-fg);
  padding: 6px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s;
}

.view-toggle button.active {
  background: var(--primary);
  color: #fff;
}

.range-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-h);
  min-width: 130px;
  text-align: center;
}

.nav-arrow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: #fff;
  color: var(--primary-dark);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.18s;
}

.nav-arrow:hover:not(:disabled) {
  border-color: var(--primary);
  background: var(--accent-bg);
}

.nav-arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

/* ── Section Label ── */
.section-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-fg);
  margin-bottom: 10px;
  font-weight: 600;
}

/* ── Wochenstreifen ── */
.calendar-strip {
  display: flex;
  gap: 6px;
  margin-bottom: 22px;
  overflow-x: auto;
  padding-bottom: 3px;
}

.cal-day {
  min-width: 50px;
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 9px 5px;
  text-align: center;
  cursor: pointer;
  transition: all 0.18s;
  font-family: var(--ff-body);
}

.cal-day:hover:not(:disabled),
.cal-day.selected {
  border-color: var(--primary);
  background: var(--accent-bg);
}

.cal-day.unavail {
  opacity: 0.3;
  cursor: default;
}

.cal-day-name {
  font-size: 9px;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
}

.cal-day-num {
  font-size: 17px;
  font-family: var(--ff-display);
  font-weight: 400;
  color: #08060d;
  margin: 2px 0;
}

.cal-day.selected .cal-day-num {
  color: var(--primary-dark);
  font-weight: 600;
}

/* ── Monatsgitter ── */
.month-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 22px;
}

.month-dow {
  font-size: 9px;
  color: var(--muted-fg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  text-align: center;
  padding: 4px 0;
}

.month-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ff-body);
  font-size: 12px;
  color: var(--text-h);
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s;
}

.month-cell.empty {
  border: none;
  background: none;
  cursor: default;
}

.month-cell:hover:not(:disabled),
.month-cell.selected {
  border-color: var(--primary);
  background: var(--accent-bg);
  color: var(--primary-dark);
  font-weight: 600;
}

.month-cell.today {
  border-color: var(--primary);
}

.month-cell.unavail {
  opacity: 0.3;
  cursor: default;
  border-style: dashed;
}

/* ── Uhrzeit-Raster ── */
.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  margin-bottom: 22px;
}

.time-btn {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 9px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  color: #08060d;
  font-family: var(--ff-body);
  transition: all 0.18s;
}

.time-btn:hover:not(:disabled),
.time-btn.selected {
  border-color: var(--primary);
  background: var(--accent-bg);
  color: var(--primary-dark);
  font-weight: 600;
}

.time-btn.busy {
  opacity: 0.28;
  cursor: default;
  text-decoration: line-through;
}

.empty-hint {
  font-size: 12px;
  color: var(--muted-fg);
  padding: 8px 0 22px;
  text-align: center;
}
</style>

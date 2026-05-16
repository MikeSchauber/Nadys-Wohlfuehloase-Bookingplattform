<script setup lang="ts">
import type { Location, Service } from '@/interfaces/interfaces';
import { getTableData } from '@/services/databaseService';
import { useBookingStore } from '@/stores/bookingStore';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

const { n } = useI18n()
const bookingStore = useBookingStore()

const activeLocation = ref<Location | null>(null)
const activeService = ref<Service | null>(null)
const duration = ref<string | undefined>("0")
const price_cents = ref<number | undefined>(0)
const selectedDay = ref<number | null>(null);
const selectedTime = ref<string | null>(null);

onMounted(async () => {
    await getServiceForDevelopment()
})

// Generate next 7 days starting today
const days = computed(() => {
    const dayNames = [{ name: 'Di', number: 2 }, { name: 'Mi', number: 3 }, { name: 'Do', number: 4 }, { name: 'Fr', number: 5 }, { name: 'Sa', number: 6 }, { name: 'So', number: 7 }, { name: 'Mo', number: 8 },];
    return dayNames
});

const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00',
];

const busySlots = ['10:00', '14:00', '15:30'];



async function getServiceForDevelopment() {
    const locations: Location[] = await getTableData("locations", "prio_number", true);
    activeLocation.value = locations[0]


    const services: Service[] = await getTableData("services", "price_cents", true, "location_id", activeLocation.value?.id);
    activeService.value = services[0]

    duration.value = activeService.value?.durations[0]
    price_cents.value = activeService.value?.price_cents
    // console.log(activeLocation.value);

    // console.log(activeService.value);
}

</script>

<template>
    <div class="appointment-container">
        <div class="infobar-container">
            <!-- ── Info-Leiste oben links ── -->
            <div class="info-bar">
                <span class="info-location">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {{ activeLocation?.name ?? '–' }}
                </span>
                <span class="info-divider">·</span>
                <span class="info-service">{{ activeService?.name ?? '–' }}</span>
                <span class="info-divider">·</span>
                <span class="info-meta">{{ duration }} Min.</span>
                <span class="info-divider">·</span>
                <span>{{ price_cents != null ? n(price_cents / 100, 'currency', 'de-DE') : 0 }}</span>
            </div>
        </div>

        <!-- Datum -->
        <div class="section-label">Datum wählen</div>
        <div class="calendar-strip">
            <button v-for="day, i in days" :key="i" class="cal-day" :class="{ selected: selectedDay === i }"
                @click="selectedDay = i">
                <div class="cal-day-name">{{ day.name }}</div>
                <div class="cal-day-num">{{ day.number }}</div>
            </button>
        </div>

        <!-- Uhrzeit -->
        <div class="section-label">Uhrzeit wählen</div>
        <div class="time-grid">
            <button v-for="slot in timeSlots" :key="slot" class="time-btn"
                :class="{ selected: selectedTime === slot, busy: busySlots.includes(slot) }"
                :disabled="busySlots.includes(slot)" @click="selectedTime = slot">
                {{ slot }}
            </button>
        </div>
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
}

/* ── Info-Leiste ── */
.info-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-bg);
    border: 1px solid var(--primary);
    border-radius: 999px;
    color: var(--primary) !important;
    gap: 12px;
    padding: 5px 34px;
    font-size: 11px;
    color: var(--primary-dark);
    font-weight: 500;
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

/* ── Booking Card ── */
.booking-card {
    background: #fff;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 22px;
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

/* ── Calendar ── */
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

.cal-day:hover,
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

/* ── Time Grid ── */
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

.time-btn:hover,
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
</style>
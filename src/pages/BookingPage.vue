<template>
    <div class="booking-page">
        <StepperBookings></StepperBookings>

        <h1>Booking loop</h1>

        <div></div>
    </div>
</template>

<script setup lang="ts">
import StepperBookings from '@/components/custom/StepperBookings.vue';
import { useBookingStore } from '@/stores/bookingStore';

const bookingStore = useBookingStore()



</script>

<style scoped>
.booking-page {
    h1 {
        color: var(--primary);
    }
}
</style>

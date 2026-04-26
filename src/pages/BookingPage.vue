<template>
    <div class="booking-page">
        <StepperBookings></StepperBookings>

        <ServiceLoop></ServiceLoop>

        <div></div>
    </div>
</template>

<script setup lang="ts">
import ServiceLoop from '@/components/booking/ServiceLoop.vue';
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

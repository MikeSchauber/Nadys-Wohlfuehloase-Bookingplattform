<template>
    <div class="booking-page">
        <StepperBookings></StepperBookings>


        <ServiceLoop v-if="bookingStore.currentStep === 1"></ServiceLoop>

        <div></div>
    </div>
</template>

<script setup lang="ts">

import ServiceLoop from '@/components/custom/booking/ServiceLoop.vue';
import StepperBookings from '@/components/custom/StepperBookings.vue';
import { useBookingStore } from '@/stores/bookingStore';

const bookingStore = useBookingStore()



</script>

<style scoped>
.booking-page {
    display: flex;
    flex-direction: column;
    gap: 38px;

    h1 {
        color: var(--primary);
    }
}
</style>

<template>
    <div class="booking-page">
        <StepperBookings></StepperBookings>


        <div v-if="bookingStore.currentStep === 1">
            <ServiceLoop></ServiceLoop>
        </div>
        <div class="navigaton-button-section">
            <Button v-if="bookingStore.currentStep > 1" @click="bookingStore.previousBookingStep()">Zurück</Button>
            <TimingDialog v-if="bookingStore.currentStep === 1" :-time-ranges="bookingStore.activeService?.durations"
                class="choose-btn">
            </TimingDialog>
        </div>
    </div>
</template>

<script setup lang="ts">

import ServiceLoop from '@/components/custom/booking/ServiceLoop.vue';
import TimingDialog from '@/components/custom/booking/TimingDialog.vue';
import StepperBookings from '@/components/custom/StepperBookings.vue';
import Button from '@/components/ui/button/Button.vue';
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

.navigaton-button-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between
}
</style>

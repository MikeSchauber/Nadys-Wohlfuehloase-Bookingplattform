<script setup lang="ts">

import FindAppointment from '@/components/custom/booking/FindAppointment.vue';
import ServiceLoop from '@/components/custom/booking/ServiceLoop.vue';
import TimingDialog from '@/components/custom/booking/TimingDialog.vue';
import StepperBookings from '@/components/custom/StepperBookings.vue';
import Button from '@/components/ui/button/Button.vue';
import { useBookingStore } from '@/stores/bookingStore';

const bookingStore = useBookingStore()



</script>

<template>
    <div class="booking-page">
        <StepperBookings></StepperBookings>
        <div>
            <ServiceLoop v-if="bookingStore.currentStep === 1"></ServiceLoop>
            <FindAppointment v-if="bookingStore.currentStep === 2"></FindAppointment>
        </div>
        <div class="navigaton-button-section">
            <Button v-if="bookingStore.currentStep > 1" @click="bookingStore.previousBookingStep()">Zurück</Button>
            <TimingDialog v-if="bookingStore.currentStep === 1" :-time-ranges="bookingStore.activeService?.durations"
                class="choose-btn">
            </TimingDialog>
            <Button v-if="bookingStore.currentStep === 2" :disabled="!bookingStore.selectedSlot"
                class="choose-btn" @click="bookingStore.nextBookingStep()">
                Weiter zu Kontakt →
            </Button>
        </div>
    </div>
</template>



<style scoped>
.booking-page {
    display: flex;
    flex-direction: column;
    gap: 38px;

    background-size: cover;

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

<template>
    <div class="main">
        <StepperBookings></StepperBookings>

        <main>
            <div v-if="bookingStore.service === 'massage'">
                <h1>Massage Bookings</h1>
            </div>
            <div v-if="bookingStore.service === 'reiki'">
                <h1>Reiki Bookings</h1>
            </div>
        </main>

        <div></div>
    </div>
</template>

<script setup lang="ts">
import StepperBookings from '@/components/custom/StepperBookings.vue';
import { useBookingStore } from '@/stores/bookingStore';

const bookingStore = useBookingStore()



</script>

<style scoped>
.main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px 40px;
}
</style>

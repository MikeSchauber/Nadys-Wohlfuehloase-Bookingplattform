<template>
    <div class="main">
        <StepperBookings></StepperBookings>
        <h1>Massage Booking</h1>
        <FooterSection />
    </div>
</template>

<script setup lang="ts">
import StepperBookings from '@/components/custom/StepperBookings.vue';
import FooterSection from '@/components/shared/FooterSection.vue';
import { useUiStore } from '@/stores/uiStore';

const uiStore = useUiStore()
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

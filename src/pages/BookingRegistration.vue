<template>
    <div class="main">
        <StepperBookings></StepperBookings>

        <main>
            <div>
                <h1>Massage Bookings</h1>
            </div>
            <div>
                <h1>Massage Bookings</h1>
            </div>
        </main>
        <FooterSection />
    </div>
</template>

<script setup lang="ts">
import StepperBookings from '@/components/custom/StepperBookings.vue';
import FooterSection from '@/components/shared/FooterSection.vue';
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

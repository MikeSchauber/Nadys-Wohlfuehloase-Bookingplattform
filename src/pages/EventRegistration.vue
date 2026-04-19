<template>
    <div class="main">
        <StepperRegistration></StepperRegistration>
        <h1>Event Registration</h1>
        <FooterSection />
    </div>
</template>

<script setup lang="ts">
import StepperRegistration from '@/components/custom/StepperRegistration.vue';
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

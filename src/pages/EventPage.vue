<template>
    <div class="main">

        <StepperRegistration></StepperRegistration>
        <main>
            <h1>Event Registration</h1>
        </main>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import StepperRegistration from '@/components/custom/StepperRegistration.vue';


</script>

<style scoped>
.main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 40px;
}
</style>

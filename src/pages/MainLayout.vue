<template>
    <div class="main">
        <!-- <div class="header">
            <a href="https://www.nady-artist-of-live.de/">
                <Button>
                    <MoveLeft />
                    Zurück zur Webseite
                </Button>
            </a>
        </div> -->
        <StepperView></StepperView>
        <StartGreet v-if="uiStore.greeting"></StartGreet>
        <ServiceChoose v-else></ServiceChoose>

        <span>Nady's Wohlfühloase 2026</span>
    </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore';
import StartGreet from '@/components/custom/StartGreet.vue';
import ServiceChoose from '@/components/custom/ServiceChoose.vue';
import StepperView from '@/components/custom/StepperView.vue';

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

.header {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}
</style>

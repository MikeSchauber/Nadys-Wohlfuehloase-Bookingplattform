<template>
    <div class="main">
        <div class="header">
            <!-- <a href="https://www.nady-artist-of-live.de/">
                <Button>
                    <MoveLeft />
                    Zurück zur Webseite
                </Button>
            </a> -->
        </div>
        <main class="main-content">
            <div>
                <h1>Nady's Buchungsportal</h1>
                <h2>by Nady's Wohlfühloase</h2>
            </div>
            <Button variant="outline">Buchung Starten</Button>
        </main>
        <span>Nady's Wohlfühloase 2026</span    >
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { MoveLeft } from 'lucide-vue-next';

import { ref } from 'vue'

const services = [
    "Events",
    "Massage",
    "Reiki"
]

const activeService = ref(0)

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



.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 34px;
}

.header {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}
</style>

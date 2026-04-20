<template>
    <main class="main-content">
        <div>
            <h1>Nady's Buchungsportal</h1>
            <h2>by Nady's Wohlfühloase</h2>
        </div>
        <div>
            <Button @click="router.push('/service')" variant="outline">Buchung Starten</Button>
        </div>
    </main>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';


const router = useRouter()

</script>

<style scoped>
.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 34px;
}
</style>
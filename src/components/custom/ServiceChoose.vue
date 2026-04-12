<template>
    <main class="main-content">

        <Card @click="router.push('/events')" class="w-full max-w-sm card">
            <CardContent class="card-content">
                <span>Events</span>
            </CardContent>
        </Card>


        <Card  @click="router.push('/massagen')" class="w-full max-w-sm card">
            <CardContent class="card-content">
                <span>Massagen</span>
            </CardContent>
        </Card>
        <Card @click="router.push('/reiki')" class="w-full max-w-sm card">
            <CardContent class="card-content">
                <span>Reiki</span>
            </CardContent>
        </Card>
    </main>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore';

import {
    Card,
    CardContent,
} from '@/components/ui/card'
import { useRouter } from 'vue-router';
import Button from '../ui/button/Button.vue';

const router = useRouter()

const uiStore = useUiStore()
</script>

<style scoped>
.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 34px;
}

.card {
    width: 100%;
    min-width: 150px;
    cursor: pointer;
    transition: all 125ms ease-in-out;
    background-color: var(--primary);

    &:hover {
        transform: scale(1.025);
        box-shadow: 0px 0px 4px 2px var(--secondary);
    }
}

.card-content {
    font-weight: 500;
    color: var(--primary-foreground);
}
</style>
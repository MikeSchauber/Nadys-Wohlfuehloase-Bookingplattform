<template>
    <main class="main-content">
        <Card class="w-full max-w-sm card">
            <CardContent class="card-content">
                <span>Events</span>
            </CardContent>
        </Card>
        <Card class="w-full max-w-sm card">
            <CardContent class="card-content">
                <span>Massagen</span>
            </CardContent>
        </Card>
        <Card class="w-full max-w-sm card">
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

const uiStore = useUiStore()
</script>

<style scoped>
.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 34px;
}

.card {
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
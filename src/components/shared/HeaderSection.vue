<template>
    <header class="header">
        <div class="brand-sign">
            <h2>Nady's Wohlfühloase</h2>
        </div>
        <div class="service-buttons">
            <Button :class="{ active: route.path === '/bookings' }">Buchung</Button>
            <Button :class="{ active: route.path === '/events' }">Events</Button>
        </div>

    </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Button from '../ui/button/Button.vue';


const route = useRoute()
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: var(--primary);
}

.brand-sign h2 {
    font-weight: 400;
    margin: 0;
}

.service-buttons {
    display: flex;
    gap: 26px;

    >Button {
        color: var(--muted);
        background-color: transparent;
        transition: all 125ms ease-in-out;

        &:hover {
            color: var(--text);
        }
    }
}
</style>
<template>
    <header>
        <div class="main-header">
            <div class="brand-sign">
                <h2 @click="router.push('/bookings/23213')">Nady's Wohlfühloase</h2>
            </div>
            <div class="service-buttons">
                <Button :class="{ active: route.path === '/bookings' }"
                    @click="router.push('/bookings')">Buchung</Button>
                <Button :class="{ active: route.path === '/events' }" @click="router.push('/events')">Events</Button>
            </div>
        </div>

        <div class="sub-header">
            <div v-if="route.path === '/bookings'" class="booking-hero">
                <div class="booking-hero-label">Online-Buchung</div>
                <h1>Ihr Wohlbefinden<br>beginnt hier</h1>
                <p>Massagen · Reiki · Ernährungsberatung</p>
            </div>

            <div v-if="route.path === '/events'" class="events-header">
                <h1>Veranstaltungen & Workshops</h1>
                <p>Aktuelle Events · Reiki-Abende · Ernährungskurse</p>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Button from '../ui/button/Button.vue';


const route = useRoute()
const router = useRouter()
</script>

<style scoped>
header {
    background-color: transparent;
}

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--inner-padding);
    position: relative;
}

.main-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.072) 0%, rgba(0, 0, 0, 0.294) 54%, rgba(0, 0, 0, 0.072) 100%);
}

.sub-header {
    color: var(--muted);
    width: 100%;
    display: flex;
    text-align: start;
    padding: var(--inner-padding);
    padding-top: 36px;
    padding-bottom: 28px;
}

.booking-hero {
    display: flex;
    flex-direction: column;
    gap: 20px;

    >h1 {
        margin: 0;
        color: var(--text);
    }
}

.events-header {
    display: flex;
    flex-direction: column;
    gap: 20px;

    >h1 {
        margin: 0;
    }


}

.brand-sign h2 {
    font-weight: 400;
    margin: 0;
    text-align: start;
}

.service-buttons {
    display: flex;
    gap: 26px;

    >Button {
        color: var(--muted);
        background-color: transparent;
        transition: all 125ms ease-in-out;
        border-radius: 0;

        &:hover {
            color: var(--text);
        }

        &.active {
            border-bottom: 2px solid white !important;
            color: white !important;
        }
    }
}
</style>
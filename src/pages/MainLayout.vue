<template>
    <div class="page">
        <div class="app">
            <div class="header-section">
                <HeaderSection></HeaderSection>
            </div>
            <div class="inner-router">
                <router-view></router-view>
            </div>
        </div>
        <FooterSection></FooterSection>
    </div>
</template>

<script setup lang="ts">
import FooterSection from '@/components/shared/FooterSection.vue';
import { useNavigationStore } from '@/stores/navigationStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/bookingStore';
import HeaderSection from '@/components/shared/HeaderSection.vue';

const bookingStore = useBookingStore()
const uiStore = useNavigationStore()
const router = useRouter()
const route = useRoute()


onMounted(() => {
    if (bookingStore.serviceId === "") {
        router.push("/bookings")
    }
})
</script>

<style scoped>
.page {
    padding: 12px 18px;
    background-color: white;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.app {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    border-radius: 12px;
    border: 2px solid var(--secondary);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.572);
}

.header-section {
    background-color: var(--primary);
    border-top-left-radius:10px;
    border-top-right-radius: 10px;
    width: 100%;
}

.inner-router {
    padding: var(--inner-padding);
    padding-top: 22px;
    width: 100%;
}
</style>

<template>
    <div class="page">
        <div class="main">
            <div class="header-section">
                <HeaderSection></HeaderSection>
            </div>
            <router-view></router-view>
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
    console.log(bookingStore.service);

    if (bookingStore.service === "") {
        router.push("/bookings")
    }
})
</script>

<style scoped>
.page {
    padding: 12px 18px;
    background-color: var(white);
    color: white;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.main {
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--primary);
    border-radius: 8px;
    box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.572);
}

.header-section {
    width: 100%;
}
</style>

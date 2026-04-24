<template>
    <div class="main">
        <div class="header">
            <a v-if="route.path === '/'" href="https://www.nady-artist-of-live.de/">
                <Button>
                    <MoveLeft />
                    Zurück zur Webseite
                </Button>
            </a>
        </div>
        <router-view></router-view>
        <FooterSection></FooterSection>


    </div>
</template>

<script setup lang="ts">

import StartGreet from '@/components/custom/StartGreet.vue';
import ServiceChoose from '@/components/custom/ServiceChoose.vue';
import FooterSection from '@/components/shared/FooterSection.vue';
import Button from '@/components/ui/button/Button.vue';
import { MoveLeft } from 'lucide-vue-next';
import { useNavigationStore } from '@/stores/navigationStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/bookingStore';

const bookingStore = useBookingStore()
const uiStore = useNavigationStore()
const router = useRouter()
const route = useRoute()


onMounted(() => {
    console.log(bookingStore.service);

    if (bookingStore.service === "") {
        router.push("/")
    }
})
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

<template>
    <LoadingBanner v-if="bookingStore.loading"></LoadingBanner>
    <div class="booking-container">

        <div class="service-container">
            <span>Service Wählen</span>
            <TransitionGroup name="fade-up" tag="div" class="services">

                <Card v-for="service, i in services" :key="service.id" class="service-card"
                    :class="{ active: bookingStore.service === service.id }" :style="{ animationDelay: `${i * 80}ms` }"
                    @click="bookingStore.setService(service.id)">
                    <CardContent class="service-content">
                        <div class="service-img-content">
                            <img :src="service.image_path" :alt="service.image_alt">
                        </div>
                        <div class="service-text-content">
                            <h4>{{ service.name }}</h4>
                            <div class="service-text-description">
                                <span>{{ service.description }}</span>
                                <span v-for="(minutes, key) in service.duration" :key="key">
                                    {{ minutes }} Min <span> - </span>
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>


            </TransitionGroup>
        </div>


        <div v-if="!bookingStore.loading" class="location-container">
            <span>Standort Wählen</span>
            <TransitionGroup name="fade-up" tag="div" class="locations">
                <Card v-for="location, i in locations" :key="location.id" class="location-card"
                    :class="{ active: bookingStore.locationId === location.id }"
                    :style="{ animationDelay: `${i * 80}ms` }" @click="getOtherServices(location.id)">
                    <CardContent class=" location-content">
                        <div class="location-text-content">
                            <span>{{ location.emoji }}</span>
                            <h4>{{ location.name }}</h4>
                            <div class="location-text-description">
                                <span>{{ location.address }}</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Location, Service } from '@/interfaces/interfaces';
import { onMounted, ref } from 'vue';
import Card from '../ui/card/Card.vue';
import CardContent from '../ui/card/CardContent.vue';
import { useBookingStore } from '@/stores/bookingStore';
import LoadingBanner from '../shared/LoadingBanner.vue';

const bookingStore = useBookingStore()

const services = ref<Service[]>([])
const locations = ref<Location[]>([])

onMounted(async () => {
    bookingStore.loadingAvailable();

    locations.value = await bookingStore.getLocations()
    services.value = await bookingStore.getServicesByLocation()
    bookingStore.loadingDisabled();

})

async function getOtherServices(id: string) {
    bookingStore.loadingAvailable();
    services.value = []
    bookingStore.setLocationId(id)
    services.value = await bookingStore.getServicesByLocation()
    bookingStore.loadingDisabled();
}

</script>

<style scoped>
.fade-up-enter-from {
    opacity: 0;
}

.fade-up-enter-active {
    animation: fadeUp 250ms ease-in-out both;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.booking-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 38px;
    height: 100%;
    color: var(--primary);
}

.service-container,
.location-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
    padding: 0 !important;

    >h2 {
        color: var(--primary);
    }
}

.service-card,
.location-card {
    padding: 0;
    border-radius: 21px;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    color: var(--primary);

    &:hover {
        background-color: color-mix(in srgb, var(--primary-hover) 20%, transparent);
        border-color: var(--primary-hover);
        transform: scale(1.01);
        box-shadow: 0px 0px 8px 2px rgba(133, 133, 133, 0.45);
    }
}

.active {
    background-color: color-mix(in srgb, var(--primary-hover) 20%, transparent);
    border-color: var(--primary-hover);
    transform: scale(1.01);
    box-shadow: 0px 0px 8px 2px rgba(133, 133, 133, 0.45);
}

.service-content,
.location-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 0;

    .service-img-content>img {
        height: 100px;
        width: auto;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
}

.location-content {
    padding: 12px 24px;
}

.service-text-content,
.location-text-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4px;
    height: 100%;
    padding-right: 12px;



    >h4 {
        font-weight: bold;
        text-align: start;
        font-size: 16px;
    }

    .service-text-description>span {
        font-size: 14px
    }

    .location-text-description>span {
        font-size: 14px;
    }
}


/* Grid */
.services,
.locations {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
}
</style>
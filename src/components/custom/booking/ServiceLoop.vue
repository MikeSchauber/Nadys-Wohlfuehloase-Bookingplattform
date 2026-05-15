<script setup lang="ts">
import type { Location, Service } from '@/interfaces/interfaces';
import { onMounted, ref } from 'vue';
import { useBookingStore } from '@/stores/bookingStore';
import CardContent from '@/components/ui/card/CardContent.vue';
import Card from '@/components/ui/card/Card.vue';
import LoadingBanner from '@/components/shared/LoadingBanner.vue';
import TimingDialog from './TimingDialog.vue';


const bookingStore = useBookingStore()

const services = ref<Service[]>([])
const locations = ref<Location[]>([])

onMounted(async () => {
    bookingStore.loadingActive();

    locations.value = await bookingStore.getLocations()
    // services.value = await bookingStore.getServicesByLocation()
    bookingStore.loadingDisabled();

})

async function getOtherServices(id: string) {
    if (id !== bookingStore.locationId) {
        bookingStore.loadingActive();
        services.value = [];
        bookingStore.setLocationId(id)
        services.value = await bookingStore.getServicesByLocation()
        bookingStore.loadingDisabled();
    }
}

function setService(service: Service) {
    bookingStore.setService(service)
}

</script>

<template>
    <div>
        <div>
            <div class="booking-container">
                <div class="location-container">
                    <span>Standort Wählen</span>
                    <div class="locations">
                        <Card v-for="location, i in locations" :key="location.id" class="location-card"
                            :class="{ active: bookingStore.locationId === location.id }"
                            @click="getOtherServices(location.id)">
                            <CardContent class=" location-content">
                                <span>{{ location.emoji }}</span>
                                <div class="location-text-content">

                                    <h4>{{ location.name }}</h4>
                                    <div class="location-text-description">
                                        <span>{{ location.address }}</span>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div v-if="bookingStore.locationId" class="service-container">
                    <span>Service Wählen</span>
                    <div class="services">
                        <Card v-for="service, i in services" :key="service.id" class="service-card"
                            :class="{ active: bookingStore.serviceId === service.id }" @click="setService(service)">
                            <CardContent class="service-content">
                                <div class="service-img-content">
                                    <img :src="service.image_path" :alt="service.image_alt">
                                </div>
                                <div class="service-text-content">
                                    <h4>{{ service.name }}</h4>
                                    <div class="service-text-description">
                                        <span>{{ service.description }}</span>
                                        <span>
                                            {{ service.durations[0] }} Min
                                        </span>
                                        <span> - </span>
                                        <span>{{ service.durations[service.durations.length - 1] }} Min</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <LoadingBanner v-if="bookingStore.loading"></LoadingBanner>
                </div>
            </div>

            <TimingDialog :-time-ranges="bookingStore.activeService?.durations" class="choose-btn">
            </TimingDialog>

        </div>
    </div>
</template>



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
    margin-bottom: 24px
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

/* Animation */
.active {
    background-color: color-mix(in srgb, var(--primary-hover) 20%, transparent);
    border-color: var(--primary-hover);
    transform: scale(1.01);
    box-shadow: 0px 0px 8px 2px rgba(133, 133, 133, 0.45);
}

.no-animation {
    animation: none !important;
    transition: none !important;
}

/* Animation End */

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
    gap: 0px;
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

.choose-btn {
    width: 100%;
    margin-top: 28px;
}
</style>
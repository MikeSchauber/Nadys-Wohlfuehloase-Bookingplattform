<template>
    <div class="booking-container">
        <div class="service-container">
            <span>Service Wählen</span>
            <div class="services">
                <Card v-for="service in services" class="service-card">
                    <CardContent class="service-content">
                        <div class="service-img-content">
                            <img :src="service.image_path" :alt="service.image_alt">
                        </div>
                        <div class="service-text-content">
                            <h4>{{ service.name }}</h4>
                            <div class="service-text-description">
                                <span>{{ service.description }}</span>
                                <span v-for="(minutes, key, index) in service.duration" :key="key">
                                    {{ minutes }} Min <span v-if="index === 0"> - </span>
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div class="location-container">
            <span>Standort Wählen</span>
            <div class="locations">
                <Card v-for="location in locations" class="location-card">
                    <CardContent class="location-content">
                        <span>{{ location.name }}</span>
                        <span>{{ location.address }}</span>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Location, Service } from '@/interfaces/interfaces';
import { getTableData } from '@/services/databaseService';
import { onMounted, ref } from 'vue';
import Card from '../ui/card/Card.vue';
import CardContent from '../ui/card/CardContent.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardFooter from '../ui/card/CardFooter.vue';


const services = ref<Service[]>([])
const locations = ref<Location[]>([])

onMounted(async () => {
    services.value = await getTableData("services", "service_type", true)
    locations.value = await getTableData("locations", "id", true)
    console.log(services.value);

})
</script>

<style scoped>
.booking-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
        background-color: var(--primary-hover);
        color: white;
        transform: scale(1.01);
        box-shadow: 0px 0px 8px 2px rgba(133, 133, 133, 0.349);
    }
}

.service-content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 20px;
    padding: 0;

    .service-img-content>img {
        height: 100px;
        width: auto;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .service-text-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 8px;
        height: 100%;



        >h4 {
            font-weight: bold;
            text-align: start;
            font-size: 16px;
        }

        .service-text-description>span {
            font-size: 14px
        }
    }
}

.location-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.services,
.locations {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
}
</style>
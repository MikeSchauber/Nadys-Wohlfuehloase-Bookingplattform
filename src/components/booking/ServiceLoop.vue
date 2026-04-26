<template>
    <div class="booking-container">
        <div class="service-container">
            <span>Service Wählen</span>
            <div class="services">
                <Card v-for="service in services" class="service-card">
                    <CardHeader>

                    </CardHeader>
                    <CardContent>
                        <div>
                            <img :src="service.image_path" :alt="service.image_alt">
                        </div>
                        <div>
                            <span>{{ service.description }}</span>
                            <span v-for="(minutes, key, index) in service.duration" :key="key">
                                {{ minutes }} Min <span v-if="index === 0"> - </span>
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        </div>
        <div class="location-container">
            <span>Standort Wählen</span>
            <div class="locations">
                <Card v-for="location in locations" class="service-card">
                    <CardHeader>

                    </CardHeader>
                    <CardContent>
                        <span>{{ location.name }}</span>
                        <span>{{ location.adress }}</span>
                    </CardContent>
                    <CardFooter></CardFooter>
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

    >h2 {
        color: var(--primary);
    }
}

.services,
.locations {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
}

.service-card {}
</style>
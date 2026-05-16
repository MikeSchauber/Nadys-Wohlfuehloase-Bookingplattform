<script setup lang="ts">
import type { Location, Service } from '@/interfaces/interfaces';
import { getTableData } from '@/services/databaseService';
import { useBookingStore } from '@/stores/bookingStore';
import { ref } from 'vue';
import { onMounted } from 'vue';

const bookingStore = useBookingStore()

const activeLocation = ref<Location | null>(null)
const activeService = ref<Service | null>(null)

onMounted(async () => {
    await getServiceForDevelopment()
})

async function getServiceForDevelopment() {
    const locations = await getTableData("locations", "prio_number", true);
    activeLocation.value = locations[0]

    const services = await getTableData("services", "price_cents", true, "location_id", activeLocation.value?.id);
    activeService.value = services[0]

    console.log(activeLocation.value);

    console.log(activeService.value);
}

</script>

<template>
    <div class="appointment-maincontainer">
        <h1>{{ activeLocation?.name }}</h1>
        <h2>{{ activeLocation?.address }}</h2>
    </div>
</template>

<style scoped>
.appointment-maincontainer {
    color: var(--primary);
}
</style>
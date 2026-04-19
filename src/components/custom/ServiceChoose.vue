<template>
    <main class="main-content">

        <Card v-for="serviceType in serviceTypes" @click="startServiceProcess(serviceType.name)"
            class="w-full max-w-sm card">
            <CardContent class="card-content">
                <span>{{ serviceType.name }}</span>
            </CardContent>
        </Card>
    </main>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
} from '@/components/ui/card'
import { useBookingStore } from '@/stores/bookingStore';
import type { ServiceTypes } from '@/interfaces/interfaces';
import { onMounted, ref } from 'vue';
import { getTableData } from '@/services/databaseService';

const bookingStore = useBookingStore();

const serviceTypes = ref<ServiceTypes[]>([])

onMounted(async () => {
    serviceTypes.value = await getTableData("serviceTypes", "name", true)
})

function startServiceProcess(serviceName: string) {
    bookingStore.evaluateServiceQuestion(serviceName)
}

</script>

<style scoped>
.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 34px;
}

.card {
    width: 100%;
    min-width: 150px;
    cursor: pointer;
    transition: all 125ms ease-in-out;
    background-color: var(--primary);

    &:hover {
        transform: scale(1.025);
        box-shadow: 0px 0px 4px 2px var(--secondary);
    }
}

.card-content {
    font-weight: 500;
    color: var(--primary-foreground);
}
</style>
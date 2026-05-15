<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useBookingStore } from '@/stores/bookingStore';
import { ZoomIn } from 'lucide-vue-next';
import { ref } from 'vue';

const bookingStore = useBookingStore()

const dialogOpen = ref(false)

</script>

<template>
    <Dialog v-model:open="dialogOpen">

        <DialogTrigger as-child>
            <ZoomIn @click="" class="card-action-button" />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <img :src="bookingStore.activeLocation?.image_path" :alt="bookingStore.activeLocation?.image_path">
        </DialogContent>

    </Dialog>
</template>

<style scoped>
.card-action-button {
    border-radius: 12px;
    border: 1px solid white;
    width: 34px;
    height: 34px;
    padding: 4px;
    transition: all 125ms ease-in-out;


    &:hover {
        background-color: var(--primary);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.539);
        transform: scale(1.02);
    }
}

.opener-btn {
    width: 100%;
}

.booking-dialog-select button {
    width: 100% !important;
}
</style>

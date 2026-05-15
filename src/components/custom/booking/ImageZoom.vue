<script setup lang="ts">
import { Button } from '@/components/ui/button'
import CardDescription from '@/components/ui/card/CardDescription.vue';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import { useBookingStore } from '@/stores/bookingStore';
import { Search } from 'lucide-vue-next';
import { ref } from 'vue';

const bookingStore = useBookingStore()

const dialogOpen = ref(false)

</script>

<template>
    <Dialog v-model:open="dialogOpen">

        <DialogTrigger as-child>
            <Search class="card-action-button" />
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ bookingStore.activeLocation?.name }}</DialogTitle>
                <DialogDescription>
                    {{ bookingStore.activeLocation?.address }}
                </DialogDescription>
            </DialogHeader>
            <img class="zoomed-image" :src="bookingStore.activeLocation?.image_path"
                :alt="bookingStore.activeLocation?.image_path">
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

    box-shadow: 0px 0px 4px var(--primary);

    &:hover {

        border-color: white !important;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.724);
        transform: scale(1.02);
    }
}

.zoomed-image {
    border-radius: 8px;
}

.opener-btn {
    width: 100%;
}

.booking-dialog-select button {
    width: 100% !important;
}
</style>

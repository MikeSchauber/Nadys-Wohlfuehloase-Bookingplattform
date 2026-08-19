<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Select from '@/components/ui/select/Select.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import { useBookingStore } from '@/stores/bookingStore';
import { MoveRight } from 'lucide-vue-next';
import { ref } from 'vue';

const bookingStore = useBookingStore()

const dialogOpen = ref(false)

function nextBookingStep() {
    bookingStore.nextBookingStep()
    bookingStore.closeServiceChoosing()
    dialogOpen.value = false
}

</script>

<template>
    <Dialog v-model:open="dialogOpen">

        <DialogTrigger as-child>
            <Button :disabled="bookingStore.serviceId.length === 0" class="opener-btn" variant="outline">
                Weiter zu Termin
                <MoveRight />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <form @submit.prevent="nextBookingStep()" class="form-dialog">
                <DialogHeader>
                    <DialogTitle>Zeitspanne auswählen</DialogTitle>
                    <DialogDescription>
                        Wählen Sie Ihre bevorzugte Dauer der Buchung aus
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4">
                    <div class="grid gap-3 booking-dialog-select">
                        <Select v-model="bookingStore.duration">
                            <SelectTrigger>
                                <SelectValue placeholder="Zeitraum auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="duration in bookingStore.activeService?.durations" :value="duration"
                                    @click="bookingStore.setDuration(duration)">
                                    {{ duration }} Minuten
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button @click="" variant="outline">
                            Abbrechen
                        </Button>
                    </DialogClose>
                    <Button :disabled="bookingStore.duration.length === 0" type="submit">
                        Weiter
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>

    </Dialog>
</template>

<style scoped>
.form-dialog {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px
}

.opener-btn {
    width: 100%;
}

.booking-dialog-select button {
    width: 100% !important;
}
</style>

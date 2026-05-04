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
import { onMounted } from 'vue';

const props = defineProps<{
    TimeRanges: Record<string, number>
}>()

</script>

<template>
    <Dialog>
        <form class="form-dialog">
            <DialogTrigger as-child>
                <Button class="opener-btn" variant="outline">
                    Bestätigen
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Zeitspanne auswählen</DialogTitle>
                    <DialogDescription>
                        Wählen Sie Ihre bevorzugte Dauer der Buchung aus
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4">
                    <div class="grid gap-3 booking-dialog-select">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Zeitraum auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apple">
                                    Apple
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">
                            Abbrechen
                        </Button>
                    </DialogClose>
                    <Button type="submit">
                        Weiter
                    </Button>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>
</template>

<style scoped>
.form-dialog {
    width: 100%;
}

.opener-btn {
    width: 100%;
}

.booking-dialog-select button {
    width: 100% !important;
}
</style>

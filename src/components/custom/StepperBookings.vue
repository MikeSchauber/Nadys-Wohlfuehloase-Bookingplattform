<script setup lang="ts">
import { ref, watch } from 'vue'
import { Calendar, BookCheck, PersonStanding, TowelRack } from 'lucide-vue-next'
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { useBookingStore } from '@/stores/bookingStore'
import { storeToRefs } from 'pinia'

const bookingStore = useBookingStore()

const steps = [
    { step: 1, title: 'Service', description: '', icon: TowelRack },
    { step: 2, title: 'Termin', description: '', icon: Calendar },
    { step: 3, title: 'Daten', description: '', icon: PersonStanding },
    { step: 4, title: 'Bestätigung', description: '', icon: BookCheck },
]
const { currentStep } = storeToRefs(bookingStore)

watch(
    () => bookingStore.currentStep,
    (newValue) => {
        currentStep.value = newValue
    }
)


</script>

<template>
    <Stepper v-model="currentStep" class="flex w-10/12 items-start gap-2 stepper-container">
        <StepperItem v-for="item in steps" :key="item.step" :step="item.step"
            class="relative flex w-full flex-col items-center justify-center">
            <StepperTrigger class="relative pointer-events-none">
                <StepperIndicator v-slot="{ step }" class="bg-muted icons">
                    <template v-if="item.icon">
                        <component :is="item.icon" class="w-4 h-4" />
                    </template>
                    <span v-else>{{ step }}</span>
                </StepperIndicator>
            </StepperTrigger>
            <StepperSeparator v-if="item.step !== steps[steps.length - 1]?.step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />
            <div class="flex flex-col items-center stepper-text">
                <StepperTitle>{{ item.title }}</StepperTitle>
                <StepperDescription>{{ item.description }}</StepperDescription>
            </div>
        </StepperItem>
    </Stepper>
</template>

<style scoped>
.stepper-container {
    width: 100%;
}

.stepper-text {
    >h4 {
        color: var(--primary);
    }

    >p {
        color: var(--primary)
    }
}

.icons {
    /* transform: scale(1.2); */
}

@media(max-width: 800px) {
    .stepper-text {
        display: none;
    }
}
</style>
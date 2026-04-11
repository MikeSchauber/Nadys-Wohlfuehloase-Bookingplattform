<template>
    <Stepper class="flex w-10/12 items-start gap-2">
        <StepperItem v-for="item in steps" :key="item.step" :step="item.step"
            class="relative flex w-full flex-col items-center justify-center">
            <StepperTrigger>
                <StepperIndicator v-slot="{ step }" class="bg-muted">
                    <template v-if="item.icon">
                        <component :is="item.icon" class="w-4 h-4" />
                    </template>
                    <span v-else>{{ step }}</span>
                </StepperIndicator>
            </StepperTrigger>
            <StepperSeparator v-if="item.step !== steps[steps.length - 1]?.step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />
            <div class="flex flex-col items-center stepper-text">
                <StepperTitle>
                    {{ item.title }}
                </StepperTitle>
                <StepperDescription>
                    {{ item.description }}
                </StepperDescription>
            </div>
        </StepperItem>
    </Stepper>
</template>

<script setup lang="ts">
import { BookUser, Calendar, MapPin, BookCheck } from 'lucide-vue-next'
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'

const steps = [
    {
        step: 1,
        title: 'Standort',
        description: 'Wo möchtest du Buchen',
        icon: MapPin,
    },
    {
        step: 2,
        title: 'Termin',
        description: 'Wähle einen Termin aus',
        icon: Calendar,
    },
    {
        step: 3,
        title: 'Checkout',
        description: 'Bestätige deine Buchung',
        icon: BookCheck
    },
]
</script>


<style scoped>
.stepper-text {
    >h4 {
        color: var(--primary);
    }

    >p {
        color: var(--primary)
    }

}
</style>
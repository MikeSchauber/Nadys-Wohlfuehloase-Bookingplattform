<template>
    <Stepper class="flex w-10/12 items-start gap-2 stepper-container">
        <StepperItem v-for="item in steps" :key="item.step" :step="item.step"
            class="relative flex w-full flex-col items-center justify-center">
            <StepperTrigger>
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
import { Calendar, MapPin, BookCheck, PersonStanding } from 'lucide-vue-next'
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'

const steps = [
    {
        step: 1,
        title: 'Ort',
        description: 'Wähle einen Ort aus',
        icon: MapPin,
    },
    {
        step: 2,
        title: 'Massage',
        description: 'Wonach ist dir',
        icon: MapPin,
    },
    {
        step: 3,
        title: 'Termin',
        description: 'Wähle einen Termin aus',
        icon: Calendar,
    },
    {
        step: 4,
        title: 'Person',
        description: 'Sag mir deinen Namen',
        icon: PersonStanding,
    },

    {
        step: 5,
        title: 'Buchung',
        description: 'Bestätige deine Daten',
        icon: BookCheck
    },
]
</script>


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
    transform: scale(1.2);
}

@media(max-width: 800px) {
    .stepper-text {
        display: none;
    }
}
</style>
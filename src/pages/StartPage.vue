<template>

    <main class="main">

        <div class="main-content">
            <div>
                <h1>Nady's Wohlfühloase</h1>
                <h2>Buchungsportal</h2>
            </div>
            <Drawer>
                <DrawerTrigger as-child>
                    <Button variant="outline">
                        Buchung auswählen
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div class="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Buchungen</DrawerTitle>
                            <DrawerDescription>Wähle deine Buchung aus.</DrawerDescription>
                        </DrawerHeader>
                        <div class="p-4 pb-0">
                            <div class="flex items-center justify-center space-x-2">
                                <Button variant="outline" size="icon" class="h-8 w-8 shrink-0 rounded-full"
                                    @click="decreaseService()" :disabled="activeService === 0">
                                    <ChevronLeft />
                                    <span class="sr-only">Zurück</span>
                                </Button>
                                <div class="flex-1 text-center">
                                    <div class="text-6xl font-bold tracking-tighter">
                                        {{ services[activeService] }}
                                    </div>

                                </div>
                                <Button variant="outline" size="icon" class="h-8 w-8 shrink-0 rounded-full"
                                    @click="increaseService()" :disabled="activeService === 2">
                                    <ChevronRight />
                                    <span class="sr-only">Weiter</span>
                                </Button>
                            </div>
                            <div class="mt-3 h-[120px]">
                                <!-- <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer> -->
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button >Weiter</Button>
                            <DrawerClose as-child>
                                <Button variant="outline">
                                    Abbrechen
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { ref } from 'vue'

const services = [
    "Events",
    "Massage",
    "Reiki"
]

const activeService = ref(0)

function decreaseService() {
    if (activeService.value > 0) {
        activeService.value -= 1
    }
}

function increaseService() {
    if (activeService.value < 2) {
        activeService.value += 1
    }
}
</script>

<style scoped>
.main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 34px;
}
</style>

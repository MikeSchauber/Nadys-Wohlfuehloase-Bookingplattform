import EventRegistration from "@/pages/EventRegistration.vue";
import MainLayout from "@/pages/MainLayout.vue";
import MassageBooking from "@/pages/MassageBooking.vue";
import ReikiBooking from "@/pages/ReikiBooking.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainLayout },
    { path: "/events", component: EventRegistration },
    { path: "/massagen", component: MassageBooking },
    { path: "/reiki", component: ReikiBooking },
  ],
});

export default router;

import BookingRegistration from "@/pages/BookingRegistration.vue";
import EventRegistration from "@/pages/EventRegistration.vue";
import MainLayout from "@/pages/MainLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainLayout },
    { path: "/events", component: EventRegistration },
    { path: "/bookings", component: BookingRegistration },
  ],
});

export default router;

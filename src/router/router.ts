
import StartGreet from "@/components/custom/StartGreet.vue";
import BookingRegistration from "@/pages/BookingPage.vue";
import EventRegistration from "@/pages/EventPage.vue";
import MainLayout from "@/pages/MainLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        { path: "/", component: StartGreet },
        { path: "/events", component: EventRegistration },
        { path: "/bookings", component: BookingRegistration },
      ],
    },
    // { path: "/events", component: EventRegistration },
    // { path: "/bookings", component: BookingRegistration },
  ],
});

export default router;

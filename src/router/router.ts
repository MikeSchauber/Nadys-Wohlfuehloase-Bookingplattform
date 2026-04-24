import BookingRegistration from "@/pages/BookingPage.vue";
import EventRegistration from "@/pages/EventPage.vue";
import MainLayout from "@/pages/MainLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/events", component: EventRegistration },
      { path: "/bookings", component: BookingRegistration },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;

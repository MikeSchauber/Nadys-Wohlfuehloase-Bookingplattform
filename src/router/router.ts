import BookingRegistration from "@/pages/BookingPage.vue";
import EventRegistration from "@/pages/EventPage.vue";
import MainLayout from "@/pages/MainLayout.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainLayout,
    redirect: "/bookings",
    children: [
      { path: "events", component: EventRegistration },
      { path: "bookings", component: BookingRegistration },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;

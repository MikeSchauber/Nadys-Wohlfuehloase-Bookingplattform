import MainLayout from "@/pages/MainLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: MainLayout }],
});

export default router;

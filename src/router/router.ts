import StartPage from "@/pages/StartPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: StartPage }],
});

export default router;

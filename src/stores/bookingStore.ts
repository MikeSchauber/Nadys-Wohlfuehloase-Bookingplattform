import type { Service } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    service: "",
    location: "",
    router: useRouter(),
  }),
  getters: {},
  actions: {
    
  },
});

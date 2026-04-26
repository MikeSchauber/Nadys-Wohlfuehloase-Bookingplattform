import type { Service } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
export const useBookingStore = defineStore("booking", {
  state: () => ({
    service: "",
    location: "",
  }),
  getters: {},
  actions: {
    setLocation(location: string) {
      this.location = location;
    },

    setService(service: string) {
      this.service = service;
    },
  },
});

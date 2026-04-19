import type { Service } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    service: "",
    router: useRouter(),
    location: {},
  }),
  getters: {},
  actions: {
    evaluateServiceQuestion(serviceName: string) {
      if (serviceName === "Event") {
        this.setServiceToEvent();
      }
      if (serviceName === "Massage") {
        this.setServiceToMassage();
      }
      if (serviceName === "Reiki") {
        this.setServiceToReiki();
      }
    },

    setServiceToEvent() {
      this.service = "event";
      this.router.push("/events");
    },

    setServiceToMassage() {
      this.service = "massage";
      this.router.push("/bookings");
    },

    setServiceToReiki() {
      this.service = "reiki";
      this.router.push("/bookings");
    },
  },
});

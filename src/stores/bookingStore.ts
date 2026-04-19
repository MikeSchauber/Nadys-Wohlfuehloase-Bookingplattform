import type { Service } from "@/interfaces/interfaces";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    service: {
      event: false,
      massage: false,
      reiki: false,
    } as Service,
    router: useRouter(),
    location: {
        
    }
  }),
  getters: {},
  actions: {
    setServiceToEvent() {
      this.resetServices();
      this.service.event = true;
      this.router.push("/event");
    },
    setServiceToMassage() {
      this.resetServices();
      this.service.massage = true;
      this.router.push("/massagen");
    },
    setServiceToReiki() {
      this.resetServices();
      this.service.reiki = true;
      this.router.push("/reiki");
    },
    resetServices() {
      this.service.event = false;
      this.service.massage = false;
      this.service.reiki = false;
    },
  },
});

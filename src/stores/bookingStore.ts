import type { Location, Service } from "@/interfaces/interfaces";
import { getTableData } from "@/services/databaseService";
import { defineStore } from "pinia";
export const useBookingStore = defineStore("booking", {
  state: () => ({
    loading: false,
    serviceId: "",
    activeLocation: null as Location | null,
    activeService: null as Service | null,
    duration: "",
    currentStep: 1,
    serviceIsSetted: false
  }),
  getters: {},
  actions: {
    async setLocation(location: Location) {
      this.activeLocation = location;
      if (this.activeLocation) await this.getServicesByLocation();
    },

    setService(service: Service) {
      this.serviceId = service.id;
      this.activeService = service;
      this.duration = ""
    },

    resetService() {
      this.serviceId = "";
      this.activeService = null;

    },

    resetDuration() {
      this.duration = ""
    },

    resetLocation() {
      this.activeLocation = null
    },

    loadingActive() {
      this.loading = true;
    },

    loadingDisabled() {
      this.loading = false;
    },

    async getLocations() {
      const locations = await getTableData("locations", "prio_number", true);

      return locations;
    },

    async getServicesByLocation() {
      if (!this.serviceIsSetted) {
        this.resetService()
      }
      const services = await getTableData("services", "prio_number", true, "location_id", this.activeLocation?.id);

      this.openServiceChoosing()

      return services
    },

    closeServiceChoosing() {
      this.serviceIsSetted = true;
    },

    openServiceChoosing() {
      this.serviceIsSetted = false;
    },

    setDuration(duration: string) {
      this.duration = duration;
    },

    nextBookingStep() {
      this.currentStep += 1;
    },

    previousBookingStep() {
      // this.resetDuration();
      // this.resetService();
      // this.resetLocation();
      this.currentStep -= 1;
    }
  },
});

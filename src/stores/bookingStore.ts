import type { Service } from "@/interfaces/interfaces";
import { getTableData } from "@/services/databaseService";
import { defineStore } from "pinia";
export const useBookingStore = defineStore("booking", {
  state: () => ({
    loading: false,
    serviceId: "",
    activeService: null as Service | null,
    locationId: "",
    duration: "",
    currentStep: 1,
    serviceIsSetted: false
  }),
  getters: {},
  actions: {
    async setLocationId(id: string) {
      this.locationId = id;
      if (this.locationId) await this.getServicesByLocation();
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
      this.locationId = ""
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
      const services = await getTableData("services", "prio_number", true, "location_id", this.locationId);

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

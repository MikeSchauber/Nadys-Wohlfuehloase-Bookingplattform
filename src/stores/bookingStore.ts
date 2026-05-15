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
    },

    resetService() {
      this.serviceId = "";
      this.activeService = null;
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
      this.resetService()
      const services = await getTableData("services", "prio_number", true, "location_id", this.locationId);
      console.log(services);
      
      return services
    },



    setTimeSlots() {
      const service = this.activeService;
    },

    setDurationKey(key: string) {
      this.duration = key;
    },
  },
});

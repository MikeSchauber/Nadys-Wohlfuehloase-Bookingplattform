import type { Service } from "@/interfaces/interfaces";
import { getTableData } from "@/services/databaseService";
import { defineStore } from "pinia";
export const useBookingStore = defineStore("booking", {
  state: () => ({
    loading: false,
    serviceId: "",
    serviceObject: null as Service | null,
    locationId: "",
    serviceDurations: [] as { key: string; value: number }[],
    durationKey: "",
  }),
  getters: {},
  actions: {
    async setLocationId(id: string) {
      this.locationId = id;
      if (this.locationId) await this.getServicesByLocation();
    },

    setService(service: Service) {
      this.serviceId = service.id;
      this.serviceObject = service;
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
      const services = await getTableData("services", "prio_number", true, "location_id", this.locationId);
      const parsedServices = this.parseDurationsToArrays(services)
      return parsedServices
    },

    parseDurationsToArrays(services: Service[]) {
      services.forEach(element => {
        const durationAsArray = Object.values(element.duration)
        element.duration = durationAsArray
      });
      return services
    },

    setTimeSlots() {
      const service = this.serviceObject;
    },

    setDurationKey(key: string) {
      this.durationKey = key;
    },
  },
});

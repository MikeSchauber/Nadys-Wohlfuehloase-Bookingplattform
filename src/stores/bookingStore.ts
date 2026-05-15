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
      return await getTableData("services", "prio_number", true, "location_id", this.locationId);
    },

    setTimeSlots() {
      const service = this.serviceObject;
      console.log(service);

      if (!service) return;

      this.serviceDurations = Object.keys(service.duration).map((key) => ({
        key,
        value: service.duration[key],
      }));

      console.log(this.serviceDurations);
    },

    setDurationKey(key: string) {
      this.durationKey = key;
      console.log(this.durationKey);
    },
  },
});

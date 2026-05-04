import type { Service } from "@/interfaces/interfaces";
import { getTableData } from "@/services/databaseService";
import { defineStore } from "pinia";
export const useBookingStore = defineStore("booking", {
  state: () => ({
    loading: false,
    serviceId: "",
    serviceObject: null as Service | null,
    locationId: "",
    serviceDurations: [],
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
      this.locationId = locations[0].id;

      return locations;
    },

    async getServicesByLocation() {
      return await getTableData("services", "prio_number", true, "location_id", this.locationId);
    },

    setTimeSlots() {
      let result = null;
      if (this.serviceObject) {
        result = Object.keys(this.serviceObject.duration).map((key) => ({
          key,
          value: this.serviceObject?.duration[key],
        }));
      }
      console.log(result);
    },
  },
});

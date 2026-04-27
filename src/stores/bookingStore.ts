import { getTableData } from "@/services/databaseService";
import { defineStore } from "pinia";
export const useBookingStore = defineStore("booking", {
  state: () => ({
    loading: false,
    service: "",
    locationId: "",
  }),
  getters: {},
  actions: {
    async setLocationId(id: string) {
      this.locationId = id;
      if (this.locationId) await this.getServicesByLocation();
    },

    setService(service: string) {
      this.service = service;
    },

    loadingAvailable() {
      this.loading = true;
    },

    loadingDisabled() {
      this.loading = false;
    },

    async getLocations() {
      const locations = await getTableData("locations", "prio_number", true);
      this.locationId = locations[0].id;
      console.log(locations);

      return locations;
    },

    async getServicesByLocation() {
      return await getTableData("services", "prio_number", true, "location_id", this.locationId);
    },
  },
});

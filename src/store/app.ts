// Utilities
import apiService from "@/services/api";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isDarkMode: localStorage.getItem("darkMode") === "true", // Convert to boolean
    originalLink: "",
    linkCustomization: "",
    outputLink: "",
    preparedLink: "",
    baseLink: process.env.VUE_APP_URL,
    machineStates: {
      linkMachineWorking: false,
      snapMachineWorking: false,
      snapMachineWaiting: false,
      snapMachineDone: false,
      linkTrayWorking: false,
    },
  }),
  actions: {
    toggleDarkMode() {
      // Toggle dark mode state
      this.isDarkMode = !this.isDarkMode;

      // Persist the dark mode setting in local storage
      localStorage.setItem("darkMode", this.isDarkMode.toString());
    },
    resetMachineStates() {
      this.machineStates.linkMachineWorking = false;
      this.machineStates.snapMachineDone = false;
      this.machineStates.snapMachineWorking = false;
      this.machineStates.snapMachineWaiting = false;
      this.machineStates.linkTrayWorking = false;
    },
    startLinkMachine() {
      this.resetMachineStates();
      this.machineStates.linkMachineWorking = true;
      setTimeout(() => {
        this.machineStates.linkMachineWorking = false;
        this.machineStates.snapMachineWaiting = true;
      }, 5200);
    },
    startSnapMachine() {
      this.machineStates.snapMachineWorking = true;
      this.machineStates.snapMachineDone = false;
      setTimeout(() => {
        this.machineStates.snapMachineWorking = false;
        this.machineStates.snapMachineDone = true;
      }, 5200);
    },
    startLinkTray() {
      this.machineStates.linkTrayWorking = true;
    },
    async shortenRequest() {
      try {
        if (this.preparedLink) {
          const res = await apiService.shortenLink(
            this.preparedLink,
            this.linkCustomization
          );
          this.outputLink = res;
          return res;
        }
      } catch (error: any) {
        throw new Error(error.response.data.error as string);
      }
    },
    async prepareLink(originalLink: string) {
      this.originalLink = originalLink;
      try {
        const res = await apiService.prepareLink(this.originalLink);
        this.preparedLink = res;
        return res;
      } catch (error: any) {
        throw new Error(error.response.data.error as string);
      }
    },
  },
  getters: {
    // Add a getter to access the dark mode setting
    getDarkMode: (state) => state.isDarkMode,
  },
});

// Utilities
import apiService from "@/services/api";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isDarkMode: localStorage.getItem("darkMode") === "true", // Convert to boolean
    originalLink: "www.google.com",
    linkCustomization: "",
    outputLink: "",
    machineStates: {
      linkMachineWorking: false,
      snapMachineWorking: false,
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
      this.machineStates.linkMachineWorking = true;
      this.machineStates.snapMachineDone = false;
      this.machineStates.snapMachineWorking = false;
      this.machineStates.linkTrayWorking = false;
    },
    startLinkMachine() {
      this.resetMachineStates();
      setTimeout(() => {
        this.machineStates.linkMachineWorking = false;
        this.startSnapMachine();
      }, 5200);
    },
    startSnapMachine() {
      this.machineStates.snapMachineWorking = true;
      this.machineStates.snapMachineDone = false;
      setTimeout(() => {
        this.machineStates.snapMachineWorking = false;
        this.machineStates.snapMachineDone = true;
        this.startLinkTray();
      }, 5200);
    },
    startLinkTray() {
      this.machineStates.linkTrayWorking = true;
    },
    async shortenRequest() {
      if (this.originalLink)
        return await apiService.shortenLink(this.originalLink, this.linkCustomization);
      
    },
  },
  getters: {
    // Add a getter to access the dark mode setting
    getDarkMode: (state) => state.isDarkMode,
  },
});

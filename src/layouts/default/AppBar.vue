<template>
  <v-app-bar
    app
    :class="mobile ? 'custom-padding-sm' : 'custom-padding'"
    class="elevation-0"
    color="transparent"
  >
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon @click="toggleDarkMode">
        <v-icon>{{
          isDarkMode ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent"
        }}</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const appStore = useAppStore();

const { mobile } = useDisplay();
const isDarkMode = computed(() => appStore.getDarkMode);

const toggleDarkMode = () => {
  appStore.toggleDarkMode();
};
</script>

<style lang="scss" scoped>
.custom-padding {
  padding-inline-start: 20% !important;
  padding-inline-end: 20% !important;
}
.custom-padding-sm {
  padding-inline-start: 5% !important;
  padding-inline-end: 5% !important;
}
</style>

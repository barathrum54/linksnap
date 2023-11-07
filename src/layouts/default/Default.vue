<template>
  <v-app>
    <v-theme-provider :theme="theme">
      <default-bar />
      <v-container class="container" :class="mobile ? '' : 'custom-padding-sm'">
        <default-view />
      </v-container>
    </v-theme-provider>
  </v-app>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify/lib/framework.mjs";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const { mobile } = useDisplay();

const theme = computed(() => (appStore.isDarkMode ? "dark" : "light"));
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
.container {
  min-height: 100vh;
}
</style>

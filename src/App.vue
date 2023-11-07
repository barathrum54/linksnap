<template>
  <SplashScreen :timeout="7500" v-if="splashVisible" />
  <router-view />
</template>

<script lang="ts" setup>
import SplashScreen from "@/components/SplashScreen.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const router = useRoute();
const splashVisible = computed(() => {
  if (router.name != "Home") return false;
  return true;
});
</script>
<style>
/* ===== Scrollbar CSS ===== */
/* Firefox */
body {
  height: 100vh;
  overflow-y: hidden;
}
* {
  scrollbar-width: auto;
  scrollbar-color: #8f54a0 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 0px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #8f54a0;
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>

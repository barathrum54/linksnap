<template>
  <div class="splash-screen" v-if="show">
    <img
      src="@/assets/logo.png"
      style="object-fit: contain; width: 100%; max-width: 300px"
      alt=""
    />
    <div></div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  timeout: {
    type: Number,
    required: true,
  },
});

const show = ref(true);

setTimeout(() => {
  show.value = false;
}, props.timeout);
</script>

<style scoped lang="scss">
.splash-screen {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  animation: slideOpen 1s forwards linear;
  background-color: transparent;
  animation-delay: 6s;
  img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    object-fit: contain;
    animation: logoFadeOut 0.5s forwards linear;
    animation-delay: 5.5s;
  }
  div {
    width: 50%;
    height: 100%;
    background-color: #0078d4;
  }
  div:nth-of-type(2) {
    background-color: #ffd700;
  }

  @keyframes logoFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes slideOpen {
    0% {
      gap: 0;
    }
    100% {
      gap: 100%;
    }
  }
}
</style>

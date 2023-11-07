<template>
  <div :class="['link-tray-wrapper', isLinkTrayWorking && 'on']">
    <div class="tray-structure">
      <div class="tray-base"></div>
    </div>
    <div class="link-path">
      <div class="link-container">
        <span> www.google.com </span>
      </div>
    </div>
    <div class="end-structure"></div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const isLinkTrayWorking = computed(() => {
  const state = appStore.machineStates.linkTrayWorking;
  console.log(state);
  return state;
});
</script>

<style scoped lang="scss">
.link-tray-wrapper {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
  &.on > .link-path .link-container {
    animation: moveRight 5s linear 1 forwards;
  }
  .tray-structure {
    width: 100%;
    height: 50%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      283deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(82, 82, 82, 1) 42%,
      rgba(63, 63, 63, 1) 63%,
      rgba(70, 70, 70, 1) 76%,
      rgba(38, 38, 38, 1) 100%
    );
    box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    position: relative;
    .tray-base {
      width: 100%;
      height: 10px;
      background-color: rgb(71, 71, 71);
    }
  }
  .end-structure {
    height: 100%;
    width: 30px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(70, 70, 70, 1) 76%,
      rgba(38, 38, 38, 1) 100%
    );
    box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px 10px 0px 0px;
  }
  .link-path {
    width: 90%;
    height: max-content;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    bottom: 40%;
    .link-container {
      padding: 5px 10px;
      z-index: 0;
      width: fit-content;
      transform: translate(-100%, -80%);
      @keyframes moveRight {
        0% {
          transform: translate(-50%, -80%); /* Starting position */
        }
        15% {
          transform-origin: 5% 5%;
          transform: translate(10%, -80%) rotate(10deg);
        }
        16% {
          transform: translate(10%, -25%);
        }

        17% {
          transform: translate(10%, -20%);
        }

        100% {
          transform: translate(30%, -20%); /* Ending position */
        }
      }
      span {
        font-weight: 700;
        font-size: 2vw;
      }
    }
  }
}
</style>

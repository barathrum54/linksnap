<template>
  <div :class="['link-machine-wrapper', isWorking ? 'on' : 'off']">
    <div class="structure-1">
      <div class="structure-door"></div>
    </div>
    <div class="link-path">
      <div class="link-container" v-if="link">
        <span> {{ link }}</span>
      </div>
    </div>
    <div class="structure-2"></div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();

const link = computed(() => appStore.originalLink || "qeqwew");
const isWorking = computed(() => {
  return appStore.machineStates.linkMachineWorking;
});
</script>

<style scoped lang="scss">
.link-machine-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  &.on .link-path {
    animation: moveRight 5s linear 1 forwards;
  }
  &.on .structure-1 .structure-door {
    animation: openDoor 3s linear 1 forwards;
  }

  .structure-1 {
    height: 80%;
    width: 50%;
    margin-left: -30%;
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
    position: relative;
    z-index: 3 !important;

    .structure-door {
      position: absolute;
      right: 0;
      width: 20px;
      height: 100%;
      background-color: black;
      border-radius: 30px 30px 30px 0px;

      z-index: 2;
      transform-origin: 10px 10px; /* Set the hinge point to the top right */
      @keyframes openDoor {
        0% {
          transform: rotate(0deg); /* Starting position, no rotation */
        }
        30% {
          transform: rotate(-60deg); /* Ending position, fully rotated */
        }
        90% {
          transform: rotate(-60deg); /* Ending position, fully rotated */
        }
        100% {
          transform: rotate(0deg);
        }
      }
      &::after {
        position: absolute;
        content: "";
        width: 10px;
        height: 10px;
        background-color: rgb(190, 190, 190);
        border-radius: 50%;
        left: 0;
        right: 0;
        top: 2%;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  .link-path {
    width: 100%;
    height: max-content;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    bottom: 20%;
    transform: translateX(-50%);
    overflow: hidden;
    .link-container {
      width: fit-content;
      max-width: 20vw;
      overflow: hidden;
      position: relative;
      padding: 5px 10px;
      z-index: 0;
      text-align: center;
      border: 1pt solid black;
      box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
      background: linear-gradient(
        90deg,
        rgb(167, 167, 167) 0%,
        rgb(103, 103, 103) 76%,
        rgb(167, 167, 167) 100%
      );
      border-radius: 5px;

      span {
        font-weight: 700;
        font-size: 2vw;
      }
    }
    @keyframes moveRight {
      0% {
        transform: translateX(-50%); /* Starting position */
      }
      100% {
        transform: translateX(100%); /* Ending position */
      }
    }
  }
  .structure-2 {
    height: 20%;
    width: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(70, 70, 70, 1) 76%,
      rgba(38, 38, 38, 1) 100%
    );
    box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
    position: relative;
  }
}
</style>

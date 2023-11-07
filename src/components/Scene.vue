<template>
  <div class="scene-wrapper">
    <div class="machine">
      <LinkMachine />
      <SnapMachine />
      <LinkTray />
    </div>
    <div class="ground"></div>
  </div>
</template>

<script setup lang="ts">
import LinkTray from "@/components/LinkTray.vue";
import SnapMachine from "@/components/SnapMachine.vue";
import LinkMachine from "@/components/LinkMachine.vue";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const linkMachineState = computed(
  () => appStore.machineStates.linkMachineWorking
);
const startLinkMachine = () => {
  appStore.startLinkMachine();
};
</script>

<style scoped lang="scss">
.scene-wrapper {
  margin-top: 50px;
  display: flex;
  flex-flow: column;
  position: absolute;
  width: 100vw;
  left: 0;
  bottom: 0;
  height: 100%;
  max-height: 35%;
  @media screen and (max-width: 768px) {
    max-height: 15%;
  }

  .machine {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    box-shadow: 1px 25px 12px -14px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 1px 25px 12px -14px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 1px 25px 12px -14px rgba(0, 0, 0, 0.75);
    z-index: 2;
  }
  .ground {
    display: flex;
    width: 100%;
    height: 60%;
    z-index: 1;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(70, 70, 70, 1) 76%,
      rgba(38, 38, 38, 1) 100%
    );
  }
}
</style>

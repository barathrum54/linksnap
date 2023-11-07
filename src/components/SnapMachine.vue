<template>
  <div class="machine-wrapper">
    <div class="structure-1">
      <div class="instruments">
        <div :class="['blinker', blinkerColor]">
          <div class="frame">
            <div class="light"></div>
          </div>
        </div>
        <div class="led-panel">
          <div class="led-frame">
            <span>
              {{ snapMachineText }}
            </span>
          </div>
        </div>
        <div class="progressive-lights">
          <div class="frame">
            <div :class="['light', lightsOn >= 1 && 'on']"></div>
          </div>
          <div class="frame">
            <div :class="['light', lightsOn >= 2 && 'on']"></div>
          </div>
          <div class="frame">
            <div :class="['light', lightsOn == 3 && 'on']"></div>
          </div>
        </div>
      </div>
      <div class="door-left">
        <div class="part"></div>
      </div>
      <div class="door-right">
        <div class="part"></div>
      </div>
      <div
        :class="[
          'gear-box',
          snapMachineState.snapMachineWorking &&
            !snapMachineState.snapMachineDone &&
            'on',
        ]"
      >
        <div class="gear">
          <img src="gear.png" alt="" />
        </div>
        <div class="gear">
          <img src="gear.png" alt="" />
        </div>
        <div class="gear">
          <img src="gear.png" alt="" />
        </div>
        <div class="glass">
          <img src="glass.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { computed } from "vue";

const appStore = useAppStore();
const lightsOn = ref(0);
const blinkerColor = ref("");

const snapMachineText = computed(() => {
  if (snapMachineState.value.snapMachineWorking) {
    setBlinkerColor("yellow");
    return "WORKING";
  }
  if (snapMachineState.value.snapMachineDone) {
    setBlinkerColor("green");
    return "DONE";
  }
  if (snapMachineState.value.snapMachineWaiting) {
    setBlinkerColor("red");
    return "WAITING";
  } else {
    setBlinkerColor("");
    stopLights();
    return "IDLE";
  }
});

const snapMachineState = computed(() => {
  const state = appStore.machineStates;
  if (state.snapMachineWorking) {
    startLights();
  }
  return state;
});
const setBlinkerColor = (color: string) => {
  blinkerColor.value = color;
};
const stopLights = () => {
  lightsOn.value = 0;
};
const startLights = () => {
  let count = 0;
  const intervalId = setInterval(() => {
    if (count < 3) {
      lightsOn.value++;
      count++;
    } else {
      setTimeout(() => {
        clearInterval(intervalId);
      }, 1500);
    }
  }, 1500);
};
</script>

<style lang="scss" scoped>
.machine-wrapper {
  width: 100%;
  height: 120%;
  margin-bottom: -10px;
  z-index: 3;
  .structure-1 {
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      283deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(82, 82, 82, 1) 42%,
      rgba(63, 63, 63, 1) 63%,
      rgba(70, 70, 70, 1) 76%,
      rgba(38, 38, 38, 1) 100%
    );
    border-radius: 20px 20px 10px 10px;
    box-shadow: 4px 20px 12px -9px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 4px 20px 12px -9px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 4px 20px 12px -9px rgba(0, 0, 0, 0.75);
    position: relative;
    .door-left {
      position: absolute;
      left: -0.5%;
      height: 100%;
      width: 10px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding-top: 1%;
      .part {
        width: 50%;
        height: 60%;
        background-color: black;
        border-radius: 50px 50px 0px 0px;
      }
    }
    .door-right {
      position: absolute;
      right: -1%;
      height: 100%;
      width: 15px;
      display: flex;
      justify-content: flex-end;
      padding-top: 1%;
      .part {
        width: 50%;
        height: 50%;
        background-color: black;
        border-radius: 0px 20px 20px 0px;
      }
    }
    .instruments {
      width: 100%;
      height: 20%;
      position: relative;
      display: flex;
      justify-content: space-between;
      padding-block: 3px;
      align-items: center;
      padding-left: 10%;
      padding-right: 10%;
      border-radius: 50px 50px 0px 0px;
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
      .progressive-lights {
        display: flex;
        align-items: center;
        gap: 3px;
        height: 100%;
        width: 35%;
        .frame {
          width: 33%;
          height: 40%;
          border: 1pt solid black;
          border-radius: 5px;
          overflow: hidden;
          position: relative;

          .light {
            width: 100%;
            height: 100%;
            background-color: rgb(168, 168, 168);
            box-shadow: inset 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 5px 9px 24px 0px rgba(0, 0, 0, 0.3);
            &.on {
              background: rgb(64, 148, 0);
              background: linear-gradient(
                180deg,
                rgba(64, 148, 0, 1) 0%,
                rgba(78, 179, 0, 1) 19%,
                rgba(78, 178, 0, 1) 80%,
                rgba(66, 153, 0, 1) 100%
              );
              &::after {
                content: "";
                width: 100%;
                height: 100%;
                z-index: 4;
                background-image: url("glass.png");
                background-size: 150%;
                opacity: 0.5;
                filter: brightness(0.2);
                position: absolute;
              }
            }
          }
        }
      }
      .led-panel {
        display: flex;
        width: 40%;
        height: 100%;
        border: 1pt solid black;
        background-color: black;
        border-radius: 5px;
        justify-self: flex-end;
        .led-frame {
          width: 100%;
          height: 100%;
          color: yellow;
          filter: contrast(0.4);
          font-weight: 900;
          font-size: 1vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          &::after {
            content: "";
            width: 104%;
            border: 5px;
            height: 100%;
            z-index: 4;
            background-image: url("glass.png");
            background-size: 150%;
            background-position: 100% 80%;
            opacity: 0.5;
            filter: brightness(0.5);
            position: absolute;
          }
        }
      }
      .blinker {
        height: 20px;
        border-radius: 50%;
        background-color: rgb(78, 78, 78);
        z-index: 2;

        .light {
          border-radius: 50%;
          height: 14px;
          width: 14px;
          animation: blinkerAnimation 1s infinite;
          animation-play-state: running; /* By default, the animation is running */
          position: absolute;
          transition: opacity 0.1s ease-in-out;
          z-index: 2;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        .frame {
          border-radius: 50%;
          width: 20px;
          height: 20px;
          position: relative;
          border: 2pt solid black;
          &::after {
            content: "";
            width: 100%;
            height: 100%;
            z-index: 4;
            background-image: url("glass.png");
            background-size: 200%;
            background-position: 100% 100%;
            opacity: 0.5;
            filter: brightness(0.2);
            position: absolute;
          }
        }
        &.yellow > .frame .light {
          background-color: yellow;
        }
        &.green > .frame .light {
          background-color: #66ff00;
        }
        &.red > .frame .light {
          background-color: red;
        }

        @keyframes blinkerAnimation {
          0% {
            opacity: 0;
          }
          49% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          99% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }
    .gear-box {
      border: 2pt solid black;
      border-radius: 10px;
      background-color: rgb(94, 94, 94);
      overflow: hidden;
      z-index: 4;
      width: 30%;
      height: 40%;
      position: absolute;
      top: 0;
      right: 10%;
      bottom: 0;
      margin: auto;
      box-shadow: 10px 10px 19px 0px rgba(0, 0, 0, 0.75) inset;
      -webkit-box-shadow: 10px 10px 19px 0px rgba(0, 0, 0, 0.75) inset;
      -moz-box-shadow: 10px 10px 19px 0px rgba(0, 0, 0, 0.75) inset;
      &.on > .gear img {
        animation: gearRotate linear infinite;
      }
      .glass {
        position: absolute;
        display: flex;
        width: 120%;
        height: 100%;
        margin-left: -5%;
        z-index: 5;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
        }
      }
      .gear {
        position: absolute;
        img {
          object-fit: contain;
          height: 75px;
          width: 75px;
          animation-duration: 1s;
        }
        @keyframes gearRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
      .gear:nth-of-type(1) {
        right: -25px;
        top: -40px;
        z-index: 3;
        filter: brightness(0.4);

        img {
          animation-duration: 1s !important;
        }
      }
      .gear:nth-of-type(2) {
        right: 0px;
        bottom: -45px;
        z-index: 3;
        filter: brightness(0.6);

        img {
          height: 100px;
          width: 100px;
          animation-duration: 3s;
        }
      }
      .gear:nth-of-type(3) {
        right: 0px;
        bottom: -45px;
        z-index: 2;
        img {
          height: 150px;
          width: 150px;
          filter: brightness(0.4);
          opacity: 0.7;
          animation-duration: 5s;
        }
      }
    }
  }
}
</style>

<template>
  <v-row class="shortener-panel-wrapper">
    <v-col class="d-flex justify-center align-center" cols="12" lg="12">
      <img
        src="@/assets/logo.png"
        style="width: 100%; max-width: 500px; object-fit: contain"
        alt=""
      />
    </v-col>

    <v-col cols="12" lg="6">
      <v-card class="py-3 px-5" style="width: 100%; opacity: 0.8">
        <v-row>
          <v-col>
            <v-alert v-if="errorText" type="error" outlined>
              {{ errorText }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center w-100" v-if="currentStep === 1">
          <v-col>
            <!-- Wizard Step 1: Original Link -->
            <v-form @submit.prevent="processLinkStep1">
              <v-card-title class="headline"
                >1-) Enter the URL you want to snap.</v-card-title
              >
              <v-card-subtitle class="headline"
                >*This could be in any format as long as you are putting
                extension end of it. Such as "myurl.com" "www.url.com".
              </v-card-subtitle>
              <v-text-field
                :disabled="isLoading"
                v-model="originalLink"
                label="Enter URL..."
                outlined
                class="my-4"
                @input="resetErrorText"
                :rules="[(value) => !!value || 'Required']"
                immediate
              ></v-text-field>

              <v-btn
                color="primary"
                type="submit"
                :disabled="isButtonDisabled || isLoading"
              >
                {{ isLoading ? "Loading..." : "SNAP IT" }}
              </v-btn>
            </v-form>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center w-100" v-if="currentStep === 2">
          <v-col>
            <!-- Wizard Step 2: Options -->
            <v-card-title class="headline"
              >2-) Make your link easier than random strings.</v-card-title
            >
            <v-card-subtitle class="headline"
              >Your link will be: https://linksnap-theta.vercel.app/{{
                customizedLink || shortenedLink
              }}</v-card-subtitle
            >
            <v-card-text>
              <v-text-field
                :disabled="isLoading"
                v-model="customizedLink"
                label="Customize Link"
                outlined
                class="mb-4"
                :rules="[
                  (value) =>
                    !/\s/.test(value) || 'Do not use spaces in customization.',
                ]"
              ></v-text-field>
              <v-row style="padding-left: 10px; gap: 20px">
                <v-btn @click="applyOptions" :disabled="isLoading">
                  START
                </v-btn>
                <v-btn @click="openSkipDialog" :disabled="isLoading">
                  Skip
                </v-btn>
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  size="20"
                ></v-progress-circular>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- Wizard Step 3: Shortened Link -->
        <v-row class="d-flex justify-center w-100" v-if="currentStep === 3">
          <v-col class="text-center">
            <v-card-title class="headline"
              >Here is your snapped link</v-card-title
            >
            <v-card-text>
              <h1>
                <v-btn @click="outputLinkClickAction">{{ outputLink }}</v-btn>
              </h1>
            </v-card-text>
            <v-row>
              <v-col class="d-flex justify-center">
                <div class="share-wrapper">
                  <v-btn @click="copyToClipboard">Copy to clipboard</v-btn>
                  <v-btn @click="startOver">Create Another</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-dialog v-model="skipDialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Skip Options</v-card-title>
          <v-card-text>
            <p>
              If you skip custom link option, your link will appear as
              <b>{{ outputLink }}</b>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeSkipDialog">Cancel</v-btn>
            <v-btn @click="skipOptions">Skip</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const originalLink = ref("");
const shortenedLink = ref("");
const outputLink = computed(() => {
  const generatedLink = customizedLink.value || shortenedLink.value;
  return store.baseLink + "/" + generatedLink;
});
const customizedLink = ref("");
const currentStep = ref(1);
const isLoading = ref(false);
const store = useAppStore();
const skipDialog = ref(false);
const router = useRouter();
const errorText = ref("");
const outputLinkClickAction = () => {
  router.push(customizedLink.value || shortenedLink.value);
};

const openSkipDialog = () => {
  skipDialog.value = true;
};
const resetErrorText = () => {
  errorText.value = ""; // Reset the error text when the user starts typing
};
const closeSkipDialog = () => {
  skipDialog.value = false;
};
const isButtonDisabled = computed(() => isLoading.value);
const isCustomizationDisabled = computed(
  () => isLoading.value || currentStep.value !== 2
);

const startOver = () => {
  originalLink.value = "";
  shortenedLink.value = "";
  customizedLink.value = "";
  currentStep.value = 1;

  store.resetMachineStates();
};
const copyToClipboard = () => {
  navigator.clipboard.writeText(shortenedLink.value);
};
const processLinkStep1 = async () => {
  // Simulate loading
  isLoading.value = true;

  try {
    if (currentStep.value != 1) {
      return false;
    }
    const prepareLink = await store.prepareLink(originalLink.value);
    if (prepareLink) {
      shortenedLink.value = prepareLink;
      store.startLinkMachine();
      setTimeout(() => {
        isLoading.value = false;
        currentStep.value = 2;
      }, 5000);
    } else {
      isLoading.value = false;
      originalLink.value = "";
    }
  } catch (error: any) {
    isLoading.value = false;
    console.log(error);
    errorText.value = error;
  }
};

const applyOptions = async () => {
  // Simulate loading for applying options

  try {
    errorText.value = "";
    isLoading.value = true;
    store.linkCustomization = customizedLink.value;
    const shortenLink = await store.shortenRequest();
    store.startSnapMachine();
    setTimeout(() => {
      if (shortenLink) {
        store.startLinkTray();

        currentStep.value = 3;
        isLoading.value = false;
      }
    }, 4000);
  } catch (error: any) {
    isLoading.value = false;
    console.log(error);

    errorText.value = error;
  }
  console.log(customizedLink.value);
};

const skipOptions = async () => {
  skipDialog.value = false;
  isLoading.value = true;
  store.startSnapMachine();
  const shortenLink = await store.shortenRequest();

  setTimeout(() => {
    if (shortenLink) {
      store.startLinkTray();
      currentStep.value = 3;
      isLoading.value = false;
    }
  }, 5200);
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.mt-4 {
  margin-top: 1rem;
}
.shortener-panel-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 2 !important;
  position: relative;
  margin-top: -50px;
}
.share-wrapper {
  display: flex;
  gap: 10px;
}
</style>

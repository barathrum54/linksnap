<template>
  <v-row class="shortener-panel-wrapper">
    <v-col>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <img
            style="width: 100%; max-height: 150px; object-fit: contain"
            src="logo.png"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center" v-if="currentStep === 1">
        <v-col cols="12" lg="6">
          <!-- Wizard Step 1: Original Link -->
          <v-form @submit.prevent="processLinkStep1">
            <v-card-title class="headline"
              >1-) Enter the URL you want to snap.</v-card-title
            >
            <v-card-subtitle class="headline"
              >*This could be in any format as long as you are putting extension
              end of it. Such as "myurl.com" "www.url.com".
            </v-card-subtitle>
            <v-text-field
              v-model="originalLink"
              label="Enter URL..."
              outlined
              class="my-4"
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

      <v-row class="d-flex justify-center">
        <v-col cols="12" lg="6" v-if="currentStep === 2">
          <!-- Wizard Step 2: Options -->
          <v-form @submit.prevent="processLinkStep1">
            <v-card-title class="headline"
              >2-) Make your link easier than random strings.</v-card-title
            >
            <v-card-subtitle class="headline"
              >Your link will be: www.linksnap.com/{{
                customizedLink
              }}</v-card-subtitle
            >
            <v-card-text>
              <v-text-field
                v-model="customizedLink"
                label="Customize Link"
                outlined
                class="mb-4"
                :disabled="isCustomizationDisabled || isLoading"
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
          </v-form>
        </v-col>
      </v-row>

      <!-- Wizard Step 3: Shortened Link -->
      <section v-if="currentStep === 3" class="mt-4" fill-height fluid>
        <v-card-title class="headline">Shortened Link</v-card-title>
        <v-card-text>
          <div class="subtitle-1">{{ shortenedLink }}</div>
        </v-card-text>
      </section>
      <v-dialog v-model="skipDialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Skip Options</v-card-title>
          <v-card-text>
            <p>
              If you skip custom link option, your link will appear as
              <b>{{ shortenedLink }}</b>
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
import { ref, computed } from "vue";

const originalLink = ref("");
const shortenedLink = ref("");
const customizedLink = ref("");
const currentStep = ref(1);
const isLoading = ref(false);

const skipDialog = ref(false);

const openSkipDialog = () => {
  skipDialog.value = true;
};

const closeSkipDialog = () => {
  skipDialog.value = false;
};
const isButtonDisabled = computed(
  () =>
    isLoading.value || (currentStep.value === 1 && originalLink.value === "")
);
const isCustomizationDisabled = computed(
  () => isLoading.value || currentStep.value !== 2
);

const processLinkStep1 = async () => {
  // Simulate loading
  isLoading.value = true;

  // Simulate API call to shorten link
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Replace with your actual logic to shorten the link
  shortenedLink.value = "YourShortenedLinkHere";

  // Reset loading state and move to the next step
  isLoading.value = false;
  currentStep.value = 2;
};

const applyOptions = async () => {
  // Simulate loading for applying options
  isLoading.value = true;

  // Simulate API call to apply options
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Your actual logic for applying options here
  // Move to the final step
  currentStep.value = 3;
  isLoading.value = false;
};

const skipOptions = async () => {
  // Simulate loading for skipping options
  isLoading.value = true;

  skipDialog.value = false;
  // Simulate API call to skip options
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Your actual logic for skipping options here
  // Move to the final step
  currentStep.value = 3;
  isLoading.value = false;
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
  z-index: 2 !important;
  position: relative;
}
</style>

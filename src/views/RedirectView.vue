<template>
  <div>Redirecting...</div>
</template>

<script lang="ts" setup>
import apiService from "@/services/api";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Import the useRoute and useRouter composability functions

const route = useRoute(); // Access the current route
const router = useRouter();
onMounted(async () => {
  const linkParameter = route.params.linkParameter; // Get the value of the "linkParameter" route parameter
  const res = await apiService.getRedirectLink(linkParameter as string); // Pass the parameter to the API service
  console.log(res);
  if (res) {
    // Check if the response has a "url" property
    window.location.href = res; // Redirect to the external URL
  } else {
    router.push("/");
    console.error("Invalid redirect response:", res);
  }
});
</script>

<script setup lang="ts">
import { ref } from "vue";

chrome.tabs.query({ active: true, currentWindow: true }, ([res]) => {
  if (res && res.url.startsWith(import.meta.env.VITE_URL_PATH)) {
    if (res && res.id) {
      console.log("sending");
      chrome.tabs.sendMessage(res.id, "clicked-action-button");
    }
  }
});
</script>

<template>
  <main>
    <div class="flex text-lg justify-center p-2">
      This website is not supported
    </div>
  </main>
</template>

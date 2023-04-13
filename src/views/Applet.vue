<script setup lang="ts">
const printDocument = () => {
  window.print();
};
</script>

<template>
  <main class="h-full w-screen">
    <div class="flex h-16 justify-between bg-black print:hidden">
      <div class="ml-10 flex h-full w-full items-center">
        <router-link to="/" class="text-2xl text-white">
          DMV Receipt Generator
        </router-link>
      </div>
      <div class="mr-20 flex h-full items-center">
        <router-link class="mx-1 flex h-full w-fit items-center justify-center px-3 text-2xl text-white hover:bg-sky-700"
          to="/"><font-awesome-icon icon="fa-folder-open" /></router-link>
        <div @click="printDocument"
          class="mx-1 flex h-full w-fit cursor-pointer items-center justify-center px-3 text-2xl text-white hover:bg-sky-700">
          <font-awesome-icon icon="fa-print" />
        </div>
      </div>
    </div>
    <Suspense>
      <router-view />
    </Suspense>
  </main>
</template>

<style scoped>
main {
  font-family: "Open Sans", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}
</style>

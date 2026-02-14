<script setup lang="ts">
const copied = ref(false);

const copySite = async () => {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1300);
  } catch {
    copied.value = false;
  }
};
</script>

<template>
  <header class="flex justify-between gap-4 text-xs items-center">
    <!-- brand -->
    <div class="flex items-center gap-2">
      <NuxtLink to="/">{{ SITE_NAME }}</NuxtLink>
      <button class="btn btn-secondary-2 px-2 py-0.5 rounded-full" @click="copySite">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>

    <!-- social -->
    <SocialLinks />
  </header>
</template>

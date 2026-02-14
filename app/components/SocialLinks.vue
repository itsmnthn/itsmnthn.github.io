<script lang="ts" setup>
  import { LINKEDIN_URL, X_URL, GITHUB_URL } from '~/utils/constants';

  const socialItems = [
    { name: "LinkedIn", url: LINKEDIN_URL },
    { name: "Twitter", url: X_URL },
    { name: "GitHub", url: GITHUB_URL },
  ];
</script>

<template>
  <nav class="flex items-center gap-2" aria-label="Social links">
    <template v-for="(item, idx) in socialItems" :key="item.name">
      <NuxtLink class="text-inherit no-underline" :to="item.url" external rel="noopener noreferrer" target="_blank">
        {{ item.name }}
      </NuxtLink>
      <span v-if="idx !== socialItems.length - 1">/</span>
    </template>
  </nav>
</template>

<style scoped></style>

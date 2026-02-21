<script lang="ts" setup>
import { LINKEDIN_URL, X_URL, GITHUB_URL } from "~/utils/constants";

const socialItems = [
  { name: "LinkedIn", url: LINKEDIN_URL, icon: "mdi:linkedin" },
  { name: "Twitter", url: X_URL, icon: "mdi:twitter" },
  { name: "GitHub", url: GITHUB_URL, icon: "mdi:github" },
];
</script>

<template>
  <nav class="flex items-center gap-2" aria-label="Social links">
    <template v-for="(item, idx) in socialItems" :key="item.name">
      <NuxtLink
        class="i-flex-ic-jc gap-2 text-zinc-700/80 hover:text-zinc-900"
        :to="item.url"
        :aria-label="item.name"
        :title="item.name"
        external
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon :name="item.icon" aria-hidden="true" class="size-4 inline-block sm:hidden!" />
        <span class="hidden sm:inline">{{ item.name }}</span>
      </NuxtLink>
      <span v-if="idx !== socialItems.length - 1">/</span>
    </template>
  </nav>
</template>

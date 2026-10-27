<script lang="ts" setup>
import { LINKEDIN_URL, X_URL, GITHUB_URL } from "~/utils/constants";

const linkItems = [
  { name: "Resume", url: "/resume", icon: "lucide:file-user" },
  { name: "LinkedIn", url: LINKEDIN_URL, icon: "mdi:linkedin" },
  { name: "X", url: X_URL, icon: "simple-icons:x" },
  { name: "GitHub", url: GITHUB_URL, icon: "mdi:github" },
];
</script>

<template>
  <nav class="flex items-center gap-2" aria-label="Links">
    <template v-for="(item, idx) in linkItems" :key="item.name">
      <!-- NuxtLink opens absolute URLs in a new tab with rel="noopener noreferrer"; /resume stays in-app -->
      <NuxtLink
        class="i-flex-ic-jc gap-2 text-zinc-700/80 hover:text-zinc-900"
        :to="item.url"
        :aria-label="item.name"
        :title="item.name"
        :target="item.url.startsWith('/') ? undefined : '_blank'"
      >
        <Icon :name="item.icon" aria-hidden="true" class="size-4 inline-block sm:hidden!" />
        <span class="hidden sm:inline">{{ item.name }}</span>
      </NuxtLink>
      <span v-if="idx !== linkItems.length - 1">/</span>
    </template>
  </nav>
</template>

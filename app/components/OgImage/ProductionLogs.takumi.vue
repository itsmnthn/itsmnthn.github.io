<script setup lang="ts">
// share image for /production-logs with the latest logs pinned, see pages/production-logs/index.vue
defineProps<{
  logs: { title: string; date: string; number: string; accent: string }[];
}>();

// fixed spots and a max note height, so the layout is the same whatever the titles are; notes may overlap.
// newest top left, then top right, then the third in front between them, all 3rem from the card edges
const spots = ["top-12 right-72 -rotate-6", "top-24 right-12 rotate-3", "bottom-12 right-40 -rotate-2"];
</script>

<template>
  <div class="flex size-full bg-gray_alabaster p-6 font-body text-zinc-900">
    <div class="relative flex size-full overflow-hidden rounded-5xl border-2 border-white bg-white_smoke">
      <div class="flex w-xl flex-col py-12 pl-16">
        <div class="flex items-center gap-4">
          <img src="/itsmnthn-avatar-224.webp" alt="" class="size-16 rounded-full border-4 border-white" />
          <div class="flex flex-col">
            <span class="font-heading text-2xl font-bold">itsmnthn.dev</span>
            <span class="text-lg text-zinc-500">Manthankumar Satani</span>
          </div>
        </div>
        <h1 class="mt-10 flex flex-col font-heading font-extrabold tracking-tight">
          <span class="text-4xl text-zinc-500">The</span>
          <span class="mt-1 text-6xl">Production Logs</span>
        </h1>
        <p class="mt-5 flex flex-col text-2xl/relaxed text-zinc-600">
          <span>A collection of insights gathered from</span>
          <span>the front lines of product development</span>
        </p>
        <div class="mt-auto flex">
          <span class="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-lg font-semibold text-white">
            <!-- loose text next to the svg is dropped by the renderer in dev, so it gets its own span -->
            <span>Read the logs</span>
            <!-- lucide:arrow-up-right, the text arrow renders as an emoji -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="size-5">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </span>
        </div>
      </div>
      <OgPinNote
        v-for="(log, index) in logs.slice(0, 3)"
        :key="log.number"
        :accent="log.accent"
        class="absolute max-h-80 w-64"
        :class="spots[index]"
      >
        <span class="shrink-0 font-script text-5xl" :style="{ color: log.accent }">{{ log.number }}</span>
        <span class="mt-2 line-clamp-3 min-h-0 overflow-hidden font-heading text-2xl font-bold tracking-tight">{{
          log.title
        }}</span>
        <span class="mt-3 shrink-0 text-base text-zinc-600">{{ log.date }}</span>
      </OgPinNote>
    </div>
  </div>
</template>

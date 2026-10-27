<script setup lang="ts">
// share image for a production log, see defineOgImage in pages/production-logs/[...slug].vue
defineProps<{
  title: string;
  description: string;
  date: string;
  categories: string[];
  number: string;
  accent: string;
}>();
</script>

<template>
  <div class="flex size-full bg-gray_alabaster p-6 font-body text-zinc-900">
    <div class="flex size-full rounded-5xl border-2 border-white bg-white_smoke">
      <div class="flex flex-1 flex-col py-12 pr-10 pl-16">
        <div class="flex items-center gap-4">
          <img src="/itsmnthn-avatar-224.webp" alt="" class="size-16 rounded-full border-4 border-white" />
          <div class="flex flex-col">
            <span class="font-heading text-2xl font-bold">itsmnthn.dev</span>
            <span class="text-lg text-zinc-500">The Production Log</span>
          </div>
        </div>
        <h1
          class="mt-10 font-heading font-extrabold tracking-tight text-balance"
          :class="title.length > 40 ? 'text-5xl' : 'text-6xl'"
        >
          {{ title }}
        </h1>
        <p class="mt-5 line-clamp-3 text-2xl/relaxed text-zinc-600">{{ description }}</p>
        <div class="mt-auto flex items-center gap-3 text-xl font-semibold text-zinc-600">
          <span>{{ date }}</span>
          <span v-for="tag in categories" :key="tag" class="rounded-full bg-white px-4 py-1.5 text-lg">
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="flex w-80 shrink-0 items-center">
        <OgPinNote :accent="accent" class="w-56 rotate-6">
          <!-- the script font leans right, so the number sits a little left of true center to look centered -->
          <span class="flex h-40 items-center justify-center pr-4 font-script text-8xl" :style="{ color: accent }">
            {{ number }}
          </span>
        </OgPinNote>
      </div>
    </div>
  </div>
</template>

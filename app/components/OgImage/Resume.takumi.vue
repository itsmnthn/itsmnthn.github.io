<script setup lang="ts">
// share image for /resume, see pages/resume.vue
defineProps<{
  yearsOfExperience: number;
}>();

const logos = [
  { src: "/moar-market-dark.svg", class: "h-6" },
  { src: "/hubble-exchange-dark.svg", class: "h-9" },
  { src: "/defidollar-dark.svg", class: "h-6" },
  { src: "/polygon-technology-dark.svg", class: "h-6" },
];
// skeleton lines of the pinned résumé, `null` is a section gap
const lines = ["w-11/12", "w-3/4", "w-5/6", "w-3/5", null, "w-11/12", "w-4/5", "w-2/3", null, "w-5/6", "w-3/5"];
</script>

<template>
  <div class="flex size-full bg-gray_alabaster p-6 font-body text-zinc-900">
    <div class="flex size-full rounded-5xl border-2 border-white bg-white_smoke">
      <div class="flex flex-1 flex-col py-12 pl-16">
        <div class="flex items-center gap-4">
          <img src="/itsmnthn-avatar-224.webp" alt="" class="size-16 rounded-full border-4 border-white" />
          <div class="flex flex-col">
            <span class="font-heading text-2xl font-bold">itsmnthn.dev</span>
            <span class="text-lg text-zinc-500">Resume</span>
          </div>
        </div>
        <h1 class="mt-10 font-heading text-6xl font-extrabold tracking-tight">Manthankumar Satani</h1>
        <p class="mt-5 text-3xl font-semibold text-zinc-700">Full-Stack Engineer &amp; Product Builder</p>
        <p class="mt-2 text-2xl text-zinc-600">
          {{ yearsOfExperience }}+ years shipping DeFi, SaaS and developer tools.
        </p>
        <div class="mt-auto flex items-center gap-7">
          <img v-for="logo in logos" :key="logo.src" :src="logo.src" alt="" class="opacity-80" :class="logo.class" />
        </div>
      </div>
      <div class="flex w-md shrink-0 items-center justify-center">
        <OgPinNote accent="#5956e9" class="w-80 rotate-3">
          <span class="font-heading text-2xl font-bold">itsmnthn</span>
          <span class="mt-1 text-base text-zinc-600">Résumé</span>
          <template v-for="(line, index) in lines" :key="index">
            <div v-if="line" class="mt-3 h-3 rounded-full bg-zinc-200" :class="line" />
            <div v-else class="h-3" />
          </template>
        </OgPinNote>
      </div>
    </div>
  </div>
</template>

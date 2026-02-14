<script setup lang="ts">
  const services = [
    {
      icon: "lucide:server-cog",
      title: "Backend Systems",
      description: "APIs, architecture, integrations, and reliable services.",
    },
    {
      icon: "lucide:monitor-smartphone",
      title: "Web & Mobile",
      description: "Fast, usable interfaces built for real users.",
    },
    {
      icon: "lucide:blocks",
      title: "Web3 Products",
      description: "Dapps, protocol UX, and smart contract integrations.",
    },
    {
      icon: "lucide:rocket",
      title: "Product Delivery",
      description: "From concept to launch, then optimization.",
    },
  ];
</script>

<template>
  <section class="bg-gray_alabaster px-4 py-8 md:px-5 md:py-24" aria-label="Services">
    <h3
      class="mx-auto mt-5 text-balance text-center font-heading font-black text-2xl leading-tight tracking-tight md:text-3xl">
      <span class="block">Your vision expertly crafted into reality</span>
      <span class="block text-zinc-900/80">to create impactful results</span>
    </h3>

    <div class="relative mx-auto max-w-3xl h-px bg-zinc-400/20 my-17">
      <span
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white_smoke px-6 py-2 font-bold text-xs uppercase tracking-widest text-zinc-600">
        Services
      </span>
    </div>

    <ul class="grid list-none grid-cols-2 gap-6 lg:gap-10 md:grid-cols-4 mx-6 lg:mx-32">
      <li v-for="service in services" :key="service.title" class="min-h-32">
        <Icon :name="service.icon" class="text-zinc-700/90 text-xl mb-3" />
        <p class="mb-2 font-black font-heading tracking-tight">{{ service.title }}</p>
        <p class="text-sm leading-relaxed text-zinc-700/80">
          {{ service.description }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  const companies = [
    { img: "/polygon-technology-dark.svg", name: "Polygon", link: "https://polygon.technology" },
    { img: "/moar-market-dark.svg", name: "Moar Market", link: "https://moar.market" },
    { img: "/hexorial-studio-dark.svg", name: "Hexorial Studio", link: "https://hexorial.studio" },
    { img: "/defidollar-dark.svg", name: "DefiDollar", link: "" },
    { img: "/hubble-exchange-dark.svg", name: "Hubble Exchange", link: "" },
  ];
</script>

<template>
  <section class="border border-white_smoke bg-white_smoke px-8 py-10 md:px-16 md:py-24"
    aria-label="Companies I worked with/for">
    <ul class="grid list-none items-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <li v-for="company in companies" :key="company.name">
        <NuxtLink :to="company.link" target="_blank" rel="noopener noreferrer"
          class="flex items-center md:justify-center">
          <img :src="company.img" :alt="company.name" class="h-5 md:h-7 my-auto">
          <!-- {{ company.name }} -->
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

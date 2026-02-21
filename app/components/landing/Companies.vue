<script setup lang="ts">
  const companies = [
    { img: "/polygon-technology-dark.svg", name: "Polygon", link: "https://polygon.technology" },
    { img: "/moar-market-dark.svg", name: "Moar Market", link: "https://moar.market" },
    { img: "/hexorial-studio-dark.svg", name: "Hexorial Studio", link: "https://hexorial.studio" },
    { img: "/defidollar-dark.svg", name: "DefiDollar", link: "https://github.com/defidollar" },
    { img: "/hubble-exchange-dark.svg", name: "Hubble Exchange", link: "https://github.com/hubble-exchange" },
  ];
</script>

<template>
  <section class="border border-white_smoke bg-white_smoke px-8 py-10 md:px-16 md:py-24"
    aria-label="Companies I worked with/for">
    <ul class="flex flex-wrap list-none items-center gap-4 justify-center lg:justify-between">
      <li v-for="company in companies" :key="company.name">
        <NuxtLink :to="company.link" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center">
          <img :src="company.img" :alt="company.name" class="h-5 md:h-7 my-auto" />
          <!-- {{ company.name }} -->
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

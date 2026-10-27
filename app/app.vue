<script setup lang="ts">
const siteDescription = `itsmnthn is a full-stack engineer and product builder with ${getYearsOfExperience()}+ years of experience across DeFi, SaaS, and developer tooling.`;

useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "keywords",
      content: "itsmnthn, portfolio, developer, engineer, product, builder, fullstack",
    },
    { name: "author", content: "itsmnthn" },
    { name: "copyright", content: "itsmnthn" },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});

useSeoMeta({
  title: "Manthankumar Satani · Full-Stack Engineer",
  description: siteDescription,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

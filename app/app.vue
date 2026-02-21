<script setup lang="ts">
const siteName = "itsmnthn.dev";
const siteUrl = "https://itsmnthn.dev";
const staticOgImage = `${siteUrl}/itsmnthn-meta.png`;
const siteDescription =
  "itsmnthn is a fullstack engineer and product builder with 7+ years of experience across DeFi, SaaS, and developer tooling.";

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
  title: siteName,
  description: siteDescription,
  ogType: "website",
  ogSiteName: siteName,
  ogTitle: siteName,
  ogDescription: siteDescription,
  ogImage: staticOgImage,
  ogUrl: siteUrl,
  twitterTitle: siteName,
  twitterDescription: siteDescription,
  twitterImage: staticOgImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

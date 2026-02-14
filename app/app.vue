<script setup lang="ts">
  useHead({
    title: "itsmnthn.dev",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { name: "description", content: "itsmnthn is a fullstack engineer and product builder with 7+ years of experience across DeFi, SaaS, and developer tooling." },
      { name: "image", content: "/itsmnthn.png" },
      { name: "url", content: "https://itsmnthn.dev" },
      { name: "keywords", content: ["itsmnthn", "portfolio", "developer", "engineer", "product", "builder", "fullstack", "engineer", "product", "builder"] },
      { name: "author", content: "itsmnthn" },
      { name: "copyright", content: "itsmnthn" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow, max-image-preview:large" },
      { name: "google", content: "index, follow, max-image-preview:large" },
      { name: "apple", content: "index, follow, max-image-preview:large" },
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  })

  useSeoMeta({
    ogTitle: 'itsmnthn.dev',
    ogDescription: 'itsmnthn is a fullstack engineer and product builder with 7+ years of experience across DeFi, SaaS, and developer tooling.',
    ogImage: '/itsmnthn-meta.png',
    ogUrl: 'https://itsmnthn.dev',
    twitterTitle: 'itsmnthn.dev',
    twitterDescription: 'itsmnthn is a fullstack engineer and product builder with 7+ years of experience across DeFi, SaaS, and developer tooling.',
    twitterImage: '/itsmnthn-meta.png',
    twitterCard: 'summary_large_image'
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

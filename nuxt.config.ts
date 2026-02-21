import tailwindcss from "@tailwindcss/vite";

const gaMeasurementId = import.meta.env.NUXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  future: {
    compatibilityVersion: 5,
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/partytown",
    "@nuxtjs/seo",
  ],

  partytown: {
    forward: ["dataLayer.push"],
  },

  app: {
    head: {
      script: gaMeasurementId
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
              async: true,
              crossorigin: "anonymous",
              type: "text/partytown",
            },
            {
              type: "text/partytown",
              textContent: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`,
            },
          ]
        : [],
    },
  },

  site: {
    url: "https://itsmnthn.dev",
    name: "itsmnthn.dev",
    description:
      "itsmnthn is a fullstack engineer and product builder with 7+ years of experience across DeFi, SaaS, and developer tooling.",
  },

  fonts: {
    families: [
      { name: "Sora", provider: "google" },
      { name: "Manrope", provider: "google" },
    ],
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    exclude: ["/blog", "/blog/**"],
  },

  robots: {
    disallow: ["/blog", "/blog/**"],
  },

  schemaOrg: {
    defaults: true,
    identity: {
      "@type": "Person",
      name: "itsmnthn",
      url: "https://itsmnthn.dev",
      image: "https://itsmnthn.dev/itsmnthn.png",
      sameAs: ["https://www.linkedin.com/in/itsmnthn", "https://x.com/itsmnthn", "https://github.com/itsmnthn"],
    },
  },

  linkChecker: {
    excludeLinks: ["/_**", "/blog/**"],
    report: {
      html: true,
      markdown: true,
      json: true,
    },
  },

  nitro: {
    prerender: {
      routes: ["/", "/sitemap.xml", "/robots.txt"],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },
});

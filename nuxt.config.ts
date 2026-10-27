import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

const gaMeasurementId = process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  experimental: {
    // auto-import nitro utils (useRuntimeConfig, etc.) for modules like @nuxt/content on nuxt 5
    nitroAutoImports: true,
  },

  features: {
    inlineStyles: true,
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/scripts", "@nuxtjs/seo"],

  scripts: {
    defaultScriptOptions: {
      warmupStrategy: false,
    },
    registry: gaMeasurementId
      ? {
          googleAnalytics: {
            id: gaMeasurementId,
            trigger: { idleTimeout: 3000 },
          },
        }
      : {},
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

  ogImage: { enabled: false },

  aiReady: { enabled: false },
  skewProtection: { enabled: false },

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
    // uses the nuxt server $fetch, which isn't available on nuxt 5
    runOnBuild: false,
  },

  // GitHub Pages serves static assets with platform-managed cache headers.
  // routeRules.headers/publicAssets maxAge changes here won't control production TTL.
  prerender: {
    routes: ["/", "/sitemap.xml", "/robots.txt"],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },
});

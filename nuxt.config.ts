import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

const gaMeasurementId = process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-10-27",

  experimental: {
    // auto-import nitro utils (useRuntimeConfig, etc.) for modules like @nuxt/content on nuxt 5
    nitroAutoImports: true,
  },

  css: ["~/assets/css/main.css"],

  // the site is light only, so code blocks use one light theme and no dark variant css
  content: {
    build: {
      markdown: {
        highlight: { theme: "github-light" },
      },
    },
  },

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
      { name: "Pinyon Script", provider: "google" },
    ],
  },

  // templates in app/components/OgImage, rendered while prerendering; there's no server on GitHub Pages.
  // og:image only, X falls back to it, so no twitter:image
  ogImage: { zeroRuntime: true, includeTwitter: false, defaults: { height: 630 } },

  // GitHub Pages has no /api/_nuxt_icon, so bundle every used icon from the local @iconify-json packages
  // instead of falling back to api.iconify.design
  icon: {
    provider: "none",
    fallbackToApi: false,
    clientBundle: { scan: true },
  },

  aiReady: { enabled: false },
  skewProtection: { enabled: false },

  schemaOrg: {
    defaults: true,
    identity: {
      "@type": "Person",
      name: "itsmnthn",
      url: "/",
      image: "/itsmnthn.png",
      sameAs: ["https://www.linkedin.com/in/itsmnthn", "https://x.com/itsmnthn", "https://github.com/itsmnthn"],
    },
  },

  linkChecker: {
    excludeLinks: ["/_**"],
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
    routes: ["/", "/production-logs", "/resume", "/sitemap.xml", "/robots.txt"],
  },

  nitro: {
    prerender: { autoSubfolderIndex: false },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },
});

import tailwindcss from "@tailwindcss/vite";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  future: {
    compatibilityVersion: 5,
  },

  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxt/hints", "@nuxt/icon", "@nuxt/scripts"],

  fonts: {
    families: [
      { name: "Sora", provider: "google" },
      { name: "Manrope", provider: "google" },
    ],
  },

  meta: {
    title: "itsmnthn.dev",
    description: "itsmnthn.dev",
    image: "/itsmnthn.png",
    url: "https://itsmnthn.dev",
    keywords: ["itsmnthn", "portfolio", "developer", "engineer", "product", "builder"],
    author: "itsmnthn",
    copyright: "itsmnthn",
    robots: "index, follow",
    googlebot: "index, follow",
    google: "index, follow",
    apple: "index, follow",
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },
});

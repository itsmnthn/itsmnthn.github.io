<script setup lang="ts">
import { GITHUB_URL, LINKEDIN_URL, SITE_URL, X_URL } from "~/utils/constants";

// Source of truth for the resume. `pnpm resume:pdf` prints this page to public/itsmnthn-resume.pdf.
const PDF_PATH = "/itsmnthn-resume.pdf";
const yearsOfExperience = getYearsOfExperience();

const links = [
  { label: "itsmnthn.dev", url: SITE_URL },
  { label: "GitHub", url: GITHUB_URL },
  { label: "LinkedIn", url: LINKEDIN_URL },
  { label: "X", url: X_URL },
  { label: "Upwork", url: "https://www.upwork.com/freelancers/~01fc366cb40b227724" },
];

const experience = [
  {
    company: "Hexorial Studio",
    url: "https://hexorial.studio",
    role: "Co-Founder & Sole Full-Stack Developer",
    period: "2019 – Present",
    location: "India · Remote",
    points: [
      "Two-person studio building design and developer tools alongside full-time roles; I build, host and ship everything.",
      'Built <a href="https://colorsinspo.com" target="_blank" rel="noopener noreferrer">Colorsinspo</a>, a free color platform: curated palettes, gradients and brand colors, plus an image palette extractor, WCAG/APCA contrast checker and Tailwind shade generator.',
      "Shipped Figma and Adobe XD plugins (Colorsinspo, Brand Colors, Wireframes, Illustrations, Logo Creator, Product Planner, Superfaces), backed by the Adobe Fund for Design and Figma Creator Fund.",
      "Built the shared backend: single sign-on, product APIs and deploy automation on self-managed VPS and cloud hosting (TypeScript, Go, Nuxt).",
    ],
  },
  {
    company: "Moar Market",
    url: "https://moar.market",
    role: "Sole Frontend Engineer",
    period: "Jul 2024 – Mar 2026",
    location: "Remote",
    points: [
      "Owned the frontend of the credit layer for Move DeFi on Aptos, from architecture to deploy; the protocol peaked at <b>$7.4M TVL</b>.",
      "Built the Nuxt + TypeScript monorepo and public SDK: credit accounts, multi-collateral lending, margin trading and auto-rebalancing leveraged LP strategies.",
      "Shipped health factor, liquidation, PnL and APR tooling, swap routing, transaction simulation and the Moar Points leaderboard.",
    ],
  },
  {
    company: "Hubble Exchange",
    url: "https://github.com/hubble-exchange",
    role: "Frontend Team Lead",
    period: "Oct 2021 – Jul 2024",
    location: "Remote",
    points: [
      "Led a frontend team of three for a cross-margin perps DEX on Avalanche; v1 did <b>$41M+ volume</b> in its first 50 days.",
      "Shipped v1 AMM perps on Avalanche C-Chain, then v2 on Hubblenet, a perp app-chain with an on-chain order book.",
      "Led the Nuxt 2 → Nuxt 3 (Vue 2 → Vue 3) migration; built trading dashboards and liquidation and risk tools.",
    ],
  },
  {
    company: "DefiDollar",
    url: "https://github.com/defidollar",
    role: "Sole Frontend Engineer",
    period: "Oct 2020 – Oct 2021",
    location: "Bengaluru",
    points: [
      "Owned the frontend for the stablecoin, yield and staking products of a protocol that peaked at <b>$279M TVL</b>.",
      "Built reusable Vue + TypeScript components and improved UX for on-chain stablecoin swaps and liquidity staking.",
    ],
  },
  {
    company: "Matic Network (Polygon)",
    url: "https://polygon.technology",
    role: "Frontend Engineer",
    period: "Feb 2020 – Sep 2020",
    location: "Bengaluru",
    points: ["Built dApp UIs and dashboards for early Polygon ecosystem tooling, integrated with smart contracts."],
  },
  {
    company: "Freelance (Upwork)",
    url: "https://www.upwork.com/freelancers/~01fc366cb40b227724",
    role: "Full-Stack Engineer",
    period: "2016 – 2020",
    location: "Remote",
    points: ["25+ client projects in Python/Django, Vue and PostgreSQL: web automation, backend APIs and SaaS MVPs."],
  },
];

const openSource = [
  {
    name: "Nuxt",
    url: "https://nuxt.com/nuxters/itsmnthn",
    description: "bug reports with reproductions to Nuxt and Nuxt Content since 2022, plus a docs fix",
  },
  {
    name: "unocss-preset-advance-gradients",
    url: "https://github.com/itsmnthn/unocss-preset-advance-gradients",
    description: "gradient borders, text and themes for UnoCSS",
  },
  {
    name: "big-utils",
    url: "https://github.com/itsmnthn/big-utils",
    description: "zero-dependency bigint units, formatting and fixed-point math",
  },
  {
    name: "nuxt-compressed-cache",
    url: "https://github.com/itsmnthn/nuxt-compressed-cache",
    description: "pre-compressed, stale-while-revalidate route caching",
  },
];

const skills = [
  { label: "Frontend", value: "Nuxt 3/4/5, Vue, TypeScript, Tailwind, UnoCSS" },
  { label: "Backend", value: "Node.js, Go, Python, PostgreSQL, VPS, serverless" },
  { label: "Web3", value: "Aptos Move, Ethers.js, lending, margin, perps" },
  { label: "Product", value: "UI/UX, Figma plugins, team leadership" },
];

const education = [
  {
    degree: "Master of Science in Information Technology & Computer Application (MSc. IT)",
    school: "Saurashtra University",
    period: "2017 – 2019",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Geetanjali Group of Colleges",
    period: "2013 – 2017",
  },
];

useHead({ titleTemplate: "%s", htmlAttrs: { class: "print:bg-white" } });
useSeoMeta({
  title: "Manthankumar Satani — Resume",
  description: `Resume of Manthankumar Satani (itsmnthn): full-stack engineer with ${yearsOfExperience}+ years across DeFi, web and SaaS.`,
});
</script>

<template>
  <div class="min-h-screen px-4 pt-6 pb-16 font-body text-zinc-800 print:min-h-0 print:p-0">
    <nav class="mx-auto mb-4 flex max-w-3xl items-center justify-between print:hidden" aria-label="Resume actions">
      <NuxtLink to="/" class="i-flex-ic gap-1.5 text-sm font-semibold text-zinc-600 hover:text-zinc-900">
        <icon name="lucide:arrow-left" class="size-4" />
        itsmnthn.dev
      </NuxtLink>
      <a
        :href="PDF_PATH"
        download
        class="btn btn-secondary i-flex-ic gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
      >
        <icon name="lucide:download" class="size-4" />
        Download PDF
      </a>
    </nav>

    <!-- A4 sheet on screen; the same box is what gets printed. Shared typography lives here, not on children. -->
    <article
      class="mx-auto max-w-3xl space-y-2.5 rounded-3xl bg-white px-11 py-8 text-xs leading-normal shadow-xl print:max-w-none print:rounded-none print:shadow-none [&_a]:underline [&_a]:decoration-zinc-300 [&_a]:underline-offset-2 [&_a:hover]:decoration-zinc-700 [&_b]:font-semibold [&_b]:text-zinc-900 [&_h2]:mb-1.5 [&_h2]:break-after-avoid [&_h2]:font-heading [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:text-primary [&_li]:mt-0.5 [&_li]:marker:text-zinc-400 [&_ul]:list-disc [&_ul]:pl-4"
    >
      <header class="border-b border-zinc-300 pb-3">
        <h1 class="font-heading text-3xl font-black tracking-tight text-zinc-900">Manthankumar Satani</h1>
        <p class="mt-0.5 text-base font-semibold text-zinc-700">Co-Founder · Full-Stack Engineer</p>
        <p class="mt-1.5 flex flex-wrap gap-x-2 text-zinc-600">
          <span>India · Remote</span>
          <template v-for="link in links" :key="link.label">
            <span aria-hidden="true">|</span>
            <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
          </template>
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>
          Full-stack engineer and product builder with {{ yearsOfExperience }}+ years shipping web, SaaS and DeFi
          products. Sole frontend engineer at Moar Market and DefiDollar and frontend team lead at Hubble Exchange,
          taking DeFi products from architecture to deploy. Co-founder of
          <a href="https://hexorial.studio" target="_blank" rel="noopener noreferrer">Hexorial Studio</a>
          (<a href="https://colorsinspo.com" target="_blank" rel="noopener noreferrer">Colorsinspo</a>, Figma and Adobe
          XD plugins) and an occasional open-source contributor.
        </p>
      </section>

      <section>
        <h2>Experience</h2>
        <div class="space-y-2.5">
          <div v-for="job in experience" :key="job.company" class="break-inside-avoid">
            <div class="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 class="text-sm font-bold text-zinc-900">
                <a :href="job.url" target="_blank" rel="noopener noreferrer">{{ job.company }}</a>
                <span class="font-medium text-zinc-600"> · {{ job.role }}</span>
              </h3>
              <p class="whitespace-nowrap text-zinc-500">{{ job.period }} · {{ job.location }}</p>
            </div>
            <ul>
              <li v-for="point in job.points" :key="point" v-html="point" />
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Open Source</h2>
        <ul>
          <li v-for="item in openSource" :key="item.name">
            <a :href="item.url" target="_blank" rel="noopener noreferrer"
              ><b>{{ item.name }}</b></a
            >
            — {{ item.description }}
          </li>
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <div class="grid grid-cols-2 gap-x-3 gap-y-0.5">
          <p v-for="skill in skills" :key="skill.label">
            <b class="inline-block w-16">{{ skill.label }}</b
            >{{ skill.value }}
          </p>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <div v-for="item in education" :key="item.degree" class="flex items-baseline justify-between gap-x-3">
          <p>
            <b>{{ item.degree }}</b> · {{ item.school }}
          </p>
          <p class="whitespace-nowrap text-zinc-500">{{ item.period }}</p>
        </div>
        <p class="mt-1.5"><b>Languages:</b> Gujarati (native), Hindi, English (professional)</p>
      </section>
    </article>
  </div>
</template>

<style>
/* page size/margins for the PDF can only be set with @page */
@page {
  size: A4;
  margin: 0;
}
</style>

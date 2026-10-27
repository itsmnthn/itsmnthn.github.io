---
title: "Who Am I"
description: "A full-stack engineer and product builder from India, shipping web, SaaS and DeFi products since 2017."
date: "2026-02-16"
updated: "2026-10-27"
categories:
  - About
authors:
  - itsmnthn
draft: false
published: true
seo:
  title: "Who Am I · Manthankumar Satani (itsmnthn)"
  description: "Manthankumar Satani (itsmnthn) is a full-stack engineer, co-founder at Hexorial Studio and former sole frontend engineer at Moar Market and DefiDollar and frontend team lead at Hubble Exchange."
  canonical: "/blog/who-am-i"
  robots: "index, follow"
  keywords:
    - itsmnthn
    - Manthankumar Satani
    - full stack developer
    - frontend engineer
    - Nuxt
    - DeFi
    - Hexorial Studio
---

Hey, I'm **Manthankumar Satani**. Most people online know me as **itsmnthn**. I'm a full-stack engineer and product builder based in India, working remotely, and I've been building and shipping software since 2017.

Most of my career has been at the meeting point of frontend engineering, backend development and product design. I've been the sole frontend engineer at two DeFi protocols and led the frontend team at a third, co-founded a two-person studio that ships design tools for Figma and Adobe XD, and delivered 25+ projects for freelance clients before that.

I like owning the whole thing: the API, the data, the frontend, the deploy, and the small UX details that decide whether people actually use what we built.

## What I'm doing now

**Co-founder & sole full-stack developer at [Hexorial Studio](https://hexorial.studio)** (2019 – present). Hexorial is a two-person studio where my co-founder and I build design and developer tools, mostly on weekends alongside our full-time roles. I'm the only engineer, so development, infrastructure and launches are mine. Our products include:

- **Wireframes**, a Figma prototyping plugin
- **[Colorsinspo](https://colorsinspo.com)**, a free color platform with thousands of curated palettes, gradients and brand colors, plus tools like an image palette extractor, a WCAG/APCA contrast checker, a Tailwind shade generator, a brand color guide builder and a color guessing game
- **Brand Colors** and **Color Palettes**, quick-access design plugins
- **Illustrations**, **Logo Creator** and **Superfaces**, design asset plugins for Figma and Adobe XD
- **Product Planner** and **UX Notes**, lightweight design and planning tools

Our plugins were backed by the Adobe Fund for Design and the Figma Creator Fund.

I run the whole product cycle there: ideation, development, launch and scaling, with TypeScript, Go, Vue and Nuxt, hosted across self-managed VPS and cloud platforms over the years. Lately I've been moving Colorsinspo to Nuxt 5.

## Where I've been

### Moar Market · Sole Frontend Engineer

_Jul 2024 – Mar 2026 · Remote_

[Moar Market](https://moar.market) is the credit layer for Move DeFi on Aptos, and it peaked at $7.4M TVL. I was the sole frontend engineer, owning everything from architecture to deploy: a Nuxt + TypeScript monorepo with SDK packages, trading systems and lending strategies. Some of what I built:

- credit accounts with multi-collateral, borrow, repay and swap actions
- margin trading flows and leveraged LP strategies on DEXes like Hyperion and Tapp, with auto-rebalance and auto-compound
- health factor, liquidation price, PnL and APR math that has to be right every time
- a swap adapter with aggregator routing, plus transaction simulation before signing
- **Moar Points**, a gamified leaderboard

### Hubble Exchange · Frontend Team Lead

_Oct 2021 – Jul 2024 · Remote_

Led a frontend team of three for a cross-margin perpetual futures DEX on Avalanche. We shipped two versions: first AMM-based perps on the Avalanche C-Chain, which did [over $41M in volume across 17,000+ trades in its first 50 days](https://x.com/HubbleExchange/status/1575360594219503616) on mainnet with $4.8M TVL, and then Hubblenet, a perp-specific app-chain on Avalanche with a fully decentralized limit order book and matching engine. Along the way I led our migration from Nuxt 2 and Vue 2 to Nuxt 3 and Vue 3. Moving a live trading app across that jump, with the Composition API, new data fetching, Vite and a module ecosystem still catching up, was one of the most painful and useful projects I've done. I also designed the trading dashboards and the liquidation and risk tools, and worked with the backend engineers on API design and protocol integration.

### DefiDollar · Sole Frontend Engineer

_Oct 2020 – Oct 2021 · Bengaluru_

I owned the frontend for the stablecoin, yield and staking products of a protocol that peaked at $279M TVL. I built modular, reusable UI components in Vue and TypeScript and improved the UX for on-chain stablecoin swaps and liquidity staking.

### Matic Network (Polygon) · Frontend Engineer

_Feb 2020 – Sep 2020 · Bengaluru_

Worked on early Polygon ecosystem tooling and dashboards, and built dApp UIs that talked to smart contracts.

### Freelance · Full-Stack Engineer

_2016 – 2020 · Remote_

Delivered 25+ client projects on Upwork with Python/Django, Vue and PostgreSQL. I mostly did web automation, backend APIs and full-stack SaaS MVPs.

## Open source

I spend a lot of time in the Vue and Nuxt ecosystem. When I hit a bug in Nuxt or Nuxt Content I report it upstream with a reproduction, which I've done [since 2022](https://nuxt.com/nuxters/itsmnthn), and I landed a small docs fix in Nuxt core. A few things I've published myself:

- [unocss-preset-advance-gradients](https://github.com/itsmnthn/unocss-preset-advance-gradients): a UnoCSS preset for gradient borders with rounded corners, gradient text and ready-made themes
- [big-utils](https://github.com/itsmnthn/big-utils): zero-dependency bigint unit converters, formatters and fixed-point math, born out of handling token amounts
- [nuxt-compressed-cache](https://github.com/itsmnthn/nuxt-compressed-cache): serves Nuxt route rules from pre-compressed brotli/gzip cached copies, with stale-while-revalidate
- [figma-plugin-vue](https://github.com/itsmnthn/figma-plugin-vue): a starter for building Figma plugins with Vue

You'll find more experiments on my [GitHub](https://github.com/itsmnthn).

## What I work with

- **Frontend:** Nuxt 3/4/5, Vue, TypeScript, Tailwind and UnoCSS
- **Backend:** Node.js, Go, Python, PostgreSQL, VPS and cloud hosting, serverless and edge functions
- **Blockchain/DeFi:** Aptos Move, Ethers.js, lending, trading and perp protocols
- **Product:** product design, UI/UX, Figma plugins and team leadership

## Outside the code

I have a Master of Science in Information Technology & Computer Application from Saurashtra University (2017–2019) and a Bachelor of Computer Applications from Geetanjali Group of Colleges (2013–2017). I speak Gujarati, Hindi and English.

## Why this blog

This is my production log: notes from things I've actually built and shipped. Expect posts on Nuxt, performance, DeFi frontends, SDK design and what I learn running a small studio. I'm writing them for people who want ideas they can use the same week.

## Say hi

If you're building something and need someone who can own it end to end, or you just want to talk Nuxt or DeFi, reach out on [LinkedIn](https://www.linkedin.com/in/itsmnthn) or [X](https://x.com/itsmnthn). You can also read my [resume](/resume).

Thanks for reading.
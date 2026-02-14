<script setup lang="ts">
  import { LINKEDIN_URL, X_URL } from '~/utils/constants';
  const currentYear = new Date().getFullYear();

  // List of social links with icons and button styles
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: LINKEDIN_URL,
      icon: 'mdi:linkedin',
      btnClass: 'btn btn-secondary'
    },
    {
      name: 'Twitter',
      url: X_URL,
      icon: 'mdi:twitter',
      btnClass: 'btn btn-secondary-2'
    }
  ];
</script>

<template>
  <section class="border border-white_smoke bg-white_smoke px-8 pt-12 pb-6 md:px-16 md:pt-16 md:pb-12">
    <div class="text-center">
      <div class="i-flex-ic-jc bg-linear-to-b from-gray_alabaster to-white_smoke rounded-full p-6">
        <Icon name="streamline-freehand:business-deal-handshake" class="text-7xl text-zinc-700" />
      </div>
      <h2 class="mx-auto mt-3 text-balance font-black font-heading text-4xl leading-tight tracking-tight md:text-5xl">
        <span class="block">Let's collaborate on</span>
        <span class="block text-zinc-900/80">your next project.</span>
      </h2>

      <div class="mt-5 mb-22 flex flex-wrap justify-center gap-4 text-sm font-bold tracking-wider">
        <NuxtLink v-for="(link, i) in socialLinks" :key="link.name" :to="link.url" target="_blank"
          rel="noopener noreferrer"
          :class="['i-flex-ic-jc', link.btnClass, 'rounded-full', 'px-6', 'py-2.5', 'no-underline', 'gap-2']">
          <Icon :name="link.icon" class="size-5" />
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>

    <Footer />
  </section>
</template>

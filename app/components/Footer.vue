<template>
  <footer
    class="mt-8 flex flex-col items-start gap-4 border-t border-zinc-400/30 pt-5 text-xs text-zinc-700/80 md:flex-row md:items-center md:justify-between">
    <p class="m-0">© {{ new Date().getFullYear() }} All rights reserved.</p>

    <NuxtLink to="https://dribbble.com/shots/23531329-kawsarvy" class="text-zinc-700/80 hover:text-zinc-900">
      Thanks Kawsar Ahmed for the design.
    </NuxtLink>

    <SocialLinks />
  </footer>
</template>

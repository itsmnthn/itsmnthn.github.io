<template>
  <div class="min-h-screen text-zinc-900">
    <Html class="text-[14px] sm:text-[16px]" />
    <article class="relative mx-auto w-full max-w-[1240px] pb-2 pt-1 font-body text-zinc-900 md:pb-2.5 md:pt-2">
      <slot />
      <!-- <LandingServices class="relative z-1 rounded-[3rem] md:rounded-[5rem] -my-20 py-34 md:-my-40 md:py-64" /> -->
      <LandingCollaborate
        class="relative z-2 rounded-b-[3rem] md:rounded-b-[5rem] border-x-0 border-b-0 border-zinc-200"
      />
    </article>
  </div>
</template>

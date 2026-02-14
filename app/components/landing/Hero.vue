<template>
  <section class="border border-white_smoke bg-gray_alabaster px-8 pt-6 pb-12 md:px-16 md:pt-12 md:pb-24">
    <Header />

    <div class="mt-8 text-center md:mt-16">
      <div class="relative i-flex-ic">
        <img src="/itsmnthn.png" alt="itsmnthn" class="size-28 border-3 border-white_smoke rounded-full">
        <!-- <p
          class="absolute left-2/3 -rotate-12 -skew-12 i-flex-ic gap-2 rounded-full text-xs btn btn-secondary-2 px-4 py-1.5">
          itsmnthn
          <icon name="lucide:hand-metal" class="size-4 text-primary" />
        </p> -->
      </div>

      <h1 class="mx-auto mt-5 text-balance font-black font-heading text-4xl leading-tight tracking-tight md:text-5xl">

        <span class="block">
          Buidling products
        </span>
        <span class="block text-zinc-900/80">
          for web, backend &
        </span>

        <span class="block text-zinc-900/70">
          blockchain
        </span>
      </h1>

      <p class="mx-auto my-4 text-zinc-600 mb-7">
        7+ years shipping products in production
      </p>

      <NuxtLink to="/blog" class="btn btn-secondary px-6 py-3 rounded-full font-semibold i-flex-ic gap-2 mt-4">
        Latest Notes
        <icon name="lucide:arrow-up-right" class="size-7" />
      </NuxtLink>
    </div>
  </section>
</template>

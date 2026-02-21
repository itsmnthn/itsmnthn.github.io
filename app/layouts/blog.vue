<template>
  <div class="min-h-screen text-zinc-900">
    <Html class="text-[14px] sm:text-[16px]" />
    <article class="relative mx-auto w-full max-w-[1240px] pb-2 pt-1 font-body text-zinc-900 md:pb-2.5 md:pt-2">
      <!-- <section
        class="border border-white_smoke bg-gray_alabaster px-8 pt-6 pb-12 md:px-16 md:pt-12 md:pb-24 relative z-3 rounded-[3rem] md:rounded-[5rem]">
        <Header />

        <div class="mt-8 text-center md:mt-16">
          <div class="relative i-flex-ic">
            <img src="/itsmnthn.png" alt="itsmnthn" class="size-28 border-3 border-white_smoke rounded-full" />
          </div>

          <h1
            class="mx-auto mt-5 text-balance font-black font-heading text-3xl xs:text-4xl leading-tight tracking-tight md:text-5xl">
            The Production Log
          </h1>

          <p class="mx-auto my-4 text-sm sm:text-base text-zinc-600 mb-7">
            A collection of insights gathered from the
            front lines of product development
          </p>

          <NuxtLink to="/blog/who-am-i"
            class="btn btn-secondary px-6 py-3 rounded-full font-semibold i-flex-ic gap-2 mt-4">
            Who am I ?
            <icon name="lucide:arrow-up-right" class="size-7" />
          </NuxtLink>
        </div>
      </section> -->
      <slot />
      <!-- <LandingServices class="relative z-1 rounded-[3rem] md:rounded-[5rem] -my-20 py-34 md:-my-40 md:py-64" /> -->
      <LandingCollaborate
        class="relative z-2 rounded-b-[3rem] md:rounded-b-[5rem] border-x-0 border-b-0 border-zinc-200"
      />
    </article>
  </div>
</template>

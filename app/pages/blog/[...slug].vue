<script setup lang="ts">
  definePageMeta({
    layout: "blog",
  });

  const route = useRoute();

  const formatDate = (value: string) => {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const { data: page } = await useAsyncData(`page-${route.path}`, () => {
    return queryCollection("blog").path(route.path).first();
  });

  if (!page.value || page.value.draft === true || page.value.published === false) {
    throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
  }

  useSeoMeta({
    title: page.value.seo?.title ?? page.value.title,
    description: page.value.seo?.description ?? page.value.description,
    robots: page.value.seo?.robots,
    keywords: page.value.seo?.keywords?.join(", "),
    ogTitle: page.value.seo?.title ?? page.value.title,
    ogDescription: page.value.seo?.description ?? page.value.description,
    ogImage: page.value.seo?.image,
    twitterCard: "summary_large_image",
    twitterTitle: page.value.seo?.title ?? page.value.title,
    twitterDescription: page.value.seo?.description ?? page.value.description,
    twitterImage: page.value.seo?.image,
  });
</script>

<template>
  <section
    class="border border-white_smoke bg-gray_alabaster px-8 pt-6 pb-12 md:px-16 md:pt-12 md:pb-24 relative z-3 rounded-[3rem] md:rounded-[5rem]">
    <Header />

    <div class="mt-8 text-center md:mt-16">
      <div class="relative i-flex-ic">
        <img src="/itsmnthn.png" alt="itsmnthn" class="size-28 border-3 border-white_smoke rounded-full" />
      </div>

      <h1
        class="mx-auto mt-5 text-balance font-black font-heading text-3xl xs:text-4xl leading-tight tracking-tight md:text-5xl">
        {{ page?.title }}
      </h1>

      <p class="mx-auto my-4 text-sm sm:text-base text-zinc-600 mb-7">
        {{ page?.description }}
      </p>

      <div class="mt-4">
        <div v-if="page?.date" class="text-sm text-zinc-500">
          {{ formatDate(page.date) }}
        </div>
        <div v-if="page?.categories?.length" class="flex flex-wrap items-center justify-center gap-2 mt-2">
          <span v-for="tag in page.categories" :key="tag"
            class="rounded-full bg-white/75 px-2 py-1 text-xs font-medium text-zinc-600">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>

  <section
    class="border border-white_smoke bg-white_smoke px-8 py-10 md:px-16 md:py-24 relative z-2 -mt-40 pt-50 md:-mt-36 md:pt-60">
    <NuxtLink to="/blog" class="btn btn-secondary px-6 py-3 rounded-full font-semibold i-flex-ic gap-2 mt-6">
      Back to Blog
      <icon name="lucide:arrow-left" class="size-7" />
    </NuxtLink>

    <ContentRenderer v-if="page" :value="page" class="blog-markdown" />
  </section>
</template>

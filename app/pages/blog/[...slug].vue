<script setup lang="ts">
import { SITE_URL } from "~/utils/constants";

definePageMeta({
  layout: "blog",
  robots: false,
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

const canonicalUrl = page.value.seo?.canonical ?? `${SITE_URL}${route.path}`;
const staticOgImage = `${SITE_URL}/itsmnthn-meta.png`;
const datePublished = new Date(`${page.value.date}T00:00:00`).toISOString();
const dateModified = page.value.updated ? new Date(`${page.value.updated}T00:00:00`).toISOString() : datePublished;
const authorName = page.value.authors?.[0] ?? "itsmnthn";

useSchemaOrg([
  defineArticle({
    headline: page.value.seo?.title ?? page.value.title,
    description: page.value.seo?.description ?? page.value.description,
    datePublished,
    dateModified,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en-US",
    image: staticOgImage,
    articleSection: page.value.categories?.[0],
    keywords: page.value.seo?.keywords,
    author: {
      "@type": "Person",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "itsmnthn",
      url: SITE_URL,
      image: `${SITE_URL}/itsmnthn.png`,
    },
  }),
  defineBreadcrumb({
    itemListElement: [
      { position: 1, name: "Home", item: SITE_URL },
      { position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { position: 3, name: page.value.title, item: canonicalUrl },
    ],
  }),
]);

useSeoMeta({
  title: page.value.seo?.title ?? page.value.title,
  description: page.value.seo?.description ?? page.value.description,
  keywords: page.value.seo?.keywords?.join(", "),
  ogTitle: page.value.seo?.title ?? page.value.title,
  ogDescription: page.value.seo?.description ?? page.value.description,
  ogImage: staticOgImage,
  twitterCard: "summary_large_image",
  twitterTitle: page.value.seo?.title ?? page.value.title,
  twitterDescription: page.value.seo?.description ?? page.value.description,
  twitterImage: staticOgImage,
});
</script>

<template>
  <section
    class="border border-white_smoke bg-gray_alabaster px-8 pt-6 pb-12 md:px-16 md:pt-12 md:pb-24 relative z-3 rounded-[3rem] md:rounded-[5rem]"
  >
    <Header />

    <div class="mt-8 text-center md:mt-16">
      <div class="relative i-flex-ic">
        <NuxtImg
          src="/itsmnthn.png"
          alt="itsmnthn"
          width="112"
          height="112"
          loading="eager"
          class="size-28 border-3 border-white_smoke rounded-full"
        />
      </div>

      <h1
        class="mx-auto mt-5 text-balance font-black font-heading text-3xl xs:text-4xl leading-tight tracking-tight md:text-5xl"
      >
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
          <span
            v-for="tag in page.categories"
            :key="tag"
            class="rounded-full bg-white/75 px-2 py-1 text-xs font-medium text-zinc-600"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>

  <section
    class="border border-white_smoke bg-white_smoke px-8 py-10 md:px-16 md:py-24 relative z-2 -mt-40 pt-50 md:-mt-36 md:pt-60"
  >
    <NuxtLink to="/blog" class="btn btn-secondary px-6 py-3 rounded-full font-semibold i-flex-ic gap-2 mt-6">
      Back to Blog
      <icon name="lucide:arrow-left" class="size-7" />
    </NuxtLink>

    <ContentRenderer v-if="page" :value="page" class="blog-markdown" />
  </section>
</template>

<script setup lang="ts">
import "~/assets/css/blog.css";

definePageMeta({
  layout: "blog",
});

const route = useRoute();
// static hosts (GitHub Pages) serve /blog/post/ with a trailing slash; content paths have none
const path = route.path.replace(/\/+$/, "") || "/";

const formatDate = (value: string) => {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const { data: page } = await useAsyncData(`page-${path}`, () => {
  return queryCollection("blog").path(path).first();
});

if (!page.value || page.value.draft === true || page.value.published === false) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const canonicalUrl = page.value.seo?.canonical ?? path;
const datePublished = new Date(`${page.value.date}T00:00:00`).toISOString();
const dateModified = page.value.updated ? new Date(`${page.value.updated}T00:00:00`).toISOString() : datePublished;
const authorName = page.value.authors?.[0] ?? "itsmnthn";

useSchemaOrg([
  defineArticle({
    headline: page.value.seo?.title ?? page.value.title,
    description: page.value.seo?.description ?? page.value.description,
    datePublished,
    dateModified,
    inLanguage: "en-US",
    image: "/itsmnthn-meta.png",
    articleSection: page.value.categories,
    keywords: page.value.seo?.keywords,
    author: {
      "@type": "Person",
      name: authorName,
      url: "/",
    },
    publisher: {
      "@type": "Person",
      name: "itsmnthn",
      url: "/",
      image: "/itsmnthn.png",
    },
  }),
  defineBreadcrumb({
    itemListElement: [
      { position: 1, name: "Home", item: "/" },
      { position: 2, name: "Blog", item: "/blog" },
      { position: 3, name: page.value.title, item: canonicalUrl },
    ],
  }),
]);

useHead({
  meta: [{ name: "keywords", content: page.value.seo?.keywords?.join(", ") }],
});

useSeoMeta({
  title: page.value.seo?.title ?? page.value.title,
  description: page.value.seo?.description ?? page.value.description,
});
</script>

<template>
  <section
    class="border border-white_smoke bg-gray_alabaster px-8 pt-6 pb-12 md:px-16 md:pt-12 md:pb-24 relative z-3 rounded-[3rem] md:rounded-[5rem]"
  >
    <Header />

    <div class="mt-8 text-center md:mt-16">
      <div class="relative i-flex-ic">
        <img
          src="/itsmnthn-avatar-112.webp"
          srcset="/itsmnthn-avatar-112.webp 1x, /itsmnthn-avatar-224.webp 2x"
          alt="itsmnthn"
          width="112"
          height="112"
          loading="eager"
          decoding="async"
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
    <div class="mx-auto max-w-3xl">
      <NuxtLink
        to="/blog"
        class="group i-flex-ic gap-1.5 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900"
      >
        <icon name="lucide:arrow-left" class="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Blog
      </NuxtLink>

      <ContentRenderer v-if="page" :value="page" class="blog-markdown mt-6" />
    </div>
  </section>
</template>

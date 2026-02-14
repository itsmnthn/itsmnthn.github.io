<script setup lang="ts">
  const route = useRoute();

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
  <article
    class="prose prose-zinc mx-auto max-w-3xl rounded-3xl border border-zinc-200/70 bg-white/85 px-6 py-8 shadow-sm backdrop-blur dark:prose-invert dark:border-zinc-700/70 dark:bg-zinc-900/80">
    <header class="mb-8 border-b border-zinc-200/70 pb-6 dark:border-zinc-700/70">
      <h1 class="mb-2 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {{ page?.title }}
      </h1>
      <p class="!my-0 text-base text-zinc-600 dark:text-zinc-300">
        {{ page?.description }}
      </p>
      <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <span>{{ page?.date }}</span>
        <span v-if="page?.updated">Updated {{ page.updated }}</span>
        <span v-if="page?.authors?.length">By {{ page.authors.join(", ") }}</span>
      </div>
    </header>

    <ContentRenderer v-if="page" :value="page" />
  </article>
</template>

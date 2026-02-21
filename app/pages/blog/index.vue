<script setup lang="ts">
  import { SITE_URL } from "~/utils/constants";

  definePageMeta({
    layout: undefined,
    robots: false,
  });

  const { data: posts } = await useAsyncData(
    "blog-index-posts",
    async () => {
      try {
        return await queryCollection("blog")
          .where("draft", "=", false)
          .where("published", "=", true)
          .order("date", "DESC")
          .all();
      } catch {
        return [];
      }
    },
    {
      server: true,
      default: () => [],
    },
  );

  const staticOgImage = `${SITE_URL}/itsmnthn-meta.png`;

  const blogItemElements = (posts.value ?? []).flatMap((post, index) => {
    const postUrl = post.seo?.canonical ?? (typeof post.path === "string" ? `${SITE_URL}${post.path}` : undefined);
    if (!postUrl) {
      return [];
    }

    return [
      defineListItem({
        position: index + 1,
        name: post.seo?.title ?? post.title,
        item: postUrl,
      }),
    ];
  });

  useSchemaOrg([
    defineItemList({
      name: "The Production Log",
      numberOfItems: blogItemElements.length,
      itemListElement: blogItemElements,
    }),
    defineBreadcrumb({
      itemListElement: [
        { position: 1, name: "Home", item: SITE_URL },
        { position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      ],
    }),
  ]);

  useSeoMeta({
    title: "The Production Log",
    description: "A collection of insights gathered from the front lines of product development.",
    ogImage: staticOgImage,
    twitterImage: staticOgImage,
    twitterCard: "summary_large_image",
  });
</script>

<template>
  <div class="min-h-screen text-zinc-900">
    <Html class="text-[14px] sm:text-[16px]" />
    <section class="relative mx-auto w-full max-w-[1240px] pb-2 pt-1 font-body text-zinc-900 md:pb-2.5 md:pt-2">
      <section
        class="border border-white_smoke bg-gray_alabaster px-8 pt-6 pb-12 md:px-16 md:pt-12 md:pb-24 relative z-3 rounded-[3rem] md:rounded-[5rem]">
        <Header />

        <div class="mt-8 text-center md:mt-16">
          <div class="relative i-flex-ic">
            <NuxtImg src="/itsmnthn.png" alt="itsmnthn" width="112" height="112" loading="eager"
              class="size-28 border-3 border-white_smoke rounded-full" />
            <!-- <p
          class="absolute left-2/3 -rotate-12 -skew-12 i-flex-ic gap-2 rounded-full text-xs btn btn-secondary-2 px-4 py-1.5">
          itsmnthn
          <icon name="lucide:hand-metal" class="size-4 text-primary" />
        </p> -->
          </div>

          <h1
            class="mx-auto mt-5 text-balance font-black font-heading text-3xl xs:text-4xl leading-tight tracking-tight md:text-5xl">
            The Production Log
          </h1>

          <p class="mx-auto my-4 text-sm sm:text-base text-zinc-600 mb-7">
            A collection of insights gathered from the front lines of product development
          </p>

          <NuxtLink to="/blog/who-am-i"
            class="btn btn-secondary px-6 py-3 rounded-full font-semibold i-flex-ic gap-2 mt-4">
            Who am I ?
            <icon name="lucide:arrow-up-right" class="size-7" />
          </NuxtLink>
        </div>
      </section>
      <section
        class="border border-white_smoke bg-white_smoke px-8 py-10 md:px-16 md:py-24 relative z-2 -mt-40 pt-50 md:-mt-36 md:pt-60">
        <div class="relative mx-auto w-full rounded-4xl px-2 pb-8 pt-3 sm:px-4 lg:px-6">
          <ul class="relative z-20 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 sm:gap-y-14 lg:gap-x-8 lg:gap-y-16">
            <li v-for="(post, index) in posts" :key="post.id" class="flex items-start justify-center">
              <div class="w-fit">
                <BlogPinCard :post="post" :index="index" class="w-[clamp(10.75rem,44vw,19rem)] min-w-43 max-h-128" />
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- <LandingServices class="relative z-1 rounded-[3rem] md:rounded-[5rem] -my-20 py-34 md:-my-40 md:py-64" /> -->
      <LandingCollaborate
        class="relative z-2 rounded-b-[3rem] md:rounded-b-[5rem] border-x-0 border-b-0 border-zinc-200" />
    </section>
  </div>
</template>

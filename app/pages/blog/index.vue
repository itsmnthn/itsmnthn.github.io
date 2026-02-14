<script setup lang="ts">
  type ThreadLink = {
    from: HTMLElement | null;
    to: HTMLElement | null;
    key: string;
  };

  const cardColors = [
    "#FF7A59",
    "#4D7CFE",
    "#8B5CF6",
    "#F97316",
    "#3B82F6",
    "#EC4899",
    "#14B8A6",
    "#F59E0B",
    "#22C55E",
    "#6366F1",
  ];

  const boardRef = ref<HTMLElement | null>(null);
  const cardNodes = ref<Array<HTMLElement | null>>([]);

  const { data: postsRaw } = await useAsyncData(
    "blog-index-posts",
    async () => {
      try {
        return await queryCollection("blog").all();
      } catch {
        return [];
      }
    },
    {
      server: true,
      default: () => [],
    },
  );

  const formatDate = (value: string) => {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const hashString = (value: string) => {
    let hash = 2166136261;

    for (let index = 0; index < value.length; index++) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
  };

  const seededUnit = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const seededBetween = (seed: number, min: number, max: number) => {
    return min + seededUnit(seed) * (max - min);
  };

  const seededSignedTilt = (seedText: string, minAbs: number, maxAbs: number) => {
    const seed = hashString(seedText);
    const sign = seededUnit(seed + 13) > 0.5 ? 1 : -1;
    const magnitude = seededBetween(seed + 29, minAbs, maxAbs);

    return Number((sign * magnitude).toFixed(2));
  };

  const enforceDirectionMix = (
    current: number,
    previous: number | undefined,
    seedText: string,
    minAbs: number,
    maxAbs: number,
  ) => {
    if (previous === undefined || Math.sign(current) !== Math.sign(previous)) {
      return current;
    }

    const seed = hashString(`${seedText}:flip`);
    const magnitude = seededBetween(seed + 41, minAbs, maxAbs);
    const flipped = -Math.sign(previous) * magnitude;

    return Number(flipped.toFixed(2));
  };

  const posts = computed(() => {
    const desktopTilts: number[] = [];

    return postsRaw.value
      .filter((post) => post.draft !== true && post.published !== false)
      .sort((a, b) => {
        return new Date(`${b.date}T00:00:00`).getTime() - new Date(`${a.date}T00:00:00`).getTime();
      })
      .map((post, index) => {
        const primary = cardColors[index % cardColors.length] ?? "#5956e9";
        const seedKey = `${post.id}:${post.path}:${index}`;

        const initialTilt = seededSignedTilt(`${seedKey}:tilt`, 1.6, 5.8);
        const tilt = enforceDirectionMix(initialTilt, desktopTilts[index - 1], seedKey, 1.6, 5.8);
        desktopTilts.push(tilt);

        const rowOffset = Math.round(seededBetween(hashString(`${seedKey}:offset`), 0, 38));

        return {
          id: post.id,
          path: post.path,
          title: post.title,
          description: post.description,
          dateText: formatDate(post.date),
          tags: post.categories ?? [],
          number: String(index + 1).padStart(2, "0"),
          primary,
          tint: `${primary}1A`,
          tilt,
          rowOffset,
        };
      });
  });

  const threadLinks = computed<ThreadLink[]>(() => {
    return posts.value.slice(0, -1).map((post, index) => ({
      from: cardNodes.value[index] ?? null,
      to: cardNodes.value[index + 1] ?? null,
      key: `${post.id}-${index}`,
    }));
  });

  const setCardNode = (index: number, node: unknown) => {
    cardNodes.value[index] = node instanceof HTMLElement ? node : null;
  };

  watch(
    () => posts.value.length,
    (length) => {
      cardNodes.value = cardNodes.value.slice(0, length);
    },
  );
</script>

<template>
  <section class="relative left-1/2 w-[min(100vw-1.5rem,90rem)] -translate-x-1/2 py-8 lg:py-10">
    <header class="mb-8 text-center lg:mb-10">
      <h1 class="text-4xl font-semibold tracking-tight text-zinc-900 lg:text-5xl">Practical Product Notes</h1>
      <p class="mx-auto mt-3 max-w-2xl text-zinc-600">
        Sharp lessons on UX, frontend engineering, and conversion-focused decisions from real builds.
      </p>
    </header>

    <div ref="boardRef" class="relative mx-auto w-full rounded-[2rem] px-2 pb-8 pt-3 sm:px-4 lg:px-6">
      <BlogThreadConnections :container="boardRef" :links="threadLinks" stroke="rgba(89,86,233,0.62)"
        :stroke-width="2.4" dasharray="7 9" :min-wobble="20" :max-wobble="48" :inset="24" />

      <ul class="relative z-20 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 sm:gap-y-14 lg:gap-x-8 lg:gap-y-16">
        <li v-for="(post, index) in posts" :key="post.id" class="flex items-start justify-center"
          :style="{ marginTop: `${post.rowOffset}px` }">
          <div :ref="(node: HTMLElement | null) => setCardNode(index, node)" class="w-fit">
            <BlogPinCard :to="post.path" :title="post.title" :description="post.description" :number="post.number"
              :primary="post.primary" :tint="post.tint" :date-text="post.dateText" :tags="post.tags" :tilt="post.tilt"
              class="w-[clamp(10.75rem,44vw,19rem)] min-w-[10.75rem] max-h-[32rem]" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

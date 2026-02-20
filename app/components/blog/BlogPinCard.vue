<script setup lang="ts">
  interface BlogPost {
    id: string;
    path: string;
    title: string;
    description: string;
    date: string;
    categories?: string[];
  }

  const props = defineProps<{
    post: BlogPost;
    index: number;
  }>();

  const formatDate = (value: string) => {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const tiltForPost = (key: string) => {
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const h = hash >>> 0;
    const u = ((Math.sin(h * 12.9898) * 43758.5453) % 1 + 1) % 1;
    const sign = u < 0.5 ? -1 : 1;
    const mag = ((Math.sin(h * 99.132) * 43758.5453) % 1 + 1) % 1;
    const magnitude = 1.6 + mag * (5.8 - 1.6);
    return Number((sign * magnitude).toFixed(2));
  };

  const number = computed(() => String(props.index + 1).padStart(2, "0"));
  const primary = computed(() => COLORS[props.index % COLORS.length] ?? "#5956e9");
  const tint = computed(() => `${primary.value}1A`);
  const dateText = computed(() => formatDate(props.post.date));
  const tags = computed(() => props.post.categories ?? []);
  const tilt = computed(() => tiltForPost(`${props.post.id}:${props.index}`));

  const linkStyle = computed(() => ({
    transform: `rotate(${tilt.value}deg)`,
  }));

  const hexToRgb = (hex: string) => {
    const normalized = hex.replace("#", "");
    const value =
      normalized.length === 3
        ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
        : normalized;

    const r = Number.parseInt(value.slice(0, 2), 16);
    const g = Number.parseInt(value.slice(2, 4), 16);
    const b = Number.parseInt(value.slice(4, 6), 16);

    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
      return { r: 255, g: 90, b: 80 };
    }

    return { r, g, b };
  };

  const hexToHue = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;

    if (delta === 0) {
      return 0;
    }

    let hue = 0;

    if (max === rn) {
      hue = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      hue = (bn - rn) / delta + 2;
    } else {
      hue = (rn - gn) / delta + 4;
    }

    const degrees = hue * 60;
    return Math.round(degrees < 0 ? degrees + 360 : degrees);
  };

  const noteWrapperStyle = computed(() => {
    const { r, g, b } = hexToRgb(primary.value);
    return {
      background: `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.22) 0%, rgba(255,255,255,0.98) 100%)`,
    };
  });

  const noteStyle = computed(() => {
    const { r, g, b } = hexToRgb(primary.value);
    return {
      border: "1px solid transparent",
      background: `
        linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.085) 0%, rgba(${r}, ${g}, ${b}, 0.06) 52%, rgba(${r}, ${g}, ${b}, 0.014) 100%) padding-box,
        linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(${r}, ${g}, ${b}, 0.22) 100%) border-box
      `,
    };
  });

  const pinImageStyle = computed(() => {
    const hue = hexToHue(primary.value);
    const { r, g, b } = hexToRgb(primary.value);

    return {
      filter: `hue-rotate(${hue}deg) saturate(1.16) brightness(1.02) drop-shadow(0 6px 6px rgba(0, 0, 0, 0.24)) drop-shadow(0 0 11px rgba(${r}, ${g}, ${b}, 0.55))`,
    };
  });
</script>

<template>
  <NuxtLink :to="post.path" :style="linkStyle"
    class="group relative block h-fit max-h-[32rem] overflow-visible rounded-[2rem] border border-zinc-100 bg-[#fcfcfd] px-4 pb-4 pt-16 shadow-[0_22px_45px_rgba(15,23,42,0.14)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
    <span class="pointer-events-none absolute left-1/2 -top-1 z-20 h-[3.6rem] w-[3.6rem] -translate-x-1/2">
      <img src="/push-pin.png" alt="" aria-hidden="true" class="h-full w-full object-contain" :style="pinImageStyle" />
    </span>

    <div class="rounded-[1.35rem] p-[1.25px]" :style="noteWrapperStyle">
      <article class="rounded-[1.27rem] px-4 py-4" :style="noteStyle">
        <p class="blog-card-number" :style="{ color: primary }">
          {{ number }}
        </p>
        <h2 class="mt-2 text-base font-semibold leading-tight tracking-tight text-zinc-900">
          {{ post.title }}
        </h2>
        <p class="mt-2.5 text-sm leading-relaxed text-zinc-700">
          {{ post.description }}
        </p>
        <div class="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs leading-snug text-zinc-600">
          <span>{{ dateText }}</span>
          <span v-for="tag in tags" :key="tag"
            class="rounded-full bg-white/75 px-1.5 py-0.5 text-xs font-medium leading-none tracking-wide">
            {{ tag }}
          </span>
        </div>
      </article>
    </div>
  </NuxtLink>
</template>

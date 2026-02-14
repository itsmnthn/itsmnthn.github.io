<script setup lang="ts">
type NodeLink = {
  from: HTMLElement | null;
  to: HTMLElement | null;
  key?: string | number;
};

type ResolvedLink = {
  from: HTMLElement;
  to: HTMLElement;
  key: string;
};

const props = withDefaults(
  defineProps<{
    container: HTMLElement | null;
    nodes?: Array<HTMLElement | null>;
    links?: NodeLink[];
    stroke?: string;
    strokeWidth?: number;
    dasharray?: string;
    minWobble?: number;
    maxWobble?: number;
    inset?: number;
  }>(),
  {
    nodes: () => [],
    links: () => [],
    stroke: "rgba(118,116,238,0.56)",
    strokeWidth: 2,
    dasharray: "8 10",
    minWobble: 16,
    maxWobble: 42,
    inset: 16,
  },
);

type ThreadPath = {
  key: string;
  d: string;
  delay: number;
};

const canvasSize = ref({ width: 0, height: 0 });
const threadPaths = ref<ThreadPath[]>([]);

let resizeObserver: ResizeObserver | null = null;
let buildRaf = 0;

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

const resolvedLinks = computed<ResolvedLink[]>(() => {
  if (props.links.length > 0) {
    return props.links
      .filter((link): link is { from: HTMLElement; to: HTMLElement; key?: string | number } => {
        return Boolean(link.from && link.to);
      })
      .map((link, index) => ({
        from: link.from,
        to: link.to,
        key: String(link.key ?? index),
      }));
  }

  const nodes = props.nodes.filter((node): node is HTMLElement => Boolean(node));
  const sequentialLinks: ResolvedLink[] = [];

  for (let index = 0; index < nodes.length - 1; index++) {
    const from = nodes[index];
    const to = nodes[index + 1];

    if (!from || !to) {
      continue;
    }

    sequentialLinks.push({
      from,
      to,
      key: `sequential-${index}`,
    });
  }

  return sequentialLinks;
});

const buildPaths = () => {
  const container = props.container;

  if (!container) {
    canvasSize.value = { width: 0, height: 0 };
    threadPaths.value = [];
    return;
  }

  const containerRect = container.getBoundingClientRect();

  canvasSize.value = {
    width: container.clientWidth,
    height: container.clientHeight,
  };

  threadPaths.value = resolvedLinks.value.map((link, index) => {
    const fromRect = link.from.getBoundingClientRect();
    const toRect = link.to.getBoundingClientRect();

    const fromCenterX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const toCenterX = toRect.left + toRect.width / 2 - containerRect.left;
    const goesRight = fromCenterX < toCenterX;

    const sideInset = Math.max(props.inset, 0);
    const startX = goesRight
      ? fromRect.right - containerRect.left - sideInset
      : fromRect.left - containerRect.left + sideInset;
    const endX = goesRight
      ? toRect.left - containerRect.left + sideInset
      : toRect.right - containerRect.left - sideInset;

    const baseSeed = hashString(`${link.key}:${Math.round(fromCenterX)}:${Math.round(toCenterX)}:${index}`);
    const startYRatio = 0.5 + seededBetween(baseSeed + 1, -0.03, 0.03);
    const endYRatio = 0.5 + seededBetween(baseSeed + 2, -0.03, 0.03);

    const startY = fromRect.top - containerRect.top + fromRect.height * startYRatio;
    const endY = toRect.top - containerRect.top + toRect.height * endYRatio;

    const arcPull = Math.abs(endX - startX) * seededBetween(baseSeed + 3, 0.34, 0.56);
    const wobble = seededBetween(baseSeed + 4, props.minWobble, props.maxWobble);
    const wobbleSign = seededUnit(baseSeed + 5) > 0.5 ? 1 : -1;

    const c1x = goesRight ? startX + arcPull : startX - arcPull;
    const c2x = goesRight ? endX - arcPull : endX + arcPull;
    const midpointY = (startY + endY) / 2;
    const c1y = midpointY - wobble * wobbleSign;
    const c2y = midpointY + wobble * wobbleSign;

    return {
      key: link.key,
      d: `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`,
      delay: seededBetween(baseSeed + 6, -8, 0),
    };
  });
};

const scheduleBuildPaths = () => {
  if (buildRaf) {
    return;
  }

  buildRaf = requestAnimationFrame(() => {
    buildRaf = 0;
    buildPaths();
  });
};

const bindObservers = () => {
  if (!resizeObserver) {
    return;
  }

  resizeObserver.disconnect();

  if (props.container) {
    resizeObserver.observe(props.container);
  }

  resolvedLinks.value.forEach((link) => {
    resizeObserver?.observe(link.from);
    resizeObserver?.observe(link.to);
  });
};

const refresh = async () => {
  await nextTick();
  bindObservers();
  scheduleBuildPaths();
};

onMounted(async () => {
  resizeObserver = new ResizeObserver(() => {
    scheduleBuildPaths();
  });

  await refresh();

  window.addEventListener("resize", scheduleBuildPaths, { passive: true });
  window.addEventListener("scroll", scheduleBuildPaths, { passive: true });
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;

  if (buildRaf) {
    cancelAnimationFrame(buildRaf);
    buildRaf = 0;
  }

  window.removeEventListener("resize", scheduleBuildPaths);
  window.removeEventListener("scroll", scheduleBuildPaths);
});

watch(
  () => props.container,
  () => {
    void refresh();
  },
);

watch(resolvedLinks, () => {
  void refresh();
});
</script>

<template>
  <svg
    v-if="canvasSize.width > 0 && canvasSize.height > 0"
    class="pointer-events-none absolute inset-0 z-10"
    :viewBox="`0 0 ${canvasSize.width} ${canvasSize.height}`"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      v-for="(path, index) in threadPaths"
      :key="`thread-base-${path.key}-${index}`"
      class="thread-base"
      :d="path.d"
      :stroke="stroke"
      :stroke-width="Math.max(strokeWidth - 0.7, 1)"
      stroke-linecap="round"
    />
    <path
      v-for="(path, index) in threadPaths"
      :key="`thread-dash-${path.key}-${index}`"
      class="thread-path"
      :d="path.d"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="dasharray"
      :style="{ animationDelay: `${path.delay}s` }"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.thread-base {
  fill: none;
  opacity: 0.28;
}

.thread-path {
  fill: none;
  animation: threadShift 16s linear infinite;
}

@keyframes threadShift {
  to {
    stroke-dashoffset: -40;
  }
}
</style>

<script setup lang="ts">
// explicit imports: OG images render in dev without auto-imports
import { computed } from "vue";
import { hexToHue, hexToRgb } from "~/utils/colors";

// the pinned note from the production logs list (ProductionLogPinCard), sized for share images
const props = defineProps<{
  accent: string;
}>();

const rgb = computed(() => {
  const { r, g, b } = hexToRgb(props.accent);
  return `${r}, ${g}, ${b}`;
});
</script>

<template>
  <div class="relative flex flex-col rounded-4xl border border-zinc-100 bg-white px-4 pt-16 pb-4 shadow-2xl">
    <img
      src="/push-pin.png"
      alt=""
      class="absolute -top-1 left-1/2 size-16 -translate-x-1/2"
      :style="{
        filter: `hue-rotate(${hexToHue(accent)}deg) saturate(1.16) drop-shadow(0 6px 6px rgba(0, 0, 0, 0.24)) drop-shadow(0 0 11px rgba(${rgb}, 0.55))`,
      }"
    />
    <div
      class="flex min-h-0 flex-col rounded-3xl p-0.5"
      :style="{ backgroundImage: `linear-gradient(180deg, rgba(${rgb}, 0.22), rgba(255, 255, 255, 0.98))` }"
    >
      <div
        class="flex min-h-0 flex-col overflow-hidden rounded-3xl bg-white p-5"
        :style="{
          backgroundImage: `linear-gradient(180deg, rgba(${rgb}, 0.09), rgba(${rgb}, 0.06) 52%, rgba(${rgb}, 0.015))`,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();

  const isHome = computed(() => route.path === "/");
  const isBlog = computed(() => route.path === "/blog" || route.path.startsWith("/blog/"));
</script>

<template>
  <div class="min-h-screen text-zinc-900">
    <main>
      <slot />
    </main>
  </div>
</template>

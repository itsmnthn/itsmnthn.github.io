<script setup lang="ts">
  const route = useRoute();
  const isCompact = ref(false);

  const isActive = (path: "/" | "/blog") => {
    if (path === "/") {
      return route.path === "/";
    }

    return route.path === "/blog" || route.path.startsWith("/blog/");
  };

  const updateCompactState = () => {
    isCompact.value = window.scrollY > 24;
  };

  onMounted(() => {
    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateCompactState);
  });
</script>

<template>
  <div class="sticky top-4 z-50 flex justify-center px-4">
    <nav :class="[
      'inline-flex items-center rounded-full border backdrop-blur-xl transition-all duration-300',
      'border-primary/25 bg-white/80 text-zinc-900 shadow-sm shadow-primary/20',
      'dark:border-primary/40 dark:bg-zinc-900/80 dark:text-zinc-100 dark:shadow-black/30',
      isCompact ? 'gap-1 px-2 py-1.5' : 'gap-2 px-3 py-2',
    ]" aria-label="Primary navigation">
      <NuxtLink to="/" :class="[
        'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
        isCompact ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
        isActive('/')
          ? 'bg-primary text-white'
          : 'text-zinc-700 hover:bg-primary/10 hover:text-primary dark:text-zinc-200 dark:hover:bg-primary/20 dark:hover:text-primary',
      ]">
        Home
      </NuxtLink>
      <NuxtLink to="/blog" :class="[
        'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
        isCompact ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
        isActive('/blog')
          ? 'bg-primary text-white'
          : 'text-zinc-700 hover:bg-primary/10 hover:text-primary dark:text-zinc-200 dark:hover:bg-primary/20 dark:hover:text-primary',
      ]">
        Blog
      </NuxtLink>
    </nav>
  </div>
</template>

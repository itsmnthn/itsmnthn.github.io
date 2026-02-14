<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="flex justify-center px-4 pb-8">
    <div
      class="inline-flex items-center gap-3 rounded-full border border-primary/25 bg-white/80 px-4 py-2 text-xs text-zinc-700 shadow-sm shadow-primary/20 backdrop-blur-xl dark:border-primary/40 dark:bg-zinc-900/80 dark:text-zinc-300 dark:shadow-black/30"
    >
      <span class="font-medium text-primary">© {{ currentYear }}</span>
      <span class="h-3 w-px bg-primary/35" aria-hidden="true" />
      <a
        href="https://twitter.com/itsmnthn"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full px-2 py-1 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary"
      >
        Twitter
      </a>
      <a
        href="https://www.linkedin.com/in/itsmnthn"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full px-2 py-1 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary"
      >
        LinkedIn
      </a>
    </div>
  </footer>
</template>

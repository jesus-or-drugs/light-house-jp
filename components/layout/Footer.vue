<template>
  <footer class="text-muted-foreground py-6 md:px-8 md:py-10">
    <MDC :value="$t(footer.credits)" class="text-sm text-zinc-500 text-center" unwrap="p" />
  </footer>
</template>

<script setup lang="ts">
const { footer } = useConfig().value;
</script>

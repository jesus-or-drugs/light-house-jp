<template>
  <header
    class="bg-background/80 sticky top-0 z-40 backdrop-blur-lg"
    :class="{ 'border-b': config.header.border }"
  >
    <div
      class="flex h-14 items-center justify-between gap-2 px-4 md:px-8"
      :class="{
        'container max-w-screen-2xl': config.main.padded,
      }"
    >
      <LayoutHeaderLogo class="hidden flex-1 md:flex" />
      <LayoutMobileNav />
      <LayoutHeaderLogo v-if="config.header.showTitleInMobile" class="flex md:hidden" />
      <LayoutHeaderNav class="hidden flex-1 lg:flex" />
    </div>
    <div
      v-if="baseRouteName !== 'index' && config.aside.levelStyle === 'header'"
      class="md:mt-2 md:px-8"
      :class="{
        'md:container md:max-w-screen-2xl': config.main.padded,
      }"
    >
      <LayoutHeaderTopLevelNav />
    </div>
    <div v-if="showToc" class="lg:hidden">
      <LayoutToc is-small />
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useConfig();
const { i18nEnabled, localePath } = useI18nDocs();
const { page } = useContent();

const showToc = computed(() => {
  return config.value.toc.enable
    && config.value.toc.enableInMobile
    && (page.value?._path === '/' ? config.value.toc.enableInHomepage : true);
});

const route = useRoute();
const baseRouteName = computed(() => useRouteBaseName()(route));
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const q = ref("");
const router = useRouter();

onMounted(() => {
  console.log("[SearchBar] mounted");
})

const go = async () => {
  const v = q.value.trim();
  console.log("[SearchBar] go:", v);
  if (!v) return;
  await router.push({ path: "/substances", query: { q: v } });
}
</script>


<template>
  <div class="mx-auto w-full max-w-4xl">
    <div class="flex items-stretch overflow-hidden rounded-full border-8 border-black bg-white">
      <input
        v-model="q"
        id="substance-text-box"
        name="substance-text-box"
        type="search"
        placeholder="通称, IUPAC名など"
        class="w-full bg-transparent px-10 py-7 text-4xl text-gray-900 placeholder:text-gray-400 outline-none"
        v-on:keydown.enter.prevent="go()"
      />

      <button
        id="substance-button"
        name="substance-button"
        type="button"
        v-on:click="go()"
        class="shrink-0 bg-orange-600 px-14 py-7 text-4xl font-medium text-white transition hover:bg-orange-700 active:bg-orange-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300"
      >
        Search
      </button>
    </div>
  </div>
</template>


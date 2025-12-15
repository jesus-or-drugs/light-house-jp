<template>
  <form
    class="mx-auto w-full max-w-4xl"
    @submit.prevent="onSubmit"
  >
    <div
      class="flex items-stretch overflow-hidden rounded-full border-8 border-black bg-white"
    >
      <input
        v-model="q"
        type="search"
        placeholder="通称, 製品名, IUPAC名など..."
        class="w-full bg-transparent px-10 py-7 text-4xl text-gray-900 placeholder:text-gray-400 outline-none"
        aria-label="検索"
      />

      <button
        type="submit"
        class="shrink-0 bg-orange-600 px-14 py-7 text-4xl font-medium text-white transition hover:bg-orange-700 active:bg-orange-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300"
      >
        検索
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"

const q = ref("")

const onSubmit = () => {
  // ここを好きに差し替え
  // 例：ページ遷移（/search?q=...）
  // navigateTo({ path: "/search", query: { q: q.value } })

  console.log("search:", q.value)
}
</script>

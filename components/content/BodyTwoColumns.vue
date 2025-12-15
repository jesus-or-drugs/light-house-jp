<script setup lang="ts">
const { data: notices } = await useAsyncData('notices-home', () =>
  queryContent('/notices')
    .sort({ date: -1 })
    .limit(8)
    .only(['title', 'date', '_path'])
    .find()
)

const { data: news } = await useAsyncData('news-home', () =>
  queryContent('/news')
    .sort({ date: -1 })
    .limit(8)
    .only(['title', 'date', 'description', '_path'])
    .find()
)

const fmt = (d?: string) => (d ? new Date(d).toISOString().slice(0, 10) : '')
</script>

<template>

    <!-- 2 columns -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">

        <aside class="lg:col-span-4 border-4px border-white">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-lg font-semibold">お知らせ</h2>
                <NuxtLink to="/notices" class="text-sm underline underline-offset-4">
                    すべて
                </NuxtLink>
            </div>

            <ul class="space-y-2">
            <li v-for="n in notices" :key="n._path" class="border rounded-lg p-4">
                <div class="text-xs text-muted-foreground">{{ fmt(n.date) }}</div>
                <NuxtLink :to="n._path" class="block font-medium hover:underline">
                {{ n.title }}
                </NuxtLink>
            </li>
            </ul>
        </aside>

      <!-- Right: News -->
      <section class="lg:col-span-8 border-4px border-white">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold">ニュース記事</h2>
          <NuxtLink to="/news" class="text-sm underline underline-offset-4">
            すべて
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article
            v-for="a in news"
            :key="a._path"
            class="border rounded-lg p-5 hover:shadow-sm transition"
          >
            <div class="text-xs text-muted-foreground mb-1">{{ fmt(a.date) }}</div>
            <NuxtLink :to="a._path" class="block font-semibold hover:underline">
              {{ a.title }}
            </NuxtLink>
            <p v-if="a.description" class="mt-2 text-sm text-muted-foreground line-clamp-3">
              {{ a.description }}
            </p>
          </article>
        </div>
      </section>
    </div>
</template>

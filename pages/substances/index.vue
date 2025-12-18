<template>
  <section class="substances-page">
    <h1>サブスタンス検索</h1>

    <!-- 状態表示 -->
    <div v-if="pending">検索中…</div>
    <div v-else-if="error">エラーが発生しました</div>

    <!-- 検索結果 -->
    <div v-else>
      <p v-if="data?.results?.length === 0">
        該当するサブスタンスは見つかりませんでした。
      </p>

      <ul v-else class="substance-list">
        <li
          v-for="item in data.results"
          :key="item.id"
        >
          <NuxtLink :to="`/substances/${item.id}`">
            <strong>{{ item.name.ja }}</strong>
          </NuxtLink>

          <p class="summary">
            {{ item.summary }}
          </p>

          <small v-if="item.legal?.jp">
            法的区分：{{ item.legal.jp.status }}
          </small>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const { page } = useContent();
const config = useConfig();
const appConfig = useAppConfig();

const route = useRoute();

/**
 * URLクエリをそのままAPIに渡す
 * /substances?q=Ecstasy
 */
const query = computed(() => ({
  q: route.query.q,
  category: route.query.category,
  status: route.query.status,
}));

const { data, pending, error } = await useFetch("/server/api/substances", {
  query,
});

useSeoMeta({
  title: `${page.value?.title ?? '404'}｜${config.value.site.name}`,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
  ogImage: config.value.site.ogImage,
  twitterCard: 'summary_large_image',
});
</script>
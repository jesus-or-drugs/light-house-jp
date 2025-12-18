<!-- pages/substances/[id].vue -->

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full bg-zinc-600 m-6 p-6 rounded-lg">

    <section id="substance_image" class="mx-auto">
      <div class="mx-auto my-auto">
        <span
        v-if="substance.pubchem_cid === null" <!-- PubChemのCIDがわからなければSMILESで画像を取得 -->
        ><img :src="smilesToCid(substance.smailes)" alt="{$slot.id}化学構造式" /></span>
        <span
        v-else
        ><img :src="cidToPngUrl(substance.pubchem_cid)" alt="化学構造式" /></span>
      </div>
    </section>

    <section id="basics" class="">
      <h1 class="text-2xl font-bold mb-4">
        {{ substance.name.ja }}
      </h1>

      <div>
        <h2 class="inline-block mb-1 text-lg">カテゴリ：</h2>
        <p><span v-for="category in substance.categories" :class="mx-2"
        >{{ category }}</span></p>
      </div>

      <h2 class="inline-block mb-1 text-lg">IUPAC名:</h2>
      <p>{{ substance.IUPAC_name }}</p>

      <h2 id="regulation_badges" class="inline-block mb-1 text-lg">法規制：</h2>
      <p>{{ substance.legal.jp.key }}</p>

      <h2 class="inline-block mb-1 text-lg">エイリアス:</h2>
      <ul class="inline-block list-none p-0 m-0">
        <li v-for="(alias, index) in substance.aliases"
        :key="alias"
        class= "mr-3 p-2 rounded-md text-white"
        >
          {{ alias }}
          <span v-if="index < substance.aliases.length - 1">,</span>
        </li>
      </ul>      
    </section>

    <section class="md:col-span-2">
      <div>
        <h2>概要</h2>
        <p>{{ substance.summary }}</p>
      </div>

      <div>
        <h2>効果</h2>
        <p>ポジティブな作用：{{ substance.effects.effects_positive }}</p>
        <p>ネガティブな作用：{{ substance.effects.effects_negative }}</p>
      </div>
      
      <div>
        <h2>用法用量・持続時間</h2>
        <p>{{ substance.external_resources.dosage_duration}}</p>
      </div>


      <div v-if="substance.history !== ''">
        <h2 v-if="substance.history !== ''">経験談</h2>
        <p v-if="substance.history !== ''">{{substance.external_resources.experiences}}</p>

      </div>

      <div>
        <h2></h2>
        <p>{{ substance.external_resources.experiences }}</p>
      </div>

    </section>
  </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

// JSON を動的に読む
const substance = await import(`~/data/substances/${id}.json`)
  .then(m => m.default)


async function smilesToCid(smiles : string) {
  const res = await fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/cids/JSON", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams({ smiles }),
  });
  const data = await res.json();
  return data?.IdentifierList?.CID?.[0] ?? null;
}

function cidToPngUrl(cid: string, size = "300x300") {
  return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/PNG?image_size=${size}`;
}

</script>

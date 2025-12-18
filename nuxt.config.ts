// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  i18n: {
    defaultLocale: 'ja',
    locales: [
      {
        code: 'ja',
        name: 'Japanese',
        language: 'ja-JP',
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "dayjs/dayjs.min.mjs": "dayjs/esm",
        "dayjs/dayjs.min.js": "dayjs/esm",
        "dayjs/dayjs.min": "dayjs/esm",
        dayjs: "dayjs/esm"
      }
    },
    optimizeDeps: {
      include: ["dayjs"]
    }
  },

  compatibilityDate: '2024-07-06',
});

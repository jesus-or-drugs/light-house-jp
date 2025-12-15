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
  compatibilityDate: '2024-07-06',
});

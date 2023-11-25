// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vue-sonner']
  },
  devtools: {
    enabled: true // or false to disable
  },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-icon', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  googleFonts: {
    families: {
      "IBM+Plex+Sans+Thai": [300, 400, 500, 700],
    },
    display: "swap",
    preload: true,
  },
  runtimeConfig: {
    public: {
      api: process.env.API_URL || "https://api.somsritshirt.com",
      appName: process.env.APP_NAME || "ติดตามการผลิตสมศรีมีเสื้อ",
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'th',
      },
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicon/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/favicon/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/favicon/safari-pinned-tab.svg',
          color: '#a52241',
        },
      ],
      meta: [
        {
          name: 'msapplication-TileColor',
          content: '#a52241',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
    },
  },
  build: {
    transpile: ['vue-sonner'],
  },
  bugsnag: {
    publishRelease: true,
    config: {
      apiKey: '0fac704cfb3ce9f3b5c9b90eea9e7264',
      releaseStage: process.env.NODE_ENV ? process.env.NODE_ENV : 'production',
      enabledReleaseStages: ['staging', 'production'],
    },
  },
  devtools: {
    enabled: true, // or false to disable
  },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-icon', '@nuxtjs/color-mode', 'nuxt-bugsnag'],
  colorMode: {
    classSuffix: '',
  },
  googleFonts: {
    families: {
      'IBM+Plex+Sans+Thai': [300, 400, 500, 700],
    },
    display: 'swap',
    preload: true,
  },
  runtimeConfig: {
    public: {
      api: process.env.API_URL || 'https://old-api.somsritshirt.com',
      // api: process.env.API_URL || 'http://localhost:3333',
      appName: process.env.APP_NAME || 'ติดตามการผลิตสมศรีมีเสื้อ',
    },
  },
});

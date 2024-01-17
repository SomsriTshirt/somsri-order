<script setup lang="ts">
import { Toaster } from 'vue-sonner';
useSeoMeta({
  description: 'ระบบติดตามการผลิตของสมศรีมีเสื้อ',
  ogDescription: 'ระบบติดตามการผลิตของสมศรีมีเสื้อ',
  ogImage: '/favicon/android-chrome-256x256.png',
  twitterDescription: 'ระบบติดตามการผลิตของสมศรีมีเสื้อ',
  twitterImage: '/favicon/android-chrome-256x256.png',
  twitterCard: 'summary',
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ระบบติดตามการผลิต` : 'ระบบติดตามการผลิต';
  },
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
});

const { $hotjar }: any = useNuxtApp();

const toastOptions = ref({
  style: { fontFamily: 'IBM Plex Sans Thai', fontSize: '1rem' },
});

// ON MOUNTED
onMounted(() => {
  // INIT HOTJAR
  $hotjar();
});
</script>
<template>
  <ColorScheme>
    <div>
      <NuxtPage />
      <ClientOnly>
        <Toaster position="top-right" :toast-options="toastOptions" :duration="30000" rich-colors close-button />
      </ClientOnly>
    </div>
  </ColorScheme>
</template>

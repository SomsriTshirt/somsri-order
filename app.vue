<script setup lang="ts">
const toastOptions = ref({
  style: { fontFamily: 'IBM Plex Sans Thai', fontSize: '1rem' },
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

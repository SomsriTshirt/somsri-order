<script setup lang="ts">
// VARIABLE
const colorMode = useColorMode();
const themeMode = ref<string>(colorMode.preference);

// COMPUTED
const logoSrc = computed(() => {
  switch (themeMode.value) {
    case 'light':
      return '/image/logo-red.png';
    case 'dark':
      return '/image/logo-white.png';
    case 'system':
      if (colorMode.value === 'dark') {
        return '/image/logo-white.png';
      } else {
        return '/image/logo-red.png';
      }
  }
});

// WATCH
watch(themeMode, (newVal) => {
  localStorage.setItem('nuxt-color-mode', newVal);
  colorMode.preference = newVal;
});
</script>
<template>
  <nav class="bg-white dark:bg-black shadow">
    <div class="navbar container mx-auto px-6">
      <div class="flex-1">
        <NuxtLink to="/">
          <img :src="logoSrc" class="w-32" />
        </NuxtLink>
      </div>
      <div class="flex-none">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost border border-neutral-200 dark:border-neutral-800 capitalize">
            <IconCSS name="material-symbols:format-paint-outline-rounded" size="1.5rem"></IconCSS>
            {{ themeMode }}
            <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </label>
          <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-100 border border-neutral-200 dark:border-neutral-800 rounded-box w-52">
            <li>
              <input v-model="themeMode" type="radio" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light" />
            </li>
            <li>
              <input v-model="themeMode" type="radio" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" />
            </li>
            <li>
              <input v-model="themeMode" type="radio" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="System" value="system" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

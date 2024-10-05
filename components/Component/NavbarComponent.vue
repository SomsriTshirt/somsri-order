<script setup lang="ts">
import { SelectValue, SelectTrigger, Select, SelectContent, SelectGroup, SelectItem } from '../ui/select';

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
        default:
            return '/image/logo-red.png';
    }
});

// WATCH
watch(themeMode, (newVal) => {
    localStorage.setItem('nuxt-color-mode', newVal);
    colorMode.preference = newVal;
});
</script>
<template>
    <nav class="bg-white dark:bg-stone-950 shadow py-3">
        <div class="flex justify-between gap-3 container px-6">
            <div>
                <NuxtLink to="/">
                    <img :src="logoSrc" class="w-32" alt="สมศรีมีเสื้อ" />
                </NuxtLink>
            </div>
            <div>
                <Select v-model="themeMode">
                    <SelectTrigger>
                        <IconCSS class="mr-1" size="1.5rem" name="material-symbols:format-paint-outline-rounded" />
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </nav>
</template>

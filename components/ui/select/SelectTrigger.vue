<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'dark:text-white flex h-10 w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:placeholder:text-stone-400 dark:focus:ring-stone-300',
                props.class,
            )
        "
    >
        <slot />
        <SelectIcon as-child>
            <ChevronDown class="w-4 h-4 opacity-50 shrink-0" />
        </SelectIcon>
    </SelectTrigger>
</template>

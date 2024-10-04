<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { PinInputInput, type PinInputInputProps, useForwardProps } from 'radix-vue';
import { cn } from '@/lib/utils';

const props = defineProps<PinInputInputProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <PinInputInput
        v-bind="forwardedProps"
        :class="
            cn(
                'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-300 relative text-center focus:outline-none focus:ring-2 focus:ring-stone-950 focus:relative focus:z-10 flex h-10 w-10 items-center justify-center border-y border-r border-stone-200 text-sm transition-all first:rounded-l-xl first:border-l last:rounded-r-xl dark:focus:ring-stone-300 dark:border-stone-950',
                props.class,
            )
        "
    />
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import type { StepperIndicatorProps } from 'radix-vue'
import { StepperIndicator, useForwardProps } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<StepperIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperIndicator
    v-bind="forwarded"
    :class="cn(
      'inline-flex items-center justify-center rounded-full text-stone-500/50 w-10 h-10 dark:text-stone-400/50',
      // Disabled
      'group-data-[disabled]:text-stone-500 group-data-[disabled]:opacity-50 dark:group-data-[disabled]:text-stone-400',
      // Active
      'group-data-[state=active]:bg-stone-900 group-data-[state=active]:text-stone-50 dark:group-data-[state=active]:bg-stone-50 dark:group-data-[state=active]:text-stone-900',
      // Completed
      'group-data-[state=completed]:bg-stone-100 group-data-[state=completed]:text-stone-900 dark:group-data-[state=completed]:bg-stone-800 dark:group-data-[state=completed]:text-stone-50',
      props.class,
    )"
  >
    <slot />
  </StepperIndicator>
</template>

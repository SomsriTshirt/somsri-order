<script setup lang="ts">
interface Props {
    icon: string,
    stepData: any
}

const props = defineProps<Props>()
const { icon, stepData } = toRefs(props)

// COMPUTED
const getStatusName = computed(() => {
    if (stepData.value) {
        if (stepData.value.done) {
            return `${stepData.value.name}แล้ว`
        }
        else {
            return `รอ${stepData.value.name}`
        }
    }
    else {
        return '-'
    }
})
</script>
<template>
    <div class="flex flex-col items-center">
        <div class="w-32 h-32 mb-3 rounded-full border-4 border-dashed border-black flex justify-center items-center p-5">
            <IconCSS :name="icon" size="4rem"></IconCSS>
        </div>
        <p class="text-lg font-medium">{{ getStatusName }}</p>
        <!-- <template v-if="stepData.done">
            <p>เมื่อ: {{ formatDate(stepData.at) }}</p>
            <p>โดย: {{ stepData.by }}</p>
        </template> -->
    </div>
</template>
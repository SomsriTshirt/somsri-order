<script setup lang="ts">
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
// MODEL
const confirm = defineModel<boolean>({ required: true, default: false });

const formId = useId();
</script>
<template>
    <div class="flex items-center gap-3 p-2 border dark:border-stone-600 rounded-xl mt-5 bg-white dark:bg-stone-800">
        <Checkbox :id="formId" v-model:checked="confirm" class="w-6 h-6" />
        <Label :for="formId" class="underline required text-lg bg-yellow-400 bg-opacity-50 dark:bg-opacity-25"><slot></slot></Label>
    </div>
</template>

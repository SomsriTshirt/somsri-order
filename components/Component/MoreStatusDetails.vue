<script setup lang="ts">
import type { StatusList } from '~/types/Global';
import type { SpecSheet } from '~/types/SpecSheet';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogScrollContent from '../ui/dialog/DialogScrollContent.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import { StepperItem, Stepper, StepperSeparator } from '../ui/stepper';

// PROPS
interface Props {
    specSheet: SpecSheet;
    stepList: StatusList[];
}
const props = defineProps<Props>();
const { stepList, specSheet } = toRefs(props);

// MODEL
const open = defineModel<boolean>('open', { required: true, default: false });

// FUNCTION
function isFinishedStep(step: string): boolean {
    const stId = ref<any>({});
    for (const steps of specSheet.value.workOrders[0].stepList) {
        if (!specSheet.value.workOrders[0].stepData[steps.id].done) {
            stId.value = `${steps.id}`;
            break;
        }
    }
    if (specSheet.value.workOrders[0].stepData[step].done || step === stId.value) {
        return true;
    } else {
        return false;
    }
}
</script>
<template>
    <Dialog v-model:open="open">
        <DialogScrollContent>
            <DialogHeader>
                <DialogTitle>สถานะงานเพิ่มเติม</DialogTitle>
            </DialogHeader>

            <Stepper orientation="vertical">
                <StepperItem v-for="(step, stepI) in stepList" :key="useGenVueKey(step.id)" :step="stepI + 1" :completed="isFinishedStep(step.id)">
                    <div class="flex flex-col items-center w-full">
                        <div class="w-5 h-5 rounded-full" :class="[isFinishedStep(step.id) ? 'bg-green-500' : 'bg-stone-300 dark:bg-stone-600']"></div>
                        <p class="dark:text-stone-300 text-sm text-center">{{ step.label }}</p>
                    </div>

                    <StepperSeparator v-if="stepI !== stepList.length - 1" class="w-full h-px" />
                </StepperItem>
            </Stepper>
        </DialogScrollContent>
    </Dialog>
</template>

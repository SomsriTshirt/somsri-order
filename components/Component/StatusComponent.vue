<script setup lang="ts">
import type { StatusList } from '~/types/Global';
import type { SpecSheet } from '~/types/SpecSheet';
import type { WorkOrder } from '~/types/WorkOrder';
import { StepperItem, Stepper, StepperSeparator } from '../ui/stepper';

// LAZY LOAD
const MoreStatusDetails = defineAsyncComponent(() => import('@/components/Component/MoreStatusDetails.vue'));

// PROPS
interface Props {
    specSheet: SpecSheet;
}
const props = defineProps<Props>();
const { specSheet } = toRefs(props);

// EMIT
type Emit = {
    'reload-spec-sheet': [];
};
defineEmits<Emit>();

// VARIABLE
const stepList = ref<StatusList[]>([]);
const currentStatus = ref<string>('');
const finishAll = ref<boolean>(false);
const moreStatusDetailOpenState = ref<boolean>(false);

// COMPUTED
const haveWorkOrder = computed<boolean>(() => specSheet.value.workOrders.length > 0);
const workOrder = computed<WorkOrder | null>(() => (haveWorkOrder.value ? specSheet.value.workOrders[0] : null));
const progressIcon = computed<string>(() => (finishAll.value ? 'material-symbols:check-small' : 'material-symbols:cut-rounded'));

// SET VARIABLE
finishAll.value = !!workOrder.value?.isFinish;
currentStatus.value = getCurrentStatus();
stepList.value = getStepList();

// FUNCTION
function getCurrentStatus(): string {
    if (specSheet.value.workOrders.length === 0) return 'ไม่ระบุ';

    if (!workOrder.value) return 'ไม่ระบุ';

    for (const step of workOrder.value.stepList) {
        if (!workOrder.value.stepData[step.id].done) {
            return `รอ${step.label}`;
        }
    }

    // GET LAST STEP
    const lastIndex = workOrder.value.stepList.length - 1;
    const lastStep = workOrder.value.stepList[lastIndex];
    return `${lastStep.label}แล้ว`;
}

function getStepList(): StatusList[] {
    return workOrder.value?.stepList.slice(1) || [];
}

function isPassStatus(step: string) {
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
    <div>
        <template v-if="haveWorkOrder">
            <div class="rounded-xl p-5 shadow mb-5" :class="[finishAll ? 'bg-green-500' : 'bg-orange-300']">
                <div class="flex">
                    <div class="flex flex-col items-center">
                        <div
                            class="w-30 h-30 rounded-full border-4 border-orange-800 dark:border-orange-500 border-dashed text-orange-800 dark:text-orange-600 flex justify-center items-center p-5 mr-3"
                        >
                            <IconCSS :name="progressIcon" size="5rem" />
                        </div>
                    </div>
                    <div>
                        <div class="mb-3">
                            <p class="text-white dark:text-blacktext-2xl sm:text-4xl font-bold">สถานะการผลิต</p>
                            <p class="text-black text-xl font-bold">{{ finishAll ? 'การผลิตเสร็จแล้ว' : currentStatus }}</p>
                        </div>
                        <div class="flex flex-col sm:flex-row">
                            <!-- <Button @click="moreStatusDetailOpenState = true">ดูสถานะแบบละเอียด</Button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-600 p-5 shadow">
                <p class="text-xl font-bold mb-5 text-primary-700 dark:text-primary-400">สถานะการผลิตโดยรวม</p>
                <Stepper class="justify-between items-start">
                    <StepperItem v-for="(step, stepI) in stepList" :key="step.label" class="w-full" :step="stepI + 1" :completed="isPassStatus(step.id)">
                        <div class="flex flex-col items-center w-full">
                            <div class="w-5 h-5 rounded-full" :class="[isPassStatus(step.id) ? 'bg-green-500' : 'bg-stone-300 dark:bg-stone-600']"></div>
                            <p class="dark:text-stone-300 text-sm text-center mt-1">{{ step.label }}</p>
                        </div>

                        <StepperSeparator v-if="stepI !== stepList.length - 1" class="w-full h-px" />
                    </StepperItem>
                </Stepper>
            </div>
        </template>

        <div v-else class="rounded-xl p-5 shadow mb-5 bg-orange-300">
            <p class="text-white text-center dark:text-blacktext-2xl sm:text-4xl font-bold">ไม่พบข้อมูลการผลิต</p>
        </div>
        <div class="mt-5">
            <slot />
        </div>
        <!-- MODAL -->
        <Suspense v-if="moreStatusDetailOpenState">
            <MoreStatusDetails v-model:open="moreStatusDetailOpenState" :spec-sheet="specSheet" :step-list="stepList" />
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import MoreStatusDetails from '@/components/Component/MoreStatusDetails.vue';
// PROPS
interface Props {
  specSheet: any;
}
const props = defineProps<Props>();
const { specSheet } = toRefs(props);
const stepList = ref<any[]>([]);
const stepData = ref<any>({});
const finishAll = ref<any>({});

defineEmits(['reload-spec-sheet']);

// VARIABLE
const isLoading = ref<boolean>(true);

function getStepData() {
  let isFinishAll = true;
  if (specSheet.value.workOrders[0]) {
    for (const step of specSheet.value.workOrders[0].stepList) {
      if (!specSheet.value.workOrders[0].stepData[step.id].done) {
        stepData.value = `${step.label}`;
        isFinishAll = false;
        break;
      }
    }
    if (isFinishAll) {
      const lastIndex = specSheet.value.workOrders[0].stepList.length - 1;
      const lastStep = specSheet.value.workOrders[0].stepList[lastIndex];
      finishAll.value = lastStep.label;
    }
  }
}

function getStepList() {
  if (specSheet.value.workOrders[0]) {
    stepList.value = specSheet.value.workOrders[0].stepList.slice(1);
  }
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

// ON MOUNTED
onMounted(() => {
  isLoading.value = false;
  getStepData();
  getStepList();
});
</script>
<template>
  <div v-if="!isLoading">
    <div v-if="stepData.length > 0" class="mb-5">
      <div class="rounded-xl p-5 shadow mb-5 bg-secondary">
        <div class="flex">
          <div class="flex flex-col items-center">
            <div class="w-30 h-30 rounded-full border-4 border-orange-800 dark:border-orange-500 border-dashed text-orange-800 dark:text-orange-600 flex justify-center items-center p-5 mr-3">
              <IconCSS name="material-symbols:cut-rounded" size="4rem"></IconCSS>
            </div>
          </div>
          <div>
            <div class="mb-3">
              <p class="text-white dark:text-blacktext-2xl sm:text-4xl font-bold">สถานะการผลิต</p>
              <p class="text-black text-xl font-bold">รอ{{ stepData }}</p>
            </div>
            <div class="flex flex-col sm:flex-row">
              <button class="btn btn-sm btn-primary" @click="openModal('more-status-details-modal')">ดูสถานะแบบละเอียด</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow">
        <p class="text-xl font-bold mb-5 text-primary">สถานะการผลิตโดยรวม</p>
        <ul class="steps w-full">
          <li v-for="step in stepList" :key="useGenVueKey(step)" class="step" :class="{ 'step-primary': isPassStatus(step.id) }">{{ step.label }}</li>
        </ul>
      </div>
    </div>
    <div v-else-if="finishAll.length > 0" class="rounded-xl p-5 shadow mb-5 bg-green-500 flex">
      <div class="w-30 h-30 rounded-full border-4 border-white border-dashed text-white flex justify-center items-center mr-3">
        <IconCSS name="material-symbols:check-small" size="5rem"></IconCSS>
      </div>
      <p class="text-white p-5 dark:text-blacktext-2xl sm:text-4xl font-bold">การผลิตเสร็จแล้ว</p>
    </div>
    <div v-else class="rounded-xl p-5 shadow mb-5 bg-secondary">
      <p class="text-white text-center dark:text-blacktext-2xl sm:text-4xl font-bold">ไม่พบข้อมูลการผลิต</p>
    </div>
    <slot></slot>
    <!-- MODAL -->
    <MoreStatusDetails :spec-sheet="specSheet" :step-list="stepList" :step-data="stepData"></MoreStatusDetails>
  </div>
</template>

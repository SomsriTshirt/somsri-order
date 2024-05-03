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

defineEmits(['reload-spec-sheet']);

// VARIABLE
const isLoading = ref<boolean>(true);

function getIconName() {
  if (stepData.value === 'ตัด') {
    return 'material-symbols:cut-rounded';
  } else if (stepData.value === 'เย็บ') {
    return 'material-symbols:thread-unread-rounded';
  } else if (stepData.value === 'สกรีน') {
    return 'material-symbols:format-paint-outline-rounded';
  } else {
    return 'material-symbols:package-outline';
  }
}

function getStepData() {
  if (specSheet.value.workOrders[0]) {
    for (const step of specSheet.value.workOrders[0].stepList) {
      if (!specSheet.value.workOrders[0].stepData[step.id].done) {
        stepData.value = `${step.label}`;
        break;
      }
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
    <div class="mb-5">
      <div class="rounded-xl p-5 shadow mb-5 bg-secondary">
        <div class="flex">
          <div class="flex flex-col items-center">
            <div class="w-32 h-32 rounded-full border-4 border-orange-800 dark:border-orange-500 border-dashed text-orange-800 dark:text-orange-600 flex justify-center items-center p-5 mr-3">
              <IconCSS :name="getIconName()" size="4rem"></IconCSS>
            </div>
          </div>
          <div>
            <div class="mb-3">
              <p class="text-white dark:text-blacktext-2xl sm:text-4xl font-bold">สถานะการผลิต</p>
              <p v-if="stepData.length > 0" class="text-black text-xl font-bold">รอ{{ stepData }}</p>
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

    <slot></slot>

    <!-- MODAL -->
    <MoreStatusDetails :spec-sheet="specSheet" :step-list="stepList" :step-data="stepData"></MoreStatusDetails>
  </div>
</template>

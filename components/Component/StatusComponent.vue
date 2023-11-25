<script setup lang="ts">
import ApprovedSample from '@/components/Component/ApprovedSampleModal.vue';
// PROPS
interface Props {
  quotation: any;
  statusList: any;
  statusData: any;
  stepData: any;
}
const props = defineProps<Props>();
const { quotation, statusList, statusData, stepData } = toRefs(props);

defineEmits(['reload-quotation']);

// VARIABLE
const isLoading = ref<boolean>(true);
const currentStatus = ref<any>({});

function getCurrentStatus() {
  for (const status of statusList.value) {
    const { id: statusId } = status;
    const details = statusData.value[statusId];

    // ASSIGN CURRENT STATUS
    if (!details.status) {
      currentStatus.value = status;
      return;
    }
  }

  // FALLBACK TO LASTEST STATUS
  const lastIndex = statusList.value.length - 1;
  currentStatus.value = statusList.value[lastIndex];
}

function isPassStatus(stepId: string) {
  if (currentStatus.value.id === stepId) {
    return true;
  }

  const step = statusData.value[stepId];
  return step.status;
}

// COMPUTED
const isApprovedSampleStep = computed(() => currentStatus.value.id === 'approving_sample');
const isHasMoreStepInGroup = computed(() => {
  const { id: statusId } = currentStatus.value;
  const statusDetails = statusData.value[statusId].details;
  return statusDetails.length > 1;
});
const getCurrentSubStatus = computed(() => {
  const statusId = currentStatus.value.id;
  const stepList = statusData.value[statusId].details;
  for (const { id, name } of stepList) {
    if (!stepData.value[id] || !stepData.value[id].done) {
      return `กำลัง${name}`;
    }
  }
});
const isCompleted = computed(() => {
  const { id: statusId } = currentStatus.value;
  return statusData.value[statusId].status;
});

// ON MOUNTED
onMounted(() => {
  getCurrentStatus();

  isLoading.value = false;
});
</script>
<template>
  <div v-if="!isLoading">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
      <div class="rounded-xl p-5 shadow" :class="{ 'bg-secondary': !isCompleted, 'bg-success': isCompleted }">
        <div class="flex">
          <div class="flex flex-col items-center">
            <div
              v-if="!isCompleted"
              class="w-32 h-32 rounded-full border-4 border-orange-800 dark:border-orange-500 border-dashed text-orange-800 dark:text-orange-600 flex justify-center items-center p-5 mr-3"
            >
              <IconCSS :name="currentStatus.icon" size="4rem"></IconCSS>
            </div>
            <div v-else class="w-32 h-32 rounded-full border-4 border-black border-dashed text-black flex justify-center items-center p-5 mr-3">
              <IconCSS name="material-symbols:check-small-rounded" size="8rem"></IconCSS>
            </div>
          </div>
          <div>
            <div class="mb-3">
              <p v-if="isCompleted" class="text-black text-2xl sm:text-4xl font-bold">{{ currentStatus.name }}แล้ว</p>
              <p v-else class="text-white dark:text-black text-2xl sm:text-4xl font-bold">{{ currentStatus.doing }}</p>
              <p v-if="isHasMoreStepInGroup" class="text-black text-xl">{{ getCurrentSubStatus }}</p>
            </div>
            <div class="flex flex-col sm:flex-row">
              <button v-if="isApprovedSampleStep && !isCompleted" class="btn btn-sm btn-success mb-3 sm:mr-3 sm:mb-0" @click="openModal('approved-sample-modal')">
                <IconCSS name="material-symbols:check-small-rounded" size="1.5rem"></IconCSS>อนุมัติตัวอย่าง
              </button>
              <button class="btn btn-sm btn-primary">ดูเพิ่มเติม</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow">
        <p class="text-xl font-bold mb-5 text-primary">สถานะการผลิตตัวอย่างโดยรวม</p>
        <ul class="steps w-full">
          <li v-for="step in statusList" :key="useGenVueKey(step.id)" class="step" :class="{ 'step-primary': isPassStatus(step.id) }">{{ step.name }}</li>
        </ul>
      </div>
    </div>

    <p class="text-xl mb-5">
      <span class="text-red-500">*</span>ทางบริษัทมีกำหนดการส่งมอบสินค้าภายในวันที่ <span class="underline">{{ formatDate(quotation.delivery_due) }}</span>
    </p>

    <slot></slot>

    <!-- MODAL -->
    <ApprovedSample :id="quotation.id" @reload-quotation="$emit('reload-quotation')"></ApprovedSample>
  </div>
</template>

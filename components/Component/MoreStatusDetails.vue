<script setup lang="ts">
// PROPS
interface Props {
  stepList: any[];
  stepData: any;
}
const props = defineProps<Props>();
const { stepList, stepData } = toRefs(props);

// FUNCTION
function isFinishedStep(stepId: string): boolean {
  const step = stepData.value[stepId];
  return step && step.done;
}
function isShowName(stepId: string): boolean {
  return stepId === 'approved_spec' || stepId === 'approved_sample';
}
</script>
<template>
  <dialog id="more-status-details-modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-xl mb-3">รายละเอียดการผลิต</h3>
      <ul class="steps steps-vertical">
        <template v-for="(step, step_i) in stepList">
          <li v-if="isFinishedStep(step.id)" :key="useGenVueKey(step_i)" class="step step-primary">
            <div class="text-left">
              <p class="font-bold">{{ step.name }}</p>
              <p>
                เมื่อ: <span class="underline">{{ formatDate(stepData[step.id].at) }}</span> เวลา: <span class="underline">{{ formatTime(stepData[step.id].at) }} น.</span>
              </p>
              <p v-if="isShowName(step.id)">โดย {{ stepData[step.id].by }}</p>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

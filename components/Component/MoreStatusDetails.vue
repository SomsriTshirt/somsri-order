<script setup lang="ts">
// PROPS
interface Props {
  specSheet: any;
  stepList: any[];
}
const props = defineProps<Props>();
const { stepList ,specSheet } = toRefs(props);

// FUNCTION
function isFinishedStep(step: string): boolean {
  const stId = ref<any>({});
  for (const steps of specSheet.value.workOrders[0].stepList) {
      if (!specSheet.value.workOrders[0].stepData[steps.id].done) {
        stId.value = `${steps.id}`
        break
      }
  }
  if (specSheet.value.workOrders[0].stepData[step].done || step===stId.value) {
    return true;
  }else{
    return false;
  }
}
</script>
<template>
  <dialog id="more-status-details-modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-xl mb-3">รายละเอียดการผลิต</h3>
      <ul class="steps steps-vertical">
        <template v-for="(step) in stepList" :key="useGenVueKey(step.id)">
          <li class="step" :class="{ 'step-primary': isFinishedStep(step.id) }">
            <div class="text-left">
              <p class="font-bold">{{ step.label }}</p>
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

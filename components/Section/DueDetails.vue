<script setup lang="ts">
interface Props {
  specSheet: any;
}
const props = defineProps<Props>();
const { specSheet } = toRefs(props);

// COMPUTED
const hasSample = computed(() => specSheet.value.sampleConfirmedType !== 'ไม่ต้อง');
const deliveryDateWord = computed(() => {
  if (specSheet.value.project.deliveryType === 'ลูกค้ามารับสินค้าด้วยตนเอง') {
    return 'วันที่รับสินค้า';
  }

  return 'วันที่ส่งสินค้า';
});
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white dark:bg-base-100 shadow rounded-xl border dark:border-neutral-600 p-5">
    <div v-if="hasSample">
      <p class="text-primary text-4xl font-bold">วันที่จัดส่งตัวอย่าง</p>
      <p class="text-2xl">{{ formatDate(specSheet.sampleDue) }}</p>
    </div>
    <div>
      <p class="text-primary text-4xl font-bold">{{ deliveryDateWord }}</p>
      <p class="text-2xl">{{ formatDate(specSheet.project.dueDate) }}</p>
    </div>
  </div>
</template>

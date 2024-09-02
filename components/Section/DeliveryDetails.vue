<script setup lang="ts">
interface Props {
  specSheet: any;
  isApproved: boolean;
}

const props = defineProps<Props>();
const { specSheet, isApproved } = toRefs(props);
const project = ref<any>(specSheet.value.project);

const form: any = inject('form');

// COMPUTED
const totalProduct = computed(() => {
  const orderGroup = specSheet.value.amount;
  let amount: number = 0;
  for (const group of orderGroup) {
    for (const size of group.info) {
      amount += size.amount;
    }
  }

  return amount;
});
const hasSample = computed(() => specSheet.value.sampleType !== 'ไม่ต้อง');
const isRecieveByMyself = computed(() => project.value.deliveryType === 'ลูกค้ามารับสินค้าด้วยตนเอง');
</script>
<template>
  <div v-once>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
      <div v-if="hasSample">
        <p class="font-bold text-xl text-primary mb-3">จัดส่งตัวอย่างที่</p>
        <p class="font-medium">{{ project.customer.fullName }}</p>
        <p class="word-break">{{ project.customer.address }}</p>
      </div>
      <div :class="{ 'col-span-2': !hasSample }">
        <p class="font-bold text-xl mb-3 text-primary">จัดส่งสินค้าที่</p>

        <div v-if="isRecieveByMyself">
          <p class="word-break">โรงงานสมศรีมีเสื้อ</p>
          <p class="font-medium mb-3">รับสินค้าโดยคุณ: {{ project.delivery.fullName }}</p>
          <NuxtLink to="https://maps.app.goo.gl/CqVmTeQdjkc4CBRDA" target="_blank">
            <button class="btn btn-sm btn-primary"><IconCSS name="material-symbols:location-on-outline-rounded" size="1rem"></IconCSS>ดูแผนที่</button>
          </NuxtLink>
        </div>
        <div v-else>
          <p class="font-medium">{{ project.delivery.fullName }}</p>
          <p class="word-break">{{ project.delivery.address }}</p>
        </div>
      </div>
      <div>
        <p class="font-bold text-primary">จำนวน</p>
        <p class="mb-5">{{ totalProduct }} ตัว</p>
        <p class="font-bold text-primary">ประเภทการจัดส่ง</p>
        <p>{{ project.deliveryType }}</p>
      </div>
    </div>
    <div v-if="!isApproved" class="form-control p-2 border dark:border-neutral-600 rounded-xl mt-5 bg-white dark:bg-base-100">
      <label class="label cursor-pointer justify-start">
        <input v-model="form.delivery" type="checkbox" class="checkbox checkbox-primary mr-3" />
        <span class="label-text underline required text-lg bg-yellow-400 bg-opacity-50">ฉันยืนยันว่าข้อมูลการจัดส่งถูกต้อง</span>
      </label>
    </div>
  </div>
</template>

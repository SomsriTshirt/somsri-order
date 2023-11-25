<script setup lang="ts">
interface Props {
  quotation: any;
  isApproved: boolean;
}

const props = defineProps<Props>();
const { quotation, isApproved } = toRefs(props);
const delivery = ref<any>(quotation.value.delivery);
const form: any = inject('form');

// COMPUTED
const totalProduct = computed(() => {
  const orderGroup = quotation.value.produce.amountlist.order;
  let amount: number = 0;
  for (const group of orderGroup) {
    for (const size of group.info) {
      amount += size.amount;
    }
  }

  return amount;
});
</script>
<template>
  <div v-once>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
      <div>
        <p class="font-bold text-xl text-primary mb-3">จัดส่งตัวอย่างที่</p>
        <p class="font-medium">{{ delivery.sample_full_name }}</p>
        <p class="word-break">{{ delivery.sample_address }}</p>
      </div>
      <div>
        <p class="font-bold text-xl mb-3 text-primary">จัดส่งสินค้าที่</p>
        <p class="font-medium">{{ delivery.full_name }}</p>
        <p class="word-break">{{ delivery.address }}</p>
      </div>
      <div>
        <p class="font-bold text-primary">จำนวน</p>
        <p class="mb-5">{{ totalProduct }} ตัว</p>
        <p class="font-bold text-primary">ประเภทการจัดส่ง</p>
        <p>{{ delivery.delivery_type }}</p>
      </div>
    </div>
    <div v-if="!isApproved" class="form-control">
      <label class="label cursor-pointer justify-start">
        <input v-model="form.delivery" type="checkbox" class="checkbox checkbox-primary mr-3" />
        <span class="label-text underline required">ฉันยืนยันว่าข้อมูลการจัดส่งถูกต้อง</span>
      </label>
    </div>
  </div>
</template>

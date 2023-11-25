<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
// PROPS
interface Props {
  quotation: any;
}

// VARIABLE
defineProps<Props>();
const { $toast }: any = useNuxtApp();
const form: any = inject('form');

// VALIDATOR
const isTrue = (value: boolean): boolean => {
  return value;
};

const validatorRules = computed(() => ({
  sewCut: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานตัดและเย็บ และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', isTrue),
  },
  amountlist: {
    required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าข้อมูลไซซ์และจำนวนให้ครบทุกกลุ่ม ก่อนกดอนุมัติ', isTrue),
  },
  delivery: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลการจัดส่ง และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', isTrue),
  },
  quotation: {
    required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าใบสเปคนี้ถูกต้อง ก่อนกดอนุมัติ', isTrue),
  },
  by: {
    required: helpers.withMessage('กรุณาลงชื่อผู้อนุมัติก่อนกดอนุมัติ', required),
  },
}));
const validator = useVuelidate(validatorRules, form);

// FUNCTION
async function openApproveModal() {
  // VALIDATE DATA
  const validate = await validator.value.$validate();
  if (!validate) {
    // SHOW MISSED VALIDATOR MESSAGE
    const error = validator.value.$errors[0];
    $toast.error(error.$message);
    return;
  }

  openModal('approved-spec-modal');
}
</script>
<template>
  <div v-once class="rounded-xl border dark:border-neutral-600 p-5 bg-white dark:bg-base-100 shadow">
    <div class="form-control">
      <label class="label" for="input-approved-name">
        <span class="label-text required">ลงชื่อผู้อนุมัติใบสเปค</span>
      </label>
      <div class="grid grid-cols-12 gap-5">
        <input id="input-approved-name" v-model="form.by" class="input input-bordered col-span-10" type="text" placeholder="ชื่อผู้อนุมัติใบสเปค" />
        <button class="btn btn-success text-lg col-span-2" @click="openApproveModal()"><IconCSS name="material-symbols:check-small-rounded" size="2rem"></IconCSS>อนุมัติใบสเปค</button>
      </div>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer justify-start">
        <input v-model="form.quotation" type="checkbox" class="checkbox checkbox-primary mr-3" />
        <span class="label-text underline required">ฉันได้ทำการตรวจสอบมั่นใจแล้วว่าใบสเปคนี้ถูกต้อง</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
interface Props {
  id: string;
}

const props = defineProps<Props>();
const { id } = toRefs(props);

// EMIT
const emit = defineEmits(['reload-quotation']);

// VARIABLE
const pending = ref<boolean>(false);
const { $toast }: any = useNuxtApp();
const form = ref<any>({
  by: '',
});

// VALIDATOR
const validatorRules = computed(() => ({
  by: {
    required: helpers.withMessage('กรุณาใส่ชื่อผู้อนุมัติตัวอย่างก่อนกดยืนยัน', required),
  },
}));
const validator = useVuelidate(validatorRules, form);

// FUNCTION
function resetValidator() {
  validator.value.$reset();
}
async function approvedSample() {
  pending.value = true;
  // VALIDATE DATA
  const validate = await validator.value.$validate();

  if (!validate) {
    pending.value = false;
    return;
  }

  try {
    const { data }: any = await useApiFetch(`/frontend/quotation/${id.value}/approved-sample`, {
      method: 'PATCH',
      body: form.value,
    });
    if (data.value.status) {
      $toast.success('อนุมัติตัวอย่างเรียบร้อยแล้ว', {
        description: `โดย${form.value.by}`,
      });

      // REFRESH QUOTATION
      closeModal('approved-sample-modal');
      emit('reload-quotation');
    }
  } catch (err) {}
  pending.value = false;
}
</script>
<template>
  <dialog id="approved-sample-modal" class="modal">
    <div class="modal-box">
      <div class="flex justify-end mb-3">
        <form method="dialog">
          <button class="btn btn-sm btn-ghost btn-circle" :disabled="pending" @click="resetValidator()">
            <IconCSS name="material-symbols:close-rounded" size="1rem"></IconCSS>
          </button>
        </form>
      </div>
      <div class="mb-5">
        <h3 class="text-center text-2xl font-bold mb-3">คุณต้องการอนุมัติตัวอย่างงานหรือไม่</h3>
        <p class="text-center text-warning mb-3">
          เมื่อคุณกดอนุมัติแล้ว งานที่คุณได้รับดังกล่าวจะเป็นตัวอย่างในการผลิตจริงทันที <span class="underline font-bold">โปรดเช็คให้มั่นใจก่อนกดยืนยัน</span>
        </p>
        <div class="form-control">
          <label class="label" for="input-approve-sample-name">
            <span class="label-text">ลงชื่อผู้อนุมัติตัวอย่าง</span>
          </label>
          <input
            id="input-approve-sample-name"
            v-model="form.by"
            class="input input-bordered w-full"
            :class="{ 'border-error': hasValidateError(validator, 'by') }"
            type="text"
            placeholder="ชื่อผู้อนุมัติตัวอย่าง"
          />
          <small v-if="hasValidateError(validator, 'by')" class="text-error mt-2">{{ getValidateErrorMsg(validator, 'by') }}</small>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <!-- if there is a button in form, it will close the modal -->
        <form method="dialog" class="w-full">
          <button class="btn btn-ghost border border-neutral-700 text-lg w-full" :disabled="pending" @click="resetValidator()">ยกเลิก</button>
        </form>
        <button class="btn btn-success text-lg" :disabled="pending" @click="approvedSample()">ยืนยัน</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button :disabled="pending">close</button>
    </form>
  </dialog>
</template>

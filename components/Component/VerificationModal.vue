<script setup lang="ts">
// PROPS
interface Props {
  specSheetId: string;
}
const props = defineProps<Props>();
const { specSheetId } = toRefs(props);

// EMIT
const emit = defineEmits(['verified']);

// VARIABLE
const pins = ref<string[]>(['', '', '', '']);
const pinInputs = ref<Element[] | ComponentPublicInstance[] | null[]>([null, null, null, null]);
const isPending = ref<boolean>(false);
const errorMsg = ref<string>('');

// FUNCTION
function validatePin() {
  const regexNumberTest = /^\d+$/;
  let isPass = true;
  let msg = '';
  for (const pin of pins.value) {
    if (pin.length !== 1) {
      isPass = false;
      msg = 'คุณต้องกรอกตัวเลขในทุกช่อง ช่องละ 1 ตัวเลข';
      break;
    } else if (!regexNumberTest.test(pin)) {
      isPass = false;
      msg = 'กรุณากรอกตัวเลขให้ถูกต้อง';
      break;
    }
  }

  if (isPass) {
    return true;
  } else {
    errorMsg.value = msg;
    return false;
  }
}

async function verify() {
  isPending.value = true;
  errorMsg.value = '';
  if (!validatePin()) {
    isPending.value = false;
    return false;
  }

  try {
    const { data, error } = await useApiFetch<{ verify: boolean }>(`/v1/spec-sheets/public/${specSheetId.value}`, {
      method: 'POST',
      body: {
        verifyPin: pins.value.join(''),
      },
    });

    // ERROR HANDLING
    if (error.value && error.value.statusCode === 401) {
      isPending.value = false;
      errorMsg.value = 'เลข 4 ตัวสุดท้ายของเบอร์โทรศัพท์ไม่ถูกต้อง โปรดลองอีกครั้ง';
      return false;
    } else if (error.value) throw error.value;
    else if (!data.value) throw new Error('NO VERIFY DATA @VERIFICATION');

    // SEND SIGNAL TO PARENT FOR LOADING CONTENT
    if (data.value.verify) {
      emit('verified');
      return true;
    } else {
      isPending.value = false;
      return false;
    }
  } catch (err) {
    useBugsnag().notify(JSON.stringify(err));
    errorMsg.value = 'เกิดปัญหาระหว่างยืนยันตัวตน';
    isPending.value = false;
    return false;
  }
}

function nextInput(index: number) {
  const pinValue = pins.value[index];

  if (pinValue.length === 1) {
    const nextIndex = index + 1;
    if (nextIndex < pins.value.length) {
      (pinInputs.value[nextIndex] as HTMLElement)?.focus();
    } else {
      (pinInputs.value[index] as HTMLElement)?.blur();
      verify();
    }
  } else {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      (pinInputs.value[prevIndex] as HTMLElement)?.focus();
    }
  }
}
</script>
<template>
  <dialog id="verification-modal" class="modal">
    <div class="modal-box max-w-lg">
      <h3 class="font-bold text-center text-4xl text-primary mb-3">ยืนยันตัวตน</h3>
      <p class="text-center mb-10">กรุณาใส่เลข 4 ตัวสุดท้ายของเบอร์โทรศัพท์ที่ได้แจ้งกับทางเซลล์เอาไว้ <br />เพื่อเป็นการยืนยันตัวตน</p>
      <div class="flex justify-center items-center gap-5 mb-5">
        <input
          v-for="(pin, pinI) in pins"
          id="pin-code"
          :key="'pin-input-' + pinI"
          :ref="(el) => (pinInputs[pinI] = el)"
          v-model="pins[pinI]"
          type="text"
          :class="{ 'border-error': errorMsg }"
          maxlength="1"
          inputmode="numeric"
          class="input input-bordered w-full max-w-12 text-center text-lg"
          autofocus
          :readonly="isPending"
          @input="nextInput(pinI)"
        />
      </div>
      <p class="text-error text-center text-sm mb-10">{{ errorMsg }}</p>
      <div class="modal-action flex justify-center">
        <button type="button" :disabled="isPending" class="btn btn-primary text-lg" @click="verify()">ยืนยัน</button>
      </div>
    </div>
  </dialog>
</template>

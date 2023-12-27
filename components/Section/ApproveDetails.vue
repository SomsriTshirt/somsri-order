<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf, helpers } from '@vuelidate/validators';
import SignaturePad from 'signature_pad';

useHead({
  title: 'ตั้งค่าdropdown',
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap' }],
});
// PROPS
interface Props {
  quotation: any;
}

// VARIABLE
const props = defineProps<Props>();
const { quotation } = toRefs(props);
const { $toast }: any = useNuxtApp();
const form: any = inject('form');
const produce = ref<any>(quotation.value.produce);

const signaturePad = ref<any>(null);
const canvas = ref<any>(null);
const inputUploadFile = ref<any>(null);
const context = ref<any>(null);
const imageUrl = ref<string>('');
const isDraw = ref<boolean>(false);

// VALIDATOR
const isTrue = (value: boolean): boolean => {
  return value;
};

const haveScreenWork = () => produce.value.screen_point.length > 0;
const havePinWork = () => produce.value.pin_point.length > 0;
const havePrintWork = () => produce.value.print_point.length > 0;

const validatorRules = computed(() => ({
  sewCut: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานตัดและเย็บ และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', isTrue),
  },
  amountlist: {
    required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าข้อมูลไซซ์และจำนวนให้ครบทุกกลุ่ม ก่อนกดอนุมัติ', isTrue),
  },

  screen: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานสกรีน และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', requiredIf(haveScreenWork)),
  },
  pin: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานปัก และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', requiredIf(havePinWork)),
  },
  print: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานพิมพ์ และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', requiredIf(havePrintWork)),
  },
  delivery: {
    required: helpers.withMessage('กรุณาตรวจสอบข้อมูลการจัดส่ง และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', isTrue),
  },
  by: {
    required: helpers.withMessage('กรุณาลงชื่อผู้อนุมัติก่อนกดอนุมัติ', required),
  },
  quotation: {
    required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าใบสเปคนี้ถูกต้อง ก่อนกดอนุมัติ', isTrue),
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
  if (!isDraw.value) {
    $toast.error('กรุณากรอกลายเซ็นก่อนกดอนุมัติ');
    return;
  }
  form.value.signatureUrl = await uploadImage();
  openModal('approved-spec-modal');
}

function createCanvas() {
  canvas.value = document.getElementById('signature-pad');
  signaturePad.value = new SignaturePad(canvas.value);
  addEventCanvas();
}

function addImageSignature(event: Event) {
  signaturePad.value.off();
  const fileInput = event.target as HTMLInputElement;

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    isDraw.value = true;

    reader.onload = (e) => {
      const imageDataUrl = e.target?.result;
      signaturePad.value.clear();
      addEventCanvas();
      drawImageSignature(imageDataUrl);
    };
    reader.readAsDataURL(file);
  }
}
function drawImageSignature(imageDataUrl: any) {
  context.value = canvas.value.getContext('2d');

  const image = new Image();
  image.src = imageDataUrl;

  image.onload = () => {
    signaturePad.value.clear();
    context.value.drawImage(image, 0, 0, 150, 150);
  };
}

function addEventCanvas() {
  signaturePad.value.addEventListener(
    'endStroke',
    () => {
      isDraw.value = true;
    },
    { once: true },
  );
}
function clearCanvas() {
  isDraw.value = false;
  signaturePad.value.clear();
  signaturePad.value.on();
  addEventCanvas();
  inputUploadFile.value = document.getElementById('input-uploadfile');
  inputUploadFile.value = '';
}
async function uploadImage() {
  // CREATE FORM
  imageUrl.value = canvas.value.toDataURL();
  const file = await convertImg(imageUrl.value, 'image/png');
  const form = new FormData();
  form.append('image', file);
  try {
    const { data }: any = await useApiFetch('/file-upload/image', {
      method: 'POST',
      body: form,
    });
    return data.value.url;
  } catch (err) {
    console.log(err);
    $toast.error('เกิดปัญหาระหว่างอัปโหลดภาพ');
  }
}

async function convertImg(url: string, type: string): Promise<File> {
  const date = new Date().getTime().toString();
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], date, { type });
}

function openFileInput(id: string) {
  const fileInput = document.getElementById(id);
  if (fileInput) {
    fileInput.click();
  }
}

onMounted(() => {
  createCanvas();
});
</script>
<template>
  <div v-once class="rounded-xl border dark:border-neutral-600 p-5 bg-white dark:bg-base-100 shadow">
    <div class="form-control">
      <label class="label" for="input-approved-name">
        <span class="label-text required">ลงชื่อผู้อนุมัติใบสเปค</span>
      </label>
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-10">
          <div class="grid grid-cols-12 mr-3">
            <input v-model="form.by" class="input input-bordered input-sm mb-5 w-full dark:bg-neutral-800 col-span-12" type="text" placeholder="ชื่อผู้อนุมัติใบสเปค" />
            <div class="col-span-12">
              <div class="grid grid-cols-12">
                <div class="col-span-12 2xl:col-span-3 lg:col-span-5 xl:col-span-4 md:col-span-6 ml-3">
                  <canvas id="signature-pad" class="border" width="auto"></canvas>
                </div>
                <div class="col-span-12 2xl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-3 lg:ml-10 xl:ml-1 2xl:ml-8 mt-3">
                  <div class="mb-2">
                    <button class="btn text-sm bg-warning hover:bg-yellow-500 dark:text-base-100 w-full" @click="clearCanvas()">
                      <IconCSS name="material-symbols:cleaning-services-outline" size="1.25rem" class="mr-1" />
                      ล้างลายเซ็น
                    </button>
                  </div>
                  <div class="relative inline-block cursor-pointer w-full">
                    <button class="btn text-sm bg-success dark:text-base-100 w-full" @click="openFileInput('input-uploadfile')">
                      <IconCSS name="material-symbols:upload-rounded" size="1.25rem" class="mr-1" />
                      โหลดลายเซ็น
                    </button>
                    <input id="input-uploadfile" type="file" class="hidden" @change="addImageSignature($event)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 mr-3">
          <button class="btn btn-success text-lg xl:text-sm sm:text-sm w-full" @click="openApproveModal()">
            <IconCSS name="material-symbols:check-small-rounded" size="2rem"></IconCSS>อนุมัติใบสเปค
          </button>
        </div>
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

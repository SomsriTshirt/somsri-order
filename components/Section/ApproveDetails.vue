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
const context = ref<any>(null);
const signatureInput = ref('');
const imageUrl = ref<any>(null);

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
  // by: {
  //   required: helpers.withMessage('กรุณาลงชื่อผู้อนุมัติก่อนกดอนุมัติ', required),
  // },
  quotation: {
    required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าใบสเปคนี้ถูกต้อง ก่อนกดอนุมัติ', isTrue),
  },
}));
const validator = useVuelidate(validatorRules, form);

// FUNCTION
async function openApproveModal() {
  console.log(canvas.value.toDataURL());
  // VALIDATE DATA
  const validate = await validator.value.$validate();
  if (!validate) {
    // SHOW MISSED VALIDATOR MESSAGE
    const error = validator.value.$errors[0];
    $toast.error(error.$message);
    return;
  }
  form.value.signatureUrl = await uploadImage();
  console.log(form.value.signatureUrl);
  openModal('approved-spec-modal');
}

// function resizeCanvas() {
//   const ratio = Math.max(window.devicePixelRatio || 1, 1);

//   canvas.value.width = canvas.value.offsetWidth * ratio;
//   canvas.value.height = canvas.value.offsetHeight * ratio;
//   canvas.value.getContext('2d').scale(ratio, ratio);
//   signaturePad.value.clear();
// }

// function resizeCanvasListener() {
//   window.addEventListener('resize', resizeCanvas);
// }

function createCanvas(elementId: string) {
  canvas.value = document.getElementById(elementId);
  signaturePad.value = new SignaturePad(canvas.value);
}
function inputSignature() {
  console.log(form.value.by);
  signaturePad.value.clear();
  context.value = canvas.value.getContext('2d');
  context.value.font = '32px Dancing Script';
  context.value.fillStyle = 'black';

  context.value.fillText(signatureInput.value, 100, 75);
}

function addImageSignature(event: any) {
  const fileInput = event.target;

  console.log(event.target.files.length);
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const imageDataUrl = e.target?.result;
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
    const url = canvas.value.toDataURL();
    console.log(url);
  };
}

function clearCanvas() {
  signaturePad.value.clear();
  signatureInput.value = '';
}

async function uploadImage() {
  // CREATE FORM
  imageUrl.value = canvas.value.toDataURL();
  const file = await convertImg(imageUrl.value, 'image/png');
  console.log(file);
  const form = new FormData();
  form.append('image', file);
  try {
    const { data }: any = await useApiFetch('/file-upload/image', {
      method: 'POST',
      body: form,
    });
    console.log(data.value.url);
    return data.value.url;
  } catch (err) {
    console.log(err);
    $toast.error('เกิดปัญหาระหว่างอัปโหลดภาพ');
  }
}

async function convertImg(url: string, type: string): Promise<File> {
  const date = new Date().getTime().toString();
  let file: File;
  let res = await fetch(url);
  let blob = await res.blob();
  return new File([blob], date, { type: type });
}
// onUpdated(() => {
//   // canvas.value = document.getElementById('signature-pad');
//   signaturePad.value = new SignaturePad(canvas.value);
// });
onMounted(async () => {
  createCanvas('signature-pad_1');
});

watch(form.value.by, (newval) => {
  console.log(newval);
  inputSignature();
});
</script>
<template>
  <div v-once class="rounded-xl border dark:border-neutral-600 p-5 bg-white dark:bg-base-100 shadow">
    <div class="form-control">
      <label class="label" for="input-approved-name">
        <span class="label-text required">ลงชื่อผู้อนุมัติใบสเปค</span>
      </label>
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-10">
          <div role="tablist" class="tabs tabs-lifted">
            <!-- signature_pad_1 -->
            <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="draw" checked @click="createCanvas('signature-pad_1')" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <input v-model="form.by" class="input input-bordered input-sm mb-5 w-full" type="text" placeholder="ชื่อผู้อนุมัติใบสเปค" @change="inputSignature()" />
              <div class="grid grid-cols-12">
                <div class="col-span-5">
                  <canvas id="signature-pad_1" class="border" width="500"></canvas>
                </div>
                <div class="col-span-7 ml-8">
                  <button class="btn text-sm" @click="clearCanvas()">clear</button>
                </div>
              </div>
            </div>
            <!-- signature_pad_3 -->
            <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="load" @click="createCanvas('signature-pad_3')" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <input v-model="signatureInput" class="input input-bordered input-sm mb-5 w-full" type="text" placeholder="ชื่อผู้อนุมัติใบสเปค" />
              <input type="file" class="file-input file-input-bordered file-input-sm w-full mb-4" @change="addImageSignature($event)" />
              <div class="grid grid-cols-12">
                <div class="col-span-5">
                  <canvas id="signature-pad_3" class="border pointer-events-none" width="500"></canvas>
                </div>
                <div class="col-span-7 ml-8">
                  <button class="btn text-sm" @click="clearCanvas()">clear</button>
                </div>
              </div>
            </div>
          </div>
          <!-- <canvas ref="signaturePadCanvas" class="w-full" height="40" style="border: 1px solid #000"></canvas> -->
        </div>
        <!-- <input id="input-approved-name" v-model="form.by" class="input input-bordered col-span-10" type="text" placeholder="ชื่อผู้อนุมัติใบสเปค" /> -->
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

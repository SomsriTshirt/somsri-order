<!-- หน้าฟอร์ม -->
<template>
  <div v-if="!pending" class="flex justify-center items-center h-screen">
    <div class="p-7 bg-white dark:bg-black shadow-lg w-full max-w-lg rounded-md">
      <form id="form" class="w-full" @submit.prevent="submitForm">
        <h1 class="text-center text-2xl font-bold mb-5 dark:text-white">ติดตามงาน</h1>
        <div class="space-y-5">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-md font-bold dark:text-white">ไอดีโปรเจกต์</span>
            </div>

            <!-- ใช้ v-for วนลูป ใน array ของ form.projectId -->
            <div class="overflow-y-auto max-h-[300px] disabled:opacity-20">
            <div v-for="(tracking, trackingI) in form.projectId" :key="tracking.vueKey" class="border border-neutral-300 dark:border-neutral-600 p-2 m-1 rounded-md">
              <div class="flex items-center gap-5">
                <input
                  v-model="tracking.id"
                  type="text"
                  placeholder="กรุณากรอกไอดีโปรเจกต์"
                  class="input input-bordered w-full p-2  rounded-md disabled:opacity-20"
                  :class="{ 'border-red-500': hasError(`projectId[${trackingI}].id`) }"
                  :disabled="isProcessing"
                />
                <!-- <p>{{ tracking }}</p> -->
                <button class="btn join-item btn-error p-4 rounded-md bg-red-500 text-white disabled:opacity-20" type="button" :disabled="isProcessing" @click="removeProjectId(trackingI)" >ลบ</button>
              </div>
              <small v-if="hasError(`projectId[${trackingI}].id`)" class="text-red-500">{{ getError(`projectId[${trackingI}].id`) }}</small>
            </div>
            </div>
            <!-- tracking เก็บค่าของ element , trackingI เก็บค่า Index -->
            <button type="button" class="btn btn-primary p-2 text-white dark: rounded-md text-lg disabled:opacity-20" :disabled="isProcessing" @click="addProjectId(trackingI)">เพิ่ม</button>
            <!-- <button type="button" @click="form.id.push('')" class="btn">เพิ่ม</button> -->
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-md font-bold dark:text-white" >เบอร์โทรศัพท์</span>
            </div >
            <input
              v-model="form.phoneNumber"
              type="text"
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
              class="input input-bordered w-full p-2 border-gray-300 dark:dark:border-neutral-600 rounded-md disabled:opacity-20"
              :class="{ 'border-red-500': hasError('phoneNumber') }"
              :disabled="isProcessing"
            />
            <!-- แสดงข้อผิดพลาดถ้ามีการกรอกข้อมูลไม่ครบหรือไม่ถูกต้อง -->
            <small v-if="hasError('phoneNumber')" class="text-red-500">{{ getError('phoneNumber') }}</small>
          </label>

          <button class="btn btn-primary w-full text-lg p-2 rounded-md text-white disabled:opacity-20" :disabled="isProcessing" type="submit">ยืนยัน</button>
        </div>
        <div>
          <!-- <div><b>userId: </b>{{ lineUser }}</div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { minLength, required, helpers, maxLength } from '@vuelidate/validators';
import liff from '@line/liff';

const form = ref<Record<string, any>>({
  projectId: [{ id: '', vueKey: genKey() }],
  phoneNumber: '',
}); //
const pending = ref<boolean>(true);
const lineUser = ref();
const { $toast } = useNuxtApp();
const isProcessing = ref<boolean>(false);

// เพิ่มเอง
// const express = required('express')
// const app = express()
// app.use(express.json())

// const PORT ='8888'

// const LINE_BOT_API = 'https://api.line.me/v2/bot'

// app.post('/send-message', async(req,res)=>{

// })

// app.listen(PORT,(req,res)=>{
//   console.log(`run at http://localhost: ${PORT}`)
// })
// const email = ref();
// const userId = ref();
// const pictureUrl = ref();
// const displayName = ref();

//
const rules = computed(() => ({
  projectId: {
    // forEach คือการลูป array เพื่อเข้าถึงแต่ละ element ใน array
    $each: helpers.forEach({
      id: {
        required: helpers.withMessage('กรุณากรอกไอดีโปรเจกต์', required),
      },
    }),
  },
  phoneNumber: {
    required: helpers.withMessage('กรุณากรอกเบอร์โทรศัพท์', required),
    minLength: helpers.withMessage('กรุณากรอกให้ครบ 10 หลัก', minLength(10)),
    maxLength: helpers.withMessage('คุณกรอกเกิน 10 หลัก', maxLength(10)),
  },
}));

const v$ = useVuelidate(rules, form, { $lazy: true });

// const { data: data } = await useFetch('https://dummyjson.com/products?limit=10');
// console.log(data);

// ฟังก์ชั่นสร้าง key เพื่อเพิ่มการรักษาความปลอดภัย
function genKey() {
  return Math.random() * 1000;
}

// ฟังก์ชันเพิ่ม ค่า id และ ค่า vuekey ให้ในตัวแปร form
function addProjectId() {
  // console.log(form.value.id);
  // console.log(count);
  form.value.projectId.push({ id: '', vueKey: genKey() });
}

// ฟังก์ชัน remove ลบเฉพาะเจาะจง index
function removeProjectId(index: number) {
  console.log(index);
  console.log(form.value.id);
  // console.log(count);
  form.value.projectId.splice(index, 1);
}

// ฟังก์ชัน Validate form

async function submitForm() {
  isProcessing.value = true;
  const isValid = await v$.value.$validate();
  // ถ้าข้อมูลที่ป้อนไม่ถูกต้อง
  if (!isValid){
    isProcessing.value = false;
    return;
  } 

  try {
    // ลองเช็คว่า error มั้ย
    const { data, error } = await useApiFetch('/v1/line-datas', {
      method: 'POST',
      // ... แตกข้อมูล key จากตัวแปรนั้นๆออกมา form.value มี 2 ตัวคือ projectId , phoneNumber
      body: {
        ...form.value,
        lineUserId: lineUser.value.userId,
        //
        projectId: form.value.projectId.map((project) => project.id),
      },
    });

    // throw ใช้กับตัว exception คล้ายกับ return
    if (error.value) throw error.value;
    if (!data.value) throw new Error('No response submit form!');
    $toast.success('ข้อมูลถูกต้องและบันทึกเรียบร้อยแล้ว');

    // เคลียร์ฟอร์มหลัง success
    resetForm();
    isProcessing.value = false;
    return true;
  } catch (error) {
    $toast.error('เกิดข้อผิดพลาดระหว่างกดติดตาม');
    isProcessing.value = false;
    return false;
  }
  

  // console.log(form.value);
  // useApiFetch() คำสั่งสำหรับยิง api ใช้ได้ทุก method
  // ส่งค่าไไป 2 parameters (end point, {}ตั้งค่า method)
}

function resetForm() {
  form.value = {
    projectId: [{ id: '', vueKey: genKey() }],
    phoneNumber: '',
  };
  v$.value.$reset();
}

// โครงสร้างที่กำหนดเอง แบบ key-value pairs ที่มี key เป็นชนิดของ column และ value เป็นชนิดของข้อมูลใน column นั้น ๆ
function hasError(column: keyof WorkOrderPayload): boolean {
  return hasValidateError<keyof WorkOrderPayload>(v$.value, column);
}

function getError(column: keyof WorkOrderPayload): string {
  return getValidateErrorMsg<keyof WorkOrderPayload>(v$.value, column);
}

async function initLiff() {
  try {
    // 2.liff.ready
    await liff
      // Real Project
      .init({ liffId: '2004487535-RwJYB2jX' });

      //  Local Host
      // .init({ liffId: '2004487535-qxvEo2ge' });

    if (liff.isLoggedIn()) {
      lineUser.value = await getUserProfile();
    } else {
      liff.login();
      lineUser.value = await getUserProfile();
    }
  } catch (err) {
    console.log(err.code, err.message);
  }
}

async function getUserProfile() {
  return await liff.getProfile();
}

// const logIn = async () => {
//   await liff.login();
//   // window.location.reload();
// };

// lineUser.value.pictureUrl = userProfile.pictureUrl;
// lineUser.value.displayName = userProfile.displayName;
// lineUser.value.statusMessage = userProfile.statusMessage;
// userEmail.value = liff.getDecodedIDToken().email;

// email.innerHTML = '<b>email : </b>' + liff.getDecodedIDToken().email;
// const test = () => console.log(id.value);
// form.addEventListener('submit',function(e)){
//     e.preventDefault();
//     checkInput([projectId,uniqueId]);
// }

// function showerror(input, message) {
//   const formControl = input.parentElement;
//   formControl.className = 'form-control error';
//   const small = formControl.querySelector('small');
//   small.innerText = message;
// }

// function showsuccess(input) {
//   const formControl = input.parentElement;
//   formControl.className = 'form-control success';
// }

// function checkInput(inputArray){
//     inputArray.forEach(function(input) {
//         if(input.value.trim()===''){
//             showerror(input,'กรุณาป้อน ${getInputCase(input)}');
//         }else{
//             showsuccess(input);
//         }
//     });
// }

onMounted(async () => {
  await initLiff();
  pending.value = false;
});
</script>

<style scoped>
</style>

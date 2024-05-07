<!-- หน้าฟอร์ม -->
<template>
  <div v-if="!pending" class="flex justify-center items-center h-screen">
    <div class="p-7 bg-white shadow-lg w-full max-w-lg rounded-md">
      <form id="form" class="w-full" @submit.prevent="submitForm">
        <h1 class="text-center text-2xl font-bold mb-5">ติดตามงาน</h1>
        <div class="space-y-5">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-md font-bold">ไอดีโปรเจกต์</span>
            </div>

            <!-- ใช้ v-for วนลูป ใน array ของ form.projectId -->
            <div v-for="(tracking, trackingI) in form.projectId" :key="tracking.vueKey" class="flex items-center space-x-3 border p-2 m-1 rounded-md">
              <input v-model="tracking.id" type="text" placeholder="กรุณากรอกไอดีโปรเจกต์" class="input input-bordered w-full p-2 border-gray-300 rounded-md " />
              <!-- <p>{{ tracking }}</p> -->
              <button class="btn join-item btn-error p-4 rounded-md  bg-red-500 text-white" type="button" @click="removeProjectId(trackingI)">ลบ</button>
            </div>
            <!-- tracking เก็บค่าของ element , trackingI เก็บค่า Index -->
            <button type="button" class="btn btn-primary p-2 text-white rounded-md text-lg" @click="addProjectId(trackingI)">เพิ่ม</button>
            <!-- <button type="button" @click="form.id.push('')" class="btn">เพิ่ม</button> -->
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-md font-bold">เบอร์โทรศัพท์</span>
            </div>
            <input v-model="form.phoneNumber" type="text" placeholder="กรุณากรอกเบอร์โทรศัพท์" class="input input-bordered w-full p-2 border-gray-300 rounded-md " />
          </label>

          <button class="btn btn-primary w-full text-lg p-2 rounded-md  text-white" type="submit">ยืนยัน</button>
        </div>
        <div>
          <!-- <div><b>userId: </b>{{ lineUser }}</div> -->
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import liff from '@line/liff';

const form = ref<Record<string, any>>({
  projectId: [{ id: '', vueKey: genKey() }],
  phoneNumber: '',
}); //
const pending = ref<boolean>(true);
const lineUser = ref();
const { $toast } = useNuxtApp();

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
        required,
      },
    }),
  },
  phoneNumber: {
    required,
    minLength: minLength(10),
  },
}));

const v$ = useVuelidate(rules, form);

// const { data: data } = await useFetch('https://dummyjson.com/products?limit=10');
// console.log(data);

// ฟังก์ชั่นสร้าง key เพื่อเพิ่มการรักษาความปลอดภัย
function genKey() {
  return Math.random() * 1000;
}

// ฟังก์ชันเพิ่ม ค่า id และ ค่า vuekey ให้ในตัวแปร form
function addProjectId() {
  console.log(form.value.id);
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

    return true;
  } catch (error) {
    $toast.error('เกิดข้อผิดพลาดระหว่างกดติดตาม');
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
/* #form {
  width: 400px; 
  padding: 20px;
  background-color: #ece9e9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.space-y-5 > .form-control:not(:last-child) {
  margin-bottom: 20px;
}

.label-text {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 10px;
 
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 8px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-addproject {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #a52241;
  font-size: 16px;
  font-weight: bold;
}

.btn-submit {
  width: 100%;
}

.text-center {
  font-size: 30px;
  font-weight: bold;
} */


</style>

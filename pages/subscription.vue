<!-- หน้าฟอร์ม -->
<template>
  <div v-if="!pending">
    <div class="p-7 bg-white shadow-lg h-screen flex justify-center items-center">
      <form id="form" class="w-full" @submit.prevent="submitForm">
        <h1 class="text-center">ติดตามงาน</h1>
        <div class="space-y-5">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-md">ไอดีโปรเจกต์</span>
            </div>

            <!-- ใช้ v-for วนลูป ใน array ของ form.projectId -->
            <div v-for="(tracking, trackingI) in form.projectId" :key="tracking.vueKey" class="flex gap-3">
              <input v-model="tracking.id" type="text" placeholder="Enter your project ID" class="input input-bordered w-full join-item" />
              <p>{{ tracking }}</p>
              <button class="btn join-item btn-error" type="button" @click="removeProjectId(trackingI)">ลบ</button>
            </div>
            <!-- tracking เก็บค่าของ element , trackingI เก็บค่า Index -->
            <button type="button" class="btn" @click="addProjectId(trackingI)">เพิ่ม</button>
            <!-- <button type="button" @click="form.id.push('')" class="btn">เพิ่ม</button> -->
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-md">เลขผู้เสียภาษี</span>
            </div>
            <input v-model="form.taxId" type="text" placeholder="Enter your project tax ID" class="input input-bordered w-full" />
          </label>

          <button class="btn btn-primary w-full text-lg" type="submit">ยืนยัน</button>
        </div>
        <div>
          <div><b>userId: </b>{{ lineUser }}</div>
          <br />
          <button @click="logIn()">Logout</button>
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
  taxId: '',
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
  taxId: {
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
      // ... แตกข้อมูล key จากตัวแปรนั้นๆออกมา form.value มี 2 ตัวคือ projectId , taxId
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
    return true;
  } catch (error) {
    $toast.error('เกิดข้อผิดพลาดระหว่างกดติดตาม');
    return false;
  }

  // console.log(form.value);
  // useApiFetch() คำสั่งสำหรับยิง api ใช้ได้ทุก method //ส่วนค่าไไป 2 parameters (end point, {}ตั้งค่า method)
}

async function initLiff() {
  try {
    // 2.liff.ready
    await liff
      // Real Project
      .init({ liffId: '2004487535-RwJYB2jX' });

    //  Local Host
    // .init({ liffId: '2004487535-qxvEo2ge' })

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

const logIn = async () => {
  await liff.login();
  // window.location.reload();
};

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
/* .container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  margin: auto;
  margin-top: 10vh;
}

.form-control input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  border-color: rgb(70, 69, 69);
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

.form {
  padding: 30px 40px;
}

h2 {
  text-align: center;
  margin: 0 0 0 20px;
}

.form-control {
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 20px;
}

.form-control label {
  color: #000000;
  display: block;
  margin-bottom: 5px;
}

.form button {
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: 2px solid #3498db;
  margin-top: 20px;
  width: 100%;
  display: block;
  font-size: 16px;
  padding: 10px;
}

.form-control small {
  color: red;
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
} */
</style>

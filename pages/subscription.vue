<!-- หน้าฟอร์ม -->
<template>
  <div class="container">
    <form id="form" class="form">
      <h2>ติดตามงาน</h2>
      <div class="form-control">
        <label for="projectId">ไอดีโปรเจกต์</label>
        <input type="text" name="" id="projectId" placeholder="Enter your project ID" />
        <small>error message</small>
      </div>
      <div class="form-control">
        <label for="uniqueId">เลขผู้เสียภาษี</label>
        <input type="text" id="uniqueId" placeholder="Enter your tax ID" />
        <small> error message</small>
      </div>

      <button type="submit">ยืนยัน</button>
    </form>
  </div>
</template>

<script setup>
const form = document.getElementById('form');
const projectId = document.getElementById('projectId');
const uniqueId = document.getElementById('uniqueId');

// form.addEventListener('submit',function(e)){
//     e.preventDefault();
//     checkInput([projectId,uniqueId]);
// }

function showerror(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showsuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkProject() {
  //งานเก่า
  // const
}

// function checkInput(inputArray){
//     inputArray.forEach(function(input) {
//         if(input.value.trim()===''){
//             showerror(input,'กรุณาป้อน ${getInputCase(input)}');
//         }else{
//             showsuccess(input);
//         }
//     });
// }
</script>

<style scoped>
.container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

body {
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
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
}
</style>

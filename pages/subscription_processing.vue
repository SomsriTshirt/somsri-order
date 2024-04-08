<template>
  <div>
    <div class="container">
      <form id="form" class="form">
        <h2>คุณกำลังติดตามงาน</h2>
        <div class="form-control">
          <label for="projectId">ไอดีโปรเจกต์</label>

          <p>{{ projectId }}</p>
        </div>

        <div class="form-control">
          <label for="uniqueId">เลขผู้เสียภาษี</label>
          <p>{{ uniqueId }}</p>
        </div>

        <button type="submit">ยืนยัน</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { projectId } from 'subscription.vue';
import { uniqueId } from 'subscription.vue';
</script>

<style scoped>
.container {
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
}
</style>

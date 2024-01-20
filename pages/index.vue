<script setup lang="ts">
useSeoMeta({
  ogTitle: 'หน้าหลัก - ระบบติดตามการผลิต',
  ogUrl: 'https://order.somsritshirt.com/',
  twitterTitle: 'หน้าหลัก - ระบบติดตามการผลิต',
});

useHead({
  title: 'หน้าหลัก',
});

// VARIABLE
const pending = ref<boolean>(false);
const searchId = ref<string>('');
const error = ref<string | null>('');
const { $toast }: any = useNuxtApp();

// FUNCTION
async function findQuotation() {
  pending.value = true;
  // VALIDATE
  if (!searchId.value) {
    error.value = 'กรุณาใส่เลขที่ใบเสนอราคาก่อนกดค้นหา';
    pending.value = false;
    return;
  }

  try {
    const { data }: any = await useApiFetch(`/frontend/quotation/${searchId.value}/is-valid`);
    if (!data.value.isValid) {
      error.value = 'ไม่พบโปรเจกต์ กรุณาตรวจสอบเลขที่ใบเสนอราคาอีกครั้ง';
      pending.value = false;
      return;
    }

    navigateTo(`/order?id=${searchId.value}`);
  } catch (err) {
    $toast.error('เกิดปัญหาระหว่างค้นหาโปรเจกต์');
  }
  pending.value = false;
}
</script>
<template>
  <div>
    <NuxtLayout>
      <h1 class="text-center text-primary text-5xl font-bold mb-3">ระบบติดตามการผลิตของสมศรีมีเสื้อ</h1>
      <p class="text-center text-xl text-neutral-400 mb-10">กรอกเลขที่ใบเสนอราคาเพื่อทำการติดตามการผลิตได้เลยได้เลย🤩</p>
      <form @submit.prevent="findQuotation()">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-12 sm:col-span-9 lg:col-span-10">
            <input v-model="searchId" type="text" class="input input-bordered w-full" :class="{ 'border-error': error }" placeholder="เลขที่ใบเสนอราคา" :disabled="pending" />
            <p v-if="error" class="text-error mt-2">{{ error }}</p>
          </div>

          <button class="btn btn-primary col-span-12 sm:col-span-3 lg:col-span-2 text-lg" :disabled="pending"><IconCSS name="material-symbols:search-rounded" size="2rem"></IconCSS>ค้นหา</button>
        </div>
      </form>
    </NuxtLayout>
  </div>
</template>

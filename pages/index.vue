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
const specSheetService = useSpecSheet();
const pending = ref<boolean>(false);
const searchId = ref<string>('');
const error = ref<string | null>('');
const { $toast } = useNuxtApp();

// FUNCTION
async function findSpecsheet() {
    pending.value = true;
    // VALIDATE
    if (!searchId.value) {
        error.value = 'กรุณาใส่เลขที่ใบสเปคก่อนกดค้นหา';
        pending.value = false;
        return;
    }

    const data = await specSheetService.isExist(searchId.value, {
        errorCallback: () => {
            $toast.error('เกิดปัญหาระหว่างค้นหาใบสเปค');
        },
    });

    if (data?.status) {
        navigateTo(`/order?id=${searchId.value}`);
        return;
    }

    error.value = 'ไม่พบใบสเปค กรุณาตรวจสอบเลขที่ใบสเปคราคาอีกครั้ง';
    pending.value = false;
}
</script>
<template>
    <div>
        <NuxtLayout>
            <h1 class="text-center text-primary-500 dark:text-primary-400 text-5xl font-bold mb-3">ระบบติดตามการผลิตของสมศรีมีเสื้อ</h1>
            <p class="text-center text-xl text-stone-400 mb-10">กรอกเลขที่ใบสเปคเพื่อทำการติดตามการผลิตได้เลยได้เลย🤩</p>
            <form @submit.prevent="findSpecsheet()">
                <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-12 sm:col-span-9 lg:col-span-10 h-full">
                        <Input v-model="searchId" type="text" class="w-full h-full" :class="{ 'border-red-500': error }" placeholder="เลขที่ใบสเปค" :disabled="pending" />
                        <p v-if="error" class="text-error mt-2">{{ error }}</p>
                    </div>
                    <Button class="col-span-12 sm:col-span-3 lg:col-span-2 text-lg h-full" :disabled="pending">
                        <IconCSS name="material-symbols:search-rounded" size="2rem" class="mr-1" />ค้นหา</Button
                    >
                </div>
            </form>
        </NuxtLayout>
    </div>
</template>

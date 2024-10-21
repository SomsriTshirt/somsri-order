<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { minLength, required, helpers, maxLength } from '@vuelidate/validators';
import liff from '@line/liff';

// VARIABLE
const form = ref<Record<string, any>>({
    projectId: [{ id: '', vueKey: useId() }],
    phoneNumber: '',
}); //
const pending = ref<boolean>(true);
const lineUser = ref();
const { $toast, $lineLiffId } = useNuxtApp();
const isProcessing = ref<boolean>(false);

// COMPUTED
const rules = computed(() => ({
    projectId: {
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

const validator = useVuelidate(rules, form as any, { $lazy: true });

// ฟังก์ชันเพิ่ม ค่า id และ ค่า vuekey ให้ในตัวแปร form
function addProjectId() {
    form.value.projectId.push({ id: '', vueKey: useId() });
}

// ฟังก์ชัน remove ลบเฉพาะเจาะจง index
function removeProjectId(index: number) {
    form.value.projectId.splice(index, 1);
}

// ฟังก์ชัน Validate form
async function submitForm() {
    isProcessing.value = true;
    const isValid = await validator.value.$validate();
    // ถ้าข้อมูลที่ป้อนไม่ถูกต้อง
    if (!isValid) {
        isProcessing.value = false;
        return;
    }

    try {
        // ลองเช็คว่า error มั้ย
        const { data, error } = await useApiFetch('/v1/progress-subscriptions/create', {
            method: 'POST',
            // ... แตกข้อมูล key จากตัวแปรนั้นๆออกมา form.value มี 2 ตัวคือ projectId , phoneNumber
            body: {
                ...form.value,
                lineUserId: lineUser.value.userId,
                //
                projectIds: form.value.projectId.map((project: Record<string, any>) => project.id),
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
        useBugsnag().notify(JSON.stringify(error));
        isProcessing.value = false;
        return false;
    }
}

function resetForm() {
    form.value = {
        projectId: [{ id: '', vueKey: useId() }],
        phoneNumber: '',
    };
    validator.value.$reset();
}

// โครงสร้างที่กำหนดเอง แบบ key-value pairs ที่มี key เป็นชนิดของ column และ value เป็นชนิดของข้อมูลใน column นั้น ๆ
function hasError(column: string): boolean {
    return hasValidateError<string>(validator.value, column);
}

function getError(column: string): string {
    return getValidateErrorMsg<string>(validator.value, column);
}

async function initLiff() {
    try {
        await liff.init({ liffId: $lineLiffId });

        if (liff.isLoggedIn()) {
            lineUser.value = await getUserProfile();
        } else {
            liff.login();
            lineUser.value = await getUserProfile();
        }
    } catch (err) {
        useBugsnag().notify(JSON.stringify(err));
    }
}

async function getUserProfile() {
    return await liff.getProfile();
}

onMounted(async () => {
    await initLiff();
    pending.value = false;
});
</script>
<template>
    <NuxtLayout>
        <div v-if="!pending" class="flex justify-center items-center">
            <div class="p-7 bg-white dark:bg-stone-950 shadow-lg w-full max-w-lg rounded-xl">
                <form id="form" class="w-full" @submit.prevent="submitForm">
                    <h1 class="text-center text-2xl font-bold mb-5 dark:text-white">ติดตามงาน</h1>

                    <Label class="required">ไอดีโปรเจกต์</Label>
                    <div class="space-y-3 mb-3">
                        <div v-for="(tracking, trackingI) in form.projectId" :key="tracking.vueKey" class="border border-stone-300 dark:border-stone-700 p-2 rounded-xl">
                            <div class="flex items-center gap-5">
                                <Input
                                    v-model="tracking.id"
                                    type="text"
                                    placeholder="--ไอดีโปรเจกต์--"
                                    class="w-full"
                                    :class="{ '!border-red-500': hasError(`projectId[${trackingI}].id`) }"
                                    :disabled="isProcessing"
                                />
                                <!-- <p>{{ tracking }}</p> -->
                                <Button v-if="form.projectId.length > 1" variant="destructive" type="button" :disabled="isProcessing" @click="removeProjectId(trackingI)"> ลบ </Button>
                            </div>
                            <small v-if="hasError(`projectId[${trackingI}].id`)" class="text-red-500">{{ getError(`projectId[${trackingI}].id`) }}</small>
                        </div>
                    </div>

                    <!-- tracking เก็บค่าของ element , trackingI เก็บค่า Index -->
                    <Button type="button" class="w-full mb-3" variant="secondary" :disabled="isProcessing" @click="addProjectId()">เพิ่ม</Button>

                    <Label class="required mb-1">เบอร์โทรศัพท์</Label>
                    <Input
                        v-model="form.phoneNumber"
                        type="text"
                        placeholder="กรุณากรอกเบอร์โทรศัพท์"
                        class="w-full"
                        :class="{ '!border-red-500': hasError('phoneNumber') }"
                        :disabled="isProcessing"
                    />
                    <!-- แสดงข้อผิดพลาดถ้ามีการกรอกข้อมูลไม่ครบหรือไม่ถูกต้อง -->
                    <small v-if="hasError('phoneNumber')" class="text-red-500">{{ getError('phoneNumber') }}</small>

                    <Button class="w-full text-lg mt-3" :disabled="isProcessing" type="submit">ยืนยัน</Button>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Project } from '~/types/Project';
import type { SpecSheet } from '~/types/SpecSheet';
import ConfirmDetail from '../Component/ConfirmDetail.vue';
import { AsYouType } from 'libphonenumber-js';

interface Props {
    specSheet: SpecSheet;
    isApproved: boolean;
}

const props = defineProps<Props>();
const { specSheet, isApproved } = toRefs(props);
const project = ref<Project>(specSheet.value.project as Project);

const form: any = inject('form');

// FUNCTION
function parsePhoneNumber(phoneNumber: string) {
    if (!phoneNumber) {
        return phoneNumber;
    }
    return new AsYouType('TH').input(phoneNumber).replaceAll(' ', '-');
}

// COMPUTED
const totalProduct = computed(() => {
    const orderGroup = specSheet.value.amount;
    let amount: number = 0;
    for (const group of orderGroup) {
        for (const size of group.info) {
            amount += size.amount;
        }
    }

    return amount;
});
const hasSample = computed(() => specSheet.value.sampleType !== 'ไม่ต้อง' && specSheet.value.sampleType !== 'ไม่มี');
const isRecieveByMyself = computed(() => project.value.deliveryData.deliveryMethod === 'ลูกค้ามารับสินค้าด้วยตนเอง');
</script>
<template>
    <div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5 text-stone-600 dark:text-stone-300">
            <div class="col-span-2 grid grid-cols-2 gap-5">
                <div v-if="hasSample">
                    <p class="font-bold text-xl text-primary-700 dark:text-primary-400 mb-3">จัดส่งตัวอย่างที่</p>
                    <p class="font-medium">{{ project.sampleDeliveryData.fullName }}</p>
                    <p class="word-break">ที่อยู่: {{ project.sampleDeliveryData.address }}</p>
                    <p class="word-break">เบอร์โทร: {{ parsePhoneNumber(project.sampleDeliveryData.phoneNumber) }}</p>
                </div>
                <div>
                    <p class="font-bold text-xl mb-3 text-primary-700 dark:text-primary-400">จัดส่งสินค้าที่</p>

                    <div v-if="isRecieveByMyself">
                        <p class="word-break">ที่อยู่: โรงงานสมศรีมีเสื้อ</p>
                        <p class="font-medium">รับสินค้าโดยคุณ: {{ project.deliveryData.fullName }}</p>
                        <p class="font-medium mb-3">เบอร์โทร: {{ parsePhoneNumber(project.deliveryData.phoneNumber) }}</p>
                        <NuxtLink to="https://maps.app.goo.gl/CqVmTeQdjkc4CBRDA" target="_blank">
                            <Button size="sm"><IconCSS name="material-symbols:location-on-outline-rounded" size="1rem"></IconCSS>ดูแผนที่</Button>
                        </NuxtLink>
                    </div>
                    <div v-else>
                        <p class="font-medium">{{ project.deliveryData.fullName }}</p>
                        <p class="word-break">ที่อยู่: {{ project.deliveryData.address }}</p>
                        <p class="font-medium mb-3">เบอร์โทร: {{ parsePhoneNumber(project.deliveryData.phoneNumber) }}</p>
                    </div>
                </div>
                <div>
                    <p class="font-bold text-xl text-primary-700 dark:text-primary-400 mb-3">จัดส่งเอกสารที่</p>
                    <p class="font-medium">{{ project.documentDeliveryData.fullName }}</p>
                    <p class="word-break">ที่อยู่: {{ project.documentDeliveryData.address }}</p>
                    <p class="font-medium">เบอร์โทร: {{ parsePhoneNumber(project.documentDeliveryData.phoneNumber) }}</p>
                </div>
                <div>
                    <p class="font-bold text-xl text-primary-700 dark:text-primary-400 mb-3">ข้อมูลการออกเอกสาร</p>
                    <p class="font-medium">{{ project.documentData.fullName }}</p>
                    <p class="word-break">ที่อยู่: {{ project.documentData.address }}</p>
                    <p class="font-medium">เบอร์โทร: {{ parsePhoneNumber(project.documentData.phoneNumber) }}</p>
                </div>

                <div>
                    <p class="font-bold text-xl text-primary-700 dark:text-primary-400 mb-3">ข้อมูลผู้ประสานงาน</p>
                    <p class="font-medium">{{ project.coordinatorData.fullName }}</p>
                    <p class="font-medium">เบอร์โทร: {{ parsePhoneNumber(project.deliveryData.phoneNumber) }}</p>
                </div>
            </div>

            <div>
                <p class="font-bold text-primary-700 dark:text-primary-400">จำนวน</p>
                <p class="mb-5">{{ totalProduct }} ตัว</p>
                <p class="font-bold text-primary-700 dark:text-primary-400">ประเภทการจัดส่ง</p>
                <p>{{ project.deliveryData.deliveryMethod }}</p>
            </div>
        </div>

        <!-- CONFIRM -->
        <ConfirmDetail v-if="!isApproved" v-model="form.delivery">ฉันยืนยันว่าข้อมูลการจัดส่งถูกต้อง</ConfirmDetail>
    </div>
</template>

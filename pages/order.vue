<script setup lang="ts">
import VerificationModal from '@/components/Component/VerificationModal.vue';
import type { SpecSheet } from '~/types/SpecSheet';

// LAZY LOAD
const Status = defineAsyncComponent(() => import('@/components/Component/StatusComponent.vue'));
const ProductDetail = defineAsyncComponent(() => import('@/components/Section/ProductDetails.vue'));
const DeliveryDetails = defineAsyncComponent(() => import('@/components/Section/DeliveryDetails.vue'));
const ApproveDetails = defineAsyncComponent(() => import('@/components/Section/ApproveDetails.vue'));
const DueDetails = defineAsyncComponent(() => import('@/components/Section/DueDetails.vue'));

const id = useRoute().query.id as string;
useSeoMeta({
    ogTitle: `${id} - ระบบติดตามการผลิต`,
    ogUrl: `https://order.somsritshirt.com/order?id=${id}`,
    twitterTitle: `${id} - ระบบติดตามการผลิต`,
});

definePageMeta({
    validate: (route) => !!route.query.id,
});

useHead({
    title: id.toUpperCase(),
});

// VARIABLE
const specSheetService = useSpecSheet();
const verificationModalOpenState = ref<boolean>(true);
const isLoading = ref<boolean>(true);
const isVerified = ref<boolean>(false);
const specSheet = ref<SpecSheet>({} as SpecSheet);
const { $toast } = useNuxtApp();
const validateForm = ref<any>({
    sewCut: false,
    delivery: false,
    specSheet: false,
    amountlist: false,
    by: '',
});

// PROVIDE
provide('form', validateForm);

// FUNCTION
async function getSpecSheet(): Promise<SpecSheet | null> {
    const data = await specSheetService.get(id, {
        errorCallback: () => {
            $toast.error('เกิดปัญหาระหว่างค้นหาโปรเจกต์');
        },
    });

    return data;
}

async function reloadSpecSheet() {
    isLoading.value = true;
    specSheet.value = (await getSpecSheet()) as SpecSheet;
    isLoading.value = false;
}

async function loadSpecSheet() {
    isVerified.value = true;

    const data = await getSpecSheet();

    if (!data) throw createError({ statusCode: 404, statusMessage: `ไม่พบใบสเปคที่ไอดี ${id}` });
    specSheet.value = data;

    isLoading.value = false;
}

// COMPUTED
const isApprovedSpec = computed<boolean>(() => !!specSheet.value.stepData.customerApproved.done);

onMounted(async () => {
    verificationModalOpenState.value = true;
});
</script>
<template>
    <div>
        <NuxtLayout>
            <VerificationModal v-if="!isVerified" v-model:open="verificationModalOpenState" :spec-sheet-id="id" @verified="loadSpecSheet()" />
            <template v-else>
                <div v-if="!isLoading">
                    <h1 class="text-6xl text-primary-700 dark:text-primary-400 mb-1 font-bold">{{ specSheet.project?.name }}</h1>
                    <p class="text-3xl text-stone-700 dark:text-stone-400">{{ specSheet.productType }}</p>
                    <p class="mb-10 text-xl text-stone-700 dark:text-stone-400">ID: {{ specSheet.id }}</p>
                    <template v-if="!isApprovedSpec">
                        <DueDetails :spec-sheet="specSheet" class="mb-10" />
                        <ProductDetail :spec-sheet="specSheet" :is-approved="isApprovedSpec" class="mb-10" />
                        <DeliveryDetails :spec-sheet="specSheet" :is-approved="isApprovedSpec" class="mb-10" />
                        <ApproveDetails :spec-sheet="specSheet" @approve="reloadSpecSheet()" />
                    </template>
                    <template v-else>
                        <Status :spec-sheet="specSheet" @reload-spec-sheet="reloadSpecSheet()">
                            <div class="mb-5">
                                <p class="text-lg dark:text-stone-300">
                                    อนุมัติใบสเปคเมื่อ {{ formatDate(specSheet.stepData.customerApproved.at || '') }} โดย {{ specSheet.stepData.customerApproved.by }}
                                </p>
                            </div>
                        </Status>
                        <DueDetails :spec-sheet="specSheet" class="mb-10" />
                        <DeliveryDetails :spec-sheet="specSheet" :is-approved="isApprovedSpec" class="mb-10" />
                        <ProductDetail :spec-sheet="specSheet" :is-approved="isApprovedSpec" />
                    </template>
                </div>
                <div v-else class="h-screen w-screen fixed top-0 left-0 bg-black opacity-50 flex justify-center items-center">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </template>
        </NuxtLayout>
    </div>
</template>
<style>
.required::after {
    color: red;
    content: '*';
}
</style>

<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import Status from '@/components/Component/StatusComponent.vue';
import ProductDetails from '@/components/Section/ProductDetails.vue';
import DeliveryDetails from '@/components/Section/DeliveryDetails.vue';
import ApproveDetails from '@/components/Section/ApproveDetails.vue';
import DueDetails from '@/components/Section/DueDetails.vue';
import ApprovedSpecModal from '@/components/Component/ApprovedSpecModal.vue';
import VerificationModal from '@/components/Component/VerificationModal.vue';

const id = useRoute().query.id as string;
useSeoMeta({
    ogTitle: `${id} - ระบบติดตามการผลิต`,
    ogUrl: `https://order.somsritshirt.com/order?id=${id}`,
    twitterTitle: `${id} - ระบบติดตามการผลิต`,
});

useHead({
    title: id.toUpperCase(),
});

// VARIABLE
const isLoading = ref<boolean>(true);
const isVerified = ref<boolean>(false);
const quotation = ref<any>({});
const hasError = ref<boolean>(false);
const validateForm = ref<any>({
    sewCut: false,
    delivery: false,
    quotation: false,
    amountlist: false,
    by: '',
});
const sampleStatusList = [
    { id: 'producing', name: 'ผลิตตัวอย่าง', doing: 'กำลังผลิตตัวอย่าง', icon: 'material-symbols:precision-manufacturing-outline-rounded' },
    { id: 'producing', name: 'ผลิตตัวอย่าง', doing: 'กำลังผลิตตัวอย่าง', icon: 'material-symbols:precision-manufacturing-outline-rounded' },
    { id: 'approving_sample', name: 'อนุมัติตัวอย่าง', doing: 'รออนุมัติตัวอย่าง', icon: 'material-symbols:dry-cleaning-outline-sharp' },
];
const orderStatusList = [
    { id: 'approving', name: 'อนุมัติใบสเปค', doing: 'รออนุมัติใบสเปค', icon: 'material-symbols:menu-book-outline-rounded' },
    { id: 'producing', name: 'ผลิตสินค้า', doing: 'กำลังผลิตสินค้า', icon: 'material-symbols:precision-manufacturing-outline-rounded' },
    { id: 'packing', name: 'แพ็กสินค้า', doing: 'กำลังแพ็กสินค้า', icon: 'material-symbols:package-2' },
    { id: 'delivering', name: 'จัดส่ง', doing: 'รอจัดส่ง', icon: 'material-symbols:package-outline' },
];
const sampleStatusData = ref<any>({
    approving: {},
    producing: {},
    approving_sample: {},
});
const orderStatusData = ref<any>({
    approving: {},
    producing: {},
    packing: {},
    delivering: {},
});

// PROVIDE
provide('form', validateForm);

// FUNCTION
function validateQuotation(src: any): boolean {
    // CHECK SAMPLE STEP
    for (const step of src.step_list.sample) {
        if (!step.tag) {
            return false;
        }
    }

    // CHECK ORDER STEP
    for (const step of src.step_list.order) {
        if (!step.tag) {
            return false;
        }
    }

    return true;
}
async function getQuotation() {
    try {
        const { data } = await useApiFetch(`/frontend/quotation/${id}`);
        // CHECK HAS DATA
        if (!data.value || !validateQuotation(data.value)) {
            hasError.value = true;
            return false;
        }

        quotation.value = data.value;
        return true;
    } catch (err) {
        hasError.value = true;
        return false;
    }
}

function groupStepByTag(type: 'sample' | 'order') {
    const groupStep: any = {};
    const { step_list: stepList } = quotation.value;

    for (const step of stepList[type]) {
        const tag = step.tag;
        if (!groupStep[tag]) {
            groupStep[tag] = [];
        }

        // PUSH TO GROUP
        if (step.enable) {
            groupStep[tag].push(step);
        }
    }

    return groupStep;
}

function getStatus(steps: any[], type: 'sample' | 'order') {
    const stepData = quotation.value.step_data[type];
    const data: any = {
        status: true,
        details: [],
    };

    for (const step of steps) {
        const stepId = step.id;

        // CHECK STEP IS FINISH
        if (!stepData[stepId] || !stepData[stepId].done) {
            data.status = false;
        }

        // PUSH DATA TO DETAILS
        if (step.enable) {
            const detailsData = { ...step, ...stepData[stepId] };
            data.details.push(detailsData);
        }
    }

    // ASSIGN TO APPROVED
    return data;
}

function getSampleStatus() {
    const groupStep = groupStepByTag('sample');

    sampleStatusData.value.approving = getStatus(groupStep.approving, 'sample');
    sampleStatusData.value.producing = getStatus(groupStep.producing, 'sample');
    sampleStatusData.value.approving_sample = getStatus(groupStep.approving_sample, 'sample');
}

function getOrderStatus() {
    const groupStep = groupStepByTag('order');

    orderStatusData.value.approving = getStatus(groupStep.approving, 'order');
    orderStatusData.value.producing = getStatus(groupStep.producing, 'order');
    orderStatusData.value.packing = getStatus(groupStep.packing, 'order');
    orderStatusData.value.delivering = getStatus(groupStep.delivering, 'order');
}

async function prepareOrder() {
    const status = await getQuotation();
    if (!status) {
        return;
    }
    getSampleStatus();
    getOrderStatus();
}

async function reloadQuotation() {
    isLoading.value = true;
    await prepareOrder();
    isLoading.value = false;
}

async function loadQuotation() {
    isVerified.value = true;

    await prepareOrder();

    isLoading.value = false;
    register();
}

// COMPUTED
const isApprovedSpec = computed(() => {
    const { approved_spec: sampleApproved } = quotation.value.step_data.sample;
    const { approved_spec: orderApproved } = quotation.value.step_data.order;

    return sampleApproved.done && orderApproved.done;
});

onMounted(async () => {
    await nextTick();
    // CHECK ID
    if (!id) {
        hasError.value = true;
    } else {
        openModal('verification-modal');
    }
});
</script>
<template>
    <div>
        <NuxtLayout>
            <div v-if="hasError">
                <div class="flex justify-center mb-5">
                    <IconCSS name="material-symbols:chat-error-outline-rounded" size="6rem" class="text-error"></IconCSS>
                </div>

                <p class="text-center text-4xl font-bold mb-2 text-warning">เกิดปัญหาระหว่างดึงข้อมูลโปรเจกต์</p>
                <p class="text-center text-xl">โปรดลองอีกครั้งในภายหลัง</p>
            </div>
            <VerificationModal v-else-if="!isVerified" :quotation-id="id" @verified="loadQuotation()"></VerificationModal>
            <div v-else-if="!isLoading">
                <h1 class="text-6xl text-primary mb-1 font-bold">{{ quotation.name }}</h1>
                <p class="text-3xl">{{ quotation.type }}</p>
                <p class="mb-10 text-xl text-neutral-400">ID: {{ quotation.id }}</p>
                <template v-if="!isApprovedSpec">
                    <DueDetails :quotation="quotation" class="mb-10"></DueDetails>
                    <ProductDetails :quotation="quotation" :is-approved="isApprovedSpec" class="mb-10"></ProductDetails>
                    <DeliveryDetails :quotation="quotation" :is-approved="isApprovedSpec" class="mb-10"></DeliveryDetails>
                    <ApproveDetails :quotation="quotation"></ApproveDetails>
                    <!-- MODAL -->
                    <ApprovedSpecModal :id="quotation.id" @reload-quotation="reloadQuotation()"></ApprovedSpecModal>
                </template>
                <template v-else>
                    <!-- SAMPLE -->
                    <Status
                        v-if="!quotation.is_order"
                        :quotation="quotation"
                        :status-list="sampleStatusList"
                        :status-data="sampleStatusData"
                        :step-data="quotation.step_data.sample"
                        :step-list="quotation.step_list.sample"
                        @reload-quotation="reloadQuotation()"
                    >
                        <div class="mb-10">
                            <p class="text-lg">อนุมัติใบสเปคเมื่อ {{ formatDate(quotation.step_data.sample.approved_spec.at) }} โดย {{ quotation.step_data.sample.approved_spec.by }}</p>
                        </div>
                    </Status>

                    <!-- ORDER -->
                    <Status
                        v-if="quotation.is_order"
                        :quotation="quotation"
                        :status-list="orderStatusList"
                        :status-data="orderStatusData"
                        :step-list="quotation.step_list.order"
                        :step-data="quotation.step_data.order"
                    >
                        <div class="mb-10">
                            <p class="text-lg">อนุมัติใบสเปคเมื่อ {{ formatDate(quotation.step_data.sample.approved_spec.at) }} โดย {{ quotation.step_data.sample.approved_spec.by }}</p>
                            <p v-if="quotation.produce.sample_type !== 'ไม่ต้อง'" class="text-lg">
                                อนุมัติตัวอย่างเมื่อ {{ formatDate(quotation.step_data.sample.approved_sample.at) }} โดย {{ quotation.step_data.sample.approved_sample.by }}
                            </p>
                        </div>
                    </Status>
                    <DueDetails :quotation="quotation" class="mb-10"></DueDetails>
                    <DeliveryDetails :quotation="quotation" :is-approved="isApprovedSpec" class="mb-10"></DeliveryDetails>
                    <ProductDetails :quotation="quotation" :is-approved="isApprovedSpec"></ProductDetails>
                </template>
            </div>
            <div v-else class="h-screen w-screen fixed top-0 left-0 bg-black opacity-50 flex justify-center items-center">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
        </NuxtLayout>
    </div>
</template>
<style>
.required::after {
    color: red;
    content: '*';
}
</style>

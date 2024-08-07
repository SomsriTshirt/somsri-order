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
const specSheet = ref<any>({});
const hasError = ref<boolean>(false);
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
async function getSpecSheet() {
  try {
    const { data } = await await useApiFetch(`/v1/spec-sheets/public/${id}`, {
      query: {
        include: 'project,project.customer,workOrders',
      },
    });

    // CHECK HAS DATA
    if (!data.value) {
      hasError.value = true;
      return false;
    }

    specSheet.value = data.value;
    return true;
  } catch (err) {
    hasError.value = true;
    $toast.error('เกิดปัญหาระหว่างค้นหาโปรเจกต์');
    return false;
  }
}

async function prepareOrder() {
  const status = await getSpecSheet();
  if (!status) {
    return '';
  }
}

async function reloadSpecSheet() {
  isLoading.value = true;
  await prepareOrder();
  isLoading.value = false;
}

async function loadSpecSheet() {
  isVerified.value = true;

  await prepareOrder();

  isLoading.value = false;
  register();
}

// COMPUTED
const isApprovedSpec = computed<boolean>(() => !!specSheet.value.stepData.customerApproved.done);

onMounted(async () => {
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

        <p class="text-center text-4xl font-bold mb-2 text-warning">เกิดปัญหาระหว่างดึงข้อมูลใบสเปค</p>
        <p class="text-center text-xl">โปรดลองอีกครั้งในภายหลัง</p>
      </div>
      <VerificationModal v-else-if="!isVerified" :spec-sheet-id="id" @verified="loadSpecSheet()"></VerificationModal>
      <div v-else-if="!isLoading">
        <h1 class="text-6xl text-primary mb-1 font-bold">{{ specSheet.project.name }}</h1>
        <p class="text-3xl">{{ specSheet.productType }}</p>
        <p class="mb-10 text-xl text-neutral-400">ID: {{ specSheet.id }}</p>
        <template v-if="!isApprovedSpec">
          <DueDetails :spec-sheet="specSheet" class="mb-10"></DueDetails>
          <ProductDetails :spec-sheet="specSheet" :is-approved="isApprovedSpec" class="mb-10"></ProductDetails>
          <DeliveryDetails :spec-sheet="specSheet" :is-approved="isApprovedSpec" class="mb-10"></DeliveryDetails>
          <ApproveDetails :spec-sheet="specSheet"></ApproveDetails>
          <!-- MODAL -->
          <ApprovedSpecModal :id="specSheet.id" @reload-spec-sheets="reloadSpecSheet()"></ApprovedSpecModal>
        </template>
        <template v-else>
          <Status :spec-sheet="specSheet" @reload-spec-sheet="reloadSpecSheet()">
            <div class="mb-10">
              <p class="text-lg">อนุมัติใบสเปคเมื่อ {{ formatDate(specSheet.stepData.customerApproved.at) }} โดย {{ specSheet.stepData.customerApproved.by }}</p>
            </div>
          </Status>
          <DueDetails :spec-sheet="specSheet" class="mb-10"></DueDetails>
          <DeliveryDetails :spec-sheet="specSheet" :is-approved="isApprovedSpec" class="mb-10"></DeliveryDetails>
          <ProductDetails :spec-sheet="specSheet" :is-approved="isApprovedSpec"></ProductDetails>
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

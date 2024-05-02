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
const validateForm = ref<any>({
  sewCut: false,
  delivery: false,
  quotation: false,
  amountlist: false,
  by: '',
});
/* const sampleStatusList = [
  { id: 'producing', name: 'ผลิตตัวอย่าง', doing: 'กำลังผลิตตัวอย่าง', icon: 'material-symbols:precision-manufacturing-outline-rounded' },
  { id: 'producing', name: 'ผลิตตัวอย่าง', doing: 'กำลังผลิตตัวอย่าง', icon: 'material-symbols:precision-manufacturing-outline-rounded' },
  { id: 'approving_sample', name: 'อนุมัติตัวอย่าง', doing: 'รออนุมัติตัวอย่าง', icon: 'material-symbols:dry-cleaning-outline-sharp' },
]; */
const orderStatusList = [
  /* { id: 'approving', name: 'อนุมัติใบสเปค', doing: 'รออนุมัติใบสเปค', icon: 'material-symbols:menu-book-outline-rounded' },
  { id: 'producing', name: 'ผลิตสินค้า', doing: 'กำลังผลิตสินค้า', icon: 'material-symbols:precision-manufacturing-outline-rounded' },
  { id: 'packing', name: 'แพ็กสินค้า', doing: 'กำลังแพ็กสินค้า', icon: 'material-symbols:package-2' },
  { id: 'delivering', name: 'จัดส่ง', doing: 'รอจัดส่ง', icon: 'material-symbols:package-outline' }, */
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
function validateSpecSheet(src: any): boolean {
  // CHECK SAMPLE STEP
  for (const step of src.stepList.sample) {
    if (!step.tag) {
      return false;
    }
  }

  // CHECK ORDER STEP
  for (const step of src.stepList.order) {
    if (!step.tag) {
      return false;
    }
  }

  return true;
}
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
    return false;
  }
}

function groupStepByTag(type: 'sample' | 'order') {
  const groupStep: any = {};
  const { step_list: stepList } = specSheet.value;

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
  const stepData = specSheet.value.step_data[type];
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
  const status = await getSpecSheet();
  if (!status) {
    return
  }
  /* getSampleStatus(); */
/*   getOrderStatus();  */
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
const isApprovedSpec = computed(() => {
  /* const managerApproved = ref<any>(specSheet.value.stepData.managerApproved.done); */
  const customerApproved = ref<any>(specSheet.value.stepData.customerApproved.done);
  if (customerApproved.value === true) {
    return true;
  } else {
    return false;
  }
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
          <!-- ยังไม่ได้แก้ครับ -->
          <!-- SAMPLE -->
          <!-- <Status
            v-if="specSheet.specSheetType[0] == 'SAMPLE'"
            :spec-sheet="specSheet"
            :status-list="orderStatusList"
            :status-data="orderStatusData"
            :step-list="specSheet.stepList"
            :step-data="specSheet.stepData"
            @reload-spec-sheet="reloadSpecSheet()"
          >
            <div class="mb-10">
              <p class="text-lg">อนุมัติใบสเปคเมื่อ {{ formatDate(specSheet.stepData.customerApproved.at) }} โดย {{ specSheet.stepData.customerApproved.by }}</p>
            </div>
          </Status>
 -->
          <!-- ORDER -->
          <!--  <Status
            v-if="specSheet.specSheetType[0] == 'ORDER'"
            :spec-sheet="specSheet"
            :status-list="orderStatusList"
            :status-data="orderStatusData"
            :step-list="specSheet.stepList"
            :step-data="specSheet.stepData"
          >
            <div class="mb-10">
              <p class="text-lg">อนุมัติใบสเปคเมื่อ {{ formatDate(specSheet.stepData.customerApproved.at) }} โดย {{ specSheet.stepData.customerApproved.by }}</p>
              <p v-if="specSheet.sampleType !== 'ไม่ต้อง'" class="text-lg">
                อนุมัติตัวอย่างเมื่อ {{ formatDate(specSheet.sampleDue) }} 
              </p>
            </div>
          </Status>  -->
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

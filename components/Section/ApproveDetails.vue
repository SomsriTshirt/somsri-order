<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf, helpers } from '@vuelidate/validators';
import type { SpecSheet } from '~/types/SpecSheet';

// LAZY LOAD
const ApprovedSpecModal = defineAsyncComponent(() => import('@/components/Component/ApprovedSpecModal.vue'));

// PROPS
interface Props {
    specSheet: SpecSheet;
}

// EMIT
type Emit = {
    approve: [];
};
defineEmits<Emit>();

// VARIABLE
const props = defineProps<Props>();
const { specSheet } = toRefs(props);
const { $toast } = useNuxtApp();
const approveSpecModalOpenState = ref<boolean>(false);
const form: any = inject('form');

// VALIDATOR
const isTrue = (value: boolean): boolean => {
    return value;
};
const haveScreenWork = () => specSheet.value.screenPoints.length > 0;
const havePinWork = () => specSheet.value.pinPoints.length > 0;
const havePrintWork = () => specSheet.value.printPoints.length > 0;

const validatorRules = computed(() => ({
    sewCut: {
        required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานตัดและเย็บ และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', isTrue),
    },
    amountlist: {
        required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าข้อมูลไซซ์และจำนวนให้ครบทุกกลุ่ม ก่อนกดอนุมัติ', isTrue),
    },

    screen: {
        required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานสกรีน และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', requiredIf(haveScreenWork)),
    },
    pin: {
        required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานปัก และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', requiredIf(havePinWork)),
    },
    print: {
        required: helpers.withMessage('กรุณาตรวจสอบข้อมูลงานพิมพ์ และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', requiredIf(havePrintWork)),
    },
    delivery: {
        required: helpers.withMessage('กรุณาตรวจสอบข้อมูลการจัดส่ง และทำเครื่องหมายยืนยันก่อนกดอนุมัติ', isTrue),
    },
    by: {
        required: helpers.withMessage('กรุณาลงชื่อผู้อนุมัติก่อนกดอนุมัติ', required),
    },
    specSheet: {
        required: helpers.withMessage('กรุณาตรวจสอบทำเครื่องหมายยืนยันว่าใบสเปคนี้ถูกต้อง ก่อนกดอนุมัติ', isTrue),
    },
}));
const validator = useVuelidate(validatorRules, form);

// FUNCTION
async function openApproveModal() {
    // VALIDATE DATA
    const validate = await validator.value.$validate();
    if (!validate) {
        // SHOW MISSED VALIDATOR MESSAGE
        const error = validator.value.$errors[0];
        $toast.error(error.$message);
        return;
    }

    approveSpecModalOpenState.value = true;
}
</script>
<template>
    <div class="rounded-xl border dark:border-stone-600 p-5 bg-white dark:bg-stone-800 shadow">
        <Label class="required text-lg" for="input-approved-name">ลงชื่อผู้อนุมัติใบสเปค </Label>
        <div class="grid grid-cols-12 gap-5 mt-1 mb-2">
            <Input id="input-approved-name" v-model="form.by" class="input input-bordered col-span-10" type="text" placeholder="--ชื่อผู้อนุมัติใบสเปค--" />
            <Button class="text-lg col-span-2" @click="openApproveModal()"><IconCSS name="material-symbols:check-small-rounded" size="2rem" class="mr-1"></IconCSS>อนุมัติใบสเปค</Button>
        </div>
        <div class="flex items-center gap-1">
            <Checkbox id="approver-name" v-model:checked="form.specSheet" class="w-5 h-5" />
            <Label for="approver-name" class="required underline text-md">ฉันได้ทำการตรวจสอบมั่นใจแล้วว่าใบสเปคนี้ถูกต้อง</Label>
        </div>

        <Suspense v-if="approveSpecModalOpenState">
            <ApprovedSpecModal :id="specSheet.id" v-model:open="approveSpecModalOpenState" @approved="$emit('approve')" />
        </Suspense>
    </div>
</template>

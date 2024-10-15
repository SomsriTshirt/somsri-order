<script setup lang="ts">
import { useSpecSheet } from '@/composables/useSpecSheet';

// PROPS
interface Props {
    specSheetId: string;
}
const props = defineProps<Props>();
const { specSheetId } = toRefs(props);

// MODEL
const open = defineModel<boolean>('open', { required: true, default: false });

// EMIT
type Emit = {
    verified: [];
};
const emit = defineEmits<Emit>();

// VARIABLE
const pins = ref<string[]>(['', '', '', '']);
const isPending = ref<boolean>(false);
const errorMsg = ref<string>('');
const specSheetService = useSpecSheet();

// FUNCTION
function validatePin() {
    const regexNumberTest = /^\d+$/;
    let isPass = true;
    let msg = '';
    for (const pin of pins.value) {
        if (pin.length !== 1) {
            isPass = false;
            msg = 'คุณต้องกรอกตัวเลขในทุกช่อง ช่องละ 1 ตัวเลข';
            break;
        } else if (!regexNumberTest.test(pin)) {
            isPass = false;
            msg = 'กรุณากรอกตัวเลขให้ถูกต้อง';
            break;
        }
    }

    if (isPass) {
        return true;
    } else {
        errorMsg.value = msg;
        return false;
    }
}

async function verify() {
    isPending.value = true;
    errorMsg.value = '';
    if (!validatePin()) {
        isPending.value = false;
        return false;
    }

    const data = await specSheetService.verifyCustomer(specSheetId.value, pins.value, {
        errorCallback: () => {
            errorMsg.value = 'เกิดปัญหาระหว่างยืนยันตัวตน';
        },
    });

    if (data.verify) {
        emit('verified');
        open.value = false;
    } else {
        errorMsg.value = 'เลข 4 ตัวสุดท้ายของเบอร์โทรศัพท์ไม่ถูกต้อง โปรดลองอีกครั้ง';
    }
    isPending.value = false;
}
</script>
<template>
    <AlertDialog v-model:open="open">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle class="text-xl">ยืนยันตัวตน</AlertDialogTitle>
                <AlertDialogDescription>กรุณาใส่เลข 4 ตัวสุดท้ายของเบอร์โทรศัพท์ที่ได้แจ้งกับทางเซลล์เอาไว้เพื่อเป็นการยืนยันตัวตน</AlertDialogDescription>
            </AlertDialogHeader>

            <div class="flex flex-col items-center gap-y-3">
                <PinInput v-model="pins" type="number" placeholder="○" @complete="verify">
                    <PinInputGroup>
                        <PinInputInput v-for="(num, index) in 4" :key="num" :class="{ '!border-red-500': errorMsg }" class="text-lg w-12 h-12" :disabled="isPending" :index="index" />
                    </PinInputGroup>
                </PinInput>

                <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
            </div>

            <AlertDialogFooter>
                <Button :disabled="isPending" @click="verify()">ยืนยัน</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

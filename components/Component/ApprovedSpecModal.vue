<script setup lang="ts">
// PROPS
interface Props {
    id: string;
}

const props = defineProps<Props>(); // props ใช้เก็บข้อมูล Props(id) ที่ส่งมายัง component
const { id } = toRefs(props);

// MODEL
const open = defineModel<boolean>('open', { required: true, default: false });

// EMIT
type Emit = {
    approved: [];
};
const emit = defineEmits<Emit>(); // emit สามารถส่ง reload-quotation ได้

// VARIABLE
const pending = ref<boolean>(false); // pending(รอดำเนินการ) มีค่าเริ่มต้นเป็น false
const { $toast } = useNuxtApp(); // แสดงการแจ้งเตือน
const form: any = inject('form');
const specSheetService = useSpecSheet();

// FUNCTION
async function approvedSpec() {
    pending.value = true;

    const data = await specSheetService.confrim(id.value, form.value);
    if (data) {
        $toast.success('อนุมัติใบสเปคเรียบร้อยแล้ว', {
            description: `โดย${form.value.by}`,
        });

        open.value = false;
        emit('approved');
    }

    pending.value = false;
}

// Fetch สร้าง request ยิงไปที่ API
// ข้อมูลที่ดึงได้จะเป็น JSON ซึ่งใน js ไม่่สามารถใช้ได้ ต้องแปลงให้เป็น js object ก่อน
</script>
<template>
    <AlertDialog v-model:open="open">
        <AlertDialogContent class="max-w-5xl">
            <AlertDialogHeader class="flex-row justify-between items-center gap-3">
                <AlertDialogTitle>เงื่อนไขการแก้ไขตัวอย่าง</AlertDialogTitle>
                <AlertDialogCancel :disabled="pending" as-child>
                    <Button :disabled="pending" type="button" class="px-2" variant="ghost">
                        <IconCSS name="material-symbols:close-rounded" size="1rem"></IconCSS>
                    </Button>
                </AlertDialogCancel>
            </AlertDialogHeader>

            <div class="dark:text-stone-300 border border-stone-400 dark:border-stone-600 rounded-xl shadow p-4 mb-3">
                <ol class="my-2 list-decimal list-inside">
                    <li>สินค้าจะผลิตตาม Artwork ที่ถูกยืนยันเท่านั้น กรุณาตรวจสอบรายละเอียดให้เรียบร้อยก่อนทำการอนุมัติ</li>
                    <li>หลังอนุมัติใบสเปคแล้ว จะไม่สามารถเปลี่ยนลายสกรีน/ปัก เนื้อผ้า สีผ้า รูปทรง และวัตถุดิบได้</li>
                    <li>หลังได้รับตัวอย่างงาน รบกวนอนุมัติงานผลิตภายใน 24 ชั่วโมง(ตัวอย่างจะเป็นการถ่ายรูปเท่านั้น หากต้องการให้ส่งตัวอย่างจริง จะมีค่าจัดส่งเพิ่มเติม 60 บาท)</li>
                    <li>หากงานตัวอย่างมีการแก้ไขหรือเปลี่ยนแปลง กำหนดการผลิตสินค้าจะถูกเลื่อนออกไปจนกว่าตัวอย่างจะถูกอนุมัติและจะแจ้งกำหนดการเสร็จสิ้นอีกครั้ง</li>
                </ol>
                <div class="grid grid-cols-1 my-2 md:grid-cols-2 gap-3">
                    <div class="px-10">
                        <h5 class="text-center font-bold text-primary-700 dark:text-primary-400 text-xl">สิ่งที่แก้ไขได้</h5>
                        <ul class="list-disc">
                            <li>สีสรีน</li>
                            <li>ตำแหน่งการปัก/สกรีน</li>
                            <li>ปัญหาที่เกิดขึ้นจากความผิดพลาดของโรงงาน</li>
                        </ul>
                    </div>
                    <div class="px-10">
                        <h5 class="text-center font-bold text-primary-700 dark:text-primary-400 text-xl">สิ่งที่แก้ไขไม่ได้</h5>
                        <ul class="list-disc">
                            <li>เนื้อผ้า/สีผ้า</li>
                            <li>Pattern/ขนาดเสื้อ</li>
                            <li>วัตถุดิบประกอบเสื้อ</li>
                            <li>เปลี่ยนแบบสกรีน/ปัก</li>
                            <li>ขนาดของลาย</li>
                            <li>เปลี่ยนสีงานพิมพ์</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p><b>หมายเหตุ: </b>เนื้อผ้ามีโอกาสหดหลังการซักครั้งแรก 1-2 นิ้ว รบกวนเผื่อขนาดอกก่อนสั่งผลิตงานพิมพ์ Sublimation สีพิมพ์จะต่างจากสีไฟล์งานบวกลบ 10-15% ขึ้นอยู่กับเครื่องพิมพ์</p>
                    <p class="text-primary-700 dark:text-primary-400 font-bold underline">หลังอนุมัติใบสเปคแล้วจะไม่สามารถแก้ไขแบบได้ รบกวนตรวจสอบใบสเปคให้เรียบร้อยก่อนอนุมัติ</p>
                </div>
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel :disabled="pending" type="button">ยกเลิก</AlertDialogCancel>
                <Button :disabled="pending" type="button" @click="approvedSpec()">ฉันอ่านและยอมรับเงื่อนไขข้างต้น</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

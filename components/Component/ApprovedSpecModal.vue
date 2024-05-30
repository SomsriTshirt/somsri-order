<!-- ยืนยันใบสเปค -->
<script setup lang="ts">
interface Props {
  id: string;
}

const props = defineProps<Props>(); // props ใช้เก็บข้อมูล Props(id) ที่ส่งมายัง component
const { id } = toRefs(props);
const form: any = inject('form');

// EMIT
const emit = defineEmits(['reload-spec-sheets']); // emit สามารถส่ง reload-quotation ได้

// VARIABLE
const pending = ref<boolean>(false); // pending(รอดำเนินการ) มีค่าเริ่มต้นเป็น false
const { $toast }: any = useNuxtApp(); // แสดงการแจ้งเตือน

// FUNCTION ยืนยันอนุมัติใบสเปค
async function approvedSpec() {
  pending.value = true;

  try {
    //
    const { data }: any = await useApiFetch(`/v1/spec-sheets/public/${id.value}/approved/customer`, {
      // ${id.value} ดึงค่า id ที่เป็น ref มาแสดง
      method: 'POST',
      body: form.value, // ส่งข้อมูลที่เก็บไว้ใน form ไปยัง API
    });
    if (data.value) {
      $toast.success('อนุมัติใบสเปคเรียบร้อยแล้ว', {
        description: `โดย${form.value.by}`,
      });

      // REFRESH QUOTATION
      emit('reload-spec-sheets');
    }
  } catch (err) {
    pending.value = false;
  }
}

// Fetch สร้าง request ยิงไปที่ API
// ข้อมูลที่ดึงได้จะเป็น JSON ซึ่งใน js ไม่่สามารถใช้ได้ ต้องแปลงให้เป็น js object ก่อน
</script>
<template>
  <dialog id="approved-spec-modal" class="modal">
    <div class="modal-box w-11/12 max-w-3xl">
      <div class="flex justify-end mb-3">
        <form method="dialog">
          <button class="btn btn-sm btn-ghost btn-circle">
            <IconCSS name="material-symbols:close-rounded" size="1rem"></IconCSS>
          </button>
        </form>
      </div>
      <div class="border border-gray-400 dark:border-neutral-600 rounded-xl shadow p-4 mb-3">
        <p class="text-center text-3xl font-bold text-primary">เงื่อนไขการแก้ไขตัวอย่าง</p>
        <div class="my-2">
          <p>1. สินค้าจะผลิตตาม ArtWork ที่ถูกยืนยันเท่านั้น กรุณาตรวจสอบรายละเอียดให้เรียบร้อยก่อนทำการอนุมัติ</p>
          <p>2. หลังอนุมัติใบสเปคแล้ว จะไม่สามารถเปลี่ยนลายสกรีน/ปัก เนื้อผ้า สีผ้า รูปทรง และวัตถุดิบได้</p>
          <p>3. หลังได้รับตัวอย่างงาน รบกวนอนุมัติงานผลิตภายใน 24 ชั่วโมง(ตัวอย่างจะเป็นการถ่ายรูปเท่านั้น หากต้องการให้ส่งตัวอย่างจริง จะมีค่าจัดส่งเพิ่มเติม 60 บาท)</p>
          <p>4. หากงานตัวอย่างมีการแก้ไขหรือเปลี่ยนแปลง กำหนดการผลิตสินค้าจะถูกเลื่อนออกไปจนกว่าตัวอย่างจะถูกอนุมัติและจะแจ้งกำหนดการเสร็จสิ้นอีกครั้ง</p>
        </div>
        <div class="grid grid-cols-1 gap-4 my-2 md:grid-cols-2 gap-3">
          <div class="px-10">
            <h5 class="text-center font-bold text-primary text-xl">สิ่งที่แก้ไขได้</h5>
              <ul class="list-disc">
                <li>สีสรีน</li>
                <li>ตำแหน่งการปัก/สกรีน</li>
                <li>ปัญหาที่เกิดขึ้นจากความผิดพลาดของโรงงาน</li>
              </ul>
          </div>
          <div class="px-10">
            <h5 class="text-center font-bold text-primary text-xl">สิ่งที่แก้ไขไม่ได้</h5>
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
            <p class="text-primary font-bold">หลังอนุมัติใบสเปคแล้วจะไม่สามารถแก้ไขแบบได้ รบกวนตรวจสอบใบสเปคให้เรียบร้อยก่อนอนุมัติ</p>
        </div>
      </div>

      <form method="dialog">
        <div class="grid grid-cols-2 gap-4">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-ghost border border-neutral-700 text-base">ยกเลิก</button>
          <button class="btn btn-success text-base" @click="approvedSpec()">ฉันอ่านและยอมรับเงื่อนไขข้างต้น</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

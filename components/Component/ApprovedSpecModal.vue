<!-- ยืนยันใบสเปค -->
<script setup lang="ts">
interface Props {
  id: string;
}

const props = defineProps<Props>(); // props ใช้เก็บข้อมูล Props(id) ที่ส่งมายัง component
const { id } = toRefs(props);
const form: any = inject('form');

// EMIT
const emit = defineEmits(['reload-quotation']); // emit สามารถส่ง reload-quotation ได้

// VARIABLE
const pending = ref<boolean>(false); // pending(รอดำเนินการ) มีค่าเริ่มต้นเป็น false
const { $toast }: any = useNuxtApp(); // แสดงการแจ้งเตือน

// FUNCTION ยืนยันอนุมัติใบสเปค
async function approvedSpec() {
  pending.value = true;

  try {
    //
    const { data }: any = await useApiFetch(`/frontend/quotation/${id.value}/approved-spec`, {
      // ${id.value} ดึงค่า id ที่เป็น ref มาแสดง
      method: 'PATCH',
      body: form.value, // ส่งข้อมูลที่เก็บไว้ใน form ไปยัง API
    });
    if (data.value.status) {
      $toast.success('อนุมัติใบสเปคเรียบร้อยแล้ว', {
        description: `โดย${form.value.by}`,
      });

      // REFRESH QUOTATION
      emit('reload-quotation');
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
    <div class="modal-box">
      <div class="flex justify-end mb-3">
        <form method="dialog">
          <button class="btn btn-sm btn-ghost btn-circle">
            <IconCSS name="material-symbols:close-rounded" size="1rem"></IconCSS>
          </button>
        </form>
      </div>
      <div class="mb-5">
        <h3 class="text-center text-3xl font-bold mb-3">คุณต้องการอนุมัติใบสเปคนี้หรือไม่</h3>
        <p class="text-center text-warning">เมื่อคุณกดอนุมัติแล้ว จะไม่สามารถขอแก้ไขข้อมูลในใบสเปคได้ <br />โปรดเช็คให้มั่นใจก่อนกดยืนยัน</p>
      </div>

      <form method="dialog">
        <div class="grid grid-cols-2 gap-5">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-ghost border border-neutral-700 text-lg">ยกเลิก</button>
          <button class="btn btn-success text-lg" @click="approvedSpec()">ยืนยัน</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

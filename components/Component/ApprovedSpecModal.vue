<script setup lang="ts">
interface Props {
  id: string;
}

const props = defineProps<Props>();
const { id } = toRefs(props);
const form: any = inject('form');

// EMIT
const emit = defineEmits(['reload-quotation']);

// VARIABLE
const pending = ref<boolean>(false);
const { $toast }: any = useNuxtApp();

// FUNCTION
async function approvedSpec() {
  pending.value = true;
  try {
    const { data }: any = await useApiFetch(`/frontend/quotation/${id.value}/approved-spec`, {
      method: 'PATCH',
      body: form.value,
    });
    if (data.value.status) {
      $toast.success('อนุมัติใบสเปคเรียบร้อยแล้ว', {
        description: `โดย${form.value.by}`,
      });

      // REFRESH QUOTATION
      emit('reload-quotation');
    }
  } catch (err) {}
  pending.value = false;
}
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

<script setup lang="ts">
interface Props {
    id: string
}

const props = defineProps<Props>()
const { id } = toRefs(props)

// VARIABLE
const pending = ref<boolean>(false)
const formData = ref<any>({
    name: '',
    confirm: false
})

// FUNCTION
function approvedSpec() {
    pending.value = true
    try {

    }
    catch (err) {

    }
    pending.value = false

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
                <p class="text-center text-warning">เมื่อคุณกดอนุมัติแล้ว จะไม่สามารถขอแก้ไขข้อมูลในใบสเปคได้
                    <br>โปรดเช็คให้มั่นใจและลงชื่อ
                </p>
                <div class="form-control mb-2">
                    <label for="input-sign" class="label">
                        <span class="label-text">ลงชื่อ</span>
                    </label>
                    <input id="input-sign" v-model="formData.name" type="text" class="input input-bordered w-full"
                        placeholder="ลงชื่อ">
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer justify-start">
                        <input type="checkbox" class="checkbox checkbox-primary mr-2" />
                        <span class="label-text underline">ฉันได้อ่านและยืนยันแล้วว่าใบสเปคถูกต้อง</span>
                    </label>
                </div>
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
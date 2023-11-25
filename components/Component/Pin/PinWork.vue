<script setup lang="ts">
// PROPS
interface Props {
  pin: any;
  index: number;
}
const props = defineProps<Props>();
const { pin, index } = toRefs(props);
</script>
<template>
  <div>
    <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">จุดปักที่ {{ index + 1 }}</h3>
    <table class="table border border-collapse border-neutral-300 dark:border-neutral-700 text-lg bg-white dark:bg-base-100 shadow">
      <tbody>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ตำแหน่งงานปัก</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.position }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ขนาดงานปัก</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.size }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ระยะห่างจากคอเสื้อถึงตัวงาน</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.spaceFromCollar }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ชนิดงานปัก</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.type }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">สีงานปัก</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.color }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ไฟล์เสื้อ</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.file }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ลักษณะงานปักเพิ่มเติม</td>
          <td class="capitalize border dark:border-neutral-700">{{ pin.note || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

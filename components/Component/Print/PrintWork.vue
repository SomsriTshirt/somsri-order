<script setup lang="ts">
// PROPS
interface Props {
  print: any;
  index: number;
}
const props = defineProps<Props>();
const { print, index } = toRefs(props);
</script>
<template>
  <div>
    <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">จุดพิมพ์ที่ {{ index + 1 }}</h3>
    <table class="table border border-collapse border-neutral-300 dark:border-neutral-700 text-lg bg-white dark:bg-base-100 shadow">
      <tbody>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ตำแหน่งงานพิมพ์</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.position }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ขนาดงานพิมพ์</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.size }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ระยะห่างจากคอเสื้อถึงตัวงาน</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.spaceFromCollar }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ชนิดงานพิมพ์</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.type }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">สีงานพิมพ์</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.color }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ไฟล์เสื้อ</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.file }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ลักษณะงานพิมพ์เพิ่มเติม</td>
          <td class="capitalize border dark:border-neutral-700">{{ print.note || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

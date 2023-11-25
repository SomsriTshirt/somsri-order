<script setup lang="ts">
// PROPS
interface Props {
  screen: any;
  index: number;
}
const props = defineProps<Props>();
const { screen, index } = toRefs(props);
</script>
<template>
  <div>
    <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">จุดสกรีนที่ {{ index + 1 }}</h3>
    <table class="table border border-collapse border-neutral-300 dark:border-neutral-700 text-lg bg-white dark:bg-base-100 shadow">
      <tbody>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ตำแหน่งสกรีน</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.position }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ขนาดสกรีน</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.size }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ระยะห่างจากคอเสื้อถึงตัวงาน</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.spaceFromCollar }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ชนิดงานสกรีน</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.type }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">สีสกรีน</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.color }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ไฟล์เสื้อ</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.file }}</td>
        </tr>
        <tr>
          <td class="font-medium border dark:border-neutral-700">ลักษณะสกรีนเพิ่มเติม</td>
          <td class="capitalize border dark:border-neutral-700">{{ screen.note || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

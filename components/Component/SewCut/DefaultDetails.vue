<script setup lang="ts">
// PROPS
interface Props {
  quotation: any;
}
const props = defineProps<Props>();
const { quotation } = toRefs(props);
const produce = ref<any>(quotation.value.produce);
</script>
<template>
  <table class="table border border-collapse border-neutral-300 dark:border-neutral-700 text-lg bg-white dark:bg-base-100 shadow">
    <tbody>
      <tr>
        <td class="font-medium border dark:border-neutral-700">เนื้อผ้า</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.fabric }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">สีเสื้อ</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.color }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">แขนเสื้อ</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.sleeve }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">ปกเสื้อ</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.collar }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">ลักษณะการเย็บเพิ่มเติม</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.more_sew_style }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">ลักษณะเสื้อเพิ่มเติม</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.more_style }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
// PROPS
interface Props {
  specSheet: any;
}
const props = defineProps<Props>();
const { specSheet } = toRefs(props);
const produce = ref<any>(specSheet.value.details);

// COMPUTED
const havePocket = computed(() => produce.value.pocket !== 'ไม่มี');
const haveButton = computed(() => produce.value.button > 0);
const placketSize = computed(() => {
  if (produce.value.placketWidth && produce.value.placketLong) {
    return `${produce.value.placketWidth} x ${produce.value.placketLong}`;
  } else {
    return '-';
  }
});
const pocketSize = computed(() => {
  if (produce.value.pocketWidth && produce.value.pocketLong) {
    return `${produce.value.pocketWidth} ${produce.value.pocketLengthSuffix} x ${produce.value.pocketLong} ${produce.value.pocketLengthSuffix}`;
  } else {
    return '-';
  }
});
const buttonAmount = computed(() => {
  if (produce.value.button > 0) {
    return `${produce.value.button} เม็ด`;
  } else {
    return 'ไม่มี';
  }
});
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
        <td class="capitalize border dark:border-neutral-700">{{ produce.sewStyleNote }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">ลักษณะสาป</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.placket }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">สีสาป</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.placketColor }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">ความกว้าง x ความยาวของสาป</td>
        <td class="capitalize border dark:border-neutral-700">{{ placketSize }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">กระเป๋าเสื้อ</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.pocket || 'ไม่มี' }}</td>
      </tr>
      <tr v-if="havePocket">
        <td class="font-medium border dark:border-neutral-700">ความกว้าง x ความยาวของกระเป๋าเสื้อ</td>
        <td class="capitalize border dark:border-neutral-700">{{ pocketSize }}</td>
      </tr>
      <tr>
        <td class="font-medium border dark:border-neutral-700">กระดุม</td>
        <td class="capitalize border dark:border-neutral-700">{{ buttonAmount }}</td>
      </tr>
      <tr v-if="haveButton">
        <td class="font-medium border dark:border-neutral-700">สีกระดุม</td>
        <td class="capitalize border dark:border-neutral-700">{{ produce.buttonColor }}</td>
      </tr>
    </tbody>
  </table>
</template>

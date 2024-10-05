<script setup lang="ts">
// PROPS
interface Props {
    print: any;
    index: number;
}
const props = defineProps<Props>();
const { print, index } = toRefs(props);

const printDetails = [
    {
        label: 'ตำแหน่งงานพิมพ์',
        value: print.value.position,
    },
    {
        label: 'ขนาดงานพิมพ์',
        value: print.value.size,
    },
    {
        label: 'ระยะห่างจากคอเสื้อถึงตัวงาน',
        value: print.value.spaceFromCollar,
    },
    {
        label: 'ชนิดงานพิมพ์',
        value: print.value.type,
    },
    {
        label: 'สีงานพิมพ์',
        value: print.value.color,
    },
    {
        label: 'ไฟล์เสื้อ',
        value: print.value.file,
    },
    {
        label: 'ลักษณะงานพิมพ์เพิ่มเติม',
        value: print.value.note || '-',
    },
];
</script>
<template>
    <div>
        <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 rounded-t-xl p-3">จุดพิมพ์ที่ {{ index + 1 }}</h3>
        <Table>
            <TableBody class="bg-stone-100 dark:bg-stone-800">
                <TableRow v-for="detail in printDetails" :key="detail.label" class="text-lg dark:text-white">
                    <TableCell class="font-medium">{{ detail.label }}</TableCell>
                    <TableCell>{{ detail.value || '-' }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

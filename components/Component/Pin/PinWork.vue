<script setup lang="ts">
// PROPS
interface Props {
    pin: any;
    index: number;
}
const props = defineProps<Props>();
const { pin, index } = toRefs(props);

const pinDetails = [
    {
        label: 'ตำแหน่งงานปัก',
        value: pin.value.position,
    },
    {
        label: 'ขนาดงานปัก',
        value: pin.value.size,
    },
    {
        label: 'ระยะห่างจากคอเสื้อถึงตัวงาน',
        value: pin.value.spaceFromCollar,
    },
    {
        label: 'ชนิดงานปัก',
        value: pin.value.type,
    },
    {
        label: 'สีงานปัก',
        value: pin.value.color,
    },
    {
        label: 'ไฟล์เสื้อ',
        value: pin.value.file,
    },
    {
        label: 'ลักษณะงานปักเพิ่มเติม',
        value: pin.value.note || '-',
    },
];
</script>
<template>
    <div>
        <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 rounded-t-xl p-3">จุดปักที่ {{ index + 1 }}</h3>
        <Table>
            <TableBody class="bg-stone-100 dark:bg-stone-800">
                <TableRow v-for="detail in pinDetails" :key="detail.label" class="text-lg dark:text-white">
                    <TableCell class="font-medium">{{ detail.label }}</TableCell>
                    <TableCell>{{ detail.value || '-' }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

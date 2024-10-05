<script setup lang="ts">
// PROPS
interface Props {
    screen: any;
    index: number;
}
const props = defineProps<Props>();
const { screen, index } = toRefs(props);

const screenDetails = [
    {
        label: 'ตำแหน่งสกรีน',
        value: screen.value.position,
    },
    {
        label: 'ขนาดสกรีน',
        value: screen.value.size,
    },
    {
        label: 'ระยะห่างจากคอเสื้อถึงตัวงาน',
        value: screen.value.spaceFromCollar,
    },
    {
        label: 'ชนิดงานสกรีน',
        value: screen.value.type,
    },
    {
        label: 'สีสกรีน',
        value: screen.value.color,
    },
    {
        label: 'ไฟล์เสื้อ',
        value: screen.value.file,
    },
    {
        label: 'ลักษณะสกรีนเพิ่มเติม',
        value: screen.value.note || '-',
    },
];
</script>
<template>
    <div>
        <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 rounded-t-xl p-3">จุดสกรีนที่ {{ index + 1 }}</h3>
        <Table>
            <TableBody class="bg-stone-100 dark:bg-stone-800">
                <TableRow v-for="detail in screenDetails" :key="detail.label" class="text-lg dark:text-white">
                    <TableCell class="font-medium">{{ detail.label }}</TableCell>
                    <TableCell>{{ detail.value || '-' }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

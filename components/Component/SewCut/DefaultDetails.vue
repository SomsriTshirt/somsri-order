<script setup lang="ts">
import { TableBody, Table, TableCell, TableRow } from '~/components/ui/table';
import type { SpecSheet } from '~/types/SpecSheet';

// INTERFACE
interface DetailsRow {
    label: string;
    value: any;
}

// PROPS
interface Props {
    specSheet: SpecSheet;
}
const props = defineProps<Props>();
const { specSheet } = toRefs(props);

// VARIABLE
const produce = ref<Record<string, any>>(specSheet.value.details);
const detailLists: DetailsRow[] = [
    {
        label: 'เนื้อผ้า',
        value: produce.value.fabric,
    },
    {
        label: 'สีเสื้อ',
        value: produce.value.color,
    },
    {
        label: 'แขนเสื้อ',
        value: produce.value.sleeve,
    },
    {
        label: 'ปกเสื้อ',
        value: produce.value.collar,
    },
    {
        label: 'ลักษณะการเย็บเพิ่มเติม',
        value: produce.value.sewStyleNote,
    },
    {
        label: 'ลักษณะเสื้อเพิ่มเติม',
        value: produce.value.styleNote,
    },
];
</script>
<template>
    <Table>
        <TableBody class="bg-stone-100 dark:bg-stone-800">
            <TableRow v-for="detail in detailLists" :key="detail.label" class="text-lg dark:text-white">
                <TableCell class="font-medium">{{ detail.label }}</TableCell>
                <TableCell>{{ detail.value || '-' }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>

<script setup lang="ts">
import type { SpecSheet } from '~/types/SpecSheet';
import { TableBody, Table, TableCell, TableRow } from '~/components/ui/table';

// INTERFACE
interface DetailsRow {
    label: string;
    value: any;
    condition?: boolean;
}

// PROPS
interface Props {
    specSheet: SpecSheet;
}
const props = defineProps<Props>();
const { specSheet } = toRefs(props);
const produce = ref<Record<string, any>>(specSheet.value.details);

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
    {
        label: 'ลักษณะสาป',
        value: produce.value.placket,
    },
    {
        label: 'สีสาป',
        value: produce.value.placketColor,
    },
    {
        label: 'ความกว้าง x ความยาวของสาป',
        value: placketSize.value,
    },
    {
        label: 'กระเป๋าเสื้อ',
        value: produce.value.pocket || 'ไม่มี',
    },
    {
        label: 'ความกว้าง x ความยาวของกระเป๋าเสื้อ',
        value: pocketSize.value,
        condition: havePocket.value,
    },
    {
        label: 'กระดุม',
        value: buttonAmount.value,
    },
    {
        label: 'สีกระดุม',
        value: produce.value.buttonColor,
    },
    {
        label: 'ลักษณะสาป',
        value: produce.value.styleNote,
        condition: haveButton.value,
    },
];
</script>
<template>
    <Table>
        <TableBody class="bg-stone-100 dark:bg-stone-800">
            <template v-for="detail in detailLists" :key="detail.label">
                <TableRow v-if="detail.condition || detail.condition === undefined" class="text-lg dark:text-white">
                    <TableCell class="font-medium">{{ detail.label }}</TableCell>
                    <TableCell>{{ detail.value || '-' }}</TableCell>
                </TableRow>
            </template>
        </TableBody>
    </Table>
</template>

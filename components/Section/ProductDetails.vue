<script setup lang="ts">
import type { SpecSheet } from '@/types/SpecSheet';
import { register } from 'swiper/element';
import ConfirmDetail from '../Component/ConfirmDetail.vue';

// LAZY LOAD
const DefaultSewCut = defineAsyncComponent(() => import('@/components/Component/SewCut/DefaultDetails.vue'));
const PoloSewCut = defineAsyncComponent(() => import('@/components/Component/SewCut/PoloDetails.vue'));
const ScreenWork = defineAsyncComponent(() => import('@/components/Component/Screen/ScreenWork.vue'));
const PinWork = defineAsyncComponent(() => import('@/components/Component/Pin/PinWork.vue'));
const PrintWork = defineAsyncComponent(() => import('@/components/Component/Print/PrintWork.vue'));

// PROPS
interface Props {
    specSheet: SpecSheet;
    isApproved: boolean;
}
const props = defineProps<Props>();

// VARIABLE
const { specSheet, isApproved } = toRefs(props);
const { $imageUrl } = useNuxtApp();
const form: any = inject('form');

// COMPUTED
const haveScreenWork = computed<boolean>(() => specSheet.value.screenPoints.length > 0);
const havePinWork = computed<boolean>(() => specSheet.value.pinPoints.length > 0);
const havePrintWork = computed<boolean>(() => specSheet.value.printPoints.length > 0);

// ONMOUNTED
onMounted(() => {
    register();
});
</script>
<template>
    <div>
        <h2 class="text-3xl font-medium text-primary-700 dark:text-primary-400 mb-5">รายละเอียดของสินค้า</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div class="rounded-xl">
                <swiper-container class="bg-white dark:bg-stone-800 rounded-2xl h-[36rem] mb-5 shadow" navigation="true" pagination="true" loop="true" centered-slides="true">
                    <swiper-slide v-for="(img, img_i) in specSheet.img" :key="useGenVueKey(img_i)" class="flex rounded-2xl justify-center">
                        <img class="rounded-2xl object-contain" :src="$imageUrl(img.url)" />
                    </swiper-slide>
                </swiper-container>
            </div>

            <!-- SEW CUT -->
            <div>
                <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 rounded-t-xl p-3">งานตัดและเย็บ</h3>

                <!-- DETAILS -->
                <PoloSewCut v-if="specSheet.productType === 'เสื้อโปโล'" :spec-sheet="specSheet" />
                <DefaultSewCut v-else :spec-sheet="specSheet" />

                <!-- CONFIRM -->
                <ConfirmDetail v-if="!isApproved" v-model="form.sewCut">ฉันยืนยันว่าข้อมูลงานตัดและเย็บถูกต้อง</ConfirmDetail>
            </div>
            <!-- END SEW CUT -->
        </div>

        <!-- SIZE & AMOUNT -->
        <div class="mb-5">
            <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 rounded-t-xl p-3">ข้อมูลไซซ์และจำนวน</h3>
            <Table>
                <TableBody class="bg-stone-100 dark:bg-stone-800">
                    <TableRow v-for="(group, group_i) in specSheet.amount" :key="group.name + group_i" class="text-lg dark:text-white">
                        <TableCell class="w-1/2 p-3">
                            <swiper-container class="rounded-2xl w-full" navigation="true" pagination="true" loop="true" centered-slides="true">
                                <swiper-slide v-for="(img, img_i) in group.img" :key="useGenVueKey(img_i)" class="flex justify-center rounded-2xl">
                                    <img class="rounded-2xl object-contain" :src="$imageUrl(img.url)" />
                                </swiper-slide>
                            </swiper-container>
                        </TableCell>
                        <TableCell class="w-1/2">
                            <p class="text-lg font-medium">{{ group.name }}</p>
                            <ul>
                                <li v-for="(size, size_i) in group.info" :key="useGenVueKey(size_i)">{{ size.name }} - {{ size.amount }} ตัว</li>
                            </ul>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <!-- CONFIRM -->
            <ConfirmDetail v-if="!isApproved" v-model="form.amountlist">ฉันยืนยันว่าข้อมูลไซซ์และจำนวนถูกต้อง</ConfirmDetail>
        </div>
        <!-- END SIZE & AMOUNT -->

        <!-- SCREEN -->
        <div v-if="haveScreenWork" class="mb-5">
            <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 p-3 rounded-xl mb-3">ข้อมูลงานสกรีน</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                <ScreenWork v-for="(screen, i) in specSheet.screenPoints" v-once :key="useGenVueKey(i)" :screen="screen" :index="i"></ScreenWork>
            </div>

            <!-- CONFIRM -->
            <ConfirmDetail v-if="!isApproved" v-model="form.screen">ฉันยืนยันว่าข้อมูลงานสกรีนถูกต้อง</ConfirmDetail>
        </div>
        <!-- END SCREEN -->

        <!-- PIN -->
        <div v-if="havePinWork" class="mb-5">
            <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 p-3 rounded-xl mb-3">ข้อมูลงานปัก</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                <PinWork v-for="(pin, i) in specSheet.pinPoints" v-once :key="useGenVueKey(i)" :pin="pin" :index="i"></PinWork>
            </div>

            <!-- CONFIRM -->
            <ConfirmDetail v-if="!isApproved" v-model="form.pin">ฉันยืนยันว่าข้อมูลงานปักถูกต้อง</ConfirmDetail>
        </div>
        <!-- END PIN -->

        <!-- PRINT -->
        <div v-if="havePrintWork" class="mb-5">
            <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary-700 dark:bg-primary-400 p-3 rounded-xl mb-3">ข้อมูลงานพิมพ์</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                <PrintWork v-for="(print, i) in specSheet.printPoints" v-once :key="useGenVueKey(i)" :print="print" :index="i"></PrintWork>
            </div>

            <!-- CONFIRM -->
            <ConfirmDetail v-if="!isApproved" v-model="form.print">ฉันยืนยันว่าข้อมูลงานพิมพ์ถูกต้อง</ConfirmDetail>
        </div>
        <!-- END PRINT -->
    </div>
</template>

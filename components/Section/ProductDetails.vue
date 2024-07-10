<script setup lang="ts">
import DefaultSewCut from '@/components/Component/SewCut/DefaultDetails.vue';
import PoloSewCut from '@/components/Component/SewCut/PoloDetails.vue';
import ScreenWork from '@/components/Component/Screen/ScreenWork.vue';
import PinWork from '@/components/Component/Pin/PinWork.vue';
import PrintWork from '@/components/Component/Print/PrintWork.vue';

// PROPS
interface Props {
  specSheet: any;
  isApproved: boolean;
}
const props = defineProps<Props>();

// VARIABLE
const { specSheet, isApproved } = toRefs(props);
const { $api }: any = useNuxtApp();
const form: any = inject('form');

// COMPUTED
const haveScreenWork = computed(() => specSheet.value.screenPoints.length > 0);
const havePinWork = computed(() => specSheet.value.pinPoints.length > 0);
const havePrintWork = computed(() => specSheet.value.printPoints.length > 0);
</script>
<template>
  <div>
    <h2 class="text-3xl font-medium text-primary mb-5">รายละเอียดของสินค้า</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <div class="rounded-2xl">
        <swiper-container v-once class="bg-white dark:bg-neutral-800 rounded-2xl h-[36rem] mb-5 shadow" navigation="true" pagination="true" loop="true" centered-slides="true">
          <swiper-slide v-for="(img, img_i) in specSheet.img" :key="useGenVueKey(img_i)" class="flex rounded-2xl justify-center">
            <img class="rounded-2xl object-contain" :src="imageUrl(img.url)" />
          </swiper-slide>
        </swiper-container>
      </div>
      <!-- SEW CUT -->
      <div>
        <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">งานตัดและเย็บ</h3>
        <PoloSewCut v-if="specSheet.productType === 'เสื้อโปโล'" :spec-sheet="specSheet"></PoloSewCut>
        <DefaultSewCut v-else :spec-sheet="specSheet"></DefaultSewCut>
        <div v-if="!isApproved" class="form-control p-2 border dark:border-neutral-600 rounded-xl mt-5 bg-white dark:bg-base-100">
          <label class="label cursor-pointer justify-start">
            <input v-model="form.sewCut" type="checkbox" class="checkbox checkbox-primary mr-3" />
            <span class="label-text underline required text-lg bg-yellow-400 bg-opacity-50">ฉันยืนยันว่าข้อมูลงานตัดและเย็บถูกต้อง</span>
          </label>
        </div>
      </div>
      <!-- END SEW CUT -->
    </div>

    <!-- SIZE & AMOUNT -->
    <div class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">ข้อมูลไซซ์และจำนวน</h3>
      <table class="table-fixed border border-collapse border-neutral-300 dark:border-neutral-700 w-full bg-white dark:bg-base-100 shadow mb-3">
        <tbody>
          <!--  ORDER -->
          <tr v-for="(group, group_i) in specSheet.amount" v-once :key="group.name + group_i">
            <td class="w-1/2 p-3 border dark:border-neutral-700">
              <swiper-container class="bg-neutral-800 rounded-2xl w-full" navigation="true" pagination="true" loop="true" centered-slides="true">
                <swiper-slide v-for="(img, img_i) in group.img" :key="useGenVueKey(img_i)" class="flex justify-center rounded-2xl">
                  <img class="rounded-2xl object-contain" :src="imageUrl(img.url)" />
                </swiper-slide>
              </swiper-container>
            </td>
            <td class="w-1/2 p-3 border dark:border-neutral-700">
              <p class="text-lg font-medium">{{ group.name }}</p>
              <ul>
                <li v-for="(size, size_i) in group.info" :key="useGenVueKey(size_i)">{{ size.name }} - {{ size.amount }} ตัว</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!isApproved" class="form-control p-2 border dark:border-neutral-600 rounded-xl mt-5 bg-white dark:bg-base-100">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.amountlist" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required text-lg bg-yellow-400 bg-opacity-50">ฉันยืนยันว่าข้อมูลไซซ์และจำนวนถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END SIZE & AMOUNT -->

    <!-- SCREEN -->
    <div v-if="haveScreenWork" class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary p-3 rounded-xl mb-3">ข้อมูลงานสกรีน</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
        <ScreenWork v-for="(screen, i) in specSheet.screenPoints" v-once :key="useGenVueKey(i)" :screen="screen" :index="i"></ScreenWork>
      </div>
      <div v-if="!isApproved" class="form-control p-2 border dark:border-neutral-600 rounded-xl mt-5 bg-white dark:bg-base-100">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.screen" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required text-lg bg-yellow-400 bg-opacity-50">ฉันยืนยันว่าข้อมูลงานสกรีนถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END SCREEN -->

    <!-- PIN -->
    <div v-if="havePinWork" class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary p-3 rounded-xl mb-3">ข้อมูลงานปัก</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
        <PinWork v-for="(pin, i) in specSheet.pinPoints" v-once :key="useGenVueKey(i)" :pin="pin" :index="i"></PinWork>
      </div>
      <div v-if="!isApproved" class="form-control p-2 border dark:border-neutral-600 rounded-xl mt-5 bg-white dark:bg-base-100">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.pin" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required text-lg bg-yellow-400 bg-opacity-50">ฉันยืนยันว่าข้อมูลงานปักถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END PIN -->

    <!-- PRINT -->
    <div v-if="havePrintWork" class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary p-3 rounded-xl mb-3">ข้อมูลงานพิมพ์</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
        <PrintWork v-for="(print, i) in specSheet.printPoints" v-once :key="useGenVueKey(i)" :print="print" :index="i"></PrintWork>
      </div>
      <div v-if="!isApproved" class="form-control p-2 border dark:border-neutral-600 rounded-xl mt-5 bg-white dark:bg-base-100">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.print" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required text-lg bg-yellow-400 bg-opacity-50">ฉันยืนยันว่าข้อมูลงานพิมพ์ถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END PRINT -->
  </div>
</template>

<script setup lang="ts">
import DefaultSewCut from '@/components/Component/SewCut/DefaultDetails.vue';
import PoloSewCut from '@/components/Component/SewCut/PoloDetails.vue';
import ScreenWork from '@/components/Component/Screen/ScreenWork.vue';
import PinWork from '@/components/Component/Pin/PinWork.vue';
import PrintWork from '@/components/Component/Print/PrintWork.vue';

// PROPS
interface Props {
  quotation: any;
  isApproved: boolean;
}
const props = defineProps<Props>();

// VARIABLE
const { quotation, isApproved } = toRefs(props);
const produce = ref<any>(quotation.value.produce);
const { $api }: any = useNuxtApp();
const form: any = inject('form');

// COMPUTED
const haveScreenWork = computed(() => produce.value.screen_point.length > 0);
const havePinWork = computed(() => produce.value.pin_point.length > 0);
const havePrintWork = computed(() => produce.value.print_point.length > 0);
</script>
<template>
  <div>
    <h2 class="text-3xl font-medium text-primary mb-5">รายละเอียดของสินค้า</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <div class="rounded-2xl">
        <swiper-container v-once class="bg-white dark:bg-neutral-800 rounded-2xl h-[36rem] mb-5 shadow" navigation="true" pagination="true" loop="true" centered-slides="true">
          <swiper-slide v-for="(img, img_i) in quotation.img" :key="useGenVueKey(img_i)" class="flex rounded-2xl justify-center">
            <img class="rounded-2xl object-contain" :src="$api(img.url)" />
          </swiper-slide>
        </swiper-container>
      </div>
      <!-- SEW CUT -->
      <div>
        <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">งานตัดและเย็บ</h3>
        <PoloSewCut v-if="quotation.type === 'เสื้อโปโล'" :quotation="quotation"></PoloSewCut>
        <DefaultSewCut v-else :quotation="quotation"></DefaultSewCut>
        <div v-if="!isApproved" class="form-control">
          <label class="label cursor-pointer justify-start">
            <input v-model="form.sewCut" type="checkbox" class="checkbox checkbox-primary mr-3" />
            <span class="label-text underline required">ฉันยืนยันว่าข้อมูลงานตัดและเย็บถูกต้อง</span>
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
          <!-- SAMPLE -->
          <tr v-for="(group, group_i) in produce.amountlist.sample" v-once :key="group.name + group_i">
            <td class="w-1/2 p-3 border dark:border-neutral-700">
              <swiper-container class="bg-neutral-800 rounded-2xl w-full" navigation="true" pagination="true" loop="true" centered-slides="true">
                <swiper-slide v-for="(img, img_i) in group.img" :key="useGenVueKey(img_i)" class="flex justify-center rounded-2xl">
                  <img class="rounded-2xl object-contain" :src="$api(img.url)" />
                </swiper-slide>
              </swiper-container>
            </td>
            <td class="w-1/2 p-3 border dark:border-neutral-700">
              <p class="text-xl text-red-500 font-medium">งานตัวอย่าง</p>
              <p class="text-lg font-medium">{{ group.name }}</p>
              <ul>
                <li v-for="(size, size_i) in group.info" :key="useGenVueKey(size_i)">{{ size.name }} - {{ size.amount }} ตัว</li>
              </ul>
            </td>
          </tr>

          <!-- ORDER -->
          <tr v-for="(group, group_i) in produce.amountlist.order" v-once :key="group.name + group_i">
            <td class="w-1/2 p-3 border dark:border-neutral-700">
              <swiper-container class="bg-neutral-800 rounded-2xl w-full" navigation="true" pagination="true" loop="true" centered-slides="true">
                <swiper-slide v-for="(img, img_i) in group.img" :key="useGenVueKey(img_i)" class="flex justify-center rounded-2xl">
                  <img class="rounded-2xl object-contain" :src="$api(img.url)" />
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
      <div v-if="!isApproved" class="form-control">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.amountlist" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required">ฉันยืนยันว่าข้อมูลไซซ์และจำนวนถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END SIZE & AMOUNT -->

    <!-- SCREEN -->
    <div v-if="haveScreenWork" class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary p-3 rounded-xl mb-3">ข้อมูลงานสกรีน</h3>

      <div class="grid grid-cols-2 gap-5 mb-3">
        <ScreenWork v-for="(screen, i) in produce.screen_point" v-once :key="useGenVueKey(i)" :screen="screen" :index="i"></ScreenWork>
      </div>
      <div v-if="!isApproved" class="form-control">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.screen" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required">ฉันยืนยันว่าข้อมูลงานสกรีนถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END SCREEN -->

    <!-- PIN -->
    <div v-if="havePinWork" class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary p-3 rounded-xl mb-3">ข้อมูลงานปัก</h3>

      <div class="grid grid-cols-2 gap-5 mb-3">
        <PinWork v-for="(pin, i) in produce.pin_point" v-once :key="useGenVueKey(i)" :pin="pin" :index="i"></PinWork>
      </div>
      <div v-if="!isApproved" class="form-control">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.pin" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required">ฉันยืนยันว่าข้อมูลงานปักถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END PIN -->

    <!-- PRINT -->
    <div v-if="havePrintWork" class="mb-5">
      <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary p-3 rounded-xl mb-3">ข้อมูลงานพิมพ์</h3>

      <div class="grid grid-cols-2 gap-5 mb-3">
        <PrintWork v-for="(print, i) in produce.print_point" v-once :key="useGenVueKey(i)" :print="print" :index="i"></PrintWork>
      </div>
      <div v-if="!isApproved" class="form-control">
        <label class="label cursor-pointer justify-start">
          <input v-model="form.print" type="checkbox" class="checkbox checkbox-primary mr-3" />
          <span class="label-text underline required">ฉันยืนยันว่าข้อมูลงานพิมพ์ถูกต้อง</span>
        </label>
      </div>
    </div>
    <!-- END PRINT -->
  </div>
</template>

<script setup lang="ts">
// PROPS
interface Props {
    quotation: any
}
const props = defineProps<Props>()
const { quotation } = toRefs(props)
const produce = ref<any>(quotation.value.produce)
const { $api }: any = useNuxtApp()
</script>
<template>
    <h2 class="text-3xl font-medium text-primary mb-5">รายละเอียดของสินค้า</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div class="rounded-2xl">
            <swiper-container class="bg-white dark:bg-neutral-800 rounded-2xl h-[36rem] mb-5 shadow" navigation="true"
                pagination="true" loop="true" centered-slides="true">
                <swiper-slide v-for="(img, img_i) in quotation.img" :key="useGenVueKey(img_i)"
                    class="flex rounded-2xl justify-center">
                    <img class="rounded-2xl object-contain" :src="$api(img.url)">
                </swiper-slide>
            </swiper-container>
        </div>
        <!-- TSHIRT -->
        <div>
            <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">
                งานตัดและเย็บ
            </h3>
            <table
                class="table border border-collapse border-neutral-300 dark:border-neutral-700 text-lg bg-white dark:bg-base-100 shadow">
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
        </div>
    </div>
    <div>
        <h3 class="text-2xl text-white dark:text-black text-center font-medium bg-primary rounded-t-xl p-3">
            ข้อมูลไซซ์และจำนวน</h3>
        <table
            class="table-fixed border border-collapse border-neutral-300 dark:border-neutral-700 w-full bg-white dark:bg-base-100 shadow">
            <tbody>
                <!-- SAMPLE -->
                <tr v-for="(group, group_i) in produce.amountlist.sample" :key="useGenVueKey(group_i)">
                    <td class="w-1/2 p-3 border dark:border-neutral-700">
                        <swiper-container class="bg-neutral-800 rounded-2xl w-full mb-5" navigation="true" pagination="true"
                            loop="true" centered-slides="true">
                            <swiper-slide v-for="(img, img_i) in group.img" :key="useGenVueKey(img_i)"
                                class="flex justify-center rounded-2xl">
                                <img class="rounded-2xl object-contain" :src="$api(img.url)">
                            </swiper-slide>
                        </swiper-container>
                    </td>
                    <td class="w-1/2 p-3 border dark:border-neutral-700">
                        <p class="text-xl text-red-500 font-medium">งานตัวอย่าง</p>
                        <p class="text-lg font-medium">{{ group.name }}</p>
                        <ul>
                            <li v-for="(size, size_i) in group.info" :key="useGenVueKey(size_i)">{{ size.name }} - {{
                                size.amount }} ตัว</li>
                        </ul>
                    </td>
                </tr>

                <!-- ORDER -->
                <tr v-for="(group, group_i) in produce.amountlist.order" :key="useGenVueKey(group_i)">
                    <td class="w-1/2 p-3 border dark:border-neutral-700">
                        <swiper-container class="bg-neutral-800 rounded-2xl w-full mb-5" navigation="true" pagination="true"
                            loop="true" centered-slides="true">
                            <swiper-slide v-for="(img, img_i) in group.img" :key="useGenVueKey(img_i)"
                                class="flex justify-center rounded-2xl">
                                <img class="rounded-2xl object-contain" :src="$api(img.url)">
                            </swiper-slide>
                        </swiper-container>
                    </td>
                    <td class="w-1/2 p-3 border dark:border-neutral-700">
                        <p class="text-lg font-medium">{{ group.name }}</p>
                        <ul>
                            <li v-for="(size, size_i) in group.info" :key="useGenVueKey(size_i)">{{ size.name }} - {{
                                size.amount }} ตัว</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
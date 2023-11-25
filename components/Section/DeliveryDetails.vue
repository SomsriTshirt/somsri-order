<script setup lang="ts">
interface Props {
    quotation: any
}

const props = defineProps<Props>()
const { quotation } = toRefs(props)
const delivery = ref<any>(quotation.value.delivery)
</script>
<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <div>
            <p class="font-bold text-xl text-primary mb-3">จัดส่งตัวอย่างที่</p>
            <p class="font-medium">{{ delivery.sample_full_name }}</p>
            <p class="word-break">{{ delivery.sample_address }}</p>
        </div>
        <div>
            <p class="font-bold text-xl mb-3 text-primary">จัดส่งสินค้าที่</p>
            <p class="font-medium">{{ delivery.full_name }}</p>
            <p class="word-break">{{ delivery.address }}</p>
        </div>
        <div>
            <p class="font-bold text-primary">จำนวน</p>
            <p class="mb-5">5000 ตัว</p>
            <p class="font-bold text-primary">ประเภทการจัดส่ง</p>
            <p>{{ delivery.delivery_type }}</p>
        </div>
    </div>
</template>
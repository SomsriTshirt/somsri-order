<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import SampleStatus from '@/components/Component/SampleStatus.vue'
import ProductDetails from '@/components/Section/ProductDetails.vue'
import DeliveryDetails from '@/components/Section/DeliveryDetails.vue'
import ApprovedSpecModal from '@/components/Component/ApprovedSpecModal.vue';


// VARIABLEc
const isLoading = ref<boolean>(true)
const quotation = ref<any>({})
const id = useRoute().query.id
const hasError = ref<boolean>(false)
async function getQuotation() {
    try {
        const { data } = await useApiFetch(`/frontend/quotation/${id}?preload=produce,delivery`)
        quotation.value = data.value

        provide('quotation', quotation)
    }
    catch (err) {
        console.log(err)
    }
}

onMounted(async () => {
    await nextTick()

    // CHECK ID
    if (!id) {
        hasError.value = true
    }

    await getQuotation()
    isLoading.value = false
    register()
})
</script>
<template>
    <NuxtLayout>
        <div v-if="!isLoading" class="container mx-auto px-6">
            <h1 class="text-6xl text-primary mb-1 font-bold">{{ quotation.name }}</h1>
            <p class="text-3xl">{{ quotation.type }}</p>
            <p class="mb-5 text-xl text-neutral-400">ID: {{ quotation.id }}</p>
            <SampleStatus :quotation="quotation" class="mb-10"></SampleStatus>

            <DeliveryDetails :quotation="quotation" class="mb-10"></DeliveryDetails>
            <ProductDetails :quotation="quotation"></ProductDetails>

            <ApprovedSpecModal :id="quotation.id"></ApprovedSpecModal>
        </div>
        <div v-else class="h-screen fixed top-0 bg-black opacity-50 flex justify-center items-center w-screen">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

    </NuxtLayout>
</template>
<script setup lang="ts">

// PROPS
interface Props {
    quotation: any
}
const props = defineProps<Props>()
const { quotation } = toRefs(props)


// VARIABLE
const isLoading = ref<boolean>(true)
const statusList = ref<any[]>([{ id: 'approved', name: 'อนุมัติใบสเปค' }, { id: 'producing', name: 'ผลิต' }, { id: 'approved_sample', name: 'อนุมัติตัวอย่าง' }])
const statusData = ref<any>({
    approved: {
    }, producing: {
    }, approved_sample: {
    }
})
const currentStatus = ref<any>({})

function groupStepByTag() {
    const groupStep: any = {}
    const { step_list: stepList } = quotation.value

    for (const step of stepList.sample) {
        const tag = step.tag
        if (!groupStep[tag]) {
            groupStep[tag] = []
        }

        // PUSH TO GROUP
        groupStep[tag].push(step)
    }

    return groupStep
}

function getStatus(steps: any[]) {
    const stepData = quotation.value.step_data.sample
    const data: any = {
        status: true,
        details: [],
    }

    for (const step of steps) {
        const stepId = step.id

        // CHECK STEP IS FINISH
        if (!stepData[stepId] || !stepData[stepId].done) {
            data.status = false
        }

        // PUSH DATA TO DETAILS
        const detailsData = { ...step, ...stepData[stepId] }
        data.details.push(detailsData)
    }

    // ASSIGN TO APPROVED
    return data
}

function getCurrentStatus() {
    for (const status of statusList.value) {
        const { id: statusId } = status
        const details = statusData.value[statusId]

        // CHECK IS FINISH
        if (details.status === true) {
            continue
        }
        else {
            currentStatus.value = status
            break
        }
    }
}

function getSampleStatus() {
    const groupStep = groupStepByTag()

    statusData.value.approved = getStatus(groupStep.approved)
    statusData.value.producing = getStatus(groupStep.producing)
    statusData.value.approved_sample = getStatus(groupStep.approved_sample)
}

// COMPUTED
const isApprovedStep = computed(() => currentStatus.value.id === 'approved')
const isHasMoreStepInGroup = computed(() => {
    const { id: statusId } = currentStatus.value
    const statusDetails = statusData.value[statusId].details

    return statusDetails.length > 1
})

// ON MOUNTED
onMounted(() => {
    getSampleStatus()
    getCurrentStatus()

    isLoading.value = false
})
</script>
<template>
    <div v-if="!isLoading">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div class="rounded-xl p-5 bg-secondary shadow">
                <div class="flex">
                    <div class="flex flex-col items-center">
                        <div
                            class="w-32 h-32 rounded-full border-4 border-orange-800 dark:border-orange-500 border-dashed text-orange-800 dark:text-orange-600 flex justify-center items-center p-5 mr-3">
                            <IconCSS name="material-symbols:menu-book-outline-rounded" size="4rem"></IconCSS>
                        </div>
                    </div>
                    <div>
                        <div class="mb-3">
                            <p class="text-white dark:text-black text-2xl sm:text-4xl font-bold">{{ currentStatus.name }}
                            </p>
                            <p v-if="isHasMoreStepInGroup" class="text-black text-xl">กำลังสกรีน</p>
                        </div>
                        <div class="flex flex-col sm:flex-row">
                            <button v-if="isApprovedStep" class="btn btn-sm btn-success mb-3 sm:mr-3 sm:mb-0"
                                @click="openModal('approved-spec-modal')">
                                <IconCSS name="material-symbols:check-small-rounded" size="1.5rem"></IconCSS>อนุมัติใบสเปค
                            </button>
                            <button class="btn btn-sm btn-primary">ดูเพิ่มเติม</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow">
                <p class="text-xl font-bold mb-5 text-primary">สถานะการผลิตตัวอย่างโดยรวม</p>
                <ul class="steps w-full">
                    <li class="step">อนุมัติใบสเปค</li>
                    <li class="step">ผลิตตัวอย่าง</li>
                    <li class="step">อนุมัติตัวอย่าง</li>
                </ul>
            </div>
        </div>
        <p class="text-xl mb-5"><span class="text-red-500">*</span>ทางบริษัทมีกำหนดการส่งมอบสินค้าภายในวันที่ <span
                class="underline">{{
                    quotation.delivery_due }}</span></p>
    </div>
</template>
<template>
    <div class="container-fluid p-0" v-if="loading">
        <div class="row m-auto p-0 overflow-hidde shadow-sm" style="min-height: max-content;">
            <div class="col-12 col-xl-12 p-0">
            <!-- <div class="col-4 col-xl-6 p-1 bg-primary"> -->
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner w-100">
                        <div class="carousel-item active" style="aspect-ratio: 1/0.5;" @click="openImgaeFullscreen(quotation.img[0])">
                            <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                                <img v-if="quotation.img.length > 0" :src="quotation.img[0].img" class="img-fluid h-100" style="max-height: 100%;" alt="เสื้อตัวอย่าง1">
                            </div>
                        </div>
                        <template class="" v-for="(img, index) in quotation.img" :key="'imgsilder'+index">
                            <div class="carousel-item w-100" style="aspect-ratio: 1/0.5;" v-if="index != 0" @click="openImgaeFullscreen(img)">
                                <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                                    <img :src="img.img"  class="img-fluid shadow"   style="max-height: 100%;" :alt="'เสื้อตัวอย่าง'+index">
                                </div>
                            </div>
                        </template>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="row m-auto">
            <div class="col-12 d-flex flex-column justify-content-center">
                <div class="w-100 text-center mt-5">
                    <h3>สถานะงาน : <span>{{ statusc }}</span></h3>
                </div>
                <div class="show-order-statusw w-100 px-5">
                    <div class="d-flex flex-lg-column align-items-center justify-content-center" style="aspect-ratio: 1 / 1;" v-for="(status, name) in quotdataStatus">
                        <div class="w-100 d-flex flex-column justify-content-end align-items-center">
                            <div class="border border-5 rounded-circle px-4  d-flex align-items-center" :class="filterStatus(status, name, true)" style="aspect-ratio: 1 / 1; font-size: 3rem;">
                            <i class="remixicon " :class="[status.icon]"></i>
                            </div>
                        </div>
                        <div class="w-100 h-25 d-flex flex-column justify-content-start pt-2 align-items-center" v-if="checkStatus(status.this_status)">
                            <span class="lh-sm">{{ filterStatus(status, name) }}</span>
                            <span class="lh-1">{{ filterStatus(status, name, false, false, true) }}</span>
                        </div>
                        <div class="w-100 h-25 d-flex flex-column justify-content-start pt-2 align-items-center" v-else>
                            <span class="lh-sm">{{ filterStatus(status, name) }}</span>
                            <span class="lh-1">{{ filterStatus(status, name, false, false, true) }}</span>
                            <button class="btn btn-outline-primary mt-1" v-if="name =='ตรวจสอบรายละเอียด' && filterStatus(status, name, true) != 'border-success'" data-bs-toggle="modal" data-bs-target="#imputname">อนุมัติ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row m-auto py-2">
                <div class="col-8">
                    ทางบริษัทมีกำหนดการส่งมอบสินค้าภายในวันที่ {{ formatdate(quotation.due) }}
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                    <button class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#imputname2" v-if="!checkStatus(status.this_status)" :disabled="filterStatus(status.sample['ส่งงานตัวอย่าง'], 'ส่งงานตัวอย่าง', false, true, false)">
                        ฉันได้ตรวจสอบและยอมรับสินค้า ? อนุมิตตัวอย่าง
                    </button>
                    <button class="btn btn-primary p-2" @click="confirmApprove()" v-else-if="quotation.exam_and_order.success != true" :disabled="filterStatus(status.order['จัดส่ง'], 'จัดส่ง', false, true, false)">
                        ฉันได้ตรวจสอบและยอมรับสินค้า
                    </button>
                    <button class="btn btn-primary p-2 d-flex align-items-center gap-1" @click="openReview()" v-else-if="check_rate == false" :disabled="filterStatus(status.order['จัดส่ง'], 'จัดส่ง', false, true, false)">
                        <i class="ri-award-line"></i> <span>ให้คะแนน</span>
                    </button>
                    <a class="btn btn-primary p-2 d-flex align-items-center gap-1" v-else href="https://somsritshirt.com/">
                        <span>ขอบคุณสำหรับรีวิว</span>
                    </a>
                    <!-- <button class="btn btn-outline-pr" @click="checkApi()">X</button> -->
                </div>
            </div>
        </div>
        
        <hr class="my-5">
        <div class="container mt-4">
            <div class="row m-auto">
                <div class="col-12 mt-1 py-2 text-light text-center bg-primary">
                    <h5>รายละเอียดสินค้า</h5>
                </div>
                <div class="col-12 p-0 bg-light overflow-auto">
                    <div class="w-100">
                        <template v-for="data in [quotation]">
                            <div class="bg-warning p-2" style="width: 100%; text-align:center;">
                                <b class="">ป้ายแสดงขนาดเสื้อ</b>
                            </div>
                            <div style="width: 100%; text-align:center;">
                                {{data.data[0].size_label}}
                            </div>
                            <div v-if="data.data[0].size_label_img_show" style="margin-top: 16px; text-align: center;">
                                <img :src="data.data[0].size_label_img" :style="{width: data.data[0].size_label_imgsize+'%'}">
                            </div>
                        </template>
                        <template v-for="data in [quotation]" class="w-100">
                            <table class="table table-bordered d-table" v-if="data.data[0].enable" style="width:100%;">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="text-center bg-warning">
                                            งานตัดและเย็บ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr :class='[(data.data[0].size__edited?"edited":"")]'>
                                        <td class="font-weight-bold">ไซส์เสื้อ</td>
                                        <td>
                                            <div v-for="group in data.shirt_size_type" class="mb-3">
                                                <p class="m-0">{{ group.name }}</p>
                                                <p class="m-0" v-for="size in group.info">{{ size.name + ' - ' + size.width_chest + '"/' + size.long_shirt + '"' }}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr :class='[(data.data[0].color__edited?"edited":"")]'>
                                        <td class="font-weight-bold">สีเสื้อ</td>
                                        <td>{{data.data[0].color}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].collar__edited?"edited":"")]'>
                                        <td class="font-weight-bold">ปกเสื้อ</td>
                                        <td>{{data.data[0].collar}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].fabric__edited?"edited":"")]'>
                                        <td class="font-weight-bold">เนื้อผ้า</td>
                                        <td>{{data.data[0].fabric}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].placket__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1">
                                        <td class="font-weight-bold">สาปเสื้อ</td>
                                        <td>{{data.data[0].placket}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].placket_style__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1">
                                        <td class="font-weight-bold">ลักษณะสาป</td>
                                        <td>{{data.data[0].placket_style}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].placket_width__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1">
                                        <td class="font-weight-bold">ความกว้างของสาปโปโล</td>
                                        <td>{{data.data[0].placket_width}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].placket_length__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1">
                                        <td class="font-weight-bold">ความยาวของสาปโปโล</td>
                                        <td>{{data.data[0].placket_length}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].pocket__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1">
                                        <td class="font-weight-bold">กระเป๋าเสื้อ</td>
                                        <td>{{data.data[0].pocket}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].pocket__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1 && data.data[0].pocket && data.data[0].pocket != 'ไม่มี'">
                                        <td class="font-weight-bold">ขนาดกระเป๋า</td>
                                        <td>{{data.data[0].pocket_size}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].button__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1">
                                        <td class="font-weight-bold">กระดุม</td>
                                        <td>{{data.data[0].button}} เม็ด</td>
                                    </tr>
                                    <tr :class='[(data.data[0].button_color__edited?"edited":"")]' v-if="data.type.indexOf('เสื้อโปโล')!=-1 && data.data[0].button>0">
                                        <td class="font-weight-bold">สีกระดุม</td>
                                        <td>{{data.data[0].button_color}}</td>
                                    </tr>
                                    <tr :class='[(data.data[0].amount__edited?"edited":"")]'>
                                        <td class="font-weight-bold">จำนวน</td>
                                        <td>
                                            <div v-for="(groupValue, groupKey) in data.amountlistdeep" class="mb-3">
                                                <p class="m-0">{{ groupKey }}</p>
                                                <p class="m-0" v-for="(sizeValue, sizeKey) in sortSizeOrder(groupValue)">{{ sizeKey + ' - ' + sizeValue.amount + ' ตัว' }}</p>
                                            </div>
                                            <p class="m-0">รวมทั้งหมด {{ sumShirt(data.amountlistdeep) }} ตัว</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </div>
                <div class="col-12 p-0 bg-light">
                    <table class="table table-bordered  d-table">
                        <thead>
                            <tr>
                                <th colspan="2" class="text-center bg-warning">
                                    ที่อยู่สำหรับการจัดส่ง
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div class="w-100">
                        <div class="w-100">
                            <template v-for="data in [quotation]">

                                <table class="table table-bordered d-table" style="width:100%;">
                                    <tbody class="bg-white">

                                        <tr>

                                            <td class="font-weight-bold">ชื่อ</td>

                                            <td>{{data.person_name}}</td>

                                        </tr>

                                        <tr>

                                            <td class="font-weight-bold">เบอร์โทรศัพท์</td>

                                            <td>{{data.tel}}</td>

                                        </tr>

                                        <tr>

                                            <td class="font-weight-bold">ที่อยู่</td>

                                            <td>{{data.address}}</td>

                                        </tr>

                                        <tr>

                                            <td class="font-weight-bold">ลูกค้ามารับสินค้าที่โรงงาน</td>

                                            <td>{{data.due_bycustomer == 1 ? 'ใช่' : 'ไม่'}}</td>

                                        </tr>

                                        <tr>

                                            <td class="font-weight-bold">วันที่สะดวกรับของ</td>

                                            <td>{{convertToThaiDate(data.data[3].convenient_time_date)}}</td>

                                        </tr>

                                        <tr v-if="data.data[3].convenient_time">

                                            <td class="font-weight-bold">ช่วงเวลาที่สะดวกรับของ</td>

                                            <td>{{data.data[3].convenient_time}} น.</td>

                                        </tr>

                                        <tr v-else>

                                            <td class="font-weight-bold">ช่วงเวลาที่สะดวกรับของ</td>

                                            <td>{{data.data[3].convenient_time_hour}}:{{data.data[3].convenient_time_minute}} น.</td>

                                        </tr>

                                    </tbody>

                                </table>

                            </template>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body w-100 d-flex">
                        <img :src="imgData.img" class="m-auto img-fluid" style="max-height: 100vh;" :alt="'เสื้อตัวอย่าง'">
                    </div> 
                </div>
            </div>
        </div>


        <div class="modal modal-lg fade" id="imputname" tabindex="-1" aria-labelledby="imputnameLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body w-100 d-flex">
                        <div style="margin-left: 15%; margin-right: 15%; width: 70%; margin-bottom: 20px;">
                            <label for="approver_name" class="text-left">ชื่อผู้อนุมัติ</label>
                            <div>
                                <input if="approver_name" v-model="nameUser" class="form-control" id="approver_name"  style="font-size: 1.5rem;">
                            </div>
                            <div class="d-flex">
                                <input type="checkbox" v-model="quotation.exam_and_order.accept_tos" id="approve_check">
                                <label class="ms-2" for="approve_check">ขอยืนยันว่าต้องการให้สินค้าผลิตออกมาตามแบบที่แสดงไว้ดังกล่าว และยอมรับว่าจะไม่สามารถทำการแก้ไขได้อีกต่อไป</label> 
                            </div>
                            <div class="mt-1 d-flex justify-content-center gap-1">
                                <button class="btn btn-outline-success"  data-bs-dismiss="modal" aria-label="Close" :disabled="nameUser == '' || (!quotation.exam_and_order.accept_tos || quotation.exam_and_order.accept_tos == false)" @click="approved_sample(quotation, 'approved')">ตกลง</button>
                                <button class="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">ยกเลิก</button>
                            </div>
                            <div style="text-align: center;" v-if="approving_submitting">กรุณารอสักครู่ ...</div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>


        <div class="modal modal-lg fade" id="imputname2" tabindex="-1" aria-labelledby="imputname2Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body w-100 d-flex">
                        <div style="margin-left: 15%; margin-right: 15%; width: 70%; margin-bottom: 20px;">
                            <label for="approver_name" class="text-left">ชื่อผู้อนุมัติ</label>
                            <div>
                                <input if="approver_name" v-model="nameUser" class="form-control" id="approver_name"  style="font-size: 1.5rem;">
                            </div>
                            <div>
                                <input type="checkbox" v-model="quotation.exam_and_order.accept_ordertos" id="approve_check2"> 
                                <label class="ms-2" for="approve_check2"> ฉันได้ตรวจสอบตัวอย่างแล้วและอนุมัติให้ผลิตจริงได้</label>
                            </div>
                            <div class="mt-1 d-flex justify-content-center gap-1">
                                <button class="btn btn-outline-success"  data-bs-dismiss="modal" aria-label="Close" :disabled="nameUser == '' || (!quotation.exam_and_order.accept_ordertos || quotation.exam_and_order.accept_ordertos == false)" @click="approved(quotation, 'approved_spec')">ตกลง</button>
                                <button class="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">ยกเลิก</button>
                            </div>
                            <div style="text-align: center;" v-if="approving_submitting">กรุณารอสักครู่ ...</div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <uploadImg :quotation="quotation" @closeImg="closeImg"></uploadImg>
        <reviewModal @openImg="openImg()" :imgsUrl="imgsUrl" @deleteImg="deleteImg" :name="name" :quotId="quotation.id" @closeReview="closeReview"></reviewModal>





    </div>

    
</template>

<script>
import uploadImg from './modal/uploadImg.vue';
import reviewModal from './modal/reviewModal.vue';


export default{
    data(){
        return{
            loading:false,
            id:'',
            quotation:'',
            imgData:'',
            status:{
                sample:{
                    "ตรวจสอบรายละเอียด":{
                        before_status:'beforesample',
                        this_status:'approved',
                        icon:'ri-file-list-3-line',
                    },
                    "ผลิต":{
                        before_status:'approved',
                        this_status:'pr',
                        icon:'ri-t-shirt-air-line',
                        next_status:'exam_photo',
                    },
                    "ถ่ายรูปงานตัวอย่าง":{
                        before_status:'pr',
                        this_status:'exam_photo',
                        icon:'ri-camera-line',
                    },
                    "ส่งงานตัวอย่าง":{
                        before_status:'exam_photo',
                        this_status:'delivered',
                        icon:'ri-archive-line',
                    },
                    "ตรวจสอบตัวอย่าง":{
                        before_status:'delivered',
                        this_status:'aftersample',
                        icon:'ri-search-eye-line',
                    },
                },
                order:{
                    "อนุมัติงาน":{
                        before_status:'beforeorder',
                        this_status:'approved_spec',
                        icon:'ri-file-list-3-line',
                    },
                    "ผลิต":{
                        before_status:'approved_spec',
                        this_status:'pr',
                        icon:'ri-t-shirt-air-line',
                        next_status:'packed',
                    },
                    "แพ็ค":{
                        before_status:'pr',
                        this_status:'packed',
                        icon:'ri-red-packet-line',
                    },
                    "จัดส่ง":{
                        before_status:'packed',
                        this_status:'delivered',
                        icon:'ri-archive-line',
                    },
                    "รับสินค้า":{
                        before_status:'delivered',
                        this_status:'afterorder',
                        icon:'ri-search-eye-line',
                    },
                },
            },

            nameUser:"",
            approving_submitting:false,

            test:"asdasdasdasd",
            imgsUrl:[],

            name:'',
            
            check_rate:false,
            
        }
    },
    methods:{
        convertToThaiDate(preDate) {
            if(preDate != undefined){
                let splitDate = preDate.split('-');
                let year = parseInt(splitDate[0]) + 543;
                let month = splitDate[1];
                let day = splitDate[2];
                let date = day + '/' + month + '/' + year;
                return date;
            }
            return '';
        },
        closeReview(){
            this.check_rate= true
            $('#inputReview').modal('hide')
        },
        checkApi(){
            axios.get(`http://127.0.0.1:8000/api/review/qut_id`,{
                quotation_id:this.quotation.id
            }).then((res) => {
                console.log(res.data)
            }) 
        },
        openReview(){
            $('#inputReview').modal('show')
        },
        deleteImg(index){
            console.log(index)
            this.imgsUrl.splice(index, 1)
        },
        closeImg(val){
            this.imgsUrl = val
            $('#upload-img-modal').modal('hide')
            $('#inputReview').modal('show')
            console.log(this.imgsUrl)
        },
        openImg(){
            $('#inputReview').modal('hide')
            $('#upload-img-modal').modal('show')
        },
        async confirmApprove(){
            await Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "ฉันได้ตรวจสอบสินค้าทั้งหมดและย้มรับสินค้าแล้ว!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ตกลง'
            }).then( (result) => {
                if(result.isConfirmed){
                    this.quotation.exam_and_order.order_step_data.filter((res) => {
                        if(res.name == 'approved_spec'){
                            this.name = res.approved_spec.by
                        }
                    })
                    this.quotation.exam_and_order.success = true;
                    this.quotation.exam_and_order.success_date = new Date();
                    axios.post("http://127.0.0.1:8000/api/v2/quotation/" + this.quotation.id + "/exam_and_order/update", {
                        exam_and_order: this.quotation.exam_and_order,
                        id: this.quotation.id
                    }).then((res) => {
                            Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'บันทึกเสร็จสิ้น',
                            text: 'ขอบคุณที่ใช้บริการ สมศรีมีเสื้อ',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            if (result.isConfirmed){
                                $('#inputReview').modal('show')
                            }
                        })
                    }).catch(function(err) {
                        console.error(err);
                        alert("Approve error : " + JSON.stringify(err));
                    });
                }
            })
        },
        checkPng(val){
            console.log(val)
        },
        async approved_sample(val, field) {
            this.approving_submitting = true
            let setdata = val.exam_and_order

            if (Array.isArray(setdata.step_data[field])) setdata.step_data[field] = {};
            if (!setdata.step_data[field]) setdata.step_data[field] = {};
            setdata.step_data[field].done = !setdata.step_data[field].done;
            if (setdata.step_data[field].done) {
                setdata.step_data[field].done = true
                setdata.step_data[field].by = this.nameUser
                setdata.step_data[field].username = this.nameUser
                setdata.step_data[field].at = new Date()
            }

            let step_list = setdata.step_list;
            let step_data = setdata.step_data;
            let step_list4 = setdata.sort_step_data

            let status_done = [];
            let status_not_done = [];
            let totalStatusSort = [];

            for (let i = 0; i < step_list.length; i++) {
                if ("sort_step_data" in setdata) {
                    if (step_data[step_list4[i].name].done) {
                        if ("comments" in setdata.sort_step_data[i][step_list4[i].name]) {
                            step_data[step_list4[i].name].comments = setdata.sort_step_data[i][step_list4[i].name].comments
                            setdata.step_data[step_list4[i].name].comments = setdata.sort_step_data[i][step_list4[i].name].comments
                        }
                        if ("report" in setdata.sort_step_data[i][step_list4[i].name]) {
                            step_data[step_list4[i].name].report = setdata.sort_step_data[i][step_list4[i].name].report
                            setdata.step_data[step_list4[i].name].report = setdata.sort_step_data[i][step_list4[i].name].report
                        }
                        if ("reject" in setdata.sort_step_data[i][step_list4[i].name]) {
                            step_data[step_list4[i].name].reject = setdata.sort_step_data[i][step_list4[i].name].reject
                            setdata.step_data[step_list4[i].name].reject = setdata.sort_step_data[i][step_list4[i].name].reject
                        }
                        status_done.push({
                            [step_list4[i].name]: step_data[step_list4[i].name],
                            "name": step_list4[i].name
                        })
                    }
                    if (step_data[step_list4[i].name].done == undefined) {
                        if (setdata.sort_step_data[i][step_list4[i].name].length == 0) {
                            status_not_done.push({
                                [step_list4[i].name]: {
                                    data: []
                                },
                                "name": step_list4[i].name
                            })
                        } else {
                            status_not_done.push({
                                [step_list4[i].name]: setdata.sort_step_data[i][step_list4[i].name],
                                "name": step_list4[i].name
                            })
                            // setdata.step_data[step_list4[i].name].reject = setdata.sort_step_data[i][step_list4[i].name]
                        }
                    }
                } else {
                    if (step_data[step_list[i][0]]?.done) {
                        status_done.push({
                            [step_list[i][0]]: step_data[step_list[i][0]],
                            "name": step_list[i][0]
                        })
                    }
                    if (step_data[step_list[i][0]]?.done == undefined) {
                        status_not_done.push({
                            [step_list[i][0]]: step_data[step_list[i][0]],
                            "name": step_list[i][0]
                        })
                    }
                }
            }

            setdata.sort_step_data = status_done.concat(status_not_done);

            for (let l = 0; l < setdata.sort_step_data.length; l++) {
                totalStatusSort.push({
                    "en": setdata.sort_step_data[l].name,
                    "th": this.getSortStepList(setdata.sort_step_data[l].name)
                })
            }

            setdata.sort_step_list = totalStatusSort;

            val.exam_and_order = setdata

            let res = await axios.post("http://127.0.0.1:8000/api/v2/quotation/" + val.id + "/exam_and_order/update", {
                exam_and_order: val.exam_and_order,
                id: val.id
            }).then((res) => {
                Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ทำการอนุมัติเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                        })
                this.approving_submitting = false;

            }).catch(function(err) {
                console.error(err);
                alert("Approve error : " + JSON.stringify(err));
            });


            this.$forceUpdate();
        },
        async approved(val, field, whichtable) {
            let step_list = "step_list";
            let step_data = "step_data";
            let setdata = _.cloneDeep(val.exam_and_order);

            if (!whichtable) whichtable = "quotation";
            if (!field) field = "approved";
            if (Array.isArray(val[step_data][field])) val[step_data][field] = {};
            if (!val[step_data][field]) val[step_data][field] = {};
            val[step_data][field].done = !val[step_data][field].done;
            if (val[step_data][field].done) {
                val[step_data][field].by = this.nameUser;
                val[step_data][field].at = new Date();
                val[step_data][field].username = this.nameUser;
            }

            let step_list_arr = setdata.order_step_list;
            let step_data_obj = setdata.order_step_data;
            let order_step_data = setdata.order_step_data;

            let status_done = [];
            let status_not_done = [];
            let totalStatusSort = [];

            let diffStepLeng = step_list_arr.length - order_step_data.length;

            if (diffStepLeng < 0) {
                diffStepLeng *= -1;
            }
            let cleanedStepListLeng = step_list_arr.length;

            for (let i = 0; i < cleanedStepListLeng; i++) {
                if ("order_step_data" in setdata) {
                let stepName = order_step_data[i].name;
                let orderStepData = setdata.order_step_data[i][stepName];
                if(field == stepName){
                    if(!step_data_obj[i][stepName].done) step_data_obj[i][stepName].done = true;
                    step_data_obj[i][stepName].done = true
                    if (step_data_obj[i][stepName].done) {
                    step_data_obj[i][stepName].by = this.nameUser;
                    step_data_obj[i][stepName].at = new Date();
                    step_data_obj[i][stepName].username = this.nameUser;
                    }
                }
                let isStepDone = step_data_obj[i][stepName]?.done || undefined;

                if (isStepDone) {
                    if ("comments" in orderStepData) {
                    step_data_obj[i][stepName].comments = orderStepData.comments;
                    }
                    if ("report" in orderStepData) {
                    step_data_obj[i][stepName].report = orderStepData.report;
                    }
                    if ("reject" in orderStepData) {
                    step_data_obj[i][stepName].reject = orderStepData.reject;
                    }
                    status_done.push({
                    [stepName]: step_data_obj[i][stepName],
                    name: stepName,
                    });
                }
                if (isStepDone == undefined) {
                    if (orderStepData.length == 0) {
                    status_not_done.push({
                        [stepName]: { data: [] },
                        name: orderStepData,
                    });
                    }
                    if (step_data_obj[i][stepName].done == undefined) {
                    status_not_done.push({
                        [stepName]: orderStepData,
                        name: stepName,
                    });
                    }
                }
                }else{
                if (step_data_obj[i][stepName].done) {
                    status_done.push({
                    [step_list_arr[i][0]]: step_data_obj[i][stepName],
                    name: step_list_arr[i][0],
                    });
                }
                if (step_data_obj[i][stepName].done == undefined) {
                    status_not_done.push({
                    [step_list_arr[i][0]]: { data: [] },
                    name: step_list_arr[i][0],
                    });
                }

                } 
                
            }

            setdata.order_step_data = status_done.concat(status_not_done);
            for (let i = 0; i < setdata.order_step_data.length; i++) {
                totalStatusSort.push({
                en: setdata.order_step_data[i].name,
                th: this.getOrderSortStepList(setdata.order_step_data[i].name),
                });
            }
            setdata.order_step_list = totalStatusSort;

            // STATUS MASSAGE
            const checkIndex = (el) => el.name == "delivered";
            const deliveryIndex = setdata.order_step_data.findIndex(checkIndex);
            const date = (fm) => moment().format(fm);
            let msg = {};
            const setMsg = (text) => {
                msg = {
                name: this.nameUser,
                status: text,
                at: date("DD/MM/") + (Number(date("YYYY")) + 543),
                by: this.nameUser,
                };
                if (!setdata.msg) setdata.msg = [];
                setdata.msg.push(msg);
            };

            let finishi = 0;
            for (let i = 0; i < deliveryIndex; i++) {
                let step = setdata.order_step_data[i].name;
                if (setdata.order_step_data[i][step].done) finishi++;
            }
            setdata.is_order = true
            setdata.is_ordered = 1

            _.merge(setdata, setdata);
            this.quotation.exam_and_order = setdata
            let approved_note_suffix =
                field == "approved" ? "ตัวอย่าง" : field == "approved_spec" ? "ใบสเปค" : ""
            try {
                await axios.post(
                    "http://127.0.0.1:8000/api/v2/" + whichtable + "/" + val.id + "/update", {
                        [step_list]: val[step_list],
                        [step_data]: val[step_data],
                        ____note: field.startsWith("approved") ?
                            val[step_data][field] && val[step_data][field].done ?
                            "อนุมัติ" + approved_note_suffix :
                            "ยกเลิกการอนุมัติ" + approved_note_suffix : "เปลี่ยนสถานะ",

                        ____guestname: val[step_data][field].by,
                    }
                ).then(function(res) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ทำการอนุมัติเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                        })
                }).catch(function(err) {
                    console.error(err)

                    alert("Approve error : " + JSON.stringify(err))

                    this.approving_submitting = false
                })

                axios.post(
                    "http://127.0.0.1:8000/api/v2/quotation/" + val.id + "/exam_and_order/update", {
                        exam_and_order: val.exam_and_order,
                        id: val.id,
                    }
                )
            } catch (err) {
                alert('เกิดข้อผิดพลาดบางอย่างระหว่างอัพเดทสถานะงาน')
                console.error(err)
            }
            this.$forceUpdate();
        },
        getOrderSortStepList(name) {
            let namei = "";
            switch (name) {
                case "approved_spec":
                namei = "อนุมัติใบสเปค";
                break;
                case "sample_produced":
                namei = "ผลิตชิ้นงานตัวอย่าง";
                break;
                case "approved":
                namei = "อนุมัติตัวอย่าง";
                break;
                case "fabric_prepare":
                namei = "จัดเตรียมผ้า";
                break;
                case "sewed_prepare":
                namei = "จัดเตรียมวัสดุเย็บ";
                break;
                case "pack_prepare":
                namei = "จัดเตรียมวัสดุแพ็ค";
                break;
                case "pr":
                namei = "เขียน P.R.";
                break;
                case "fabric_ordered":
                namei = "สั่งผ้า";
                break;
                case "fabric_received":
                namei = "รับผ้า";
                break;
                case "film_printed":
                namei = "ปริ้นฟิล์ม / เตรียมไฟล์";
                break;
                case "screen_sample":
                namei = "อัดบล็อก/สกรีนตัวอย่าง";
                break;
                case "fabric_cutted":
                namei = "ตัดผ้า";
                break;
                case "cutted":
                namei = "ตัดผ้า";
                break;
                case "qc_cut":
                namei = "QC ชิ้นผ้าตัด";
                break;
                case "fabric_screened":
                namei = "สกรีนผ้า";
                break;
                case "screened":
                namei = "สกรีนผ้า";
                break;
                case "qc_screen":
                namei = "QC งานปัก/งานสกรีน";
                break;
                case "fabric_sewed":
                namei = "เย็บผ้า";
                break;
                case "sewed":
                namei = "เย็บผ้า";
                break;
                case "qc":
                namei = "QC งานสำเร็จรูป";
                break;
                case "supplier_delivered":
                namei = "ส่งซัพพลายเออร์";
                break;
                case "packed":
                namei = "Packing";
                break;
                case "delivered":
                namei = "จัดส่ง";
                break;
                case "exam_photo":
                namei = "ถ่ายรูปงานตัวอย่าง";
                break;
            }
            return namei;
        },
        getSortStepList(name) {
            let namei = ""
            switch (name) {
                case "approved":
                    namei = "อนุมัติใบสเปค";
                    break;
                case "fabric_prepare":
                    namei = "จัดเตรียมผ้า";
                    break;
                case "sewed_prepare":
                    namei = "จัดเตรียมวัสดุเย็บ";
                    break;
                case "pack_prepare":
                    namei = "จัดเตรียมวัสดุแพ็ค";
                    break;
                case "pr":
                    namei = "เขียน P.R.";
                    break;
                case "fabric_ordered":
                    namei = "สั่งผ้า";
                    break;
                case "fabric_received":
                    namei = "รับผ้า";
                    break;
                case "cutted":
                    namei = "ตัด";
                    break;
                case "screened":
                    namei = "สกรีน";
                    break;
                case "sewed":
                    namei = "เย็บ";
                    break;
                case "qc":
                    namei = "QC";
                    break;
                case "exam_photo":
                    namei = "ถ่ายรูปงานตัวอย่าง";
                    break;
                case "delivered":
                    namei = "จัดส่ง";
                    break;
                case "exam_approved":
                    namei = "อนุมัติตัวอย่าง";
                    break;
            }
            return namei;
        },
        check(val){
            console.log(val)
        },  
        // doapprove_wrapper_exam(val, approving_field = "approved") {
        //                 if (val.exam_and_order.sort_step_data) {
        //                     for (let x = 0; x < val.exam_and_order.sort_step_data.length; x++) {
        //                         if ("approved" in val.exam_and_order.sort_step_data[x]) {
        //                             if (val.exam_and_order.sort_step_data && val.exam_and_order.sort_step_data[x].approved.done) {
        //                                 alert('ไม่สามารถยกเลิกอนุมัติได้ เนื่องจากคุณได้กดอนุมัติไปก่อนหน้านั้นแล้ว');
        //                                 return;
        //                             }
        //                         }
        //                     }
        //                 }
        //                 this.approving_val = val;
        //                 this.approving_page = 1;
        //                 this.approving_max_page = 6;
        //                 this.approving_pic_id = 0;
        //                 this.approving_edit_mode = false;


        //                 //SKIP IF NO CONTENT IN THAT PAGE

        //                 if (this.approving_page_skip(this.approving_page)) {

        //                     this.approving_next_page();

        //                 }

        //                 this.exam_order = "exam";

        //                 this.approving_field = approving_field;

        //                 showmodal("#approving_modal");

        //                 this.startCountTime();

        // },
        async getQuotation(){
            try {
                await axios.get(`http://127.0.0.1:8000/api/v2/quotation/${this.id}`).then((res) => {
                    this.quotation = res.data
                }) 
            } catch (error) {
                window.location = "https://somsritshirt.com"
            }
        },
        openImgaeFullscreen(val){
            this.imgData = val
            $('#exampleModal').modal('show')
        },
        sortSizeOrder(raw) {
            //CONVERT TO zRRAY
            let groupArr = Object.entries(raw)
            let sortGroupArr = _.sortBy(groupArr, (data) => {
                return data[1].order
            })
            return Object.fromEntries(sortGroupArr)
        },
        sumShirt(amountlistdeep) {
            let shirtAmount = 0
            for (let group in amountlistdeep) {
                for (let size in amountlistdeep[group]) {
                    if (!isNaN(amountlistdeep[group][size].amount)) {
                        shirtAmount += amountlistdeep[group][size].amount
                    }
                }
            }
            return shirtAmount
        },
        checkStatus(val){
            if(this.isOrder){
                return true
            }
            return false
        },
        formatdate(date = new Date()) {
            //SEND PLAIN TEXT DATE
            let dateObj = new Date(date);
            return new Intl.DateTimeFormat("th-TH").format(dateObj);
        },
        filterStatus(val, name, checkclass = false,checkapprove = false, date = false){
            if(val.this_status.indexOf('aftersample') > -1 ){
                if(date) return '';
                if(this.quotation.exam_and_order.sort_step_data){
                    for(let x=0;x<this.quotation.exam_and_order.sort_step_data.length;x++){
                        if(this.quotation.exam_and_order.sort_step_data[x][val.before_status]){
                            if(this.quotation.exam_and_order.sort_step_data[x][val.before_status].done && this.quotation.exam_and_order.sort_step_data[x][val.before_status].done == true){
                                if(checkclass) return 'border-primary';
                                if(checkapprove) return true;
                                return "รอ"+name
                            }
                        }
                    }
                }
                if(checkclass) return 'border-warning';
                if(checkapprove) return false;
                return name
            }
            if(val.before_status.indexOf('beforesample') > -1){
                if(this.quotation.exam_and_order.sort_step_data){
                    for(let x=0;x<this.quotation.exam_and_order.sort_step_data.length;x++){
                        if(this.quotation.exam_and_order.sort_step_data[x][val.this_status]){
                            if(this.quotation.exam_and_order.sort_step_data[x][val.this_status].done && this.quotation.exam_and_order.sort_step_data[x][val.this_status].done == true){
                                if(checkclass) return 'border-success';
                                if(date) return new Date(this.quotation.exam_and_order.sort_step_data[x][val.this_status].at).toLocaleString('th-TH');
                                return name+"แล้ว"
                            }
                            if(checkclass) return 'border-primary';
                            if(date) return '';
                            return "รอ"+name
                        }
                    }
                    if(checkclass) return 'border-primary';
                    if(date) return '';
                    return "รอ"+name
                }
                if(checkclass) return 'border-primary';
                if(date) return '';
                return "รอ"+name
                
            } 

            if(val.this_status.indexOf('afterorder') > -1 && this.quotation.exam_and_order.success && this.quotation.exam_and_order.success == true){
                if(checkclass) return "border-success";
                if(checkapprove) return "";
                if(date) return '';
                return name+"แล้ว"
            }
            let text = name 
            let Class = 'border-warning';
            let dates = '';
            if(this.isOrder){
                if(this.quotation.exam_and_order?.order_step_data){
                    for(let x=0;x<this.quotation.exam_and_order.order_step_data.length;x++){
                        if(val.this_status == 'pr'){
                            if(this.quotation.exam_and_order.order_step_data[x][val.next_status]?.done && this.quotation.exam_and_order.order_step_data[x][val.next_status]?.done == true){
                                text = name+"แล้ว"
                                Class = 'border-success'
                                dates =  new Date(this.quotation.exam_and_order.order_step_data[x][val.next_status].at).toLocaleString('th-TH');
                            }
                        }
                        if(this.quotation.exam_and_order.order_step_data[x][val.this_status]?.done && this.quotation.exam_and_order.order_step_data[x][val.this_status]?.done == true){
                            if(val.this_status == 'pr'){
                                text = 'กำลัง'+name
                                Class = 'border-primary'
                            }else{
                                if(checkapprove) return false;
                                if(checkclass) return 'border-success'
                                if(date) return  new Date(this.quotation.exam_and_order.order_step_data[x][val.this_status].at).toLocaleString('th-TH');
                                return name+'แล้ว'
                            }
                        }
                        if(this.quotation.exam_and_order.order_step_data[x][val.before_status]?.done && this.quotation.exam_and_order.order_step_data[x][val.before_status]?.done == true){
                            text = "รอ"+name
                            Class = 'border-primary'
                        }
                    }
                    if(checkclass) return Class;
                    if(date) return dates;
                    return text
                }
                if(date) return dates;
                return name              
            }else{
                if(this.quotation.exam_and_order?.sort_step_data){
                    for(let x=0;x<this.quotation.exam_and_order.sort_step_data.length;x++){
                        if(val.this_status == 'pr'){
                            if(this.quotation.exam_and_order.sort_step_data[x][val.next_status]?.done && this.quotation.exam_and_order.sort_step_data[x][val.next_status]?.done == true){
                                text = name+"แล้ว"
                                Class = 'border-success'
                                dates =  new Date(this.quotation.exam_and_order.sort_step_data[x][val.next_status].at).toLocaleString('th-TH');
                            }
                        }
                        if(this.quotation.exam_and_order.sort_step_data[x][val.this_status]?.done && this.quotation.exam_and_order.sort_step_data[x][val.this_status]?.done == true){
                            if(val.this_status == 'pr'){
                                text = 'กำลัง'+name
                                Class = 'border-primary'
                            }else{
                                if(checkapprove) return false;
                                if(checkclass) return 'border-success'
                                if(date) return  new Date(this.quotation.exam_and_order.sort_step_data[x][val.this_status].at).toLocaleString('th-TH');
                                return name+'แล้ว'
                            }
                        }
                        if(this.quotation.exam_and_order.sort_step_data[x][val.before_status]?.done && this.quotation.exam_and_order.sort_step_data[x][val.before_status]?.done == true){
                            text = "รอ"+name
                            Class = 'border-primary'
                        }
                    }
                    if(checkclass) return Class;
                    if(date) return dates;
                    return text
                }
                if(date) return dates;
                return name              
            }
        },
        async checkExamAndOrder(){
            if(this.quotation.exam_and_order.sort_step_data == null){
                // this.quotation.exam_and_order.sort_step_data = "s"
            }
        },
        async checkname(){
            this.quotation.exam_and_order?.order_step_data.filter((res) => {
                if(res.name == 'approved_spec'){
                    this.name = res.approved_spec.by
                }
            })
        }
    },
    async mounted(){
        this.loading = false
        this.id = this.$route.query.id;
        if(!this.id){
            window.location = "https://somsritshirt.com"
        }
        await this.getQuotation()
        await this.checkExamAndOrder()
        await this.checkname();
        this.loading = true
    },
    computed:{
        quotdataStatus(){
            if(this.quotation.exam_and_order?.is_order == true){
                return this.status.order
            }
            return this.status.sample
        },
        statusc(){
            if(this.isOrder){
                return "งานจริง"
            }
            return "งานตัวอย่าง"
        },
        isOrder(){
            if(this.quotation.exam_and_order?.is_order == true){
                return true
            }
            return false
        }
    },
    components:{
        uploadImg,
        reviewModal,
    }
}

</script>

<style>

.show-order-statusw{
    display: grid;
  }
  @media only screen and (min-width: 1200px){
    .show-order-statusw{
        /* display: grid; */
        /* gap: 1%; */
        grid-column-end: auto;
        grid-template-columns: 20% 20% 20% 20% 20%;
      }

  }
  @media only screen and (min-width: 855px) and (max-width: 1199px){
    .show-order-statusw{
        /* display: grid; */
        /* gap: 1%; */
        grid-column-end: auto;
        grid-template-columns: 33% 33% 33%;
      }

  }
  @media only screen and (min-width: 555px) and (max-width: 854px){
    .show-order-statusw{
        /* display: grid; */
        /* gap: 1%; */
        grid-column-end: auto;
        grid-template-columns: 50% 50%;
      }

  }
  @media only screen and (max-width: 554px){
    .show-order-statusw{
        /* display: grid; */
        /* gap: 1%; */
        grid-column-end: auto;
        grid-template-columns: 100%;
      }

  }
</style>
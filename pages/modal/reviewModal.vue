<template>
    <div class="modal modal-lg fade" id="inputReview" tabindex="-1" aria-labelledby="inputReviewLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <h5>โปรดให้คะแนนการบริการของเรา</h5>
                        </div>
                        <div class="col-12 my-1">
                            <stronge class="text-start d-flex mb-2">ให้คะแนนการให้คำแนะนำในการขาย</stronge>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="selling_advice_score" id="selling_advice_score1" value="1">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="selling_advice_score1">
                                    <span>1</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="selling_advice_score" id="selling_advice_score2" value="2">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="selling_advice_score2">
                                    <span>2</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="selling_advice_score" id="selling_advice_score3" value="3">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="selling_advice_score3">
                                    <span>3</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="selling_advice_score" id="selling_advice_score4" value="4">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="selling_advice_score4">
                                    <span>4</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="selling_advice_score" id="selling_advice_score5" value="5">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="selling_advice_score5">
                                    <span>5</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-floating my-1">
                                <textarea class="form-control" v-model="selling_advice_comments" placeholder="............" id="reviewProduct"></textarea>
                                <label for="reviewProduct" class="fs-6">เขียนรีวิว.....</label>
                            </div>
                        </div>
                        <div class="col-12 my-1">
                            <stronge class="text-start d-flex mb-2">การดูแลระหว่างการขาย</stronge>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="maintenance_during_the_sale_score" id="maintenance_during_the_sale_score1" value="1">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="maintenance_during_the_sale_score1">
                                    <span>1</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="maintenance_during_the_sale_score" id="maintenance_during_the_sale_score2" value="2">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="maintenance_during_the_sale_score2">
                                    <span>2</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="maintenance_during_the_sale_score" id="maintenance_during_the_sale_score3" value="3">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="maintenance_during_the_sale_score3">
                                    <span>3</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="maintenance_during_the_sale_score" id="maintenance_during_the_sale_score4" value="4">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="maintenance_during_the_sale_score4">
                                    <span>4</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="maintenance_during_the_sale_score" id="maintenance_during_the_sale_score5" value="5">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="maintenance_during_the_sale_score5">
                                    <span>5</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-floating my-1">
                                <textarea class="form-control" v-model="maintenance_during_the_sale_comments" placeholder="............" id="reviewProduct"></textarea>
                                <label for="reviewProduct" class="fs-6">เขียนรีวิว.....</label>
                            </div>
                        </div>
                        <div class="col-12 my-1">
                            <stronge class="text-start d-flex mb-2">คุณภาพสินค้า</stronge>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="product_quality_score" id="product_quality_score1" value="1">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="product_quality_score1">
                                    <span>1</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="product_quality_score" id="product_quality_score2" value="2">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="product_quality_score2">
                                    <span>2</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="product_quality_score" id="product_quality_score3" value="3">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="product_quality_score3">
                                    <span>3</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="product_quality_score" id="product_quality_score4" value="4">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="product_quality_score4">
                                    <span>4</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="product_quality_score" id="product_quality_score5" value="5">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="product_quality_score5">
                                    <span>5</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-floating my-1">
                                <textarea class="form-control" v-model="product_quality_comments" placeholder="............" id="reviewProduct"></textarea>
                                <label for="reviewProduct" class="fs-6">เขียนรีวิว.....</label>
                            </div>
                        </div>
                        <div class="col-12 my-1">
                            <stronge class="text-start d-flex mb-2">การดูแลหลังการขาย</stronge>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="after_sales_care_score" id="after_sales_care_score1" value="1">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="after_sales_care_score1">
                                    <span>1</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="after_sales_care_score" id="after_sales_care_score2" value="2">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="after_sales_care_score2">
                                    <span>2</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="after_sales_care_score" id="after_sales_care_score3" value="3">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="after_sales_care_score3">
                                    <span>3</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="after_sales_care_score" id="after_sales_care_score4" value="4">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="after_sales_care_score4">
                                    <span>4</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="after_sales_care_score" id="after_sales_care_score5" value="5">
                                <label class="form-check-label d-flex gap-1 align-items-center" for="after_sales_care_score5">
                                    <span>5</span><i class="remixicon ri-star-line"></i>
                                </label>
                            </div>
                            <div class="form-floating my-1">
                                <textarea class="form-control" v-model="after_sales_care_comments" placeholder="............" id="reviewProduct"></textarea>
                                <label for="reviewProduct" class="fs-6">เขียนรีวิว.....</label>
                            </div>
                        </div>

                        <div class="my-1 col-12">
                            <stronge class="text-start d-flex my-2">รูปภาพ</stronge>
                            <div class="mb-3">
                                <button @click="$emit('openImg')" class="btn btn-outline-primary d-flex align-items-center gap-2"><i class="ri-image-add-line"></i> <sapn>เพิ่มรูปภาพ</sapn></button>
                                <!-- <input class="form-control" type="file" @input="checkPng('asd')" id="formFileMultiple" multiple accept="image/png, image/jpeg"> -->
                            </div>
                            <div class="row m-auto">
                                <template v-for="(img, index) in imgsUrl" :key="index">
                                    <div class="col-12 col-lg-4 mb-1 position-relative d-flex align-items-center justify-content-center shadow-sm p-1" style="aspect-ratio: 1/1;">
                                        <button class="btn btn-close position-absolute rounded-circle bg-light" @click="$emit('deleteImg', index)" style="top:5px; right:15px;"></button>
                                        <img :src="img.img" class="img-fluid h-100" alt="">
                                    </div>
                                </template>
                            </div>
                        </div>


                        <div class="col-12 my-1 d-flex justify-content-center">
                            <button class="btn btn-success" @click="createReview()">ตกลง</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    emits:['openImg','deleteImg','closeReview'],
    props:{
        imgsUrl:{
            default:[],
            request:false,
        },
        name:{
            default:'',
            request:false,
        },
        quotId:{
            default:'',
            request:false,
        }
    },
    data(){
        return{
            selling_advice_score:0,
            selling_advice_comments:'',
            maintenance_during_the_sale_score:0,
            maintenace_during_the_sale_comments:'',
            product_quality_score:0,
            product_quality_comments:'',
            after_sales_care_score:0,
            after_sales_care_comments:'',
        }
    },
    methods:{
        async createReview(){
            let sqlling = document.querySelector('input[name="selling_advice_score"]:checked')
            let maintenance = document.querySelector('input[name="maintenance_during_the_sale_score"]:checked')
            let product = document.querySelector('input[name="product_quality_score"]:checked')
            let afterSale = document.querySelector('input[name="after_sales_care_score"]:checked')
            this.selling_advice_score = sqlling ? parseInt(sqlling.value) : null;
            this.maintenance_during_the_sale_score = maintenance ? parseInt(maintenance.value) : null;
            this.product_quality_score = product ? parseInt(product.value) : null;
            this.after_sales_care_score = afterSale ? parseInt(afterSale.value) : null;
            let ReviewData = {
                username:this.name,
                selling_advice_score: this.selling_advice_score,
                selling_advice_comments:this.selling_advice_comments,
                maintenance_during_the_sale_score:this.maintenance_during_the_sale_score,
                maintenance_during_the_sale_comments:this.maintenance_during_the_sale_comments,
                product_quality_score:this.product_quality_score,
                product_quality_comments:this.product_quality_comments,
                after_sales_care_score:this.after_sales_care_score,
                after_sales_care_comments:this.after_sales_care_comments,
                quotation_id:this.quotId,
                created_by:this.name,
                updated_by:this.name,
                img:this.imgsUrl,
            }
            
            await axios.post('http://127.0.0.1:8000/api/review/create/', ReviewData).then((res) => {
                console.log(res)
            }).then((res) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'บันทึกเสร็จสิ้น',
                    text: 'ขอบคุณสำหรับรีวิวครับ',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$emit('closeReview')
            }).catch((err) =>{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการเพิ่มรีวิว',
                    text: 'ขออภัยในเป็นอย่างสูงครับ',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },  
        async getReview(){
            await axios.get('http://127.0.0.1:8000/api/review').then((res) => {
                console.log(res)
            }).catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
                    text: 'ขออภัยในเป็นอย่างสูงครับ',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
    },
    async mounted(){
        await this.getReview()
    },
}
</script>
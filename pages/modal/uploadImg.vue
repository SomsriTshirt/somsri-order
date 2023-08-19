<template>
    <div class="modal" id="upload-img-modal" tabindex="-1" aria-labelledby="uploadImgModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">อัปโหลดภาพ</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    @click="clearFileInput('upload-img-input', 'imgFile'),$emit('closeImg', this.imgsUrl)"></button>
            </div>

                <div class="modal-body pt-0">
                    <div class="border border-orange-secondary border-4 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-orange-secondary cursor-pointer py-5 mb-3"
                        style="border-style: dashed !important; background-color: #FFF2EE" id="upload-input-placeholder"
                        @dragenter="OnDragEnter" @dragleave="OnDragLeave" @dragover.prevent @drop="onDrop"
                        @dragend="onDragEnd" :class="{ dragging: isDragging }"
                        @click="openUploadInput('upload-img-input')">
                        <i class="remixicon mb-2 ri-image-add-fill" style="font-size: 5rem;" v-if = "iconDrop == 'add'"></i>
                        <i class="remixicon mb-2 ri-file-upload-line" style="font-size: 5rem;" v-if = "iconDrop == 'drop'"></i>
                        <i class="remixicon mb-2 ri-prohibited-line" style="font-size: 5rem;" v-if = "iconDrop == 'oneFile'"></i>
                        <h5 class="mb-0">{{ messageDrag }}</h5>
                        <small>ขนาดไฟล์สูงสุด 25 MB</small>
                    </div>
                    <input type="file" id="upload-img-input" class="form-control d-none" accept="image/png, image/jpeg"
                        :multiple="imgMode =='Multiple' ? true : false" @change="getFile($event.target.id)">
                    <template v-if="imgFile.length > 0">
                        <div class="border shadow mb-3 bg-white p-3 rounded-3 d-flex justify-content-between"
                            v-for="(file, index) in imgFile" :key="'image-' + index">

                            <div class="d-flex">
                                <div class="rounded p-2 text-orange-secondary me-2" style="background-color: #FFF2EE">
                                    <i class="remixicon ri-image-2-line"></i>
                                </div>
                                <div>
                                    <h6 class="text-orange-secondary mb-0">{{ file.name }}</h6>
                                    <small class="text-muted mb-0">{{ file.size }}</small>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="row">
                        <div class="col-6">
                            <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal"
                                aria-label="Close"
                                @click="clearFileInput('upload-img-input', 'imgFile'),$emit('closeImg', this.imgsUrl)">ยกเลิก</button>
                        </div>
                        <div class="col-6">
                            <button type="button" class="btn btn-primary w-100"
                                @click="uploadProjectImg('upload-img-modal', 'upload-img-input', uploadImgMode, imgFile.index, imgFile.subIndex, selectedImg)">อัปโหลด</button>
                        </div>
                    </div>
                </div>

        </div>
        <div class="modal-footer">
        </div>
    </div>
</div>
</template>
<script>
export default{
    emits:['closeImg'],
    props:{
        quotdata:{
            default:{},
        }
    },
    data(){
        return{
            imgFile:[],
            messageDrag:'',
            iconDrop:'add',
            imgMode:'Multiple',
            imgsUrl:[],
        }
    },
    methods:{
        async clearFileInput(id, data) {
        this.imgFile = [];
        this.messageDrag = "ลากไฟล์มาที่นี่หรือกดเรียกดู";
        this.iconDrop = "add";
        },
        async openUploadInput(elementId) {
        let element = document.getElementById(elementId);
            element.click();
        },
        async uploadProjectImg(
            modalId = null,
            inputId,
            mode,
            index = null,
            subIndex = null,
            selectedImg
            ) {
            // this.toggleAllChildElement(modalId);
            if (this.imgFile.length === 0) {
                // generateToast("กรุณาเลือกภาพก่อนอัปโหลด", "danger");
                // this.toggleAllChildElement(modalId);
                Swal.fire(
                'กรุณาเลือกภาพก่อนอัปโหลด',
                '...',
                'error'
                )
                return;
            }
            try {
                for (const imgFile of this.imgFile) {
                    let fileId = Date.now();
                    let filename = String(fileId);
                    let url = await this.uploadimg(filename, imgFile.file);
                    this.imgsUrl.push({
                        img: url,
                        imgsize: 100,
                    })
                }
                await this.clearFileInput(inputId, "imgFile");
                this.$emit('closeImg', this.imgsUrl);
                Swal.fire(
                'อัปโหลดภาพสำเร็จ',
                '...',
                'success'
                )
                
            } catch (err) {
                await this.clearFileInput(inputId, "imgFile");
                this.$emit('closeImg', this.imgsUrl);
                Swal.fire(
                'เกิดข้อผิดพลาดระหว่างอัปโหลดภาพ',
                '...',
                'error'
                )
                // generateToast("เกิดข้อผิดพลาดระหว่างอัปโหลดภาพ", "danger");
                console.log(err);
            }
        },
        async uploadimg(filename, imgfile) {
            return new Promise(function (resolve, reject) {
                //var imgref = storageRef.child("quotation/im");
                let formData = new FormData();
                formData.append("image", imgfile);
                if (imgfile.type == "image/jpeg") {
                axios
                    .post("http://127.0.0.1:8000/api/imageupload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    })
                    .then((res) => {
                    if (res.data.status == "success") {
                        resolve(res.data.url);
                    } else {
                        reject(res.data.message);
                    }
                    })
                    .catch(reject);
                } else if (imgfile.type == "image/png") {
                axios
                    .post("http://127.0.0.1:8000/api/imageupload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    })
                    .then((res) => {
                    if (res.data.status == "success") {
                        resolve(res.data.url);
                    } else {
                        reject(res.data.message);
                    }
                    })
                    .catch(reject);
                } else {
                //alert("Image Error : "+imgfile.type+" Not supported");
                reject("Image Error : " + imgfile.type + " Not supported");
                }
            });
        },
        getFile(id) {
            const filesInput = document.getElementById(id).files;
            if (
                this.imgMode == "Multiple" ||
                (this.imgMode == "Single" &&
                this.imgFile.length === 0 &&
                filesInput.length === 1)
            ) {
                for (let i = 0; i < filesInput.length; i++) {
                const files = filesInput[i];
                this.imgFile.push({
                    haveFile: true,
                    name: files.name,
                    size: (files.size / 1024 / 1024).toFixed(2) + " MB",
                    index: this.imgFile.length,
                    file: files,
                });
                }
            } else {
                this.messageDrag = "กรุณาใส่แค่ไฟล์เดียว";
                this.iconDrop = "oneFile";
            }
        },
    }
}
</script>
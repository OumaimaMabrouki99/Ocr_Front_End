<template>
  <div>
    <WidgetsStatsA />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">FileUpload</h4>
                <!-- TODO : add description  HERE -->
                <div class="small text-medium-emphasis">Choisissez votre Bon de commande</div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButton color="primary" class="float-end">
                  <CIcon icon="cil-cloud-download" />
                </CButton>
                <CButtonGroup
                  class="float-end me-3"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <CButton color="secondary" variant="outline">Day</CButton>
                  <CButton color="secondary" variant="outline" active
                    >Month</CButton
                  >
                  <CButton color="secondary" variant="outline">Year</CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
            <CRow>
              <FileUpload name="demo[]" url="./upload.php" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                  <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                    <div class="flex gap-2">
                      <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                      <Button @click="uploadEvent(uploadCallback,files)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                      <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                    </div>
                    <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
                    ><span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span></ProgressBar>
                  </div>
                </template>
                <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                  <div v-if="files.length > 0">
                    <h5>Pending</h5>
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                      <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                          <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2" />
                        </div>
                        <span class="font-semibold">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Pending" severity="warning" />
                        <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
                      </div>
                    </div>
                  </div>

                  <div v-if="uploadedFiles.length > 0">
                    <h5>Completed</h5>
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                      <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                          <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2" />
                        </div>
                        <span class="font-semibold">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Completed" class="mt-3" severity="success" />
                        <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded  severity="danger" />
                      </div>
                    </div>
                  </div>
                </template>
                <template #empty>
                  <div class="flex align-items-center justify-content-center flex-column">
                    <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                    <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                  </div>
                </template>
              </FileUpload>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <Toast ref="toast" position="top-right" />

  </div>
</template>

<script>
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import WidgetsStatsA from './widgets/WidgetsStatsTypeA.vue'
import WidgetsStatsD from './widgets/WidgetsStatsTypeD.vue'
import FileUpload from "primevue/fileupload";
import axios from "axios";
import {useToast} from "primevue/usetoast";
export default {
  name: 'Dashboard',
  components: {
    WidgetsStatsA,
    WidgetsStatsD,
    FileUpload
  },
  data(){
    return {
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
      toast:null
    }
  },
  created() {
    this.toast = useToast();
  },
  methods:{
    onRemoveTemplatingFile(file, removeFileCallback, index) {
      removeFileCallback(index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
    },
    onClearTemplatingUpload(clear) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
    },
    onSelectedFiles(event) {
      this.files = event.files;
      console.log(this.files)

      this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size));
      });
    },
    async uploadEvent(callback,file) {
      console.log("********************")
      console.log(file.length);
      for(let i=0;i<file.length;i++){
       const formData = new FormData();
        formData.append('file', file[i]);
       await  axios.post("http://localhost:5000/upload",formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((response) => {
            console.log(response);
            if(response.status === 200){
              console.log("test")
              this.toast.add({
                severity: "success",
                summary: "Success",
                detail: "Bon de commande ajouté" + i,
                life: 3000,
              });
          }
        }).catch((error) => {
           this.toast.add({
            severity: "error",
            summary: "Error",
            detail: "Erreur lors de l'ajout du bon de commande",
            life: 3000,
           });
            console.error(error);
        });
       if(i === file.length){
         this.toast.add({
           severity: "info",
           summary: "Success",
           detail: "Tous les bons de commandes ajoutés avec succès",
           life: 3000,
         });
       }
      }

      this.totalSizePercent = this.totalSize / 10;
      callback();
    },
    onTemplatedUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    formatSize(bytes) {
      if (bytes === 0) {
        return '0 B';
      }

      let k = 1000,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  },

}
</script>

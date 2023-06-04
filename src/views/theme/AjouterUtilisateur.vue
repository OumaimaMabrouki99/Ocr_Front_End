<style>
.x{
  height:100%;
}
</style>
<template>
  <CRow>
    <CCol>
      <CCard style="height:100%;">
        <CCardHeader>
          <CIcon icon="cil-drop" />
          Chargement de données
        </CCardHeader>
        <CCardBody style="height:100%" >
          <iframe title="Dashboard" width="100%" height="100%"
                  src="https://app.powerbi.com/view?r=eyJrIjoiMDJiOTBjYzUtYmU3MS00MzIzLTgxM2QtMzY4NDIyODI5OWNhIiwidCI6ImEyZDgzMzZlLWEyOTktNGQ1Mi04NjM2LWI3ZWY4YzExN2ExZCIsImMiOjh9"
                  frameborder="0" ></iframe>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
   <Toast ref="toast" position="top-right" />
</template>

<script>
import {useToast} from "primevue/usetoast";
import Card from 'primevue/card';

export default {
  components:Card,
  name: "AjouterUtilisateur",
  data(){
    return{
      fixedToasts: 0,
      toast:null
    };


  },
  created() {
    this.toast = useToast();
  },
  methods: {
    showSuccessToast() {
      this.toast.add({severity:'success', summary: 'Success ', detail:'Utilisateur ajouté ', life: 3000});
    },
    showDangerToast() {
      this.toast.add({severity:'error', summary: 'Erreur', detail:'Utilisateur non ajouté', life: 3000});
    },

  },
};
</script>

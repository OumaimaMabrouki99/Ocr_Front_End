<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Connexion</h1>
                  <p class="text-medium-emphasis">
                    Se connecter à votre compte
                  </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Email" v-model="mail"/>
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Mot de passe"
                      autocomplete="current-password"
                      v-model="pass"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <Button severity="success"  color="success" class="px-4" @click="verifuser" label="Connexion"/>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Mot de passe oublié ?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-green-100 py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <p style="color:grey">Bienvenue dans la plateforme  !</p>
                  <CButton color="dark" disabled="disabled" variant="outline"  class="mt-3">
                    Créer un compte
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
      <Toast ref="toast" position="top-right" />

    </CContainer>
  </div>
</template>

<script>
import { useToast } from "primevue/usetoast";
import axios from "axios";

export default {
  name: 'Login',
  data(){
    return{
      mail:"",
      pass:"",
      logindata:{username:"",password:""},
      toast:null
    }
  },
  created(){
    this.toast = useToast();
  },
  methods:{
    async verifuser(){
      this.logindata.username = this.mail;
      this.logindata.password = this.pass;
       axios.post("http://127.0.0.1:5000/login",this.logindata)
         .then(response=>{
           if(response.data.status === 200){
             this.toast.add({
               severity: "success",
               summary: "Connexion réussie",
               detail: "Vous êtes connecté",
               life: 3000,
             });
             this.$router.push("/dashboard");
           }else{
             this.toast.add({
               severity: "error",
               summary: "Connexion échouée",
               detail: "Vérifiez vos identifiants",
               life: 3000,
             });
           }
         })
    }
  }
}
</script>

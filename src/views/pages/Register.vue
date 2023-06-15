<template style="color:'red'">
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <Toast ref="toast" position="top-right" key="ss"/>

      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>S'inscrire</h1>
                <p class="text-medium-emphasis">Créer votre compte</p>
              
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="aaaa@teamwillgroup.com" autocomplete="email" v-model="email" 
                   @input="validateEmail"  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4" :class="{'has-validation-error': !isPasswordMatch}">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    v-model="confirmpassword"
                    autocomplete="new-password"
                    @input="validatePassword"
                  />
                  <!-- <div v-if="!isPasswordMatch" class="validation-error">Mots de passe non compatibles</div> -->

                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success" @click="signup">Créer compte</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>

</template>

<script>
import { useToast } from 'primevue/usetoast';
import axios from "axios";

export default {
  name: 'Register',
  data(){
   return{
    email:"",
    password:"",
    isEmailValid: true,
    confirmpassword:"",
    // signupdata:{email:"",password:""},
    isPasswordMatch: true,
    toast:null
   } 
  },
  created(){
    this.toast = useToast();
  },
  methods:{
    //  userexist(){
    //   axios.get("http://localhost:5000/getusers").then((response)=>{
    //      var tabusers = response ; 
    //      tabusers.forEach(element => {
    //        if(element["email"] === this.email){
    //         this.toast.add({
    //         key:"ss",
    //         severity:"error",
    //         summary:"Input error",
    //         detail:"Email invalide",
    //         life:100,
    //       });
    //        }
    //      });
         
    //   })
    //  },
      validateEmail() {
        const emailRegex = /^[^\s@]+@teamwillgroup\.co$/;
        this.isEmailValid = emailRegex.test(this.email);
        if(!this.isEmailValid){
          this.toast.add({
            key:"ss",
            severity:"error",
            summary:"Input error",
            detail:"Email invalide",
            life:100,
          });
      }else{
        this.toast.add({
            key:"ss",
            severity:"success",
            summary:"Input SUCCESS",
            detail:"Email valide",
            life:2000,
          });
      }
        
      },
      validatePassword() {
      this.isPasswordMatch = this.password === this.confirmpassword;
      if(!this.isPasswordMatch){
          this.toast.add({
            key:"ss",
            severity:"error",
            summary:"Input error",
            detail:"Mots de passe incompatibles",
            life:100,
          });
      }else{
        this.toast.add({
            key:"ss",
            severity:"success",
            summary:"Input SUCCESS",
            detail:"Mot de passe valide",
            life:2000,
          });
      }
      },
     async signup(){
      if (!this.isPasswordMatch) {
        this.toast.add({
          key: "ss",
          severity: "error",
          summary: "Erreur de saisie",
          detail: "Les mots de passe ne correspondent pas",
          life: 3000,
        });
        return;
      }
      try {
        const userData = {
          email: this.email,
          password: this.password
        };
        const response = await axios.post("http://localhost:5000/signup", userData);
        if (response.data.status === 200) {
          this.toast.add({
            severity: "success",
            summary: "Inscription réussie",
            detail: "Votre compte a été créé avec succès",
            life: 3000,
          });
          this.$router.push("/dashboard");
        } else if (response.data.status === 409) {
          this.toast.add({
            severity: "error",
            summary: "Erreur d'inscription",
            detail: "L'email existe déjà",
            life: 3000,
          });
        } else {
          this.toast.add({
            severity: "error",
            summary: "Erreur d'inscription",
            detail: "Une erreur s'est produite lors de la création du compte",
            life: 3000,
          });
        }
      } catch (error) {
        this.toast.add({
          severity: "error",
          summary: "Erreur du serveur",
          detail: "Une erreur s'est produite lors de la communication avec le serveur",
          life: 3000,
        });
      }

  

      
  }
}
}
</script>

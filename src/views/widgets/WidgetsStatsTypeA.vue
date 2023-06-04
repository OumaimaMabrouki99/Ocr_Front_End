<template>

</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
import { onMounted } from "vue";
export default {
  name: 'WidgetsStatsA',
   data() {
     return {
       users: 0,
       products: 0,
       commandes: 0,
     }
   },
  methods:{


  },
  async mounted() {

  },





  components: {
    CChart,
  },
}
</script>

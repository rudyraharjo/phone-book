<template>
  
  <v-app id="inspire">
    <Navbar v-if="IsLoggin" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
  
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      //
    }
  },
  computed:{
      IsLoggin(){
          return this.$store.getters.IsLoggin
      }
  }
}
</script>

<template>
  <div id="app" >
    <!-- <img src="./assets/logo.png"> -->
    <app-TimerComponent></app-TimerComponent>
    <router-view/>
  </div>
  
</template>



<script>
import setAuthToken from '@/utils/setAuthToken'; 
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import TimerComponent from '@/components/TimerComponent';
import store from './store';


export default {
  name: 'App',
  components: {
    'app-TimerComponent':TimerComponent
  },

  data() {
    return {

    }
  },
  beforeCreate () {
    
  },
  mounted() {
    this.$store.dispatch('isAuthenticate', localStorage.authToken);
  },
  data () {
    return {
      isAuthenticated:false,
      handle:''
    }
  },
  methods: {
    ...mapActions([
      'logoutUser',
    ])
  },
  destroyed () {

  }
}
</script>

<style>
h1, h2, h3, h4 {
  text-align: center;
}


</style>





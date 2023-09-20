<template>
  <div>
    <component v-bind:is = "component"></component>
  </div>
  
</template>



<script>
import setAuthToken from '@/utils/setAuthToken'; 
import jwt_decode from 'jwt-decode';
import { mapActions, mapGetters } from 'vuex';
import Home from '@/components/Home/home';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Profile from '@/components/auth/Profile';
// import Main from '@/components/main/Main';
// import QuesAnsField from '@/components/main/QuesAnsField/QuesAnsField';
// import Notification from '@/components/main/Notification/Notification';

export default {
  name: 'PrivateComponent',
  data() {
    return {
      component:'',
    }
  },
  components: {
    'Login' : Login,
    'Register' : Register,
    'Profile' : Profile,
    // 'Main' : Main,
    // "QuesAnsField" : QuesAnsField,
    // 'Notification' : Notification
  },
  beforeUpdate() {
    console.log('before update');
  },
  updated() {
    console.log("sdfdfd");
  },
  mounted() {
    // console.log(this.components);
    // if(!localStorage.jwtToken) {
    //   console.log(window.location.pathname);
    //   if(window.location.pathname != '/' &&
    //     window.location.pathname != '/Register'
    //   ) { 
    //     this.$router.push('/Login');
    //   }
    // }
    
    if(!localStorage.jwtToken) {
      this.$router.push('/Login');
    }
    const index = this.$router.options.routes.map(item => item.path.toString()).indexOf(window.location.pathname);
    this.component = this.$router.options.routes[index].name;
    console.log(this.component);
  },
  methods: {

  },
  destroyed () {

  },
}
</script>





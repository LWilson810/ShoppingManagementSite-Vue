<template>
  <div class="login-register" v-bind:style = "{'background-color':'white'}">
    <div class="header-top">
      <div class="header-top tab">
        <a href = '/'><img src = "../../common/logo.svg" class = "img-logo" /></a></div>
      <div class="header-top tab"></div>
    </div>
    <div style = "margin:20px">
      <h1 class="title">사용자가입</h1>
    </div>
    <div class="container" style = "padding-top:80px" >
      <div class="col-md-2"></div>
      <div class="form-style">
      <form @submit = "onSubmit" >
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>사용자식별자</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = "handle" v-model = "loginData.handle" class="form-group element-style text-field"  @change = "onChange" /> 
              <p v-if = "errors.handle" class = "form-group element-style error-field">{{errors.handle}}</p>
          </div>
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>암호</label>
          </div>
          <div class="form-group element-style">
              <input type="password" name = "password"  class="form-group element-style text-field"  @change = "onChange" v-model = "loginData.password" /> 
              <p v-if = "errors.password" class = "form-group element-style error-field">{{errors.password}}</p>
          </div>
        </div>
        <div class="form-style form-group">
          <a href = "/Register"><p style = "margin-top:20px;float:right"><i class = "fa fa-user-plus"></i>새로 등록하시려면...</p></a>
          <button type = "submit" class="form-group btn-submit"><i class = "fa fa-sign-in"></i>가입</button>
        </div>
      </form></div>
    </div>
  </div>
</template>

<script>
import img from '@/common/Lighthouse.jpg';
import jwt_decode from 'jwt-decode';
import {notification} from 'ant-design-vue';

import logo from '@/common/logo.svg';
// import './style.less';
import store from '../../store';
import Vuex from 'vuex';

const { mapActions, mapGetters } = Vuex;

export default {
  name: 'Login',
  mounted () {

  },
  data () {
    return {
      handle:'',
      password:'',
      errors:{},
      loginData:{
        handle:"", 
        password:""
      }
    }
  },
  computed: {
    ...mapGetters([
      'getErrors'
    ]),
  },
  methods: {
    ...mapActions([
      'loginUser',
      'clearErrors'
    ]),
    onChange(event) {
      this[event.target.name] = event.target.value;
    },
    onSubmit(event) {
      event.preventDefault();
      // const data = {
      //   handle: this.handle,
      //   password: this.password
      // }
      const data = {
        handle: this.loginData.handle,
        password: this.loginData.password
      }
      // console.log(this.loginData.handle, this.loginData.password);
      console.log(data);
      this.loginUser(data);
    }
  },
  watch: {
    getErrors() {
      this.errors = this.$store.state.errors;
      Object.keys(this.errors).map(id => {
        notification['error']({message:'가입실패', description:this.errors[id], duration:2});
      })
    }
  },
  destroyed () {

  }
  // components: { Menu }
}
</script>
<style scoped>
  h1 {
    color:grey
  }
</style>

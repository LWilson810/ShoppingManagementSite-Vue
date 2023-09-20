<template>
  <div class = 'login-register' style = "background-color:grey">
    <div class = 'header-top'>
      <div class="header-top tab">
        <a href = '/'><img src = "../../common/logo.svg" class = "img-logo" /></a>
      </div>
      <div class="header-top tab"></div>
    </div>
    <div style = 'margin:20px'>
      <h1 class = 'title'>사용자등록</h1>
    </div>
    
    <div class="mainbody">
      <form class = 'form-style'  @submit = "onSubmit">
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 이름</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = "name" v-model = 'newUser.name' class="form-group element-style text-field" /> 
              <p v-show = "errors.name" class = "form-group element-style error-field">{{errors.name}}</p>
          </div>
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 성별</label>
          </div>
          <div class="form-group element-style">
              <select class="form-group element-style text-field" name = 'gender' v-model = "newUser.gender">
                <option value = 'male'>
                  남 
                </option>
                <option value = 'female'>
                  녀 
                </option>   
              </select> 
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 생년월일</label>
          </div>
          <div class="form-group element-style">
              <input type="date" name = 'birthday' class="form-group element-style text-field" v-model = "newUser.birthday"/>
              <p v-show = "errors.birthday" class = "form-group element-style error-field">{{errors.birthday}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 사용자식별자</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'handle' class="form-group element-style text-field" v-model = "newUser.handle"/>
              <p v-show = "errors.handle" class = "form-group element-style error-field">{{errors.handle}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 직장직위</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'work' class="form-group element-style text-field" v-model = "newUser.work"/> 
              <p v-show = "errors.work" class = "form-group element-style error-field">{{errors.work}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 시(공)민증번호</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'citizen_card' class="form-group element-style text-field" v-model = "newUser.citizen_card"/>
              <p v-show = "errors.citizen_card" class = "form-group element-style error-field">{{errors.citizen_card}}</p> 
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 암호</label>
          </div>
          <div class="form-group element-style">
              <input type="password" name = 'password' class="form-group element-style text-field" v-model = "newUser.password"/>
              <p v-show = "errors.password" class = "form-group element-style error-field">{{errors.password}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 암호확인</label>
          </div>
          <div class="form-group element-style">
              <input type="password" name = 'password2' class="form-group element-style text-field" v-model = "newUser.password2"/>
              <p v-show = "errors.password2" class = "form-group element-style error-field">{{errors.password2}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>전화번호</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'phone_number' class="form-group element-style text-field" v-model = "newUser.phone_number"/> 
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>비고</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'others' class="form-group element-style text-field" v-model = "newUser.others"/> 
          </div>  
        </div>
        <div class="form-style form-group">
          <input type="submit" value = "등록" class="form-group btn-submit"/>
        </div>
      </form>
      <div class="noti">
        <h2 class = 'noti-title'><i class = "fa fa-info"></i>알 림</h2>
        <ol class="noti-ol">
          <li>* 항목은 필수항목입니다.</li>
          <li>사용자정보들을 정확히 입력하였는가를 확인하고 등록단추를 누르면 사용자가 등록됩니다.</li>
        </ol>
        <a style = "margin:20px;color:white" @click = "downloadWasan">싸이트가입자인증말단 《와산1.0》</a>
      </div>
    </div>
  </div>
</template>

<script>
import {Config} from '../../config/config';
import jwt_decode from 'jwt-decode';
import { mapActions, mapGetters } from 'vuex';
import {notification} from 'ant-design-vue';
// import './style.less';
// const fs = require('fs');
// const download = require('download');

export default {
  data() {
    return {
      newUser: {
        name: '',
        handle: '',
        birthday: '',
        gender: 'male', //default set
        work: '',
        citizen_card: '',
        password: '',
        password2: '',
        phone_number: '',
        others:'',
      },
      errors: {}
    }
  },

  computed: {
    ...mapGetters([
      'getErrors'
    ]),
  },
  methods: {
    ...mapActions([
      'registerUser',
      'clearErrors'
    ]),
    onSubmit(e) {
    if(window.confirm("다음의 정보로 등록하시겠습니까?")) {
      e.preventDefault();
      const newUser = {
        name: this.newUser.name,
        handle: this.newUser.handle,
        birthday: this.newUser.birthday,
        gender: this.newUser.gender,
        work: this.newUser.work,
        citizen_card: this.newUser.citizen_card,
        password: this.newUser.password,
        password2: this.newUser.password2,
        phone_number: this.newUser.phone_number,
        others:this.newUser.others
      }
      console.log(newUser, this.$router);
      // this.$router.push('/Login');
      this.registerUser({newUser:newUser, route:this.$router});
      }
    },
    downloadWasan() {
      // download(Config.serverUrl + '/api/users/wasan.zip', 'dist').then(() => {
      //   console.log('done');
      // })
      var app = document.createElement('a');
      app.href = Config.serverUrl+'/api/users/wasan/download/';
      var event = document.createEvent("Event");
      event.initEvent("click", true, true);
      app.click();
    }
  },

  watch: {
    getErrors() {
      this.errors = this.$store.state.errors;
      Object.keys(this.errors).map(id => {
        notification['error']({message:'등록실패', description:this.errors[id], duration:2});
      })
    }
  },

  mounted() {
    if(localStorage.jwtToken) {
      if(jwt_decode(localStorage.jwtToken).locked) {
        window.location.href = '/LockScreen'
      } else {
      this.clearErrors();
      }
    }  
  },
  updated() {
    console.log(this.$store, 'ssss');
    if(this.$store.state.errors) {
      this.errors = this.$store.state.errors;
    }
  }
  
  // render() {

  //   const {errors} = this.props;
  // }
}

</script>
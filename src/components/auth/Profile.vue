<template>
  <div class = 'login-register' style = "background-color:grey">
    <div class="header-top">
      <div class="header-top tab">
        <a href = '/'><img src = "../../common/logo.svg" class = "img-logo" /></a>
      </div>
      <div class="header-top tab">
      </div>
    </div>
    <div style = 'margin:20px'>
      <h1 class="title">사용자정보</h1>
    </div>
    <div class="mainbody">
      <form @submit = "onSubmit" class="form-style">
      <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 이름</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = "name" v-bind:value = "name" class="form-group element-style text-field" disabled/> 
          </div>
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>성별</label>
          </div>
          <div class="form-group element-style">
              <select class="form-group element-style text-field" name = 'gender' v-bind:value = "gender" @change = 'onChange'>
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
            <label>생년월일</label>
          </div>
          <div class="form-group element-style">
              <input type="date" name = 'birthday' class="form-group element-style text-field" v-bind:value = "birthday" @change = 'onChange'/>
              <p v-if = "errors.birthday" class = "form-group element-style error-field">{{errors.birthday}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 사용자식별자</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'handle' class="form-group element-style text-field" v-bind:value = "handle" disabled/>
              <p v-if = "errors.handle" class = "form-group element-style error-field">{{errors.handle}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>직장직위</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'work' class="form-group element-style text-field" v-bind:value = "work" @change = 'onChange'/> 
              <p v-if = "errors.work" class = "form-group element-style error-field">{{errors.work}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>* 시(공)민증번호</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'citizen_card' class="form-group element-style text-field" v-bind:value = "citizen_card" disabled/>
              <p v-if = "errors.citizen_card" class = "form-group element-style error-field">{{errors.citizen_card}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>암호</label>
          </div>
          <div class="form-group element-style">
              <input type="password" name = 'password' class="form-group element-style text-field" @change = 'onChange'/>
              <p v-if = "errors.password" class = "form-group element-style error-field">{{errors.password}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>전화번호</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'phone_number' class="form-group element-style text-field" v-bind:value = "phone_number" @change = 'onChange'/> 
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>비고</label>
          </div>
          <div class="form-group element-style">
              <input type="text" name = 'others' class="form-group element-style text-field" v-bind:value = "others" @change = 'onChange'/> 
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>암호변경</label>
          </div>
          <div class="form-group element-style">
              <input type="checkbox" id = "newPassword" name = 'newPassword' @click = "onChangePassword"/> 
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>새 암호</label>
          </div>
          <div class="form-group element-style">
              <input type="password" name = 'newpassword' class="form-group element-style text-field" v-bind:value = "newpassword" @change = 'onChange' v-bind:disabled = "isRadioChecked ? (false):(true)"/>
              <p v-if = 'errors.newpassword' class = "form-group element-style error-field">{{errors.newpassword}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <div class="form-group label-style">
            <label>암호 확인</label>
          </div>
          <div class="form-group element-style">
            <input type="password" name = 'newpassword2' class="form-group element-style text-field" v-bind:value = "newpassword2" @change = 'onChange' v-bind:disabled = "isRadioChecked ? (false):(true)"/>
            <p v-if = "errors.newpassword2" class = "form-group element-style error-field">{{errors.newpassword2}}</p>
          </div>  
        </div>
        <div class="form-style form-group">
          <input type="submit" value = "수 정" class="form-group btn-submit"/>
        </div>
      </form>
      <div class="noti">
        <h2 class = 'noti-title'><i class = "fa fa-info"></i>알 림</h2>
        <ol class="noti-ol">
          <li>* 항목은 수정할수 없습니다. 
            <br/>수정을 하시려면 관리자와 련계하여 주십시오.</li>
          <li>사용자정보들을 정확히 수정하였는가를 확인하고 수정단추를 누르면 사용자정보가 재등록됩니다.</li>
          <li>보안과 관련하여 수정단추를 누르기 전에 반드시 암호를 입력하여야 합니다.</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import $ from 'jquery';
import isEmpty from '../../validation/is-empty';
import { mapActions, mapGetters } from 'vuex';

export default {
  name:'Profile',
  data() {
    return {
      name: '',
      handle: '',
      birthday: '',
      gender: '', //default set
      work: '',
      citizen_card: '',
      password: '',
      newpassword: '',
      newpassword2: '',
      phone_number: '',
      others:'',
      isRadioChecked:false,
      errors: {}
    }
  },
  mounted () {
    // if(!this.props.auth.isAuthenticated) {
    //   this.props.history.push('/Login');
    // }
    //window.confirm('are');
    this.clearErrors();
    const decoded = jwt_decode(localStorage.jwtToken);
    this.getUserProfile(decoded.handle);
    console.log(decoded);
  },
  computed : {
    ...mapGetters([
      'getProfile',
      'getErrors'
    ])
  },
  watch : {
    getProfile() {
      const {profile} = this.$store.state;
      profile.phone_number = isEmpty(profile.phone_number) ? "" : profile.phone_number;
      profile.others = isEmpty(profile.others) ? "" : profile.others; 
      this.name = profile.name;
      this.handle = profile.handle;
      this.gender = profile.gender;
      this.birthday = profile.birthday;
      this.work = profile.work;
      this.citizen_card = profile.citizen_card;
      this.phone_number = profile.phone_number;
      this.others = profile.others;
      this.password = '';
      this.newpassword = '';
      this.newpassword2 = '';
    },
    getErrors() {
      this.errors = this.$store.state.errors;
    }
  },
  methods : {
    ...mapActions([
      'getUserProfile',
      'editUserProfile',
      'clearErrors'
    ]), 
    onSubmit(e) {
      e.preventDefault();
      if(window.confirm('이상의 내용으로 수정하시겠습니까?')) {
        const editUser = {
          name: this.name,
          handle: this.handle,
          citizen_card: this.citizen_card,
          gender: this.gender,
          birthday: this.birthday,
          work: this.work,
          phone_number: this.phone_number,
          others: this.others,
          password: this.password,
          newpassword: this.newpassword,
          newpassword2: this.newpassword2
        }
        console.log(editUser);
        this.editUserProfile({editUser:editUser, handle:this.handle});
      } 
    },
    onChange(e) {
      e.preventDefault();
      this[e.target.name] = e.target.value;
    },

    onChangePassword() {
      this.isRadioChecked = !this.isRadioChecked
      $('#newPassword').attr('checked', true);
      // if(this.state.isRadioChecked) {
      //   document.getElementById("newPassword").checked = true
      // } else {
      //   document.getElementById("newPassword").checked = false
      // }
    }
  },
}

</script>
<template>
  <div class="LockScreenMainBody">
    <div class="page-lock">
      <div class="page-logo">
      </div>
      <div class="page-body" id = "lockbody">
        <div class="lock-head"> 화면잠금 </div>
        <div class="lock-body">
          <div class="pull-left lock-avatar-block">
            <img src = "../common/logo.svg" alt="logo" class = "lock-avatar"/> 
          </div>
          <form class="lock-form pull-left" action="index.html" method="post" @submit = "onClickSubmitBtn">
            <h4>{{handle}}</h4>
            <div class="form-group">
              <input class="form-control placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" name="password" id = "pwd"/> 
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary" @click = "onClickSubmitBtn"><i class = "fa fa-unlock"></i></button>
            </div>
          </form>
        </div>
        <div class="lock-bottom">
            <a @click = "onClickLogout">가입탈퇴<i class = "fa fa-sign-out"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {setCurrentUser} from '../actions/authActions';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export default {

  data() {
    return {
      handle: ''
    }
  },
  mounted() {
    if(!localStorage.jwtToken) {
      window.location.href = '/';
    }
    const decoded = jwt_decode(localStorage.jwtToken);
    this.handle = decoded.handle;
    if(!decoded.locked) {
      console.log(decoded);
      // const decoded = jwt_decode(localStorage.jwtToken);
      const payload = {
        handle: decoded.handle,
        id: decoded.id,
        password: decoded.password,
        name: decoded.name,
        isTodayEventChecked: decoded.isTodayEventChecked,
        isNotificationChecked: decoded.isNotificationChecked,
        currentNotificationCheck: decoded.currentNotificationCheck,
        notificationCheck: decoded.notificationCheck,
        locked: true,
      }
      jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
        localStorage.setItem('jwtToken', "Bearer " + token);
        setAuthToken(token);
      })    
    }
  },

  methods: {
    onClickLogout(e) {
      e.preventDefault();
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
      setCurrentUser({});
      window.location.href = '/Login';
      // this.props.history.push('/');
    },

    onClickSubmitBtn(e) {
      e.preventDefault();
      $("#lockbody").removeClass('headShake');
      $("#lockbody").removeClass('animated');
      var decoded = jwt_decode(localStorage.jwtToken);
      console.log(jwt_decode(localStorage.jwtToken));
      bcrypt.compare($("#pwd").val(), decoded.password)
      .then(isMatch => {
        if(isMatch) {
          const payload = {
            handle: decoded.handle,
            id: decoded.id,
            password: decoded.password,
            name: decoded.name,
            isTodayEventChecked: decoded.isTodayEventChecked,
            isNotificationChecked: decoded.isNotificationChecked,
            currentNotificationCheck: decoded.currentNotificationCheck,
            notificationCheck: decoded.notificationCheck,
            locked: false,
          }
          jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
            localStorage.setItem('jwtToken', "Bearer " + token);
            setAuthToken(token);
          });
          window.location.href = decoded.prelocation?decoded.prelocation:'/';
          // if(decoded.prelocation != undefined) {
          //   window.location.href = decoded.prelocation;
          // } else {
          //   window.location.href = '/';
          // }
        } else {
          $("#lockbody").addClass('headShake');
          $("#lockbody").addClass('animated');
        }
      })
    }
  }
}

</script>
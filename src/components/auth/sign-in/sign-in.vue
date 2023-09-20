<template>
    <div class='auth-main-body'>
        <div>
            <h1 class = "title">Department Store Management</h1>
        </div>
        <div class="mainContainer">
            <div class="loginContainer">
                <el-form ref="loginForm" :model='loginForm' :rules="rules" v-on:submit.prevent='signIn'>               
                    <div class="form-group">
                        <label for="userID">{{ 'UserID' | uppercase}}</label> 
                        <div class="auth-form-style">
                            <div class="r-field">
                                <input class = "authInput" placeholder="UserID."  v-model='loginForm.userID' id="userID" name="userID"  type='text' />
                            </div>
                            <div class='l-field'>
                                <span class = "icon"><i class = "fa fa-user"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">{{ 'Password' | uppercase }}</label> 
                        <div class="auth-form-style">
                            <div class="r-field">
                                <input class = "authInput" placeholder="Password." v-model='loginForm.password' id="password" name="password"  type="password" />
                            </div>
                            <div class='l-field' v-showPassword>
                                <span class = "icon" ><i class = "fa fa-eye"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <!-- <div class="">
                            <div class='checkbox'>
                                <span><i class='fa fa-check'></i></span>
                            </div>
                            <span class = "keepInfo pull-right">Keep my user info.</span>
                        </div> -->
                        <div class="tp-field">
                            <section class = "tp-section">
                                <el-checkbox><span class='keepInfo'>Remember me.</span></el-checkbox>
                            </section>
                        </div>
                        <div class = "submit-buttons to-right">
                            <el-button @click.native.prevent='signIn'><span><i class = "fa fa-shopping-cart"></i>&nbsp;Login</span></el-button>
                        </div>
                    </div>
                    <div>
                        <span class='is-account'>Don't have an account? &nbsp;<router-link to="/sign-up" class="link"><span>Sign up</span></router-link></span>
                    </div>
                </el-form>
            </div>
        </div>
    </div>      
</template>

<script>
const defaultForm = {
  userID:'',
  password:''
}

import '../style.less'
import * as authService from '../authService'
import * as NotificationService from '@/service/notification'
import { showPassword } from '@/directives';
export default {
    name: 'SignIn',
    mounted() {
        
    },

    directives: {
        showPassword
    },
    data() {
        const validateRequire = (rule, value, callback) => {
            if (value === '') {
                NotificationService.notification('UserID must be required.', 'error');
                return false;
                callback(new Error(rule.field + ' must be required.'));
            } else {
                return true;
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                NotificationService.notification('The password can not be less than 6 digits', 'error');
                return false;
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                return true;
                callback()
            }
        }
        return {
            loginForm: Object.assign({}, defaultForm),
            // loginForm: {
            //     userID:'',
            //     password:''
            // },
            rules: {
                userID: [{ trigger:'blur', validator: validateRequire }],
                password: [{ trigger:'blur', validator: validatePassword }],
            },
        }
    },

    // filters: {
    //     toUppercase(value){
    //         return value.toUpperCase();
    //     }
    // },
    methods: {
      signIn: function() {
        //   authService.signIn(this.loginForm);
        // console.log(this.$refs.loginForm);
        // this.$http.post('http://localhost:5005/api/users/signin', this.loginForm);
        this.$refs.loginForm.validate(valid => {
            if (valid) {
                authService.signIn(this.loginForm, this.$router, this.$store );
                // console.log(this.$store.state);
            } else {
                console.log('error submit!!')
                return false
            }
        })
    },
  },
}
</script>

<style lang='less'>
    // .container-fluid {
  
    //     height: 100%;
    //     width: 100%;
    //     position: fixed;
    //     top:0;
    //     left:0;
    //     padding:0;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    // }
</style>
<template>
    <div class="modal-div" id="myModal" role="dialog" >
        <div class="modal-header">
            <div class='row'>
                <h4 class="title">Add new staff</h4>
            </div>
            
        </div>
        <div class="modal-body container-fluid">
            <el-form :model='formgroup' ref="formgroup">
                <div class="row line">
                    <div class="m-label">
                        <label for='first_name'>First Name*&nbsp;</label>
                    </div>
                    <el-input  
                        placeholder="First Name" 
                        id='first_name' 
                        v-model='formgroup.first_name'
                        @keyup.native='checkValidation'
                        />  
                    <div class="m-label" v-if='!(notSubmit || validation.first_name)'>
                        <small >Required</small>
                    </div>
                </div>
                <!-- <div class="row line">
                    <label for='second_name' class='col-md-3 col-sm-3'>Second Name*&nbsp;</label>
                    <input [ngClass] = "{'warning': formgroup.controls.second_name.errors?.required}" id='second_name' class='col-md-6 col-sm-6 only-border-bottom' formControlName='second_name' value='formgroup.controls.second_name.value'>  
                    <small *ngIf='formgroup.controls.second_name.errors?.required'>Required</small>
                </div> -->
                <div class="row line">
                    <div class='m-label'>
                        <label for='second_name'>Second Name*&nbsp;</label>
                    </div>
                    <el-input  
                        placeholder = "Second Name" 
                        id='second_name' 
                        v-model='formgroup.second_name' 
                        @keyup.native='checkValidation'
                    />    
                    <div class="m-label"  v-if='!(notSubmit || validation.second_name)'>                    
                        <small>Required</small>
                    </div>
                </div>
                <div class="row line">
                    <div class="m-label">
                        <label for='gender'>Gender&nbsp;</label>
                    </div>
                    <el-radio-group class = "tp-radio-group" v-model='formgroup.gender' >
                        <el-radio class = "tp-radio-button"
                            label = "male">
                            Male
                        </el-radio>
                        <el-radio class = "tp-radio-button"
                            label = "female">
                            Female
                        </el-radio>
                    </el-radio-group>  
                </div>
                <div class="row line">
                    <div class="m-label">
                        <label for='email'>Email*&nbsp;</label>
                    </div>
                    <el-input 
                        type='email'
                        placeholder="Email"
                        id='email' 
                        v-model='formgroup.email' 
                        @keyup.native='checkEmailValidation'
                        />  
                    <div class="m-label" v-if='!(notSubmit || validation.email)'>
                        <small >Required</small>
                    </div>
                    <div class="m-label" v-if='!(notSubmit || validation.emailValidation || !validation.email)'>
                        <small >Invalid</small>
                    </div>
                </div>
                <div class="row line">
                    <div class="m-label">
                        <label for='authority'>Authority&nbsp;</label>
                    </div>
                    <select :class = "{'warning': !(notSubmit || validation.authority)}" class = "m-input only-border-bottom" id="authority" name="authority" 
                        v-model='formgroup.authority' @change='checkValidation'>
                        <option v-for="authority in authorities" :value='authority.value'>{{authority.display}}</option>
                    </select>
                    
                    <div class="m-label" v-if='!(notSubmit || validation.authority)'>
                        <small >Required</small>
                    </div>
                </div>
                <div class="row line" v-if='this.formgroup.authority'>
                    <div class="m-label">
                        <label for='field'>Field&nbsp;</label>
                    </div>
                    <select  id="field" name="field" v-model='formgroup.field'  class = "m-input only-border-bottom" @change='onChangeField'>
                        <option v-for="item in fields_shops" :value='item.field'>{{item.field|autoDeslash}}</option>
                    </select>
                </div>
                <div class="row line" v-if='formgroup.authority =="shopkeeper" || formgroup.authority =="staff"'>
                    <div class="m-label">
                        <label for='shop'>Shop&nbsp;</label>
                    </div>
                    <select  id="shop" name="shop" v-model='formgroup.shop'  class = "m-input only-border-bottom" >
                        <option v-for="item in shops" :value='item.shop'>{{item.shop|autoDeslash}}</option>
                        <!-- <option value='shopkeeper'>Shopkeeper</option>
                        <option value='staff'>Staff</option> -->
                    </select>
                </div>
                <div class="row line">
                    <div class="m-label">
                        <label for='birthday'>Birthday*&nbsp;</label>
                    </div>
                        <el-input 
                            type='date' 
                            placeholder="Birthday"
                            id='birthday'  
                            v-model='formgroup.birthday' 
                            @change='checkBirthdayValidation'
                            />
                    <!--<DatePicker format='YYYY-MM-DD' v-model='formgroup.birthday' @change='checkValidation'/>-->
                    <div class="m-label" v-if='!(notSubmit || validation.birthday)'>
                        <small >Required</small>
                    </div>
                </div>
                <div class="row line">
                    <div class="m-label">
                        <label for='phone'>Phone&nbsp;</label>
                    </div>
                    <el-input  
                        placeholder="Phone"
                        id='phone' 
                        v-model='formgroup.phone'
                        />  
                </div>
            </el-form>
        </div>
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-default" (click)='closeModal()'>Close</button> -->
            <el-button
                @click='addNewStaff' 
                class="dnm-btn dnm-btn-cancel text-uppercase button-submit" type="button">
                    <i class="fa fa-send"></i> Add
            </el-button>
            <el-button 
                @click="closeModal"
                class="dnm-btn dnm-btn-cancel text-uppercase button-close" style=" border: none;" type="button">
                <i class="fa fa-close"></i> Close
            </el-button>
        </div>
    </div>
</div>

</template>
<script>
import { authorities } from '../../mixins/index';
import { autoDeslash } from '@/directives';
import * as StaffManageActionService from '../staffManageService';
import './style.less'
import { Input, DatePicker } from 'ant-design-vue'
export default {
    name:'add-staff',
    components: {
        'Input': Input,
        'DatePicker': DatePicker
    },
    mixins:[authorities],
    props: {
        fieldsShops: {
            type: Array,
            required: true,
        }
    },

    directives: {
        autoDeslash
    },

    watch: {
        fieldsShops: {
            deep: true,
            handler(val) {
                const array = new Array(...val);
                this.fields_shops = this.$store.state.userInfo.field != '' ? array.filter(item => item.field == this.$store.state.userInfo.field):array;
            }
        }
    },
    data() {
        const validateRequire = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(rule.field + ' must be required.'));
            } else {
                callback()
            }
        }
        return {
            fields_shops:[],
            shops:[],
            notSubmit: true,
            emailPattern : '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
            formgroup: Object.assign({}, {
                first_name: '',
                second_name: '',
                gender: 'male',
                email: '',
                authority: '',
                birthday: '',
                phone: '',
                field: '',
                shop: ''
            }),
            validation: {
                first_name: false,
                second_name: false,
                authority: false,
                email: false,
                emailValidation: false,
                birthday: false,
            }
        }
    },  
    mounted() {

    },
    methods: {
        addNewStaff() {
            this.notSubmit = false;
            var valid = true;
            Object.keys(this.validation).map(key => {
                if(!this.validation[key]) {
                    valid = false;
                }
            })
            if(valid) {
                this.notSubmit = true;
                Object.keys(this.validation).map(key => {
                    this.validation[key] = false;
                })
                StaffManageActionService.addStaff(this.formgroup);
                // console.log(this.formgroup)   
            }
        },

        checkValidation($e) {
            this.validation[$e.target.id] = this.formgroup[$e.target.id] ? true : false;
        },

        checkEmailValidation($e) {
            this.validation.email = this.formgroup.email ? true : false;
            this.validation.emailValidation = this.formgroup.email.match(this.emailPattern) != null ? true: false;
        },

        checkBirthdayValidation($e) {
            this.validation.birthday = this.formgroup.birthday ? true : false;
        },

        onChangeField() {
            var array = this.fields_shops.filter(item => item.field == this.formgroup.field)[0].shopList;
            this.shops = this.$store.state.userInfo.shop != '' ? array.filter(item => item.shop == this.$store.state.userInfo.shop) : array;
        },

        closeModal() {
            this.notSubmit = true;
            Object.keys(this.validation).map(key => {
                this.validation[key] = false;
            })
            this.$emit('closeModal');
        }
    },
    updated(){

    }
}
</script>

<style lang='less' scoped>
.title {
    text-align: center;
}

.button-submit {
    background:#80cbd6; 
    border: none; 
    color: white;
}

.button-close {
    background:lightgrey
}

.only-border-bottom {
    border: 0px;
    border-bottom: 1px solid !important;
}

.row {
    display: flex;
}

.m-label {
    width:25%;
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.m-input {
    width: 50%;
}

.line {
    margin-top: 15px !important;
}

textarea {
    min-height: 25vh;
}

a {
    color: #006688;
}

a:hover {
    color: grey;
    text-decoration: none;
    cursor: pointer;
}

.tp-radio-group {
    display: inline-flex;
    flex-direction: row;
 }
 .tp-radio-button {
    margin: 5px;
 }
 .tp-selected-value {
    margin: 15px 0;
 }

small {
    color: red;
    margin-left:5px;
}

.warning {
    border-bottom-color: red !important;
}

.tp-full-width {
    width: 100%;
 }

.el-input {
    width:50%;
}

 @media only screen and (max-width: 450px) {
    .m-label {
        width: 100%;
        justify-content: center;
    }

    .m-input {
        width: 100%;
    }

    .row {
        display: block;
    }
}
</style>
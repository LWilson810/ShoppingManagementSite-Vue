<template>
    <div class='main-body'>
        <navbar></navbar>
        <h1>Staff Management</h1>
        <div class="show-menu">
            <a @click='addStaff' class="shadow-top-down">+</a>
            <!-- <a data-toggle='modal' data-target='#myModal' class="shadow-top-down">+</a> -->
        </div>
        <div class='staff-sort'>
            <staff-sort :fields-shops = 'fields_shops' @changeField="changeField" @changeStaffType='changeStaffType' @changeShop='changeShop'></staff-sort>
        </div>
        <!--<pagination1 (PageSizeChange)="pageSizeChange($event)" (onPageChange)="setPage($event)" class="pagination" [page]="page" [total]="staff_list_shown.length">
        </pagination1>
        <staff-list [staff_list]='staff_shown' 
        ></staff-list>-->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="setPage" />
        <div class='staff-list'>
            <staff-list :staff-list='staff_shown'></staff-list>
        </div>
        <div class='modal-background' :class="{'hidden': !isAddNew}">
            <add-staff :fields-shops = 'fields_shops' @closeModal='closeModal'></add-staff>
        </div>
    </div>
</template>

<script>
import navbar from '../../shared/navbar';
import pagination from '../../shared/pagination' // Secondary package based on el-pagination
import staffSort from '../staff-sort/staff-sort';
import staffList from '../staff-list/staff-list';
import addStaff from '../add-staff/add-staff';
import * as StaffManageActionService from '../staffManageService';
import * as CommodityManageActionService from '@/components/commodity-manage/commodityManageService';
import './style.less';
import axios from 'axios';
import request from '@/utils/request' 

export default {
    name: 'staff-manage',
    components: {
        'navbar': navbar,
        'staff-sort': staffSort,
        'staff-list': staffList,
        'pagination': pagination,
        'add-staff': addStaff,
    },

    mounted() {
        StaffManageActionService.getStaff(this.myFieldInfo).then(response => {
            this.staff_list = this.staff_list.concat(response);
            this.staff_list_shown = this.staff_list;
            this.staff_shown = this.staff_list.slice(0, this.listQuery.limit);
            this.total = this.staff_list.length;
        });
        CommodityManageActionService.getFields().then(response => {
            this.fields_shops = response;
        })
    },

    data() {
        return {
            isAddNew: false,
            staff_list : [],
            staff_list_shown: [],
            staff_shown: [],
            fields_shops: [],
            page: 0,
            total: 0,
            listQuery: {
                page: 1,
                limit: 10
            },
            myFieldInfo : {
                myAuthority : this.$store.state.userInfo.authority,
                myField : this.$store.state.userInfo.field,
                myShop : this.$store.state.userInfo.shop,
            },
            field: 'all',
            shop: 'all',
            authority: 'all'
        }
    },
    methods: {
        addStaff() {
            this.isAddNew = true;
        },

        closeModal() {
            this.isAddNew = false;
        },

        changeStaffType(value) {
            this.authority = value;
            this.staff_list_shown = this.authority == 'all' ? this.filterStaffList('all', this.field, this.shop) : this.filterStaffList(value, this.field, this.shop);
            this.total = this.staff_list_shown.length;
            this.setPage({page: 1, limit: this.listQuery.limit});
        },

        changeField(value) {
            this.field = value;
            this.staff_list_shown = this.field == 'all' ? this.filterStaffList(this.authority, 'all' , this.shop) : this.filterStaffList(this.authority, value, this.shop);
            this.total = this.staff_list_shown.length;
            this.setPage({page: 1, limit: this.listQuery.limit});
        },

        changeShop(value) {
            this.shop = value;
            this.staff_list_shown = this.shop == 'all' ?this.filterStaffList(this.authority, this.field, 'all'): this.filterStaffList(this.authority, this.field, value);
            this.total = this.staff_list_shown.length;
            this.setPage({page: 1, limit: this.listQuery.limit});
        },

        filterStaffList(authority, field, shop){
            
            var array = [];
            array = authority == 'all' ? this.staff_list  : this.staff_list.filter(mem => mem.authority == authority);
            array = field == 'all' ? array: array.filter(mem => mem.field == field);
            array = shop == 'all' ? array: array.filter(mem => mem.shop == shop);
            return array;
        },
        setPage(value) {
            this.listQuery.page = value.page;
            this.listQuery.limit = value.limit;
            this.staff_shown = this.staff_list_shown.slice(this.listQuery.limit*(value.page-1),this.listQuery.limit*(value.page))
        }
    },  
    
}
</script>

<style lang='less' scoped>
    .main-body {
        background: url('../../../assets/images/pattern_bg.png');
        min-height: 800px;
        width: 100%;
        // position: fixed;
        // top:0;
        // left:0;
        padding:0;
    }

    .main-body h1 {
        margin-top: 10px;
        padding:70px 10px 20px 10px;
        font-size: 50px;
        text-align: center;
        color: white;
    }
</style>
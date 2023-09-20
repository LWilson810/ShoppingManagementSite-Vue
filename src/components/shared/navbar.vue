<template>
    <div class="col-md-12 mynavbar" id="mynavbar">
        <div class = "col-md-3 pull-left">
            <router-link to = "/dashboard"><img src='../../assets/images/exceptionless.png'></router-link>
        </div>
        <ul class="nav nav-pills pull-right">
            <li id = "3" ><router-link to = "/main/notification"><i class = "fa fa-bell-o"></i>Notifications</router-link></li>
            <li id = "5" ><a @click='signOut'><i class = "fa fa-sign-out"></i>Sign Out</a></li>
        </ul>
    </div>
</template>

<script>
import * as authService from '@/components/auth/authService'
export default {
    name: 'navbar',
    data() {
        return {
            
        }
    },
    methods: {
        signOut: function() {
            const data = { userID: authService.getUserID() };
            if( data.userID != null ) {
                authService.signOut( data, this.$router, this.$store );
            } else {
                this.$router.push('/');
            }
        },
    },
}
</script>

<style lang='less'>
@import '../../styles.less';
    .mynavbar {
        background-color: #000000;
        padding: 10px;
        position: fixed;
        top:0;
        z-index:999;
        width: 100%;
    }
    

    img {
        height:40px;
        width: auto;
    }
    .nav>li>a {
        padding: 10px 15px !important;
    }
</style>
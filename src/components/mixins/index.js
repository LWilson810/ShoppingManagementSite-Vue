import store from '@/store/index'

export const authorities = {
    computed: {
        authorities: function() {
            const authorities = [{
                value:'vice_president',
                display: 'Vice President'
            },{
                value:'shopkeeper',
                display: 'Shopkeeper'
            },{
                value:'staff',
                display: 'Staff'
            }]
            let res = [];
            const myAuthority = store.state.userInfo.authority;
            // console.log(myAuthority);
            if(myAuthority == 'president') {
                res = authorities;
            } else if( myAuthority == 'vice_president') {
                res = authorities.filter(item => item.value != 'vice_president');
                // return res;
            } else if( myAuthority == 'shopkeeper') {
                res = authorities.filter(item => item.value == 'staff');
            }
            console.log(res);
            return res;
        }
    },
}
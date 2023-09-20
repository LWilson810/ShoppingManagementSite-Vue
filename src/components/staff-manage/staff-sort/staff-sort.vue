<template>
    <div class='container'>
        <form>
            <div class='row'>
                <div class='col-md-4 col-sm-4'>
                    <span>Staff Type&nbsp;</span>
                    <select @change='onChangeStaffType'>
                        <option value='all' selected>All</option>
                        <option v-for="authority in authorities" :value='authority.value'>{{authority.display}}</option>
                        <!-- <option value='vice_president'>Vice President</option>
                        <option value='shopkeeper'>Shopkeeper</option>
                        <option value='staff'>Staff</option> -->
                    </select>
                </div>
                <div class='col-md-4 col-sm-4' >
                    <span>Field&nbsp;</span>
                    <select @change='onChangeField'>
                        <option value='all' selected>All</option>
                        <!-- <option value='industry'>Industry</option>
                        <option value='light_industry'>Light Industry</option>
                        <option value='food'>Food</option>
                        <option value='sport'>Sport</option> -->
                        <option v-for="item in fieldsShops" :value='item.field'>{{item.field | uppercase}}</option>
                    </select>
                </div>
                <div class='col-md-4 col-sm-4' >
                    <span>Shop&nbsp;</span>
                    <select @change='onChangeShop'>
                        <option value='all' selected>All</option>
                        <option v-for="item in shops" :value='item.shop'>{{item.shop | uppercase}}</option>
                        <!-- <option value='electricity_product'>Electricity Product</option>
                        <option value='electronic_product'>Electronic Product</option> -->
                        <!-- <option value='food'>Food</option>
                        <option value='sport'>Sport</option> -->
                    </select>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { autoDeslash } from '@/directives'
import { authorities } from '../../mixins/index';
import { uppercase } from '@/filters';


export default {
    name: 'staff-sort',
    mounted() {

    },

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

            }
        }
    },

    data() {
        return {
            SortForm : {
                authority: '',
                field: '',
                shop: ''
            },
            field: '',
            shops: [],
            isFieldShown: false,
            isShopShown: false,
        }
    },
    methods: {
        onChangeStaffType($e) {
            if($e.target.value === 'all') {
                this.isFieldShown = false;
                this.isShopShown = false;
            } else if ($e.target.value === 'vice_president') {
                this.isFieldShown = true;
                this.isShopShown = false;
            } else {
                this.isFieldShown = true;
                this.isShopShown = true;
            }
            this.$emit('changeStaffType', $e.target.value);
        },
        onChangeField($e) {
            this.field = $e.target.value;
            this.$emit('changeField', $e.target.value);
            this.shops = this.field == 'all'? [] : this.fieldsShops.filter(item => item.field == $e.target.value)[0].shopList;
            this.field == 'all' && this.$emit('changeShop', 'all');
        },
        onChangeShop($e) {
            this.shop = $e.target.value;
            this.$emit('changeShop', $e.target.value);
        }
    },
    mixins: [authorities]
}
</script>
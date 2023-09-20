<template>
    <div class='container'>
        <div class = "col-md-12">
            <table id = "table_news" class="table table-striped table-hover dataTable no-footer" role="grid" style='margin: "10px";width: "100%"' aria-describedby = "table_news_info">
                <thead>
                    <tr role="row">
                        <th class="col-md-2 sorting th-style"  aria-sort = "ascending">Name</th>
                        <th class=" col-md-2 sorting th-style left-border">User ID</th>
                        <th class=" col-md-2 sorting th-style left-border">Authority</th>
                        <th class=" col-md-3 sorting th-style left-border">Field</th>
                        <th class=" col-md-3 sorting th-style left-border">Shop</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "member in staffList"   role = "row">
                        <td class='col-md-2 none-left-border'>{{member.name}}</td>
                        <td class='col-md-2'>{{member.userID}}</td>
                        <td class='col-md-2'><span class='clickHighlight' :id = "member._id + '_authority'" v-clickHighlight>{{member.authority | autoDeslash}}</span></td>
                        <td class='col-md-3'><span class='clickHighlight' :id = "member._id + '_field'" v-clickHighlight>{{member.field | autoDeslash}}</span></td>
                        <td class='col-md-3 none-right-border'><span class='clickHighlight' :id = "member._id + '_shop'" v-clickHighlight>{{member.shop | autoDeslash}}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import { clickHighlight } from '@/directives'
import { autoDeslash } from '@/filters'

export default {
    name: 'staff-list',
    data() {
        return {
            staff_list: []
        }
    },

    directives: {
        clickHighlight
    },

    mounted() {

    },
    props: {
        staffList: {
            type: Array,
            required: true
        }
    },
    watch: {
        staffList: {
            deep: true,
            handler(val) {

            }
        }
    },
}
</script>

<style lang='less' scoped>
table {
    border-radius: 10px;
    border-color: black;
    color: black;
    background-color: #ffffff;
}

thead {
    border-color: black;
    // border: 1px solid;
}

.th-style {
    text-align:center;
    border-bottom: 1px solid;
    border-bottom-color: black;
}

td {
    border: 1px solid;
    text-align:center;
    color: black;
}

.none-left-border {
    border-left: 0px;
}

.upper {
    text-transform: uppercase;
}

.none-right-border {
    border-right: 0px;
}

.left-border {
    border-left: 1px solid;
}

span {
    color: black;
}
</style>
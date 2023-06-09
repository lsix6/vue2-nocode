<template>
    <el-table style="width: 100%" v-bind="table_props" :data="finalListData" @sort-change="onSortChange">
        <template v-for="(field, index) in fields">
            <el-table-column v-if="field.column_components" :key="'_if' + index" v-bind="field.column_props">
                <template slot-scope="scope">
                    <nc_component v-for="(com, comIndex) in field.column_components" :key="comIndex"
                        :com_data="{ ...com_data, ...scope.row }" v-bind="com"></nc_component>
                </template>
            </el-table-column>
            <el-table-column v-else :key="'_else' + index" v-bind="field.column_props">
            </el-table-column>
        </template>
        <slot slot="empty" name="empty"></slot>
    </el-table>
</template>

<script>

import _ from 'lodash'

export default {
    install(Vue) {
        Vue.component('nc_table', this)
    },
    props: {
        table_props: {
            type: Object,
            default: null
        },
        fields: {
            type: Array,
            default: () => []
        },
        com_data: {
            type: Object,
            default: null
        },
        listData: {
            type: [Array, Object],
            default: () => [],
        },
    },
    data() {
        return {
            sort: {},
        }
    },
    computed: {
        finalListData() {
            if (_.isArray(this.listData)) {
                return this.listData
            }
            //
            return []
        },
    },
    mounted() {
        // console.log('[nc_table] mounted, com_data:', this.com_data)
    },
    beforeUpdate() {
        // console.log('[nc_table] beforeUpdate, fields:', this.fields)
    },
    methods: {
        getSort() {
            return this.sort
        },
        onSortChange({ column, prop, order }) {
            console.log('[nc_table] onSortChange', column, prop, order)
            if (order) {
                this.sort = {
                    field: prop,
                    order,
                }
            } else {
                this.sort = {}
            }
            //
            this.$emit('sort-change')
        },
    }
}
</script>

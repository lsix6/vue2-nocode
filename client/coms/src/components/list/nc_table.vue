<template>
    <el-table style="width: 100%" v-bind="table_props" :data="finalListData" @sort-change="onSortChange">
        <template v-for="(field, index) in fields">
            <nc_table_column v-if="field.ref_com_id || (field.column_components && field.column_components.length > 0)"
                :key="index" v-bind="field" :com_root="com_root" :com_data="com_data">
            </nc_table_column>
            <el-table-column v-else :key="index" v-bind="field.column_props">
            </el-table-column>
        </template>
        <slot slot="empty" name="empty"></slot>
    </el-table>
</template>

<script>

import _ from 'lodash'
import nc_table_column from './nc_table_column.vue'

export default {
    extends: window.nocode.nc_base,
    install(Vue) {
        Vue.component('nc_table', this)
    },
    components: {
        nc_table_column
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

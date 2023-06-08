<template>
    <el-table style="width: 100%" v-bind="table_props" :data="listData" @sort-change="onSortChange">
        <template v-for="(field, index) in fields">
            <el-table-column v-if="field.column_components" :key="'_if' + index"
                v-bind="field.column_props">
                <template slot-scope="scope">
                    <nc_component v-for="(com, comIndex) in field.column_components" :key="comIndex"
                        :com_params="{ ...com_params, ...scope.row }" v-bind="com"></nc_component>
                </template>
            </el-table-column>
            <el-table-column v-else :key="'_else' + index" v-bind="field.column_props">
            </el-table-column>
        </template>
        <slot slot="empty" name="empty"></slot>
    </el-table>
</template>

<script>

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
        com_params: {
            type: Object,
            default: null
        },
        listData: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            sort: {},
        }
    },
    mounted() {
        // console.log('[nc_table] mounted, com_params:', this.com_params)
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

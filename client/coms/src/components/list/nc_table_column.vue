<template>
    <el-table-column v-bind="column_props">
        <template slot-scope="scope">
            <nc_component v-for="(com, comIndex) in column_children" :key="comIndex" :com_root="com_root"
                :com_data="{ ...com_data, ...scope.row }" v-bind="com">
            </nc_component>
        </template>
    </el-table-column>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_table_column', this)
    },
    props: {
        column_props: {
            type: Object,
            default: () => { },
        },
        column_components: {
            type: Array,
            default: () => [],
        },
        ref_com_id: {
            type: String,
            default: '',
        },
        com_root: {
            type: Object,
            default: null
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    computed: {
        column_children() {
            let comObjs = [...this.column_components]
            if (this.ref_com_id) {
                comObjs = window.nocode.customizedComsManager.loadComObjs(this.ref_com_id)
            }
            // console.log('[nc_table_column] column_children', comObjs)
            return comObjs
        },
    },
    mounted() {
        // console.log('[nc_table_column] mounted', this.$props)
    },
}
</script>
<template>
    <span>

        <template v-if="column_components.length > 0">
            <el-table-column v-bind="column_props">
                <template slot-scope="scope">
                    <nc_component v-for="(com, comIndex) in column_components" :key="comIndex"
                        :com_data="{ ...com_data, ...scope.row }" v-bind="com">
                    </nc_component>
                </template>
            </el-table-column>
        </template>
        <template v-else>
            <el-table-column v-bind="column_props">
            </el-table-column>
        </template>
    </span>
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
        ref_com_name: {
            type: String,
            default: '',
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    computed: {
        column_components() {
            let comObjs = []
            if (this.ref_com_name) {
                comObjs = window.nocode.customizedComsManager.loadComObjs(this.ref_com_name)
            }
            console.log('[nc_table_column] column_components', comObjs)
            return comObjs
        },
    },
    mounted() {
        // console.log('[nc_table_column] mounted', this.com_data)
    },
}
</script>
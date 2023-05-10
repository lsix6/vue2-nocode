<template>
    <el-select v-bind="{ ...$attrs, ...$props }" @change="onChange">
        <el-option v-for="(v, k) in enumMap" :key="k" :label="v" :value="k">
        </el-option>
    </el-select>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_select', this)
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        enum_map: {
            type: Object,
            default: null
        },
        data_source_name: {
            type: String,
            default: ''
        },
        com_params: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            enumMap: {},
        }
    },
    mounted() {
        // console.log('[nc_select] mounted', this.value, typeof (this.value), this.com_params)
        //
        this.enumMap = {
            ...this.enum_map,
            ...this.com_params[this.data_source_name],
        }
    },
    methods: {
        onChange(v) {
            // console.log('[nc_select] onChange', v)
            this.$emit('input', v)
        },
    },
}
</script>
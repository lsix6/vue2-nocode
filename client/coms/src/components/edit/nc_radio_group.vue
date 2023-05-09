<template>
    <el-radio-group v-bind="{ ...$attrs, ...$props }" @input="onInput">
        <el-radio v-for="(v, k) in enum_map" :key="k" :label="k">
            {{ v }}
        </el-radio>
    </el-radio-group>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_radio_group', this)
    },
    props: {
        value: {
            type: String,
            default: ''
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
            enum_map: {},
        }
    },
    mounted() {
        console.log('[nc_radio_group] mounted', this.value, typeof (this.value), this.com_params)
        //
        this.enum_map = this.com_params[this.data_source_name]
    },
    methods: {
        onInput(v) {
            // console.log('[nc_radio_group] onInput', v)
            this.$emit('input', v)
        },
    },
}
</script>
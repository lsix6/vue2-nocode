<template>
    <el-input ref="input" v-blur-trim v-bind="input_props" :value="value" @input="onInput">
    </el-input>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_input', this)
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        input_props: {
            type: Object,
            default: () => { },
        },
    },
    methods: {
        onInput(v) {
            this.$emit('input', v)
        },
    },
}
</script>
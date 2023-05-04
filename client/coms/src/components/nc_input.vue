<template>
    <el-input ref="input" v-bind="{...$attrs, ...$props}" :value="value" @input="onInput">
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
    },
    methods: {
        onInput(v) {
            this.$emit('input', v)
        },
    },
}
</script>
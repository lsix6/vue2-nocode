<template>
    <el-input ref="input" v-bind="{...$attrs, ...$props, ...com_props}" @input="onInput">
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
        com_props: {
            type: Object,
            default: () => { }
        },
    },
    created() {
        console.log('[nc_input] created', this)
    },
    methods: {
        onInput(v) {
            this.$emit('input', v)
        },
    },
}
</script>
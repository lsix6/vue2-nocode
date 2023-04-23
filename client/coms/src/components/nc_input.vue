<template>
    <el-input ref="input" v-bind="input_props" :value="value" @input="onInput">
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
        autofocus: {
            type: Boolean,
            default: false,
        },
        trim_after_blur: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        inputRef() {
            return this.$refs.input
        }
    },
    mounted() {
        // console.log('[nc_input] mounted, ', this.inputRef)
        if (this.autofocus) {
            this.focus()
        }
        if (this.trim_after_blur) {
            this.inputRef.$on('blur', this.onBlur)
        }
    },
    destroyed() {
        // console.log('[nc_input] destroyed, ', this.inputRef)
        if (this.trim_after_blur) {
            this.inputRef.$off('blur', this.onBlur)
        }
    },
    methods: {
        onInput(v) {
            this.$emit('input', v)
        },
        focus() {
            this.inputRef.focus()
        },
        onBlur(e) {
            // console.log('[nc_input] onBlur, ', e)
            //
            function getInput(el) {
                let inputEle
                if (el.tagName !== 'INPUT') {
                    inputEle = el.querySelector('input')
                } else {
                    inputEle = el
                }
                return inputEle
            }
            function dispatchEvent(el, type) {
                let evt = document.createEvent('HTMLEvents')
                evt.initEvent(type, true, true)
                el.dispatchEvent(evt)
            }
            // 失去焦点后删除两边的空格
            let inputEle = getInput(this.inputRef.$el)
            const handle = function (event) {
                const newVal = event.target.value.trim()
                if (event.target.value != newVal) {
                    event.target.value = newVal
                    dispatchEvent(inputEle, 'input')
                }
            }
            //
            handle(e)
        },
    },
}
</script>
<template>
    <span v-bind="{ ...$attrs, ...$props }">
        {{ text }}
    </span>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_enum', this)
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
            text: '',
        }
    },
    mounted() {
        console.log('[nc_enum] mounted', this.value, typeof (this.value), this.com_params)
        const enumMap = this.com_params[this.data_source_name]
        if (enumMap) {
            this.text = enumMap[this.value]
        }
    },
}
</script>
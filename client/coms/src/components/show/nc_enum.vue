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
        value: undefined,
        data_source_name: {
            type: String,
            default: ''
        },
        enum_map: {
            type: Object,
            default: null
        },
        com_params: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            text: '-',
        }
    },
    mounted() {
        // console.log('[nc_enum] mounted', this.value, typeof (this.value), this.com_params)
        if (this.value !== undefined) {
            if (this.data_source_name) {
                const enumMap = this.com_params[this.data_source_name]
                if (enumMap) {
                    this.text = enumMap['' + this.value]
                }
            } else if (this.enum_map) {
                this.text = this.enum_map['' + this.value]
            }
        }
    },
}
</script>
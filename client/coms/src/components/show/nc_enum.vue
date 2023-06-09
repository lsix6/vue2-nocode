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
        com_data: {
            type: Object,
            default: null
        },
    },
    computed: {
        text() {
            let ret = '-'
            //
            if (this.value !== undefined) {
                ret = this.value
                //
                if (this.data_source_name) {
                    if (this.com_data) {
                        const enumMap = this.com_data[this.data_source_name]
                        if (enumMap) {
                            ret = enumMap['' + this.value]
                        }
                    }
                } else if (this.enum_map) {
                    ret = this.enum_map['' + this.value]
                }
            }
            //
            return ret
        },
    },
    mounted() {
        console.log('[nc_enum] mounted', this.value, typeof (this.value), this.com_data)
    },
    beforeUpdate() {
        // console.log('[nc_enum] beforeUpdate', this.value, this.data_source_name)
    },
}
</script>
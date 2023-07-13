<template>
    <div class="nc-enum-color" v-bind="{ ...$attrs, ...$props }" :style="{ background: color }">
    </div>
</template>

<script>
const { getPropValue } = window.nocode.utils
export default {
    install(Vue) {
        Vue.component('nc_enum_color', this)
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
    data() {
        return {
        }
    },
    computed: {
        color() {
            // console.log('[nc_enum_color] color', this.value, typeof (this.value), { ...this.com_data }, this.data_source_name)
            //
            let c = 'transparent'
            if (this.value !== undefined) {
                if (this.data_source_name) {
                    const enumMap = getPropValue(this.com_data, this.data_source_name)
                    if (enumMap) {
                        c = enumMap['' + this.value]
                    }
                } else if (this.enum_map) {
                    c = this.enum_map['' + this.value]
                }
            }
            // console.log('[nc_enum_color] color', c)
            //
            return c
        },
    },
    mounted() {
        // console.log('[nc_enum_color] mounted', this.value, typeof (this.value))
    },
}
</script>

<style lang="scss">
.nc-enum-color {
    width: 28px;
    height: 28px;
    margin: auto;
}
</style>
<template>
    <div v-bind="{ ...$attrs, ...$props }" :style="{ background: color }">
    </div>
</template>

<script>
import { getPropValue } from '../../utils/nc_utils'
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
            color: 'transparent',
        }
    },
    mounted() {
        // console.log('[nc_enum_color] mounted', this.value, typeof (this.value))
        //
        this.updateColor()
    },
    beforeUpdate() {
        // console.log('[nc_enum_color] beforeUpdate', this.value, typeof (this.value))
        //
        this.updateColor()
    },
    methods: {
        updateColor() {
            if (this.value !== undefined) {
                if (this.data_source_name) {
                    const enumMap = getPropValue(this.com_data, this.data_source_name)
                    if (enumMap) {
                        this.color = enumMap['' + this.value]
                    }
                } else if (this.enum_map) {
                    this.color = this.enum_map['' + this.value]
                }
            }
        },
    },
}
</script>
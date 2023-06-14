<template>
    <el-radio-group v-bind="{ ...$attrs, ...$props }" :value="select_value" @input="onInput">
        <el-radio v-for="(v, k) in enum_map" :key="k" :label="k">
            {{ v }}
        </el-radio>
    </el-radio-group>
</template>

<script>
import { getPropValue } from '../../utils/nc_utils'
export default {
    install(Vue) {
        Vue.component('nc_radio_group', this)
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        value_type: {
            type: String,
            default: 'int'
        },
        data_source_name: {
            type: String,
            default: ''
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            enum_map: {},
        }
    },
    computed: {
        select_value() {
            return '' + this.value
        },
    },
    mounted() {
        console.log('[nc_radio_group] mounted', this.value, typeof (this.value), this.com_data)
        //
        this.enum_map = getPropValue(this.com_data, this.data_source_name)
    },
    methods: {
        onInput(v) {
            // console.log('[nc_radio_group] onInput', v)
            let vv = v
            //
            if (v !== '') {
                const type = this.value_type.toLowerCase()
                if (type === 'int') {
                    vv = parseInt(v)
                }
            }
            //
            this.$emit('input', vv)
        },
    },
}
</script>
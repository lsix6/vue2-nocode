<template>
    <el-select v-bind="{ ...$attrs, ...$props }" :value="select_value" @change="onChange">
        <el-option v-for="(kv, i) in enumArr" :key="i" :label="kv.v" :value="kv.k">
        </el-option>
    </el-select>
</template>

<script>
const { getPropValue } = window.nocode.utils
export default {
    install(Vue) {
        Vue.component('nc_select', this)
    },
    props: {
        value: {
            type: [String, Boolean, Number],
            default: ''
        },
        value_type: {
            type: String,
            default: 'int'
        },
        enum_map: {
            type: Object,
            default: null
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
    computed: {
        select_value() {
            return '' + this.value
        },
        enumArr() {
            const arr = []
            if (this.enum_map) {
                for (let k in this.enum_map) {
                    arr.push({
                        k,
                        v: this.enum_map[k]
                    })
                }
            }
            const dsMap = getPropValue(this.com_data, this.data_source_name)
            if (dsMap) {
                for (let k in dsMap) {
                    arr.push({
                        k,
                        v: dsMap[k]
                    })
                }
            }
            // console.log('[nc_select] enumArr', arr)
            //
            return arr
        },
    },
    mounted() {
        // console.log('[nc_select] mounted', this.value, typeof (this.value), this.com_data)
    },
    methods: {
        onChange(v) {
            // console.log('[nc_select] onChange', v)
            let vv = v
            //
            if (v !== '') {
                const type = this.value_type.toLowerCase()
                if (type === 'bool') {
                    vv = (v === 'true')
                } else if (type === 'int') {
                    vv = parseInt(v)
                }
            }
            //
            this.$emit('input', vv)
        },
    },
}
</script>
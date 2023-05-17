<template>
    <el-select v-bind="{ ...$attrs, ...$props }" :value="select_value" @change="onChange">
        <el-option v-for="(kv, i) in enumArr" :key="i" :label="kv.v" :value="kv.k">
        </el-option>
    </el-select>
</template>

<script>
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
        com_params: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            enumArr: [],
        }
    },
    computed: {
        select_value() {
            return '' + this.value
        },
    },
    mounted() {
        // console.log('[nc_select] mounted', this.value, typeof (this.value), this.com_params)
        //
        if (this.enum_map) {
            for (let k in this.enum_map) {
                this.enumArr.push({
                    k,
                    v: this.enum_map[k]
                })
            }
        }
        const dsMap = this.com_params[this.data_source_name]
        if (dsMap) {
            for (let k in dsMap) {
                this.enumArr.push({
                    k,
                    v: dsMap[k]
                })
            }
        }
        console.log('[nc_select] enumArr', this.enumArr)
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
<template>
    <div style="position: relative;">
        <el-select v-bind="{ ...$attrs, ...$props }" :value="select_value" @change="onChange">
            <el-option v-for="(kv, i) in enumArr" :key="i" :value="kv.k" style="padding: 8px 10px; display: flex;">
                <div :style="{
                    flex: 1,
                    'background-color': kv.v,
                }"></div>
            </el-option>
        </el-select>
        <div v-if="select_value"
            style=" width: 100%; height: 100%; position: absolute; top: 0; display: flex; pointer-events: none;">
            <div :style="{
                flex: 1,
                margin: '10px 30px 10px 10px',
                'background-color': color_value
            }"></div>
        </div>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_select_color', this)
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        value_type: {
            type: String,
            default: 'string'
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
            enumMap: {},
        }
    },
    computed: {
        select_value() {
            return '' + this.value
        },
        color_value() {
            return this.enumMap[this.select_value]
        },
    },
    mounted() {
        // console.log('[nc_select_color] mounted', this.value, typeof (this.value), this.com_params)
        //
        if (this.enum_map) {
            this.enumMap = {
                ...this.enum_map,
            }
            //
            for (let k in this.enum_map) {
                this.enumArr.push({
                    k,
                    v: this.enum_map[k]
                })
            }
        }
        const dsMap = this.com_params[this.data_source_name]
        if (dsMap) {
            this.enumMap = {
                ...this.enumMap,
                ...dsMap,
            }
            //
            for (let k in dsMap) {
                this.enumArr.push({
                    k,
                    v: dsMap[k]
                })
            }
        }
        console.log('[nc_select_color] enumArr', this.enumArr)
    },
    methods: {
        onChange(v) {
            console.log('[nc_select_color] onChange', v)
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

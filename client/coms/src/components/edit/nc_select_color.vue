<template>
    <div class="nc_select_color">
        <el-select v-bind="{ ...$attrs, ...$props }" :value="select_value" @change="onChange">
            <el-option class="nc_select_color_option" v-for="(kv, i) in enumArr" :key="i" :value="kv.k">
                <div class="color_bar" :style="{
                    'background-color': kv.v,
                }"></div>
            </el-option>
        </el-select>
        <div class="color_frame" v-if="select_value">
            <div class="color_box" :style="{
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

<style lang="scss">
.nc_select_color {
    position: relative;
    width: fit-content;

    .color_frame {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        pointer-events: none;

        .color_box {
            flex: 1;
            margin: 10px 30px 10px 10px;
        }
    }
}


.nc_select_color_option {
    padding: 8px 10px;
    display: flex;

    .color_bar {
        flex: 1,
    }
}
</style>
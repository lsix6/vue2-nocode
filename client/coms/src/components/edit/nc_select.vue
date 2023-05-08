<template>
    <el-select v-bind="{ ...$attrs, ...$props }" @change="onChange">
        <el-option v-for="(v, k) in enum_map" :key="k" :label="v" :value="k">
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
            type: String,
            default: ''
        },
        enum_map: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
        }
    },
    mounted() {
        // console.log('[nc_select] mounted', this.value, typeof(this.value), this.enum_map)
    },
    methods: {
        onChange(v) {
            // console.log('[nc_select] onChange', v)
            this.$emit('input', v)
        },
    },
}
</script>
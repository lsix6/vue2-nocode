<template>
    <el-switch v-bind="{ ...$attrs, ...$props }" @change="onChange">
    </el-switch>
</template>

<script>

const request_api = window.nocode.request_api

export default {
    install(Vue) {
        Vue.component('nc_switch_in_show', this)
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        submit_data: {
            type: Object,
            default: null
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    mounted() {
        // console.log('[nc_switch_in_show] mounted', this.value, typeof (this.value), this.com_data)
    },
    beforeUpdate() {
        // console.log('[nc_switch_in_show] mounted', this.value, typeof (this.value), this.com_data)
    },
    methods: {
        onChange(v) {
            // console.log('[nc_switch_in_show] onChange', v, typeof (v), this.$parent.$props)
            //
            if (this.submit_data && this.submit_data.api) {
                const fieldName = this.$parent?.$props?.com_field?.field_name
                // console.log('fieldName', fieldName)
                if (fieldName) {
                    const data = {
                        _id: this.com_data._id,
                        [fieldName]: v
                    }
                    //
                    request_api(this.submit_data.api, { data }).then(() => {
                        // 切换成功
                        this.$emit('change', v)
                    })
                }
            }
        },
    },
}
</script>
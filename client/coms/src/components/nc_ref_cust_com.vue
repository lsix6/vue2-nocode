<template>
    <span>
        <nc_component v-for="(com, comIndex) in cust_coms" :key="comIndex" :com_root="com_root" :com_data="com_data"
            v-bind="com">
        </nc_component>
    </span>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_ref_cust_com', this)
    },
    props: {
        com_root: {
            type: Object,
            default: null
        },
        com_data: {
            type: Object,
            default: null
        },
        ref_com_id: {
            type: String,
            default: '',
        },
    },
    computed: {
        cust_coms() {
            let comObjs = []
            if (this.ref_com_id) {
                comObjs = window.nocode.customizedComsManager.loadComObjs(this.ref_com_id)
            }
            // console.log('[nc_ref_cust_com] column_children', comObjs)
            return comObjs
        },
    },
    mounted() {
        // console.log('[nc_ref_cust_com] mounted', this.$props)
    },
}
</script>
<template>
    <nc_component :com_root="com_root" v-bind="com_obj" />
</template>

<script>
import { createAddPage } from './js/add/add_page'

export default {
    install(Vue) {
        Vue.component('nc_module_view_add', this)
    },
    props: {
        com_root: {
            type: Object,
            default: null
        },
        module_info: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        com_obj() {
            const comObj = createAddPage(this.module_info)
            console.log('[nc_module_view_edit] comObj: ', comObj)
            //
            return comObj
        },
    },
    mounted() {
    },
}
</script>
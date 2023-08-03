<template>
    <nc_component :com_root="com_root" v-bind="com_obj" />
</template>

<script>
import { createListPage } from './js/list/list_page'

export default {
    extends: window.nocode.nc_base,
    install(Vue) {
        Vue.component('nc_module_view_list', this)
    },
    props: {
        module_info: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        com_obj() {
            const comObj = createListPage(this.module_info)
            console.log('[nc_module_view_list] comObj: ', comObj)
            //
            return comObj
        },
    },
    mounted() {
        console.log('[nc_module_view_list] module_info: ', this.module_info)
    },
}
</script>
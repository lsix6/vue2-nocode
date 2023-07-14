<template>
    <div>
        <nc_component :com_root="com_root" v-bind="com_obj" />
    </div>
</template>

<script>
import { createListPage } from './js/list/list_page'

export default {
    install(Vue) {
        Vue.component('nc_module_view_list', this)
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
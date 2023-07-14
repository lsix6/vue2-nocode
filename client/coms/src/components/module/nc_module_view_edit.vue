<template>
    <div>
        <nc_component :com_root="com_root" v-bind="com_obj" />
    </div>
</template>

<script>
import { createEditPage } from './js/edit/edit_page'

export default {
    install(Vue) {
        Vue.component('nc_module_view_edit', this)
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
            const comObj = createEditPage(this.module_info)
            console.log('[nc_module_view_add] comObj: ', comObj)
            //
            return comObj
        },
    },
    mounted() {
    },
}
</script>
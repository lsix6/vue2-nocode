<template>
    <div style="font-size: 14px;">
        <div>
            [div]
        </div>
        <nc_component v-bind="finalBinds">
        </nc_component>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('e_nc_div', this)
    },
    props: {
        editorItem: {
            type: Object,
            default: null,
        },
        com_params: {
            type: Object,
            default: null
        },
    },
    computed: {
        finalBinds() {
            const options = this.editorItem.componentValue.options
            const binds = {
                com_name: 'nc_div',
                com_field: {
                    field_name: options.uiOptions.prop
                },
                com_params: this.com_params,
            }
            return binds
        },
    },
    mounted() {
        // console.log('[e_nc_div] mounted()', this)
    },
}
</script>
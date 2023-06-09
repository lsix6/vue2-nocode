<template>
    <div>
        <div style="font-size: 14px;">
            [container]
        </div>
        <nc_component :com_params="com_params" v-bind="finalBinds">
            <template v-slot="slotProps">
                <slot v-bind="slotProps"></slot>
            </template>
        </nc_component>
    </div>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('e_nc_container', this)
    },
    props: {
        editorItem: {
            type: Object,
            default: () => ({})
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
                com_name: 'nc_container',
                com_field: {
                    field_name: options.uiOptions.prop
                },
            }
            return binds
        },
    },
    mounted() {
        console.log('[e_nc_container] mounted()', this)
    },
}
</script>
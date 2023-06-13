<template>
    <div style="font-size: 14px;">
        <div>
            [enum]
        </div>
        <nc_component v-bind="finalBinds">
        </nc_component>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('e_nc_enum', this)
    },
    props: {
        editorItem: {
            type: Object,
            default: null,
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    computed: {
        finalBinds() {
            const options = this.editorItem.componentValue.options
            const binds = {
                com_name: 'nc_enum',
                com_field: {
                    field_name: options.uiOptions.prop
                },
                com_props: {
                    data_source_name: options.uiOptions.data_source_name
                },
                com_data: this.com_data,
            }
            return binds
        },
    },
    mounted() {
        // console.log('[e_nc_enum] mounted()', this)
    },
    methods: {
        getComObj() {
            const options = this.editorItem.componentValue.options
            const obj = {
                com_name: "nc_enum",
                com_props: {
                }
            }
            if (options.uiOptions.prop) {
                obj.com_field = {
                    field_name: options.uiOptions.prop
                }
            }
            if (options.uiOptions.data_source_name) {
                obj.com_props.data_source_name = options.uiOptions.data_source_name
            }
            //
            return obj
        },
    },
}
</script>
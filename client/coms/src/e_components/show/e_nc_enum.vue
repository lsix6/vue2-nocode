<template>
    <div style="font-size: 14px;">
        [enum]
        <div>{{ prop }}</div>
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
    },
    computed: {
        prop() {
            if (this.editorItem) {
                return this.editorItem.componentValue.options.uiOptions.prop
            }
            return ''
        },
    },
    mounted() {
        // console.log('[e_nc_enum] mounted()', this)
    },
    methods: {
        getComValue() {
            const options = this.editorItem.componentValue.options
            const obj = {
                com_name: "nc_enum",
                com_field: {
                    field_name: options.uiOptions.prop
                },
                com_props: {
                    data_source_name: options.uiOptions.data_source_name
                }
            }
            //
            return obj
        },
    },
}
</script>
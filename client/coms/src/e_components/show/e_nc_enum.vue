<template>
    <div style="font-size: 14px;">
        enum
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
    mounted() {
        // console.log('[e_nc_enum] mounted()', this)
    },
    methods: {
        getComValue() {
            const options = this.editorItem.componentValue.options
            const obj = {
                com_name: "nc_enum",
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
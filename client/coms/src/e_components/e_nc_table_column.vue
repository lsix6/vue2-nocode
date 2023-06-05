<template>
    <div style="font-size: 14px;">
        {{ label }}
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('e_nc_table_column', this)
    },
    props: {
        editorItem: {
            type: Object,
            default: null,
        },
    },
    computed: {
        label() {
            if (this.editorItem) {
                return this.editorItem.componentValue.options.uiOptions.label
            }
            return ''
        },
    },
    mounted() {
        // console.log('[e_nc_table_column] mounted()', this)
    },
}
</script>
<template>
    <nc_data :data_sources="data_sources">
        <slot></slot>
    </nc_data>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('e_nc_data_source', this)
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
        data_sources() {
            const ds = {}
            //
            console.log('[e_nc_data_source] data_sources, editorItem', this.editorItem)
            //
            const options = this.editorItem.componentValue.options
            options.forEach(item => {
                ds['__ds_' + item.name] = {
                    api: {
                        url: item.api,
                        method: 'GET',
                    },
                }
            })
            console.log('[e_nc_data_source] data_sources, ds', ds)
            //
            return ds
        },
    },
    mounted() {
        // console.log('[e_nc_data_source] mounted()', this)
    },
    beforeUpdate() {
        // console.log('[e_nc_data_source] beforeUpdate()', this.editorItem)
    },
}
</script>
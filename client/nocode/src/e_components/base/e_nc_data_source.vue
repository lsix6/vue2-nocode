<template>
    <nc_data :data_sources="data_sources">
        <template v-slot="slotProps">
            <slot v-bind="slotProps"></slot>
        </template>
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
    data() {
        return {
            data_sources: null,
        }
    },
    watch: {
        'editorItem.componentValue': {
            handler() {
                console.log('[e_nc_data_source] watch, editorItem', this.editorItem)
                //
                this.updateDataSources()
            },
            deep: true,
        },
    },
    mounted() {
        // console.log('[e_nc_data_source] mounted()', this)
        this.updateDataSources()
    },
    beforeUpdate() {
        // console.log('[e_nc_data_source] beforeUpdate()', this.editorItem)
    },
    methods: {
        updateDataSources() {
            const ds = {}
            //
            console.log('[e_nc_data_source] updateDataSources, editorItem', this.editorItem)
            //
            const options = this.editorItem.componentValue.options
            options.forEach(item => {
                ds[item.name] = {
                    api: {
                        url: item.api,
                        method: 'GET',
                    },
                }
            })
            console.log('[e_nc_data_source] updateDataSources, ds', ds)
            //
            this.data_sources = ds
        },
    },
}
</script>
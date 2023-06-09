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
                if (item.api) {
                    ds[item.name] = {
                        api: {
                            url: item.api,
                            method: 'GET',
                        },
                    }
                } else if (item.enum.length > 0) {
                    const enumMap = {}
                    item.enum.forEach((v, i) => {
                        enumMap[i] = v
                    })
                    ds[item.name] = {
                        fetch_params: [
                            {
                                enumMap,
                                params_fields: [
                                    "enumMap"
                                ]
                            }
                        ]
                    }
                } else if (item.obj) {
                    try {
                        const objMap = JSON.parse(item.obj)
                        ds[item.name] = {
                            fetch_params: [
                                {
                                    objMap,
                                    params_fields: [
                                        "objMap"
                                    ]
                                }
                            ]
                        }
                    } catch (e) {
                        console.warn('[e_nc_data_source] updateDataSources, parse error:', item.obj)
                    }
                }
            })
            console.log('[e_nc_data_source] updateDataSources, ds', ds)
            //
            this.data_sources = ds
        },
    },
}
</script>
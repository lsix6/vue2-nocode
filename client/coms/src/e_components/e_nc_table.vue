<template>
    <div>
        <div style="font-size: 14px;">
            [table]
        </div>
        <nc_com :key="refreshCounter" v-bind="finalBinds" :com_data="com_data">
        </nc_com>
    </div>
</template>

<script>
import { loadComData } from '../../../editor/src/views/editor/ComsList'

export default {
    install(Vue) {
        Vue.component('e_nc_table', this)
    },
    props: {
        editorItem: {
            type: Object,
            default: () => ({})
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            fields: null,
            refreshCounter: 0,
        }
    },
    watch: {
        editorItem: {
            handler() {
                this.refreshCounter++
            },
            deep: true,
        },
    },
    computed: {
        finalBinds() {
            const options = this.editorItem.componentValue.options
            //
            const fields = []
            options.uiOptions.columns.forEach(col => {
                let column_components = null
                if (col.com) {
                    const comData = loadComData(col.com)
                    if (comData && comData.comObjs.length > 0) {
                        column_components = comData.comObjs
                    }
                }
                //
                fields.push({
                    column_props: {
                        prop: col.prop,
                        label: col.label,
                    },
                    column_components,
                })
            })
            //
            const binds = {
                com_name: 'nc_table',
                com_ref: 'list',
                com_binds: [
                    {
                        prop_name: 'listData',
                        field_name: options.uiOptions.bind,
                    }
                ],
                com_props: {
                    table_props: {
                        stripe: true,
                        height: '100%',
                        'tooltip-effect': 'light',
                    },
                    fields,
                },
                com_children: [
                    {
                        com_name: 'span',
                        com_slot: 'empty',
                        com_children: [
                            {
                                com_name: 'div',
                                com_text: '暂 无 数 据',
                            },
                        ],
                    }
                ],
            }
            return binds
        },
    },
    mounted() {
        console.log('[e_nc_table] mounted()', this)
    },
    methods: {
    },
}
</script>
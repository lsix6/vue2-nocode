<template>
    <div style="font-size: 14px;">
        {{ label }}
        <slot></slot>
    </div>
</template>

<script>
import { get_e_children } from './e_utils'

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
        console.log('[e_nc_table_column] mounted()', this)
    },
    methods: {
        getComValue() {
            const schemaOptions = this.editorItem.componentValue.options.uiOptions
            //
            const column_components = []
            //
            const cols = get_e_children(this, 'editorItem')
            console.log('[e_nc_table_column] fields, cols', cols)
            cols && cols.forEach(col => {
                const coms = get_e_children(col, 'getComValue')
                coms && coms.forEach(com => {
                    console.log('[e_nc_table_column] fields, getComValue()', com.getComValue())
                    //
                    column_components.push({
                        ...com.getComValue(),
                        com_field: {
                            field_name: schemaOptions.prop
                        },
                    })
                })
            })
            //
            const com = {
                column_props: {
                    prop: schemaOptions.prop,
                    label: schemaOptions.label,
                },
                column_components: (column_components.length > 0 && column_components),
            }
            //
            return com
        },
    },
}
</script>
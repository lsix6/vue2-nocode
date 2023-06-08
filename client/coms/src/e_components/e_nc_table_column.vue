<template>
    <div style="font-size: 14px;">
        {{ label }}
        <slot></slot>
    </div>
</template>

<script>
import { find_e_com_in_children } from './e_utils'

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
            const childList = this.editorItem.childList
            childList && childList.forEach(child => {
                const com = find_e_com_in_children(this, 'getComValue', child.id)
                // console.log('[e_nc_table_column] find_e_com_in_children', com)
                //
                if (com) {
                    column_components.push(com.getComValue())
                }
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
<template>
    <div>
        <slot></slot>
        <nc_table v-bind="$props" :fields="fields"></nc_table>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('e_nc_table', this)
    },
    props: {
        editorItem: {
            type: Object,
            default: () => ({})
        },
        table_props: {
            type: Object,
            default: null
        },
        com_params: {
            type: Object,
            default: null
        },
        listData: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        fields() {
            const arr = [
            ]
            //
            this.editorItem.childList.forEach(child => {
                // console.log('[e_nc_table] fields, child', child)
                const schemaOptions = child.componentValue.options.uiOptions
                arr.push(
                    {
                        column_props: {
                            prop: schemaOptions.prop,
                            label: schemaOptions.label,
                        }
                    }
                )
            })
            // console.log('[e_nc_table] fields', arr)
            //
            return arr
        },
    },
    mounted() {
        // console.log('[e_nc_table] mounted()', this)
    },
    beforeUpdate() {
        // console.log('[e_nc_table] beforeUpdate()', this.editorItem)
    },
}
</script>
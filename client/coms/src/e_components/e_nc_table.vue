<template>
    <div>
        <div class="items-direction_right">
            <slot></slot>
        </div>
        <nc_component v-bind="finalBinds" :com_params="com_params"></nc_component>
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
        com_params: {
            type: Object,
            default: null
        },
    },
    computed: {
        finalBinds() {
            const options = this.editorItem.componentValue.options
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
                    fields: this.fields,
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
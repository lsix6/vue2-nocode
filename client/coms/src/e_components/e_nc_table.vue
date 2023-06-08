<template>
    <div>
        <div class="items-direction_right" ref="slotRoot">
            <slot></slot>
        </div>
        <nc_component :key="refreshCounter" v-bind="finalBinds" :com_params="com_params"></nc_component>
    </div>
</template>

<script>

import { get_e_children } from './e_utils'

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
    data() {
        return {
            fields: null,
            observer: null,
            refreshCounter: 0,
        }
    },
    watch: {
        editorItem: {
            handler() {
                // console.log('watch editorItem')
                this.updateFields()
                //
                this.refreshCounter++
            },
            deep: true,
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
    },
    mounted() {
        console.log('[e_nc_table] mounted()', this)
        //
        this.observer = new MutationObserver((mutationList) => {
            console.log('[e_nc_table] mounted(), mutationList', mutationList)
            //
            this.updateFields()
        })
        // 监听 slot 节点
        this.observer.observe(this.$refs.slotRoot, {
            childList: true,
            subtree: true,
        })
    },
    beforeDestroy() {
        // 解除监听
        this.observer.disconnect()
        this.observe = null
    },
    methods: {
        updateFields() {
            const arr = []
            //
            const cols = get_e_children(this, 'editorItem')
            console.log('[e_nc_table] fields, cols', cols)
            cols && cols.forEach(col => {
                const coms = get_e_children(col, 'getComValue')
                coms && coms.forEach(com => {
                    console.log('[e_nc_table] fields, getComValue()', com.getComValue())
                    //
                    arr.push(com.getComValue())
                })
            })
            //
            console.log('[e_nc_table] fields', arr)
            //
            this.fields = arr
        },
    },
}
</script>
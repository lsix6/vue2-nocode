<template>
    <div>
        <div style="font-size: 14px;">
            [table]
        </div>
        <div ref="slotRoot" style="display: flex; flex-direction: row;">
            <slot></slot>
        </div>
        <nc_component :key="refreshCounter" v-bind="finalBinds" :com_data="com_data"></nc_component>
    </div>
</template>

<script>

import { find_e_com_in_children } from './e_utils'

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
            observer: null,
            refreshCounter: 0,
            preEditorItem: '',
        }
    },
    watch: {
        editorItem: {
            handler() {
                const s = JSON.stringify(this.editorItem)
                if (s !== this.preEditorItem) {
                    this.preEditorItem = s
                    //
                    this.updateFields()
                    //
                    this.refreshCounter++
                }
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
            const childList = this.editorItem.childList
            childList && childList.forEach(child => {
                const com = find_e_com_in_children(this, 'getComValue', child.id)
                // console.log('[e_nc_table] find_e_com_in_children', com)
                //
                if (com) {
                    arr.push(com.getComValue())
                }
            })
            //
            console.log('[e_nc_table] fields', arr)
            //
            this.fields = arr
        },
    },
}
</script>
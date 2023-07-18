<template>
    <div v-if="isInEdit">
        <div>{{ module_label }}({{ module_name }})</div>
        <slot></slot>
    </div>
    <nc_module_view v-else :com_root="com_root" :module_info="moduleInfo" />
</template>

<script>
import nc_module_view from './nc_module_view.vue'
import { preProcessModuleInfo } from './js/pages.js'

export default {
    install(Vue) {
        Vue.component('nc_module', this)
    },
    components: {
        nc_module_view,
    },
    props: {
        com_root: {
            type: Object,
            default: null
        },
        module_name: {
            type: String,
            default: '',
        },
        module_label: {
            type: String,
            default: '',
        },
    },
    computed: {
        isInEdit() {
            return this.com_root.isInEdit
        },
        fields() {
            const _fields = []
            //
            if (!this.isInEdit) {
                const coms = this.$parent.com_slots && this.$parent.com_slots.default
                console.log('[nc_module] fields, coms: ', coms)
                if (coms) {
                    coms.forEach(com => {
                        const _field = {
                            field_info: {
                                name: com.com_props.field_name,
                                label: com.com_props.field_label,
                            },
                        }
                        //
                        if (com.com_props.is_in_list) {
                            _field.in_list = {
                                column_props: com.com_props.column_props,
                                column_components: [],
                            }
                        }
                        //
                        const comSlots = com.com_slots
                        if (comSlots) {
                            if (_field.in_list && comSlots.in_list && comSlots.in_list.length > 0) {
                                _field.in_list.column_components = [
                                    {
                                        ...comSlots.in_list[0],
                                        com_field: {
                                            field_name: _field.field_info.name,
                                        },
                                    }
                                ]
                                if (com.com_props.enum && com.com_props.enum.length > 0) {
                                    _field.field_info.enum = com.com_props.enum
                                }
                            }
                            if (com.com_props.is_in_form && comSlots.in_form && comSlots.in_form.length > 0) {
                                _field.in_form = {
                                    edit_com: comSlots.in_form[0]
                                }
                            }
                            if (com.com_props.is_in_search && comSlots.in_search && comSlots.in_search.length > 0) {
                                _field.in_search = {
                                    search_com: comSlots.in_search[0]
                                }
                            }
                        }
                        //
                        _fields.push(_field)
                    })
                }
            }
            console.log('[nc_module] fields: ', _fields)
            //
            return _fields
        },
        moduleInfo() {
            const _moduleInfo = {
                name: this.module_name,
                label: this.module_label,
                add_form: {
                    title: '添加新' + this.module_label,
                },
                edit_form: {
                    title: `编辑${this.module_label}信息`,
                },
                fields: this.fields,
            }
            const _processedModuleInfo = preProcessModuleInfo(_moduleInfo)
            //
            return _processedModuleInfo
        },
    },
    mounted() {
        console.log('[nc_module] isInEdit: ', this.isInEdit, this.$parent)
    },
}
</script>
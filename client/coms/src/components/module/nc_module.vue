<template>
    <div v-if="isInEdit">
        <div>{{ module_label }}({{ module_name }})</div>
        <div class="flex-container" style="flex-direction: row; border: dashed 1px lightblue">
            <div style="flex: 1;"></div>
            <div style="display: flex; flex-direction: row;">
                <slot name="buttons"></slot>
            </div>
        </div>
        <div class="flex-container">
            <slot></slot>
        </div>
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
                        if (com.com_props.is_in_form) {
                            _field.in_form = {}
                            //
                            const rules = []
                            const rulesData = com.com_props.rules || {}
                            if (rulesData.required) {
                                rules.push({
                                    required: true,
                                    message: '请输入' + _field.field_info.label,
                                    trigger: 'blur'
                                },)
                            }
                            // if (rulesData.limit) {
                            //     rules.push({
                            //         min: rulesData.min,
                            //         max: rulesData.max,
                            //         message: `长度限制 ${rulesData.min} 到 ${rulesData.max} 个字符`,
                            //         trigger: ['blur', 'change']
                            //     })
                            // }
                            if (rulesData.pattern) {
                                rules.push({
                                    pattern: rulesData.pattern,
                                    message: rulesData.pattern_message,
                                    trigger: ['blur', 'change']
                                })
                            }
                            if (rules.length > 0) {
                                _field.in_form.rules = rules
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
                            if (_field.in_form && comSlots.in_form && comSlots.in_form.length > 0) {
                                _field.in_form.edit_com = comSlots.in_form[0]
                            }
                            if (com.com_props.is_in_search) {
                                _field.in_search = {}
                                if (com.com_props.is_in_keyWord) {
                                    _field.in_search.type = 'key'
                                }
                                if (comSlots.in_search && comSlots.in_search.length > 0) {
                                    _field.in_search.search_com = comSlots.in_search[0]
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
                buttons: this.$parent.com_slots && this.$parent.com_slots.buttons,
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
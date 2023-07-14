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
                if (coms) {
                    coms.forEach(com => {
                        const _field = {
                            field_info: {
                                name: com.com_props.field_name,
                                label: com.com_props.field_label,
                            },
                            in_list: {

                            },
                            in_form: {
                                edit_com: {

                                },
                            },
                        }
                        //
                        _fields.push(_field)
                    })
                }
            }
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
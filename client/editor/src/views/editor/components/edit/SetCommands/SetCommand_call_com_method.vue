<template>
    <div v-if="value.call">
        <el-form-item label="ref">
            <el-select v-model="value.call.com_ref" filterable allow-create clearable>
                <el-option v-for="refName in comRefs" :key="refName" :value="refName" />
            </el-select>
        </el-form-item>
        <el-form-item label="method">
            <el-select v-model="value.call.com_method_name" filterable allow-create clearable>
                <el-option v-for="(method, methodName) in comMethods" :key="methodName" :value="methodName" />
            </el-select>
        </el-form-item>
        <el-form-item label="params">
            <VueJsonFrom v-if="!!paramsSchema" v-model="value.call.com_method_params" class="" :schema="paramsSchema"
                :form-props="{
                    labelPosition: 'right',
                    labelWidth: '110px',
                    size: 'small',
                }" :form-footer="{ show: false }">
            </VueJsonFrom>
        </el-form-item>
    </div>
</template>

<script>
import VueJsonFrom from '@lljj/vue-json-schema-form';

export default {
    components: {
        VueJsonFrom,
    },
    inject: [
        'getCurEditorItemWrapper',
        'getEditorItem',
    ],
    props: {
        value: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {
        }
    },
    computed: {
        comRefs() {
            return Object.keys(this.getCurEditorItemWrapper().com_root.refsMgr.get_com_refs())
        },
        comMethods() {
            let methods = {}
            //
            const com = this.getCurEditorItemWrapper().com_root.refsMgr.get_com_ref(this.value.call.com_ref)
            if (com) {
                const comName = com.$options._componentTag
                const itemSchema = this.getEditorItem(comName)
                methods = itemSchema.componentPack.comSchema.com_methods || {}
                console.log('[SetCommand_call_com_method] comMethods', comName, methods, com)
            }
            //
            return methods
        },
        paramsSchema() {
            let ret = null
            //
            const methodName = this.value?.call?.com_method_name
            if (methodName) {
                ret = this.comMethods[methodName].params_schema
            }
            // console.log('[SetCommand_call_com_method] paramsSchema', ret)
            //
            return ret
        },
    },
    mounted() {
        console.log('[SetCommand_call_com_method] mounted', this.value)
        //
        if (!this.value.call) {
            this.$set(this.value, 'call', {
                com_ref: '',
                com_method_name: '',
                com_method_params: [],
            })
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped></style>
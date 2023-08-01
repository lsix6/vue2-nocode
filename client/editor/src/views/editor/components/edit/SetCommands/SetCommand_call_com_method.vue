<template>
    <div v-if="value.call">
        <el-form-item label="ref">
            <el-select clearable v-model="value.call.com_ref">
                <el-option v-for="refName in comRefs" :key="refName" :value="refName" />
            </el-select>
        </el-form-item>
        <el-form-item label="method">
            <el-select clearable v-model="value.call.com_method_name">
                <el-option v-for="methodName in comMethods" :key="methodName" :value="methodName" />
            </el-select>
        </el-form-item>
        <el-form-item label="params">
            <SetParams v-model="value.call.com_method_params" />
        </el-form-item>
    </div>
</template>

<script>
import SetParams from '../SetParams.vue';

export default {
    components: {
        SetParams,
    },
    inject: [
        'getCurEditorItemWrapper',
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
            const arr = []
            //
            const com = this.getCurEditorItemWrapper().com_root.refsMgr.get_com_ref(this.value.call.com_ref)
            console.log('[SetCommand_call_com_method] comMethods', com)
            if (com) {
                arr.push(...com.callableMethods)
            }
            //
            return arr
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
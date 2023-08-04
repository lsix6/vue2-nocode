<template>
    <el-select :value="value" @change="onChange" filterable allow-create clearable>
        <el-option v-for="refName in comRefs" :key="refName" :value="refName" />
    </el-select>
</template>

<script>

export default {
    inject: [
        'getCurEditorItemWrapper',
    ],
    props: {
        value: {
            type: String,
            default: '',
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
    },
    mounted() {
        console.log('[SelectRef] mounted', this.value)
    },
    methods: {
        onChange(v) {
            // console.log('[SelectRef] onChange', v)
            let vv = v
            //
            //
            this.$emit('input', vv)
        },
    },
}
</script>

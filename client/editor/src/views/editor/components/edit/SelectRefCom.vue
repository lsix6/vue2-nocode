<template>
    <el-select :value="value" @change="onChange">
        <el-option v-for="(kv, i) in enumArr" :key="i" :label="kv.v" :value="kv.k">
        </el-option>
    </el-select>
</template>

<script>

const custComsMgr = window.nocode.customizedComsManager

export default {
    install(Vue) {
        Vue.component('SelectRefCom', this)
    },
    props: {
        value: {
            type: [String],
            default: ''
        },
    },
    data() {
        return {
            enumArr: [],
        }
    },
    mounted() {
        // console.log('[SelectRefCom] mounted', this.value)
        //
        const coms = custComsMgr.loadComsList()
        coms.forEach(com => {
            this.enumArr.push({
                k: com.id,
                v: com.name,
            })
        })
        // console.log('[SelectRefCom] enumArr', this.enumArr)
    },
    methods: {
        onChange(v) {
            // console.log('[SelectRefCom] onChange', v)
            let vv = v
            //
            //
            this.$emit('input', vv)
        },
    },
}
</script>
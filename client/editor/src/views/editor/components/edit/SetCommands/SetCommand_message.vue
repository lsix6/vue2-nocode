<template>
    <div>
        <el-form-item label="type">
            <el-select v-model="value.msg.type">
                <el-option v-for="m in msg_types" :key="m" :value="m" />
            </el-select>
        </el-form-item>
        <el-form-item label="params">
            <SetParams v-model="value.msg.msg_params" />
        </el-form-item>
    </div>
</template>

<script>
import SetParams from '../SetParams.vue';

export default {
    components: {
        SetParams,
    },
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
        msg_types() {
            return ['success', 'warning', 'info', 'error']
        },
    },
    mounted() {
        console.log('[SetCommand_message] mounted', this.value)
        //
        if (!this.value.msg) {
            this.$set(this.value, 'msg', {
                type: this.msg_types[0],
                msg_params: [],
            })
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped></style>
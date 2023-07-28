<template>
    <div>
        <el-form-item label="url">
            <el-input v-model="value.api.url" />
        </el-form-item>
        <el-form-item label="method">
            <el-select v-model="value.api.method">
                <el-option v-for="m in method_names" :key="m" :value="m" />
            </el-select>
        </el-form-item>
        <el-form-item label="params">
            <SetParams v-model="value.api.request_params" />
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
        method_names() {
            return ['GET', 'POST', 'DELETE']
        },
    },
    mounted() {
        console.log('[SetCommand_request_api] mounted', this.value)
        //
        if (!this.value.api) {
            this.$set(this.value, 'api', {
                url: '',
                method: this.method_names[0],
                request_params: [],
            })
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped></style>
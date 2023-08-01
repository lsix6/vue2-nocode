<template>
    <div>
        <el-form-item label="path">
            <el-input v-model="value.route.path" />
        </el-form-item>
        <el-form-item label="params">
            <SetParams v-model="value.route.route_params" />
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
    },
    mounted() {
        console.log('[SetCommand_push_route] mounted', this.value)
        //
        if (!this.value.route) {
            this.$set(this.value, 'route', {
                path: '',
                route_params: [],
            })
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped></style>
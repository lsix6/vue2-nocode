<template>
    <div>
        <div class="param-item" v-for="(item, i) in value" :key="i">
            <el-input size="mini" v-model="item.k" @input="onInput" />
            <el-input size="mini" v-model="item.v" @input="onInput" />
            <el-button size="mini" class="btn-remove" @click="onRemove(i)">-</el-button>
        </div>
        <el-button size="mini" @click="onAdd">+</el-button>
    </div>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('SetParams', this)
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log('[SetParams] mounted', this.value)
        //
    },
    methods: {
        onAdd() {
            this.value.push({ k: '', v: '' })
        },
        onRemove(i) {
            console.log('[SetParams] onRemove', i)
            this.value.splice(i, 1)
        },
        onInput() {
            console.log('[SetParams] onInput', this.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.param-item {
    display: flex;
    flex-direction: row;
    line-height: 28px;

    .btn-remove {
        padding: 0;
        width: 50px;
    }
}
</style>
<template>
    <div>
        <el-button size="mini" @click="onAdd">+</el-button>
        <el-table :data="value" emptyText="no params now">
            <el-table-column label="name">
                <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.k" @input="onInput" />
                </template>
            </el-table-column>
            <el-table-column label="source">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.source">
                        <el-option v-for="source in paramSources" :key="source" :label="source" :value="source" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="value">
                <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.v" @input="onInput" />
                </template>
            </el-table-column>
            <el-table-column label="remove">
                <template slot-scope="scope">
                    <el-button size="mini" class="btn-remove" @click="onRemove(scope.row.i)">-</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    computed: {
        paramSources() {
            return ['value', 'com_data', 'com_ref', 'route_query', 'cmd_data']
        },
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

<style lang="scss" scoped></style>
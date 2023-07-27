<template>
    <div class="set-params">
        <el-button size="mini" @click="onAdd">+</el-button>
        <el-table :data="value" emptyText="no params now">
            <el-table-column label="name" width="120">
                <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.param_name" @input="onInput" />
                </template>
            </el-table-column>
            <el-table-column label="value">
                <template slot-scope="scope">
                    <div class="row-value">
                        <el-button size="mini" @click="onOpenSelect(scope.row)">...</el-button>
                        <el-select v-model="scope.row.param_source">
                            <el-option v-for="source in paramSources" :key="source" :label="source" :value="source" />
                        </el-select>
                        <el-input size="mini" v-model="scope.row.param_desc" @input="onInput" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="remove" width="80">
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
    inject: [
        'openSelectParamsDlg',
    ],
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
            return ['text', 'json', 'com_data', 'com_ref', 'route_query', 'cmd_data']
        },
    },
    mounted() {
        console.log('[SetParams] mounted', this.value)
        //
    },
    methods: {
        onOpenSelect(row) {
            this.openSelectParamsDlg(row.param_source + '.' + row.param_desc, (v) => {
                const arr = v.split('.')
                row.param_source = arr[0]
                row.param_desc = arr.slice(1).join('.')
                console.log('[SetParams] onOpenSelect', row)
            })
        },
        onAdd() {
            this.value.push({
                param_name: '',
                param_source: '',
                param_desc: ''
            })
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
.set-params {

    .row-value {
        display: flex;
        flex-direction: row;
    }
}
</style>
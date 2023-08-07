<template>
    <el-form-item :label="schema.title + '：'" size="mini">
        <div class="set-param">
            <el-button @click="onOpenSelect(value)">...</el-button>
            <el-select class="row-source" v-model="value.param_source">
                <el-option v-for="source in paramSources" :key="source" :label="source" :value="source" />
            </el-select>
            <div class="row-desc">
                <el-input v-model="value.param_desc" @input="onInput" />
                <!-- <div class="row-default" v-if="value.param_source === 'com_ref'">
                                <div class="row-default-label">default</div>
                                <el-input v-model="value.param_default_value" @input="onInput" />
                            </div> -->
            </div>
        </div>
    </el-form-item>
</template>

<script>
import UiFieldBase from './UiFieldBase.vue'

export default {
    extends: UiFieldBase,
    install(Vue) {
        Vue.component('SetParam', this)
    },
    inject: [
        'getEditorRefs',
    ],
    props: {
        label: {
            type: String,
            default: '',
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
        console.log('[SetParam] mounted', this.value)
        //
    },
    methods: {
        onOpenSelect(row) {
            this.getEditorRefs().selectParamsDlg.open(
                row.param_source + '.' + row.param_desc,
                (v) => {
                    const arr = v.split('.')
                    row.param_source = arr[0]
                    row.param_desc = arr.slice(1).join('.')
                    console.log('[SetParam] onOpenSelect', row)
                })
        },
        onInput() {
            console.log('[SetParam] onInput', this.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.set-param {
    display: flex;
    flex-direction: row;

    .row-source {
        width: 150px
    }

    .row-desc {
        flex: 1;

        .row-default {
            display: flex;
            flex-direction: row;

            .row-default-label {
                width: 60px;
            }
        }
    }
}
</style>
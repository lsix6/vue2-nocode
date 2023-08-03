<template>
    <div class="data-source-item">
        <el-button size="mini" class="btn-open" @click="onOpenDlg()">...</el-button>
        <el-input size="mini" v-model="value.name" @input="onInput" />
    </div>
</template>

<script>
import UiFieldBase from './UiFieldBase.vue'

import _ from 'lodash'

export default {
    extends: UiFieldBase,
    install(Vue) {
        Vue.component('SetDataSource', this)
    },
    inject: [
        'getEditorRefs',
    ],
    mounted() {
        console.log('[SetDataSource] mounted', _.cloneDeep(this.value))
        //
    },
    methods: {
        onOpenDlg() {
            this.getEditorRefs().setDataSourceDlg.open(this.value)
        },
        onInput() {
            console.log('[SetDataSource] onInput', this.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.data-source-item {
    display: flex;
    flex-direction: row;
    line-height: 28px;

    .btn-open {
        padding: 0;
        width: 50px;
    }

}
</style>
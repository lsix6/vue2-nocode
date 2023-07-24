<template>
    <div class="select-field">
        <el-input :value="value" @input="onInput" />
        <el-button class="dlg-button" @click="onBtnClick">...</el-button>
    </div>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('SelectField', this)
    },
    inject: [
        'openSelectFieldDlg',
    ],
    props: {
        value: {
            type: [String],
            default: ''
        },
    },
    data() {
        return {
        }
    },
    mounted() {
        // console.log('[SelectField] mounted')
    },
    methods: {
        onInput(v) {
            this.$emit('input', v)
        },
        onBtnClick() {
            this.openSelectFieldDlg()
        },
    },
}
</script>

<style lang="scss" scoped>
.select-field {
    display: flex;
    flex-direction: row;

    .dlg-button {
        padding: 0;
        width: 40px;
    }
}
</style>
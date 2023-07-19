<template>
    <el-dialog v-show="!isHide" :visible.sync="visible" v-bind="dialog_props" :before-close="beforeClose"
        @close="onClose">
        <template v-if="visible">
            <nc_children :com_children="dialog_children" :com_params="dlgData">
            </nc_children>
        </template>
    </el-dialog>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('nc_dialog', this)
    },
    props: {
        dialog_props: {
            type: Object,
            default: {}
        },
        dialog_children: {
            type: Array,
            default: () => []
        },
        initVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            visible: false,
            isHide: false,
            dlgData: {},
        }
    },
    mounted() {
        this.visible = this.initVisible
    },
    beforeUpdate() {
        if (this.visible) {
            document.addEventListener('keydown', this.onKeydown)
        } else {
            document.removeEventListener('keydown', this.onKeydown)
        }
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeydown)
    },
    methods: {
        open(methodParams) {
            console.log('[nc_dialog] show, methodParams:', methodParams)
            Object.assign(this.dlgData, methodParams)
            this.visible = true
        },
        close() {
            this.visible = false
        },
        hide(isHide) {
            this.isHide = isHide
        },
        emitBeforeClose() {
            console.log('[nc_dialog] emit beforeClose')
            this.$emit('beforeClose')
        },
        onKeydown(e) {
            // console.log('[nc_dialog] onKeydown, keyCode: ', e.keyCode)
            if (this.visible && e.keyCode == 27) {
                this.emitBeforeClose()
            }
        },
        onClose() {
            console.log('[nc_dialog] onClose,')
        },
        beforeClose(done) {
            // console.log('[nc_dialog] beforeClose, done: ', done)
            done()
            // this.emitBeforeClose()
        },
    }

}
</script>
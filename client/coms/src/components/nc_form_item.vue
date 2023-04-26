<template>
    <el-form-item ref="refFormItem" v-bind="com_props">
        <slot></slot>
    </el-form-item>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('nc_form_item', this)
    },
    props: {
        com_props: {
            type: Object,
            default: () => { }
        },
    },
    mounted() {
        // console.log('mounted', this.$refs.refFormItem)
        this.addFocusListener(this.$refs.refFormItem.$el)
    },
    beforeDestroy() {
        // console.log('beforeDestroy', this.$refs.refFormItem)
        this.removeFocusListener(this.$refs.refFormItem.$el)
    },
    methods: {
        addFocusListener(node) {
            if (node) {
                // console.log('addFocusListener, localName', node.localName)
                if (node.localName === 'input') {
                    node.addEventListener('focus', this.onFocus)
                }
                if (node.children) {
                    for (let i = 0; i < node.children.length; i++) {
                        const child = node.children[i]
                        this.addFocusListener(child)
                    }
                }
            }
        },
        removeFocusListener(node) {
            if (node) {
                // console.log('removeFocusListener, localName', node.localName)
                if (node.localName === 'input') {
                    node.removeEventListener('focus', this.onFocus)
                }
                if (node.children) {
                    for (let i = 0; i < node.children.length; i++) {
                        const child = node.children[i]
                        this.addFocusListener(child)
                    }
                }
            }
        },
        onFocus() {
            // console.log('onFocus')
            // 输入框获取焦点时移除该表单项的校验结果
            this.$refs.refFormItem.clearValidate()
        },
    },
}
</script>
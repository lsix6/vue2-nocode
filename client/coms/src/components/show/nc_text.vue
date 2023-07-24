<template>
    <el-tooltip v-if="tooltip" v-bind="tooltip_props" :content="tipText" :disabled="!isShowTooltip">
        <div ref="tooltipSpan"
            style="{ first-will-lost: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }"
            @mouseenter="visibilityChange($event)">
            {{ finalText }}
        </div>
    </el-tooltip>
    <span v-else>
        {{ finalText }}
    </span>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_text', this)
    },
    props: {
        value: {
            default: ''
        },
        tooltip: {
            type: Boolean,
            default: false,
        },
        tooltip_props: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        text() {
            return '' + this.value
        },
        finalText() {
            return (this.text + this.spanText)
        },
        slotText() {
            // 计算 slot 里的所有文本
            const getChildrenTextContent = function (children) {
                return children.map(function (node) {
                    // console.log('map node: ', node)
                    const ret = node.children
                        ? getChildrenTextContent(node.children)
                        : node.text
                    // console.log('map ret: ', ret)
                    return ret
                }).join('')
            }
            let slots = []
            for (let k in this.$slots) {
                slots = slots.concat(this.$slots[k])
            }
            // console.log('slots: ', slots)
            const slotText = getChildrenTextContent(slots)
            return slotText
        },
        tipText() {
            // tip 的文本包括 slot 里的文本
            return (this.slotText + this.finalText)
        },
    },
    data() {
        return {
            spanText: '',
            isShowTooltip: false,
        }
    },
    mounted() {
    },
    methods: {
        setText(val) {
            this.spanText = val
            console.log('[nc_text] setText, val: ', val, this.spanText)
        },
        visibilityChange() {
            const tooltipSpan = this.$refs.tooltipSpan
            // console.log('[nc_text] visibilityChange, scrollWidth: ', this.spanText, tooltipSpan.scrollWidth)
            // console.log('[nc_text] visibilityChange, clientWidth: ', this.spanText, tooltipSpan.clientWidth)
            if (tooltipSpan.scrollWidth > tooltipSpan.clientWidth) {
                // 文字溢出
                this.isShowTooltip = true;
            } else {
                // 不溢出
                this.isShowTooltip = false;
            }
        },
    },
}
</script>
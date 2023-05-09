<template>
    <div v-bind="{ ...$attrs, ...$props }" :style="{ background: value }">
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_color', this)
    },
    props: {
        value: {
            type: String,
            default: ''
        },
    },
    mounted() {
        // console.log('[nc_color] mounted', this.value, typeof (this.value))
    },
}
</script>
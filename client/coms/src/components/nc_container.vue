<template>
    <div :style="{ display: 'flex', 'flex-direction': items_direction }">
        <slot v-bind="{ com_params: { ...com_params, ...value } }"></slot>
    </div>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('nc_container', this)
    },
    props: {
        value: {
            type: Object,
            default: null
        },
        items_direction: {
            type: String,
            default: 'column'
        },
        com_params: {
            type: Object,
            default: null
        },
    },
    mounted() {
        console.log('[nc_container] mounted, com_params:', this.com_params, this.value)
    },
}
</script>

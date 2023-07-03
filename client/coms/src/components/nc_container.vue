<template>
    <div class="nc-container" :style="{ 'flex-direction': items_direction }">
        <slot v-bind="{ com_root, com_data: { ...com_data, ...value } }"></slot>
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
        com_root: {
            type: Object,
            default: null
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    mounted() {
        // console.log('[nc_container] mounted, com_data:', this.com_data, this.value)
    },
}
</script>

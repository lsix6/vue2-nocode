<template>
    <div>
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

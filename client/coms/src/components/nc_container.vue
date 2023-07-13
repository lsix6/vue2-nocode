<template>
    <div class="nc-container" :style="style">
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
        flex: {
            type: Boolean,
            default: false,
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
    computed: {
        style() {
            const ret = {
                'flex-direction': this.items_direction,
            }
            if (this.flex) {
                ret.flex = 1
            }
            //
            return ret
        },
    },
    mounted() {
        // console.log('[nc_container] mounted, com_data:', this.com_data, this.value)
    },
}
</script>

<style lang="scss" scoped>
.nc-container {
    overflow: hidden;
    display: flex;
}
</style>
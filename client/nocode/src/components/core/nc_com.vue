<template>
    <nc_component v-bind="{ ...$attrs, ...$props }">
        <template v-slot="slotProps">
            <slot v-bind="slotProps"></slot>
            <template v-if="com_children && com_children.length > 0">
                <nc_com ref="item" v-for="( child, index ) in  com_children " :key="'child_' + index" v-bind="child"
                    :com_data="{ ...com_data, ...slotProps.com_data }">
                </nc_com>
            </template>
        </template>
    </nc_component>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('nc_com', this)
    },
    props: {
        com_children: {
            type: Array,
            default: () => []
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    mounted() {
        // console.log('[nc_com] mounted()', this.$attrs.com_name, this)
    },
}
</script>
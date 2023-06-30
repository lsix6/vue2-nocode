<template>
    <span v-if="com_children && com_children.length > 0" :slot="comSlot">
        <nc_component ref="item" 
            v-for="(child, index) in com_children" 
            :key="'child_' + index" 
            v-bind="child"
            :com_root="com_root"
            :com_data="com_data" 
            :slot="child.com_slot"
        >
        </nc_component>
    </span>
</template>

<script>

export default {
    install(Vue) {
        Vue.component('nc_children', this)
    },
    props: {
        com_root: {
            type: Object,
            default: null
        },
        com_children: {
            type: Array,
            default: () => []
        },
        com_data: {
            type: Object,
            default: null
        },
    },
    computed: {
        comSlot() {
            let ret
            //
            if (this.com_children && this.com_children.length > 0) {
                ret = this.com_children[0].com_slot
            }
            //
            return ret
        },
    },
    methods: {
        getChildrenRef() {
            return this.$refs.item
        }
    },
}
</script>
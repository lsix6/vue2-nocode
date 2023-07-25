<template>
    <div class="nc-array" :style="style">
        <div class="flex-container" v-for="(item, i) in items" :key="i">
            <slot v-bind="{ com_root, com_data: { ...com_data, __item: item } }"></slot>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    install(Vue) {
        Vue.component('nc_text', this)
    },
    props: {
        com_root: {
            type: Object,
            default: null
        },
        com_data: {
            type: Object,
            default: null
        },
        value: {
            default: null,
        },
        items_direction: {
            type: String,
            default: 'column'
        },
    },
    computed: {
        items() {
            let arr = []
            //
            if (_.isArray(this.value)) {
                arr = this.value
            }
            //
            return arr
        },
        style() {
            const ret = {
                'flex-direction': this.items_direction,
            }
            //
            return ret
        },
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.nc-array {
    flex: 1;
    display: flex;
}
</style>
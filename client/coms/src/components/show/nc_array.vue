<template>
    <div class="flex-container">
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
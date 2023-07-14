<template>
    <div v-if="isInEdit">
        <div>{{ module_label }}({{ module_name }})</div>
        <slot></slot>
    </div>
    <nc_module_view v-else :module_label="module_label" />
</template>

<script>
import nc_module_view from './nc_module_view.vue'

export default {
    install(Vue) {
        Vue.component('nc_module', this)
    },
    components: {
        nc_module_view,
    },
    props: {
        com_root: {
            type: Object,
            default: null
        },
        module_name: {
            type: String,
            default: '',
        },
        module_label: {
            type: String,
            default: '',
        },
    },
    computed: {
        isInEdit() {
            return this.com_root.isInEdit
        },
    },
    mounted() {
        console.log('[nc_module] com_root: ', this.com_root)
    },
}
</script>
<template>
    <div>
        <div>{{ module_label }}({{ module_name }})</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_module', this)
    },
    props: {
        module_name: {
            type: String,
            default: '',
        },
        module_label: {
            type: String,
            default: '',
        },
    },
}
</script>
<template>
    <div>
        <div>添加{{ module_label }}</div>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_module_view_add', this)
    },
    props: {
        module_label: {
            type: String,
            default: '',
        },
    },
    mounted() {
    },
}
</script>
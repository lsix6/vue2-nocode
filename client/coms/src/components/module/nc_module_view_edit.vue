<template>
    <div>
        <div>编辑{{ module_label }}</div>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_module_view_edit', this)
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
<template>
    <div>
        <div>{{ module_label }}列表</div>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_module_view', this)
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
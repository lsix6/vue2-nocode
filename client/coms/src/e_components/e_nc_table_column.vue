<template>
    <div>
        {{ label }}
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('e_nc_table_column', this)
    },
    props: {
        label: {
            type: String,
            default: '',
        },
    },
    mounted() {
        // console.log('[e_nc_table_column] mounted()', this)
    },
}
</script>
<template>
    <div v-bind="{ ...$attrs, ...$props }">
        {{ value }}
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_div', this)
    },
    props: {
        value: undefined,
    },
    mounted() {
        console.log('[nc_div] mounted', this.value, typeof (this.value))
    },
    beforeUpdate() {
        // console.log('[nc_div] beforeUpdate', this.value, this.data_source_name)
    },
}
</script>
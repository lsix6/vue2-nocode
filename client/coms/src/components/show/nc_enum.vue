<template>
    <span v-bind="{ ...$attrs, ...$props }">
        {{ text }}
    </span>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_enum', this)
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        enum_map: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
            text: '',
        }
    },
    mounted() {
        if (this.enum_map) {
            this.text = this.enum_map[this.value]
        }
    },
}
</script>
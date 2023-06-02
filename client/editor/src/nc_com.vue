<template>
    <component :is="com_name" v-bind="com_props" :com_params="com_params">
        <template v-slot="slotProps">
            <slot v-bind="slotProps"></slot>
        </template>
    </component>
</template>

<script>
export default {
    props: {
        com_text: {
            type: String,
            default: null
        },
        com_name: {
            type: String,
            default: ''
        },
        com_info: {
            type: Object,
            default: () => { }
        },
        com_props: {
            type: Object,
            default: () => { }
        },
        com_ref: {
            type: String,
            default: null
        },
        com_field: {
            type: Object,
            default: null
        },
        com_syncs: {
            type: Array,
            default: null
        },
        com_events: {
            type: Array,
            default: null
        },
        com_children: {
            type: Array,
            default: null
        },
        com_binds: {
            type: Array,
            default: null
        },
        com_if: {
            type: Object,
            default: null
        },
        com_params: {
            type: Object,
            default: null
        },
    },

}
</script>
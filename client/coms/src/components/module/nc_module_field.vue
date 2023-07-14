<template>
    <div>
        <div>{{ field_label }}({{ field_name }})</div>
        <div class="nc-module-field-slots">
            <div class="flex-container nc-module-field-slot">
                <slot name="in_list"></slot>
            </div>
            <div class="flex-container nc-module-field-slot">
                <slot name="in_search"></slot>
            </div>
            <div class="flex-container nc-module-field-slot">
                <slot name="in_form"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_module_field', this)
    },
    props: {
        field_name: {
            type: String,
            default: '',
        },
        field_label: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped>
.nc-module-field-slots {
    display: flex;
    flex-direction: row;

    .nc-module-field-slot {
        border: dashed 1px lightblue;
    }
}
</style>
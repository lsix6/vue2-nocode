<template>
    <div>
        <div class="bind-item" v-for="(item, i) in value" :key="i">
            <el-select class="prop-name" v-model="item.prop_name" @change="(v) => { onChange(v, i) }" size="small">
                <el-option v-for="prop in propList" :key="prop" :label="prop" :value="prop">
                </el-option>
            </el-select>
            <SelectField v-model="item.field_name" />
        </div>
        <el-button @click="onAdd" size="small">+</el-button>
    </div>
</template>

<script>
import UiFieldBase from './UiFieldBase.vue';
import SelectField from './SelectField.vue';

export default {
    extends: UiFieldBase,
    install(Vue) {
        Vue.component('SetBinds', this)
    },
    components: {
        SelectField,
    },
    computed: {
        prop_names() {
            return this.schema['ui:prop_names'] || []
        },
        propList() {
            return [...this.prop_names, '-']
        },
    },
    mounted() {
        console.log('[SetBinds] mounted', this)
        //
        if (this.value.length === 0) {
            this.prop_names.forEach(prop => {
                this.value.push({
                    prop_name: prop,
                    field_name: '',
                })
            })
        }
    },
    methods: {
        onAdd() {
            this.value.push({
                prop_name: '',
                field_name: '',
            })
        },
        onChange(v, i) {
            if (v === '-') {
                this.value.splice(i, 1)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.bind-item {
    display: flex;
    flex-direction: row;

    .prop-name {
        width: 100px;
    }
}
</style>
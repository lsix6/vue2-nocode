<template>
    <nc_module_view_list v-if="subPath === 'list'" :module_label="module_label" />
    <nc_module_view_add v-else-if="subPath === 'add'" :module_label="module_label" />
    <nc_module_view_edit v-else-if="subPath === 'edit'" :module_label="module_label" />
</template>

<script>
import nc_module_view_list from './nc_module_view_list.vue'
import nc_module_view_add from './nc_module_view_add.vue'
import nc_module_view_edit from './nc_module_view_edit.vue'

export default {
    install(Vue) {
        Vue.component('nc_module_view', this)
    },
    components: {
        nc_module_view_list,
        nc_module_view_add,
        nc_module_view_edit,
    },
    props: {
        module_label: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            subPath: '',
        }
    },
    watch: {
        $route(newV) {
            // console.log('[nc_view] watch route', newV)
            this.switchPage(newV.path)
        }
    },
    created() {
        this.switchPage(this.$route.path)
    },
    methods: {
        switchPage(path) {
            console.log('[nc_module_view] switchPage', path)
            //
            const i = path.lastIndexOf('/')
            this.subPath = path.substring(i + 1)
        }
    },
}
</script>
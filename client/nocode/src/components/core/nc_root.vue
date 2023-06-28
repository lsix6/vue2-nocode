<template>
    <div>
        <nc_component v-for="(com, i) in com_list" :key="i" :com_root="root" v-bind="com" />
        <slot v-if="root" v-bind="{ com_root: root }"></slot>
    </div>
</template>

<script>
import { ComRefsManager } from '@/utils/com_refs_manager';


export default {
    install(Vue) {
        Vue.component('nc_root', this)
    },
    name: 'nc_root',
    props: {
        com_list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            root: null,
        };
    },
    created() {
        this.root = {
            refsMgr: new ComRefsManager(),
        }
        console.log('[nc_root] created, com_root', this.root)
    },
    mounted() {
    },
}
</script>
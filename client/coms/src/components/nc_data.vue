<template>
    <div v-bind="node_props" :data="data">
        <template v-if="data_children && data">
            <nc_children :com_children="data_children" :com_params="{ ...com_params, ...data }">
            </nc_children>
        </template>
    </div>
</template>

<script>
import { fetch_data } from '../utils/nc_request'

export default {
    install(Vue) {
        Vue.component('nc_data', this)
    },
    props: {
        node_props: {
            type: Object,
            default: null
        },
        fetch_data: {
            type: Object,
            default: null
        },
        data_children: {
            type: Array,
            default: null
        },
        com_params: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            data: null,
        }
    },
    mounted() {
        // console.log('[nc_data] mounted, com_params:', this.com_params)
        setTimeout(() => {
            // com_ref 需要在 mounted 注册，访问数据可能要用到 com_ref 参数，
            // 所以这里需要延后一帧再调用
            this.refreshData()
        }, 0);
    },
    methods: {
        refreshData() {
            return new Promise(resolve => {
                if (this.fetch_data) {
                    fetch_data(this.fetch_data).then(data => {
                        console.log('[nc_data] fetch_data, return:', data)
                        this.data = data
                        this.$el.dispatchEvent(new Event('loaded'))
                        //
                        resolve(true)
                    })
                } else {
                    resolve(true)
                }
            })
        },
    }
}
</script>

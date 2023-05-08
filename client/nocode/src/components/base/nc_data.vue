<template>
    <div v-bind="node_props" :data="data">
        <template v-if="data_children && data">
            <nc_children :com_children="data_children" :com_params="{ ...com_params, ...data }">
            </nc_children>
        </template>
    </div>
</template>

<script>
import { fetch_data } from '../../utils/nc_request'

export default {
    install(Vue) {
        Vue.component('nc_data', this)
    },
    props: {
        node_props: {
            type: Object,
            default: null
        },
        data_sources: {
            type: Array,
            default: () => []
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
        this.refreshData()
    },
    methods: {
        refreshData() {
            return new Promise(resolve => {
                if (this.data_sources.length > 0) {
                    Promise.all(
                        this.data_sources.map(ds => {
                            return fetch_data(this, ds)
                        })
                    ).then(results => {
                        this.data = {}
                        this.data_sources.forEach((ds, i) => {
                            this.data[ds.set_name] = results[i]
                        })
                        //
                        console.log('[nc_data] refreshData, data:', this.data)
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

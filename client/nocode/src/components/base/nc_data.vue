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
            type: Object,
            default: () => { }
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
        this.refreshAll()
    },
    methods: {
        refreshAll() {
            return new Promise(resolve => {
                const arrDS = []
                for (let k in this.data_sources) {
                    arrDS.push({
                        ...this.data_sources[k],
                        set_name: k,
                    })
                }
                if (arrDS.length > 0) {
                    Promise.all(
                        arrDS.map(ds => {
                            return fetch_data(this, ds)
                        })
                    ).then(results => {
                        this.data = {}
                        arrDS.forEach((ds, i) => {
                            this.data[ds.set_name] = results[i]
                        })
                        //
                        console.log('[nc_data] refreshAll, data:', this.data)
                        this.$el.dispatchEvent(new Event('loaded'))
                        //
                        resolve(true)
                    })
                } else {
                    resolve(true)
                }
            })
        },
        refresh(params) {
            return new Promise((resolve) => {
                const dsName = params.ds_name
                const ds = this.data_sources[dsName]
                if (ds) {
                    fetch_data(this, ds).then(result => {
                        this.data = {
                            ...this.data,
                        }
                        this.data[dsName] = result
                        console.log('[nc_data] refresh,', params, this.data)
                    })
                } else {
                    resolve(true)
                }
            })
        },
    }
}
</script>

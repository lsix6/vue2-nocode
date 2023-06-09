<template>
    <div v-bind="node_props" :data="data">
        <template v-if="data_children && data">
            <nc_children :com_children="data_children" :com_data="{ ...com_data, ...data }">
            </nc_children>
        </template>
        <slot v-if="data" v-bind:com_data="{ ...com_data, ...data }"></slot>
    </div>
</template>

<script>
import { fetch_data } from '../../utils/nc_request'

export default {
    install(Vue) {
        Vue.component('nc_data_source', this)
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
        com_data: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            data: null,
        }
    },
    watch: {
        data_sources: {
            handler() {
                this.refreshAll()
            },
            deep: true,
        },
    },
    mounted() {
        // console.log('[nc_data_source] mounted, com_data:', this.com_data)
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
                        console.log('[nc_data_source] refreshAll, data:', this.data)
                        this.$el.dispatchEvent(new Event('loaded'))
                        //
                        resolve(true)
                    }).catch(errs => {
                        this.data = {}
                        console.error('[nc_data_source] refreshAll, fetch_data errors:', errs)
                    })
                } else {
                    this.data = {}
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
                        console.log('[nc_data_source] refresh,', params, this.data)
                    }).catch(e => {
                        console.error('[nc_data_source] refresh, fetch_data error:', e)
                    })
                } else {
                    resolve(true)
                }
            })
        },
    }
}
</script>

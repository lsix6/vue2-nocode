<template>
    <div class="flex-container" v-bind="node_props" :data="data">
        <slot v-if="data || !this.show_children_after_got_data" v-bind="{ com_root, com_data: finalComData }"></slot>
    </div>
</template>

<script>
import _ from 'lodash'

const fetch_data = window.nocode.fetch_data

export default {
    install(Vue) {
        Vue.component('nc_data_source', this)
    },
    props: {
        show_children_after_got_data: {
            type: Boolean,
            default: true,
        },
        node_props: {
            type: Object,
            default: null
        },
        data_sources: {
            type: Array,
            default: () => []
        },
        com_root: {
            type: Object,
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
    computed: {
        data_sources_map() {
            const map = {}
            this.data_sources.forEach(ds => {
                map[ds.name] = ds
            })
            return map
        },
        finalComData() {
            const comData = {
                ...this.com_data,
                __ds: this.data,
            }
            console.log('[nc_data_source] finalComData:', comData)
            return comData
        },
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
        console.log('[nc_data_source] mounted, data_sources:', this.data_sources)
        this.refreshAll()
    },
    methods: {
        refreshAll() {
            return new Promise(resolve => {
                const arrDS = []
                for (let ds of this.data_sources) {
                    arrDS.push({
                        ...ds,
                        set_name: ds.name,
                    })
                }
                if (arrDS.length > 0) {
                    Promise.all(
                        arrDS.map(ds => {
                            return this.fetchData(this, ds)
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
                        console.error('[nc_data_source] refreshAll, fetchData errors:', errs)
                    })
                } else {
                    this.data = {}
                    resolve(true)
                }
            })
        },
        refresh(params) {
            // console.log('[nc_data_source] refresh,', params)
            return new Promise((resolve) => {
                const dsName = params.ds_name
                const ds = this.data_sources_map[dsName]
                if (ds) {
                    this.fetchData(this, ds).then(result => {
                        this.data = {
                            ...this.data,
                        }
                        this.data[dsName] = result
                        console.log('[nc_data_source] refresh,', params, this.data)
                    }).catch(e => {
                        console.error('[nc_data_source] refresh, fetchData error:', e)
                    })
                } else {
                    console.error('[nc_data_source] refresh, not found ds', dsName, this.data_sources_map)
                    resolve(true)
                }
            })
        },
        fetchData(com, ds) {
            if (ds.type === 'obj') {
                return new Promise((resolve, reject) => {
                    try {
                        const obj = _.cloneDeep(ds.obj)
                        resolve(obj)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (ds.type === 'api') {
                return fetch_data(com, {
                    api: {
                        ...ds.api,
                        method: 'GET',
                    }
                }).catch(errs => {
                    console.error('[nc_data_source] fetchData, api errors:', errs)
                })
            }
            //
            return new Promise(resolve => {
                resolve(null)
            })
        },
    }
}
</script>

<template>
    <div class="flex-container" v-bind="node_props" :data="data">
        <slot v-if="data || !this.show_children_after_got_data" v-bind="{ com_root, com_data: finalComData }"></slot>
    </div>
</template>

<script>
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
        console.log('[nc_data_source] mounted, com_data:', this.com_data)
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
            if (ds.enum && ds.enum.length > 0) {
                const arr2enum = (arr) => {
                    const map = {}
                    arr.forEach((item, i) => {
                        map[i + 1] = item
                    })
                    return map
                }
                return new Promise((resolve) => {
                    resolve(arr2enum(ds.enum))
                })
            } else if (ds.enum_map) {
                return new Promise((resolve) => {
                    resolve({
                        ...ds.enum_map
                    })
                })
            } else if (ds.obj) {
                return new Promise((resolve, reject) => {
                    try {
                        const obj = JSON.parse(ds.obj)
                        resolve(obj)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            //
            return fetch_data(com, ds)
        },
    }
}
</script>

<template>
    <div v-bind="node_props" :data="data">
        <template v-if="data_children && data">
            <template v-if="isArray(data)">
                <nc_children 
                    v-for="(rec, recIndex) in data"
                    :key="recIndex"
                    :com_children="data_children" 
                    :com_params="{ 
                        ...com_params,
                        ...rec,
                        nc_data_is_first: (recIndex === 0),
                        nc_data_is_last: (recIndex === (data.length - 1))
                    }"
                >
                </nc_children>
            </template>
            <nc_children v-else :com_children="data_children" :com_params="{ ...com_params, ...data }">
            </nc_children>
        </template>
    </div>
</template>

<script>
import { get_params } from '../utils/nc_params'
import { request_api } from '../utils/nc_request'
import _ from 'lodash'

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
        fetchData(fetch_data) {
            return new Promise(resolve => {
                if (fetch_data.api) {
                    //  请求 api 获取数据
                    const fetchParams = get_params(this, fetch_data.fetch_params)
                    const requestParams = { ...fetchParams }
                    request_api(fetch_data.api, requestParams).then(data => {
                        resolve(data)
                    })
                } else {
                    // 参数里获取到的就是数据
                    // console.log('[nc_data] fetchData, fetch_data:', fetch_data)
                    const fetchParams = get_params(this, fetch_data.fetch_params)
                    const data = fetchParams[fetch_data.fetch_params[0].params_fields[0]]
                    resolve(data)
                }
            })
        },
        refreshData() {
            return new Promise(resolve => {
                if (this.fetch_data) {
                    this.fetchData(this.fetch_data).then(data => {
                        console.log('[nc_data] fetchData, return:', data)
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
        isArray(obj) {
            return _.isArray(obj)
        },
    }
}
</script>

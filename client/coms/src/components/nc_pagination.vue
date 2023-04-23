<template>
    <el-pagination v-bind="pagination_props" 
        :current-page.sync="data.currentPage" :page-size.sync="data.pageSize"
        :total.sync="data.total"
        @current-change="onChange"
        @size-change="onChange"
    ></el-pagination>
</template>

<script>
export default {
    install(Vue) {
        Vue.component('nc_pagination', this)
    },
    props: {
        pagination_props: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            data: {
                currentPage: 1,
                pageSize: 0,
                total: 0,
            },
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.data.pageSize = this.pagination_props['page-sizes'][0]
        },
        getData() {
            return {
                pageIndex: this.data.currentPage,
                pageSize: this.data.pageSize,
            }
        },
        setData(pageData) {
            this.data.total = pageData.totalCount
        },
        onChange() {
            this.$emit('change')
        }
    }
}
</script>
<template>
    <el-pagination v-bind="pagination_props" :current-page.sync="data.currentPage" :page-size.sync="data.pageSize"
        :total.sync="data.total" @current-change="onChange" @size-change="onChange"></el-pagination>
</template>

<script>

const storageManager = window.nocode.storageManager

export default {
    install(Vue) {
        Vue.component('nc_pagination', this)
    },
    props: {
        pagination_props: {
            type: Object,
            default: () => { }
        },
        page_data: {
            type: Object,
            default: () => { }
        },
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
    computed: {
        dataMethods() {
            return ['getData']
        },
    },
    watch: {
        page_data: {
            handler() {
                // console.log('[nc_pagination] watch, page_data:', this.page_data)
                // 只在 'page_data' 变化时，才把变化后的值更新到 'data' 中
                this.updateData()
            },
            deep: true,
        },
    },
    created() {
        // console.log('[nc_pagination] created, data:', { ...this.data }, this.$route)
        // 获取之前保存在内存中的翻页数据
        const savedData = storageManager.getItemInMem(this.$route.fullPath)
        if (savedData) {
            this.data = savedData
        }
    },
    mounted() {
        // console.log('[nc_pagination] mounted, data:', { ...this.data })
        this.updateData()
    },
    beforeUpdate() {
        // console.log('[nc_pagination] beforeUpdate, page_data:', this.page_data)
    },
    methods: {
        updateData() {
            if (this.page_data) {
                this.data.currentPage = this.page_data.pageNumber
                this.data.pageSize = this.page_data.pageSize
                this.data.total = this.page_data.totalCount
            }
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
            // console.log('[nc_pagination] onChange, data:', { ...this.data })
            // 保存翻页数据到内存中
            storageManager.setItemInMem(this.$route.fullPath, { ...this.data })
            //
            this.$emit('change')
        }
    }
}
</script>
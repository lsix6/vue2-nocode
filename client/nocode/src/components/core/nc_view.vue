<template>
  <nc_root v-if="comObj && comObj.com_version === '1'" :coms_list="[comObj]" />
</template>

<script>

import nc_root from './nc_root.vue'

export default {
  install(Vue) {
    Vue.component('nc_view', this)
  },
  name: 'nc_view',
  components: {
    nc_root
  },
  data() {
    return {
      pageRoute: null,
      comObj: null,
    }
  },
  watch: {
    $route(newV, oldV) {
      // console.log('[nc_view] watch route', newV, oldV)
      this.switchPage(newV.path)
    }
  },
  created() {
    this.switchPage(this.$route.path)
  },
  methods: {
    switchPage(path) {
      const pagesManager = window.nocode.pagesManager
      //
      this.pageRoute = path.substring(pagesManager.get_base_path().length)
      console.log('[nc_view] switchPage', path, this.pageRoute)
      //
      this.refresh()
    },
    getPageData() {
      return new Promise(resolve => {
        const pagesManager = window.nocode.pagesManager
        //
        const page = pagesManager.get_page(this.pageRoute)
        if (typeof page === 'function') {
          page().then(ret => {
            resolve(ret.default)
          })
        } else {
          resolve(page)
        }
      })
    },
    refresh() {
      // 先要把根节点清空一下才能保证子组件的生命周期被正确调用
      this.comObj = null
      // 获取页面数据的函数

      setTimeout(() => {
        // 延迟一帧后获取数据
        this.getPageData().then(pageData => {
          this.comObj = pageData
          // console.log('[nc_view] comObj', this.comObj)
        })
      }, 0)
    },
  },
}
</script>

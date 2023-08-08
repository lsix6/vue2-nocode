<template>
  <nc_component v-if="comObj" v-bind="{ ...comObj, com_root }" />
</template>

<script>
import nc_base from './nc_base.vue'

export default {
  extends: nc_base,
  install(Vue) {
    Vue.component('nc_view', this)
  },
  name: 'nc_view',
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
  mounted() {
    console.log('[nc_view] mounted', this.$props)
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
      // 获取页面数据
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

      setTimeout(() => {
        // 延迟一帧后获取数据
        this.getPageData().then(pageData => {
          this.comObj = pageData
          // console.log('[nc_view] comObj', this.comObj)
        })
      }, 0)
    },
    getPageRoute() {
      return this.pageRoute
    },

  },
}
</script>

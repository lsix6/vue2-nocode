<template>
  <nc_component v-if="com_data && com_data.com_version === '0'" v-bind="com_data">
  </nc_component>
</template>

<script>

import { nc_pages, nc_view_route } from './nc_pages.js';

export default {
  data() {
    return {
      com_data: null
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
      const pageRoute = path.substring(nc_view_route.length)
      console.log('[nc_view] switchPage', path, pageRoute)
      // 先要把根节点清空一下才能保证子组件的生命周期被正确调用
      this.com_data = null
      // 获取页面数据的函数
      function getPageData() {
        return new Promise(resolve => {
          const page = nc_pages[pageRoute]
          if (typeof page === 'function') {
            page().then(ret => {
              resolve(ret.default)
            })
          } else {
            resolve(page)
          }
        })
      }
      setTimeout(() => {
        // 延迟一帧后获取数据
        getPageData().then(pageData => {
          this.com_data = pageData
          // console.log('[nc_view] com_data', this.com_data)
        })
      }, 0)
    }
  },
}
</script>

<template>
  <nc_component v-if="comObj && comObj.com_version === '1'" v-bind="comObj">
  </nc_component>
</template>

<script>

import { get_page, nc_view_route } from './nc_pages.js';
import nc_component from './nc_component.vue'

export default {
  components: {
    nc_component
  },
  data() {
    return {
      comObj: null
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
      this.comObj = null
      // 获取页面数据的函数
      function getPageData() {
        return new Promise(resolve => {
          const page = get_page(pageRoute)
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
          this.comObj = pageData
          // console.log('[nc_view] comObj', this.comObj)
        })
      }, 0)
    }
  },
}
</script>

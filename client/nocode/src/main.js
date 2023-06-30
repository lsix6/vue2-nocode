import Vue from 'vue'
import VueRouter from 'vue-router'
import { init_nocode } from './init_nocode'
import { get_nc_view_route } from './components/core/nc_pages'
import App from './App.vue'

// css 样式
import './assets/css/main.scss'
import { init_vue } from './init_vue'

Vue.config.productionTip = false

init_vue(Vue)

export const start = async () => {

  //
  await init_nocode()

  //
  const ncRoute = get_nc_view_route()

  // 路由初始化 history模式
  const router = new window.nocode.VueRouter({
    mode: 'history',
    base: '/nocode/',
    routes: [ncRoute]
  })

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

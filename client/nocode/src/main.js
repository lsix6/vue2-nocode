import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './App.vue'
import { get_nc_view_route } from './components/nc_pages'
import { init_nocode } from './init_nocode'

// css 样式
import './assets/css/main.scss'

Vue.config.productionTip = false

export const start = () => {

  //
  init_nocode()

  //
  const ncRoute = get_nc_view_route()

  // 路由初始化 history模式
  const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [ncRoute]
  })

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

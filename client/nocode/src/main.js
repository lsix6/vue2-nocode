import { init_nocode } from './init_nocode'
import App from './App.vue'

// css 样式
import './assets/css/main.scss'
import { init_vue } from './init_vue'

const Vue = window.Vue

Vue.config.productionTip = false

init_vue(Vue)

export const start = async () => {

  //
  await init_nocode()

  //
  const pagesManager = window.nocode.pagesManager
  const ncRoutes = pagesManager.get_routes()

  // 路由初始化 history模式
  const router = new window.nocode.VueRouter({
    mode: 'history',
    base: '/nocode/',
    routes: [ncRoutes]
  })

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

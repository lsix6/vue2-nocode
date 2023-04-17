import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './App.vue'

Vue.config.productionTip = false

export const start = () => {

  // 路由初始化 history模式
  const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: []
  })

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

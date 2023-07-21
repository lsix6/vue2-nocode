// css 样式
import './assets/css/main.scss'
import routes from './routes'
import App from './App.vue'

export const start = async () => {

  const Vue = window.Vue

  const router = new window.nocode.VueRouter({
    mode: 'history',
    routes,
  })

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')

}
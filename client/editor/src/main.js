// css 样式
import './assets/css/main.scss'
import elementui from './elementui/index.js'
import routes from './routes'
import App from './App.vue'

export const start = async () => {

  const Vue = window.Vue
  Vue.use(elementui)

  const router = new window.nocode.VueRouter({
    mode: 'history',
    routes,
  })

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')

}
// css 样式
import './assets/css/main.scss'
import elementui from './elementui/index.js'

import Vue from 'vue'
import App from './App.vue'

Vue.use(elementui)

Vue.config.productionTip = false

export const start = async () => {

  new Vue({
    render: h => h(App),
  }).$mount('#app')

}
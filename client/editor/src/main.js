// css 样式
import './assets/css/main.scss'
import elementui from './elementui/index.js'

import Vue from 'vue'
import App from './App.vue'

import nc_com from './nc_com.vue'

Vue.component('nc_com', nc_com)

Vue.use(elementui)

Vue.config.productionTip = false

export const start = async () => {

  new Vue({
    render: h => h(App),
  }).$mount('#app')

}
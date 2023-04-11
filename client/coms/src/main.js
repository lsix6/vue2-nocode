
console.log('[coms] main.js')

const registerComponents = (Vue) => {
  console.log('[coms] register components')
  Vue.component('HelloWorld', () => import('./components/HelloWorld.vue'))
}

if (window.Vue) {
  // 主应用中赋值了 window.Vue
  // 远程调用
  registerComponents(window.Vue)
} else {
  // 本地调试
  Promise.all([
    import('vue'),
    import('./App.vue'),
  ]).then(([vueModule, appModule]) => {
    const Vue = vueModule.default
    const App = appModule.default
    // console.log('[coms] import', Vue, App)
    //
    registerComponents(Vue)
    //
    Vue.config.productionTip = false

    new Vue({
      render: h => h(App),
    }).$mount('#app')
  })

}

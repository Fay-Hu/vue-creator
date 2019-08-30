import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'
import 'promise-polyfill/src/polyfill'

import router from './router'
import './router/permission'

import store from './store'
import API from '@/api'

import '@/libs'
import '@/plugins'

Vue.config.productionTip = false
Vue.prototype.$API = API

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

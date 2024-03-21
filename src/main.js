import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

import uView from 'uview-ui'
Vue.use(uView)

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

const app = new Vue({
  ...App
})
app.$mount()

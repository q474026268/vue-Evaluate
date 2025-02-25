// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './common/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/veeValidate.js'
import {store} from './store/store.js'
// 自定义样式
import '@/style/index.css' // global css
import echarts from 'echarts' //引入echarts
import 'echarts/theme/macarons.js'//引入echarts的主题
Vue.prototype.$echarts = echarts //引入组件

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})

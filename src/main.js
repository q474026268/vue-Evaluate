// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EcidiComponents from 'ecidi-components'
import 'ecidi-components/lib/ecidi.css'
import App from './App'
import router from './common/router'
import './utils/veeValidate.js'
import {store} from './store/store.js'
// 自定义样式
import '@/style/index.css' // global css
import echarts from 'echarts' //引入echarts
import 'echarts/theme/macarons.js'//引入echarts的主题
import { getNowLoginPerson } from './api/loginApi'
Vue.prototype.$echarts = echarts //引入组件
let tableWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth
Vue.prototype.$tableWidth = tableWidth-145
// 选人、选部门控件Ip地址
Vue.prototype.$chosePeopleOrDept = 'http://10.215.136.245:17200'
Vue.use(ElementUI)
Vue.use(EcidiComponents)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//   if(!top.onlineUser || top.onlineUser.UserNotLogin == 1) { // 进入未登录成功的处理逻辑
//     debugger
//     if (to.name=='loginBlank') {
//       next()
//     } else {
//       debugger
//       // 调用取用户信息接口
//       // 成功,失败就跳回OA
//       getNowLoginPerson().then((result) => {
//         debugger
//         if (result.UserNotLogin==1) {
//           window.location.href=process.env.LOGIN_API // 根据当前环境判断跳转方式
//         }else{
//           top.onlineUser = result
//           next()
//         }
//       }).catch((err) => {
//         window.location.href=process.env.LOGIN_API // 根据当前环境判断跳转方式
//         // if (fileIp!='webproduce.ecidi.com:80') {
//         //   window.location.href="http://oa.simulate.com";
//         // }else{
//         //   window.location.href="http://oa.ecidi.com";
//         // }
//       });
//     }
//   } else { // 登录成功后进入登录成功的处理逻辑
//     debugger
//     if (to.name == 'loginBlank') {
//       next({name:'home'})
//     } else {
//       if (process.env.NODE_ENV=="development") {
//         next()
//         return
//       }
//     }
//   }
// })

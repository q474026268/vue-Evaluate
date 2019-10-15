<!--
 * @Des: 
 * @Author: jin_yc
 * @Date: 2019-08-21 09:32:58
 * @LastEditor: jin_yc
 * @LastEditTime: 2019-09-23 13:58:53
 -->
<template>
  <div class="loginBlank">
    <div class="bodyDiv"></div>
  </div>
</template>

<script>
import { DeCode } from '@/utils/common'
import { loginAuthentication, getNowLoginPerson, getSecretKey, overseaLogin } from '@/api/loginApi'
// import loginBackground from '../../assets/loginBackground.jpg'
export default {
  name: 'loginBlank',
  data() {
    return {
      // loginBackground,
      // fileIp:fileIp
    }
  },
  created() {
    let me=this
    if (!(this.$route.query.X1 && this.$route.query.X2)) { // 如果不带x1 x2直接返回oa登录
      window.location.href=process.env.LOGIN_API
      return
    }
    debugger
    // 如果进入的是空白登录页
    // 取路径参数 账号密码
    let X1=DeCode(this.$route.query.X1)
    let X2=DeCode(this.$route.query.X2).substring(0,DeCode(this.$route.query.X2).indexOf("||"));
    let action={
      action:'getPubkey'
    }
    // overseaLogin(this.$route.query.X1, this.$route.query.X2).then(res => {
      // jin_yc gKgJkK4LyLfM   dIfMjKfLgJjM8JxCtEpDnAsEuA6BCSDTsCmDrCpCsE
      // li_y29  mKlM5KxInDxC   HMoLrBqDtAsDnDmEqArBwMBRtDtEtBsCoD
    overseaLogin('hLiLiM3MxIbI', 'hLiLlLwJbIuK9MpKsIAQBRqAoBpEmEqD').then(res => { // 该登录只能用正式环境的X1，X2 模拟环境写死d
    debugger
      if (res.status!='200') {
        window.location.href=process.env.LOGIN_API
        return
      }
      debugger
      // 获取秘钥
      getSecretKey(action).then((result) => {
        debugger
        document.cookie = "AESKey=; path=/";
        document.cookie = "AESEncryption=" + escape(false) + "; path=/";
        // 调登录接口
        // 成功进home，失败进OA
        const logindata = {
          action: 'tologin',
          login: true,
          username: X1,
          password: X2,
          saveInfo: true,
          local: ''
        }
        loginAuthentication(logindata).then(res => {
          debugger
          // console.log(process.env)
            var theme = res.thememap;
            window.localStorage.FixTheme = theme.Name;
            for (var item in theme){
              window.localStorage[item] = theme[item];
            }
            window.localStorage.Local = res.local;
            if (res.login == "false") {
              res.login = false;
              window.location.href=process.env.LOGIN_API // 根据当前环境判断跳转方式
              // if (process.env.NODE_ENV=="production") { // 根据当前环境判断跳转方式
              //   window.location.href=process.env.VUE_APP_LOGIN_API;
              //   // window.location.href="http://oa.ecidi.com";
              // } else {
              //   window.location.href=process.env.VUE_APP_LOGIN_API;
              //   // window.location.href="http://oa.simulate.com";
              // }
            } else {
              // next({name:'home'}) // 登录成功则进入home页面
              this.$router.push({name:'home',params:{refresh:true}})
            }
        }).catch((err)=>{
          window.location.href=process.env.LOGIN_API // 根据当前环境判断跳转方式
        })
      }).catch((err) => {
        // window.location.herf=process.env.LPGIN_API
        window.location.href=process.env.LOGIN_API // 根据当前环境判断跳转方式
        // if (process.env.NODE_ENV == "production") { // 根据当前环境判断跳转方式
        //   window.location.href="http://oa.ecidi.com";
        // } else {
        //   window.location.href="http://oa.simulate.com";
        // }
      })
    })
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .bodyDiv{
    height: 100vh;
    background: url(../../assets/img/sys_login_XL.png) no-repeat;
    background-size:100% 100%;
  }
  @media screen and (min-width:0px) and (max-width:1380px){
    .bodyDiv{
      height: 100vh;
      background: url(../../assets/img/sys_login_M.png) no-repeat;
      background-size:100% 100%;
    }
  }
</style>

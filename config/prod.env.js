'use strict'
// const target = process.env.NODE_ENV;
// if(target == 'test'){
  //测试环境
  var obj = {
    NODE_ENV: '"production"',
    BASE_API: '"http://10.215.136.245:11330/"',
    USER_API:'"http://10.215.136.245:11200/"',
    LOGIN_API:'http://oa.simulate.com',
    OVERSEA_LOGIN_API:'http://webproduce.simulate.com:8080',
    // 模拟
    COMMON_API : 'http://10.215.136.245:17200'
    // // 正式
    // COMMON_API : 'http://msapp.ecidi.com:17200/'
  }
// }else{
//   //运行环境
//   var obj = {
//     NODE_ENV: '"production"',
//     BASE_API: '""',
//     USER_API:'""'
//   }
// }
module.exports =obj

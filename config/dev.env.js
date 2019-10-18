'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"/api"',
  USER_API:'"http://10.215.136.245:11200/"',
  // OA地址
  LOGIN_API:'"http://oa.simulate.com"',
  OVERSEA_LOGIN_API :'"http://webproduce.simulate.com:8080"',
  COMMON_API : '"http://10.215.136.245:17200"'
})

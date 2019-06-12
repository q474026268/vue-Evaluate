import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  //评价管理
  {
    path: '/', component: () => import('../../components/OnlineEvaluation'), name: 'onlineEvaluation', redirect: { name: 'evaluatePlanList' },
    children: [

      {//评价计划
        path: '/evaluatePlanList', component: () => import('../../components/OnlineEvaluation/EvaluationPlan'), name: 'evaluatePlanList',
        children: [
          { path: '/evaluationPlan', component: () => import('../../components/OnlineEvaluation/EvaluationPlan/evaluationPlan.vue'), name: 'evaluationPlan' },]
      },
      {//指标管理
        path: '/indexManageList', component: () => import('../../components/OnlineEvaluation/IndexManage'), name: 'indexManageList',
        children: [
          { path: '/indexManage', component: () => import('../../components/OnlineEvaluation/IndexManage/indexManage.vue'), name: 'indexManage' },
          { path: '/indexManageRight', component: () => import('../../components/OnlineEvaluation/IndexManage/indexManageRight.vue'), name: 'indexManageRight' },
        ]
      },
      {//模板表管理
        path: '/evaluateModelList', component: () => import('../../components/OnlineEvaluation/EvaluateModel'), name: 'evaluateModelList',
        children: [
          { path: '/evaluateModel', component: () => import('../../components/OnlineEvaluation/EvaluateModel/evaluateModel.vue'), hidden: true, name: 'evaluateModel' },
          { path: '/evaluateClient', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClient.vue'), hidden: true, name: 'evaluateClient' },
          { path: '/evaluateClientView', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClientView.vue'), hidden: true, name: 'evaluateClientView' },
          { path: '/evaluateHistory', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateHistory.vue'), hidden: true, name: 'evaluateHistory' },
        ]
      },
      {//分发历史查询
        path: '/handoutHistorySearchList', component: () => import('../../components/OnlineEvaluation/HandoutHistorySearch'), name: 'handoutHistorySearchList',
        children: [
          { path: '/handoutHistorySearch', component: () => import('../../components/OnlineEvaluation/HandoutHistorySearch/handoutHistorySearch.vue'), name: 'handoutHistorySearch' },
          { path: '/handoutView', component: () => import('../../components/OnlineEvaluation/HandoutHistorySearch/handoutView.vue'), name: 'handoutView' },
        ]
      },
    ]
  },
  {//统计查询
    path: '/statisticsInquire', component: () => import('../../components/statisticsInquire'), name: 'statisticsInquire',redirect:{name:'employeeEvaluation'},
    children: [
      { path: '/employeeEvaluation', component: () => import('../../components/statisticsInquire/employeeEvaluation'), name: 'employeeEvaluation' },
    ]
  },
  {
    path: '/fillEvaluation', component: () => import('../../components/FillEvaluation'), name: 'fillEvaluation',redirect:{name:'evaluateReceived'},
    children:[
      {//评价表填写
        path: '/evaluateReceived', component: () => import('../../components/FillEvaluation/EvaluateReceived'), name: 'evaluateReceived',
        children:[
          {
            path:'/evaluateReceived/EvaluateClientSec',component:()=> import('../../components/FillEvaluation/EvaluateClientSec/EvaluateClientSec.vue'),name:'EvaluateClientSecEdit'
          }
        ]
      },
      {//个人评价反馈
        path: '/personalEvaluationFeedback', component: () => import('../../components/FillEvaluation/personalEvaluationFeedback'), name: 'personalEvaluationFeedback',
        children:[
          {
            path:'/personalEvaluationFeedback/EvaluateClientSec',component:()=> import('../../components/FillEvaluation/EvaluateClientSec/EvaluateClientSec.vue'),name:'EvaluateClientSecLook'
          }
        ]
      },
    ]
  },
  {//过程跟踪
    path: '/processTracing', component: () => import('../../components/ProcessTracingEvalution'), name: 'processTracing', redirect: { name: 'staffEvalutionList' },
    children: [
      { 
        path: '/staffEvalutionList', component: () => import('../../components/ProcessTracingEvalution/StaffEvalution'), name: 'staffEvalutionList',
        children: [
          { path: '/StaffEvalutionInfo', component: () => import('../../components/ProcessTracingEvalution/StaffEvalutionInfo/StaffEvalutionInfo.vue'), name: 'StaffEvalutionInfo' },
        ]
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap// 每次滚动后定位到页面的最顶端y=0
})


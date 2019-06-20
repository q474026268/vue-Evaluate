import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  //员工达优测评
  {
    path: '/', component: () => import('../../components/OnlineEvaluation'), name: 'onlineEvaluationStaff', redirect: { name: 'evaluatePlanListStaff' },
    children: [
      {//评价计划
        path: '/evaluatePlanListStaff', component: () => import('../../components/OnlineEvaluation/EvaluationPlan'), name: 'evaluatePlanListStaff',
        children: [
          { path: '/evaluationPlanStaff', component: () => import('../../components/OnlineEvaluation/EvaluationPlan/evaluationPlan.vue'), name: 'evaluationPlanStaff' },]
      },
      {//指标管理
        path: '/indexManageListStaff', component: () => import('../../components/OnlineEvaluation/IndexManage'), name: 'indexManageListStaff',
        children: [
          { path: '/indexManageStaff', component: () => import('../../components/OnlineEvaluation/IndexManage/indexManage.vue'), name: 'indexManageStaff' },
          { path: '/indexManageRightStaff', component: () => import('../../components/OnlineEvaluation/IndexManage/indexManageRight.vue'), name: 'indexManageRightStaff' },
        ]
      },
      {//模板表管理
        path: '/evaluateModelListStaff', component: () => import('../../components/OnlineEvaluation/EvaluateModel'), name: 'evaluateModelListStaff',
        children: [
          { path: '/evaluateModelStaff', component: () => import('../../components/OnlineEvaluation/EvaluateModel/evaluateModel.vue'), hidden: true, name: 'evaluateModelStaff' },
          { path: '/evaluateClientStaff', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClient.vue'), hidden: true, name: 'evaluateClientStaff' },
          { path: '/evaluateClientViewStaff', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClientView.vue'), hidden: true, name: 'evaluateClientViewStaff' },
          { path: '/evaluateHistoryStaff', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateHistory.vue'), hidden: true, name: 'evaluateHistoryStaff' },
        ]
      },
      {//分发历史查询
        path: '/handoutHistorySearchListStaff', component: () => import('../../components/OnlineEvaluation/HandoutHistorySearch'), name: 'handoutHistorySearchListStaff',
        children: [
          { path: '/handoutHistorySearchStaff', component: () => import('../../components/OnlineEvaluation/HandoutHistorySearch/handoutHistorySearch.vue'), name: 'handoutHistorySearchStaff' },
          { path: '/handoutViewStaff', component: () => import('../../components/OnlineEvaluation/HandoutHistorySearch/handoutView.vue'), name: 'handoutViewStaff' },
        ]
      },
    ]
  },
  {//统计查询
    path: '/statisticsInquireStaff', component: () => import('../../components/statisticsInquire'), name: 'statisticsInquireStaff', redirect: { name: 'statisticalPreprocessingListStaff' }, children: [
      {path: '/statisticsInquireStaff/statisticalPreprocessingListStaff', component: () => import('../../components/statisticsInquire/statisticalPreprocessingList'), name: 'statisticalPreprocessingListStaff',children: [
        { path: '/statisticsInquireStaff/statisticalPreprocessingViewStaff', component: () => import('../../components/statisticsInquire/statisticalPreprocessingView/statisticalPreprocessingView.vue'), name: 'statisticalPreprocessingViewStaff' },
        { path: '/statisticsInquireStaff/sendStatisticsTaskStaff', component: () => import('../../components/statisticsInquire/sendStatisticsTask/sendStatisticsTask.vue'), name: 'sendStatisticsTaskStaff' },
        { path: '/statisticsInquireStaff/statisticalClientViewStaff', component: () => import('../../components/statisticsInquire/sendStatisticsTask/statisticalClientView.vue'), name: 'statisticalClientViewStaff' },
      ]
    },
      {path: '/employeeEvaluationStaff', component: () => import('../../components/statisticsInquire/employeeEvaluation'), name: 'employeeEvaluationStaff' },
    ]
  },
  {
    path: '/fillEvaluationStaff', component: () => import('../../components/FillEvaluation'), name: 'fillEvaluationStaff',redirect:{name:'evaluateReceivedStaff'},
    children:[
      {//评价表填写
        path: '/evaluateReceivedStaff', component: () => import('../../components/FillEvaluation/EvaluateReceived'), name: 'evaluateReceivedStaff',
        children:[
          {
            path:'/evaluateReceivedStaff/EvaluateClientSec',component:()=> import('../../components/FillEvaluation/EvaluateClientSec/EvaluateClientSec.vue'),name:'EvaluateClientSecEditStaff'
          }
        ]
      },
      {//个人评价反馈
        path: '/personalEvaluationFeedbackStaff', component: () => import('../../components/FillEvaluation/personalEvaluationFeedback'), name: 'personalEvaluationFeedbackStaff',
        children:[
          {
            path:'/personalEvaluationFeedbackStaff/EvaluateClientSec',component:()=> import('../../components/FillEvaluation/EvaluateClientSec/EvaluateClientSec.vue'),name:'EvaluateClientSecLookStaff'
          }
        ]
      },
    ]
  },
  {//过程跟踪
    path: '/processTracingStaff', component: () => import('../../components/ProcessTracingEvalution'), name: 'processTracingStaff', redirect: { name: 'staffEvalutionListStaff' },
    children: [
      { 
        path: '/staffEvalutionListStaff', component: () => import('../../components/ProcessTracingEvalution/StaffEvalution'), name: 'staffEvalutionListStaff',
        children: [
          { path: '/StaffEvalutionInfoStaff', component: () => import('../../components/ProcessTracingEvalution/StaffEvalutionInfo/StaffEvalutionInfo.vue'), name: 'StaffEvalutionInfoStaff',
            children:[
              {
                path: '/StaffEvalutionInfoStaff/tableListView', component: () => import('../../components/ProcessTracingEvalution/tableListView/tableListView.vue'), name: 'tableListViewStaff',
              }
            ]
          },
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


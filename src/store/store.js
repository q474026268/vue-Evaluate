import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 在.Vue中获取用
// this.$store.state.属性

// 设置属性值
// this.$store.commit("setData",参数)

export const store = new Vuex.Store({
  state: {
    userInfo: {
      "id": '001',
      "userName": "rong_hg",
      "avatar": "ce386f75-8a6f-4af4-a97f-257a820e9505",
      "name": "荣红光",
      "sex": null,
      "birthday": null,
      "phone": null,
      "email": "admin@ecidi.com",
      "wechatId": null,
      "remark": null,
      "departmentId": "0",
      "departmentName": "华东工程数字技术有限公司",
      "deleteFlag": "0",
      "disableFlag": null,
      "wechatAvatarUrl": null,
      "wechatNickname": null,
      "signature": "管理员",
      "loginTime": "2019-05-13T08:46:58.000+0800",
      "ip": "10.215.48.35",
      "createDate": null
    },
    data: {},
    yt: {},
    history: {},
    clientView: [],
    Initialization: [],
    evaluStand:[],
    group:[],
    evaluate:[],
    leaveType:"",
    fromPkid:"",
    target:[],
    handout:{},
  },
  mutations: {
    setData(state, item) {
      state.data = item;
    },
    setYt(state, item) {
      state.yt = item;
    },
    //存储evaluateHistory的数据
    setHistory(state, item) {
      state.history = item;
    },
    //存储evaluateClientView的数据
    setClientView(state, item) {
      state.clientView = item
    },
    // 单条修改存储
    setOne(state, datas) {
      for (let i = 0; i < state.clientView.length; i++) {
        if (datas.userNo == state.clientView[i].userNo) {
          state.clientView[i].doneFullArr = datas.tableColumn
        }
      }
    },
    //初始化存储默认值
    setInitialization(state, item) {
      state.Initialization = item
    },
    //
    //被评价人是否相同
    setGroup(state, item){
      state.group=item;
    },
    //评价人是否相同
    setEvaluate(state, item){
      state.evaluate=item;
    },
    //被评价人是否相同
    clearGroup(state,item){
      state.group=item
    },
    //评价方式是否改变
    setLeaveType(state,item){
      if(state.leaveType!=item){
        state.leaveType=item
        state.group.splice(0,state.group.length);
        state.evaluate.splice(0,state.evaluate.length);
      }
    },
    //对指标进行查重
    setTarget(state,item){
      state.target=item
    },
    //对模板表管理进行刷新
    setHandout(state,item){
      state.handout=item;
    }
  }
})
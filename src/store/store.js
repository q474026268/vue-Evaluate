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
      "id": 1,
      "userName": "admin",
      "avatar": "ce386f75-8a6f-4af4-a97f-257a820e9505",
      "name": "超级管理员",
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
    Initialization:[]
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
      console.log(state.history);
    },
    //存储evaluateClientView的数据
    setClientView(state, item) {
      let isHave=false;
      for(let i=0;i<state.clientView.length;i++){
        
        if(item.userNo==state.clientView[i].userNo){
          state.clientView[i]=item;
          isHave=true;
          break;
        }
      }
      if(!isHave){
        state.clientView.push(item)
      }
    },
    //初始化存储默认值
    setInitialization(state,item){
      // console.log(state);
      state.Initialization=item
    }
  }
})
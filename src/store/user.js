import {store} from '@/store/store.js'
const user = {
    state: {
      userInfo: {
            "id":store.state.userInfo.id,
            "userName":store.state.userInfo.userName,
            "avatar":store.state.userInfo.avatar,
            "name":store.state.userInfo.name,
            "sex":store.state.userInfo.sex,
            "birthday":store.state.userInfo.birthday,
            "phone":store.state.userInfo.phone,
            "email":store.state.userInfo.email,
            "wechatId":store.state.userInfo.wechatId,
            "remark":store.state.userInfo.remark,
            "departmentId":store.state.userInfo.departmentId,
            "departmentName":store.state.userInfo.departmentName,
            "deleteFlag":store.state.userInfo.disableFlag,
            "disableFlag":store.state.userInfo.disableFlag,
            "wechatAvatarUrl":store.state.userInfo.wechatAvatarUrl,
            "wechatNickname":store.state.userInfo.wechatNickname,
            "signature":store.state.userInfo.signature,
            "loginTime":store.state.userInfo.loginTime,
            "ip":store.state.userInfo.ip,
            "createDate":store.state.userInfo.createDate
        },
    }
}

export default user
  
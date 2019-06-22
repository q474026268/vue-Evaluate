import request from '@/utils/request'

// 评价类别
const evaluKindOptions = [
    {
        value: '员工达优测评',
        label: '员工达优测评'
    }, {
        value: '内部客户满意度评测',
        label: '内部客户满意度评测'
    }
]
export function getEvaluKind() {
    return Promise.resolve({ status: 200, data: evaluKindOptions });
}

// 典型行为描述评价类别
const evaluStandOptions = [
    {
        value: '标杆(A)',
        label: '标杆(A)'
    }, {
        value: '需改进(B)',
        label: '需改进(B)'
    },{
        value: '警示(C)',
        label: '警示(C)'
    }
]
export function getEvaluStand() {
    return Promise.resolve({ status: 200, data: evaluStandOptions });
}


// 计划状态
export const planStates = [
    {
        value: 0,
        label: '暂存'
    }, {
        value: 1,
        label: '开始'
    }, {
        value: 2,
        label: '执行'
    }, {
        value: 3,
        label: '完成'
    }
]
export function getPlanState() {
    return Promise.resolve({ status: 200, data: planStates });
}

// 评价表状态
const evaluteTStateOptions = [
    {
        value: '开始',
        label: '开始'
    }, {
        value: '暂存',
        label: '暂存'
    }, {
        value: '完成',
        label: '完成'
    }
]
export function getEvaluteState() {
    return Promise.resolve({ status: 200, data: evaluteTStateOptions });
}


// 指标管理状态
export const States = [
    {
        value: 0,
        label: "有效"
    },
    {
        value: 1,
        label: "无效"
    }
]

export function PlanState() {
    return Promise.resolve({ status: 200, data: States });
}

// 评价方式
const levelTypeOptions = [
    {
        value: '上级',
        label: '上级'
    }, {
        value: '互评',
        label: '互评'
    }, {
        value: '下级',
        value: '下级'
    }
]
export function getLevelType() {
    return Promise.resolve({ status: 200, data: levelTypeOptions });
}


// 打分方式
const markTypeOptions = [
    {
        value: '等级评价',
        label: '等级评价'
    }
]

export function getMarkType() {
    return Promise.resolve({ status: 200, data: markTypeOptions });
}


// 查询等级
const selectOptions = [
    {
        value: 'A',
        label: 'A'
    },
    {
        value: 'B',
        label: 'B'
    },
    {
        value: 'C',
        label: 'C'
    },
    {
        value: 'N',
        label: 'N'
    }
]
export function getSelect() {
    return Promise.resolve({ status: 200, data: selectOptions });
}

// 统计查询状态
const statisticalStateOptions = [
    {
        value: '已统计',
        label: '已统计'
    },{
        value: '未统计',
        label: '未统计'
    }
]
export function getStatisticalState() {
    return Promise.resolve({ status: 200, data: statisticalStateOptions });
}
//登录信息
// const loginInfo = {
//     inputerUserNo:store.state.userInfo.id,
//     inputerFullName:store.state.userInfo.name,
//     groupId:store.state.userInfo.departmentId,
//     groupFullId:store.state.userInfo.departmentId,
//     groupName:store.state.userInfo.departmentName,
// }
// export function getLoginInfo(val){
//     if(val){
//         return loginInfo[val];
//     }
//     return loginInfo;
// }
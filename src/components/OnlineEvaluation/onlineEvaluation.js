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
        value: '员工达优测评',
        label: '员工达优测评'
    }, {
        value: '内部客户满意度评测',
        label: '内部客户满意度评测'
    }
]
export function getEvaluStand() {
    return Promise.resolve({ status: 200, data: evaluStandOptions });
}



// 计划状态
export const planStates = {
    0: '暂存',
    1: '开始',
    2: '执行',
    3: '完成'
}
let planStateOptions = [];
Object.keys(planStates).forEach((key) => {
    planStateOptions.push({
        value: key,
        label: planStates[key]
    });
});
export function getPlanState() {
    return Promise.resolve({ status: 200, data: planStateOptions });
}

// 评价表状态
const evaluteTStateOptions = [
    {
        value: '分发',
        label: '分发'
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
export const States = {
    0: '有效',
    1: '无效'
}
let StateOptions = [];
Object.keys(States).forEach((key) => {
    StateOptions.push({
        value: key,
        label: States[key]
    });
});
export function PlanState() {
    return Promise.resolve({ status: 200, data: StateOptions });
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
        value: '等级互评',
        label: '等级互评'
    }
]

export function getMarkType() {
    return Promise.resolve({ status: 200, data: markTypeOptions });
}


// 查询登记
const selectOptions = [
    {
        value: '',
        label: ''
    }
    ,
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
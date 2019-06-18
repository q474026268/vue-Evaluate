import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,orders,filters){
    return request({
        url: '/evaluateClient/getEvaluateClientlList',
        data:{
            currentPage,
            pageSize,
            orders:JSON.stringify(orders),
            filters:JSON.stringify(filters)
        },
        method: 'POST'
    })
}
//保存数据
export function save(data){
    return request({
        url: '/evaluateTable/saveEvaluateTable',
        data:JSON.stringify(data),
        method: 'POST',
        transformRequest: [(data) => {
            return data
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
//根据id查询数据
export function get(id){
    return request({
        url: '/evaluateModel/getEvaluateModelByPkid',
        data:{
            id
        },
        method: 'POST'
    })
}
//根据id删除数据
export function deleted(id){
    return request({
        url: '/evaluateClient/deleteEvaluateClient',
        data:{
            id
        },
        method: 'POST'
    })
}

/**
 * 获取计划类别的当前计划
 * @param {*计划类别} evaluKind 
 */
export function getCurrentEvaluate(){
    return request({
        url: '/evaluatePlan/current',
        data:{
            evaluKind:'员工达优测评'
        },
        method: 'POST'
    })
}
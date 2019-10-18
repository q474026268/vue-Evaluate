import request from '@/utils/request'

/* 主表接口 */
export function getList(currentPage, pageSize, order, filters) {
    return request({
        url: '/evaluateModel/getEvaluateTableList',
        data: {
            currentPage,
            pageSize,
            orders: JSON.stringify(order),
            filters: JSON.stringify(filters)
        },
        method: 'POST'
    })
}

export function save(data) {

    return request({
        url: '/evaluateModel/getEvaluateTableList',
        data,
        method: 'POST'
    })
}

export function get(id) {

    return request({
        url: '/evaluateHandoutHistory/getEvaluateHandoutHistoryList',
        data: {
            id: id
        },
        method: 'POST'
    })
}

export function update(data) {
    return Promise.resolve({ status: 200 });
    // return request({
    //     url: '/furniture/updateFurniture',
    //     data,
    //     method: 'POST'
    // })
}

export function deleted(id){
    return request({
        url: '/evaluateClient/delete/'+id,
        method: 'DELETE'
    })
}

/* 明细表接口 */
export function getDetailList(id) {

    return request({
        url: '/evaluateHandoutHistory/getEvaluateTablehead',
        data: {
            id: id
        },
        method: 'POST'
    })
}

/* 获取指标接口 */
export function getTargetNames(id) {
    return request({
        url: '/evaluateHandoutHistory/getEvaluateTablehead',
        data: {
            id: id
        },
        method: 'POST'
    })
}

export function getSaveTableList(id,DoFullName) {
    return request({
        url: '/evaluateHandoutHistory/getSaveTableList',
        data: {
            id,DoFullName
        },
        method: 'POST'
    })
}

export function saveStartPlan(id,emailSubject,emailContent) {
    return request({
        url: '/evaluateHandoutHistory/startPlan',
        data: {
            id,
            emailSubject,
            emailContent
        },
        method: 'POST'
    })
}

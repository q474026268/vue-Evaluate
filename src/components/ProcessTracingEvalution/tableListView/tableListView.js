import request from '@/utils/request'

/* 主表接口 */
export function getList(currentPage, pageSize, order, filters) {
    return request({
        url: '/evaluateProcessTracing/evaluateDailyLists',
        data: {
            currentPage,
            pageSize,
            orders: JSON.stringify(order),
            filters: JSON.stringify(filters)
        },
        method: 'POST'
    })
}

// 获取指定评价指标信息
export function getTargetItem(evaluateId){
    return request({
        url: '/evaluateProcessTracing/getTargetList?evaluateId='+evaluateId,
        method: 'GET',
    })
}
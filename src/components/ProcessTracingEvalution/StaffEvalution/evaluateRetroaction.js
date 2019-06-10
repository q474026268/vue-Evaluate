import request from '@/utils/request'

/* 主表接口 */
export function getList(currentPage, pageSize, order, filters) {
    return request({
        url: '/evaluateProcessTracing/getEvaluateProcessTracingTableList',
        data: {
            currentPage,
            pageSize,
            orders: JSON.stringify(order),
            filters: JSON.stringify(filters)
        },
        method: 'POST'
    })
}

export function get(id) {
    return request({
        url: '/evaluateTableList/getEvaluateTable',
        data: {
            id: id
        },
        method: 'POST'
    })
}
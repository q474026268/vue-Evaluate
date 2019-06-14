import request from '@/utils/request'

/* 主表接口 */
export function getList(currentPage, pageSize, order, filters) {
    return request({
        url: '/evaluateProcessTracing/evaluateLists',
        data: {
            currentPage,
            pageSize,
            orders: JSON.stringify(order),
            filters: JSON.stringify(filters)
        },
        method: 'POST'
    })
}

// 废弃
export function deleteTableLists(pkid) {
    return request({
        url: '/evaluateProcessTracing/deleteTableLists?pkid='+pkid,
        method: 'GET'
    })
}
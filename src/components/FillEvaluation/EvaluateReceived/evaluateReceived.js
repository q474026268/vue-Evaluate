import request from '@/utils/request'

/* 主表接口 */
export function getList(currentPage,pageSize,order,filters){
    return request({
        url: '/writerList/getWriterList',
        data:{
            currentPage,
            pageSize,
            orders:JSON.stringify(order),
            filters:JSON.stringify(filters)
        },
        method: 'POST'
    })
}

export function save(data){
   
    return request({
        url: '/evaluateModel/getEvaluateTableList',
        data,
        method: 'POST'
    })
}

export function get(id){
    
    return request({
        url: '/evaluateHandoutHistory/getEvaluateHandoutHistoryList',
        data:{
            id:id
        },
        method: 'POST'
    })
}

export function update(data){
    console.log(data);
    return Promise.resolve({status:200});
    // return request({
    //     url: '/furniture/updateFurniture',
    //     data,
    //     method: 'POST'
    // })
}

export function deleted(guid){
    console.log(guid);
    return Promise.resolve({status:200});
    // return request({
    //     url: '/furniture/deleteFurniture',
    //     data:{
    //         guid
    //     },
    //     method: 'POST'
    // })
}

/* 明细表接口 */
export function getDetailList(id){
    
    return request({
        url: '/evaluateHandoutHistory/getEvaluateTablehead',
        data:{
            id:id
        },
        method: 'POST'
    })
}
import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,orders,filters){
    return request({
        url: '/evaluateModel/getEvaluateModelList',
        data: {
            currentPage,
            pageSize,
            orders: JSON.stringify(orders),
            filters: JSON.stringify(filters)
        },
        method: 'POST'
    })
}

export function save(data){
    simulateData.push(data);
    return Promise.resolve({status:200});
    // return request({
    //     url: '/furniture/addFurniture',
    //     data,
    //     method: 'POST'
    // })
}

export function get(guid){
    let data = {
        pkid:'3',
        evaluKind:'1',
        modelName:'2020年测评',
        groupName:'行政部',
        inputDate:'2019-5-6',
        inputerFullName:'李四',
        useFreq:'9'
    }
    return Promise.resolve({status:200,data});
    // return request({
    //     url: '/furniture/getFurnitureById',
    //     data:{
    //         guid
    //     },
    //     method: 'POST'
    // })
}

export function update(data){
    return Promise.resolve({status:200});
    // return request({
    //     url: '/furniture/updateFurniture',
    //     data,
    //     method: 'POST'
    // })
}

export function deleted(guid){
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
// export function getDetailList(fkguid){
//     return request({
//         url: '/furniture/getFurnitureDetailList',
//         data:{
//             fkguid
//         },
//         method: 'POST'
//     })
// }
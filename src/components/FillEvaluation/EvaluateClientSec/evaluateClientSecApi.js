import request from '@/utils/request'
/* 获取填写评价表 */
export function evaluateContent(pkid,doUserName){
    return request({
        url: `/evaluateTableList/getTableListBody?pkid=${pkid}&doUserName=${doUserName}`,
        method: 'GET'
    })
}

// 保存填写
export function saveFillContent(data){
    return request({
        url: '/evaluateDaily/saveFillContent',
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
// 暂存填写
export function saveConsignFillContent(data){
    return request({
        url: `/evaluateTableList/updateWriterList/?evaluateId=${data.evaluateId}&pkid=${data.pkid}`,
        data:JSON.stringify(data.fillHtml),
        method: 'POST',
        transformRequest: [(data) => {
            return data
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// 获取指定评价指标信息
export function getTargetItem(pkid){
    return request({
        url: '/evaluateTableList/getTableTarget?pkid='+pkid,
        method: 'GET',
    })
}
import request from '@/utils/request'
/* 获取在线评价列表 */
export function gets(evaluateTname){
    return request({
        url: '/evaluateClientStatisA/getToBeSelectedCli',
        method: 'POST',
        data:{evaluateTname}
    })
}

// 保存已选评价表
export function send(data){
    
    return request({
        url: '/evaluateClientStatisA/task/send',
        data:JSON.stringify(
            // 条件信息
            data
        ),
        transformRequest: [(data) => {
            return data
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method: 'POST'
    })
}

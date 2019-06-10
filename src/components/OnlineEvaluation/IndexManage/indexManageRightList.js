import request from '@/utils/request'
/* 主表接口 */
export function getListRight() {
    return request({
        url: '/targetSecond/getEvaluateTargetSecondList',
        method: 'Get'
    })
}
export function save(data) {
    return request({
        url: '/targetSecond/saveEvaluateTargetSecond',
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

export function get(pkid) {
    return request({
        url: '/targetSecond/getEvaluateTargetSecondByPkid',
        data: {
            pkid
        },
        method: 'POST'
    })
}

export function deleted(pkid) {
    return request({
        url: '/targetSecond/deleteEvaluateTargetSecond',
        data: {
            pkid
        },
        method: 'POST'
    })
}
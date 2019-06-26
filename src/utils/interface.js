// 链接华东院接口认证信息
const interFaceOptions = [
    {
        label: 'JSESSIONID',
        value: '4631A21753095F34587E960C4ABE7F74'
    }, 
    {   
        label: 'io',
        value: 'lb3H_3-t68I0tm9cAAY9'
    }
]
export function getInterFace() {
    return Promise.resolve({ status: 200, data: interFaceOptions });
}

//帆软报表地址
const reportBaseUrlOptions = [
    {
        label:'reportBaseUrl',
        value:'http://172.17.220.29:8075/WebReport/ReportServer?',
    }
]
export function getReportBaseUrl() {
    return Promise.resolve({ status: 200, data: reportBaseUrlOptions });
}
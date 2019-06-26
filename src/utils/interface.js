// 链接华东院接口认证信息
const interFaceOptions = [
    {
        label: 'JSESSIONID',
        value: '8A16437CF742E9728BA61D513B53DFE3'
    }, 
    {   
        label: 'io',
        value: 'R-Qj7l7o7XDxlMJIAAZC'
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
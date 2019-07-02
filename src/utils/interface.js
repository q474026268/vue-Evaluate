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
        // value:'http://10.214.92.107:8075/WebReport/ReportServer?',
        value:'http://web.simulate.com:8080/webreport2/ReportServer?'

    }
]
export function getReportBaseUrl() {
    return Promise.resolve({ status: 200, data: reportBaseUrlOptions });
}
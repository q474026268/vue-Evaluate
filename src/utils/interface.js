// 链接华东院接口认证信息
const interFaceOptions = [
    {
        label: 'JSESSIONID',
        value: '8D9AA2FE56883B0E15DA1376E4BCF04C'
    }, 
    {   
        label: 'io',
        value: 'sn7RUjkG3r7LFsn-AAYO'
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
// 链接华东院接口认证信息
const interFaceOptions = [
    {
        label: 'JSESSIONID',
        value: '80C8F79DDCF3E9D3D3EB913992A89F5011'
    }, 
    {   
        label: 'io',
        value: 'WgILRYGqwt8rVokLAAYm11'
    }
]
export function getInterFace() {
    return Promise.resolve({ status: 200, data: interFaceOptions });
}

//帆软报表地址
const reportBaseUrlOptions = [
    {
        label:'reportBaseUrl',
        value:'http://10.214.92.52:8075/WebReport/ReportServer?',
    }
]
export function getReportBaseUrl() {
    return Promise.resolve({ status: 200, data: reportBaseUrlOptions });
}
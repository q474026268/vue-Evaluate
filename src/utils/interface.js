// 评价类别
const interFaceOptions = [
    {
        value: '8D9AA2FE56883B0E15DA1376E4BCF04C',
        label: 'JSESSIONID'
    }, {
        value: 'sn7RUjkG3r7LFsn-AAYO',
        label: 'io'
    }
]
export function getInterFace() {
    return Promise.resolve({ status: 200, data: interFaceOptions });
}

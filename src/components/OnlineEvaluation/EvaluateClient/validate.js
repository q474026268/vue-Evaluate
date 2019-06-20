const rules = {
    evaluateTname: [
        { required: true, message: '请输入评价表名', trigger: 'blur' }
    ],
    inputDate: [
        { required: true, message: '请输入制表时间', trigger: 'blur' }
    ],
    levelType: [
        { required: true, message: '请输入评价方式', trigger: 'blur' }
    ],
    markType: [
        { required: true, message: '请输入打分方式', trigger: 'blur' }
    ],
    evaluateTname: [
        {
            required: true, message: '请输入测评表名', trigger: 'blur'
        }
    ]
}
export default rules;



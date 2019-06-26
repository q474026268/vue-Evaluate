const rules = {
    evaluKind: [
        { required: true, message: '请输入评价类别', trigger: 'blur' }
    ],
    targetName: [
        { required: true, message: '请输入指标名称', trigger: 'blur' }
    ],
    evaluStand: [
        { required: true, message: '请输入评分标准', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入典型行为描述', trigger: 'blur' }
    ]

}
export default rules;
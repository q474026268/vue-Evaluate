<template>
    <div id="userFormList">
        <z-table ref="table" :selectModel=selectModel :tableColumnConfig=tableColumnConfig :toolBarConfig=toolBarConfig 
        :tableBaseConfig=tableBaseConfig></z-table>
    </div>
</template>
<script>
import ZTable from '../../zTable'
import DefaultButtons from '../../zTable/zTable.js'
// 查询表单
import SearchPage from './search'
import { getList,deleted,search } from '@/api/userForm.js'

// 表单的路由路径
const pageUrl = '/userForm'
// 路由的名称
const routerName = 'userForm'
// 表单组件字段
const key = 'id'
export default {
    name:'userFormList',
    components:{
        ZTable
    },
    props:{// 其他组件传入的值
       
    },
    provide:function(){
       return {
            "rowSelected":this.rowSelected,
            "rowsSelected":this.rowsSelected,
            "rowsSelectedAll":this.rowsSelectedAll,
            "getList":getList,
            "SearchPage":SearchPage
       }
    },
    data:function(){// 自定义变量
        return {
            // 列表基本配置
            tableBaseConfig:{
                // 默认排序
                currentSort:{prop: 'id', order: 'descending'}
            },
            // 列表配置
            tableColumnConfig:[
                {
                    id:"name", // 字段
                    text:"名称", // 列名
                    align:"center", // 居中
                    width:120, // 列宽
                    sortable:true, // 是否排序
                    // 格式化 注：如果不需要格式化，就不需要加这个属性
                    // formatter:function(row,column){
                    //     console.log(row,column);
                    // }
                },
                {
                    id:"username",
                    text:"用户名",
                    align:"center",
                    width:120,
                    sortable:false
                },
                {
                    id:"email",
                    text:"邮箱",
                    align:"center",
                    width:120,
                    sortable:true
                },
            ],
            // 工具栏配置
            toolBarConfig:{
                // 列表上方按钮
                top:[
                    {
                        id:"default_add", // 编号
                        text:"添加", // 按钮名称
                        icon:"el-icon-plus", // 按钮图标
                        click:() => { // 点击事件
                            this.addButtonClick();
                        }
                    }
                ],
                // 列表行内按钮
                eachRow:{
                    // 默认显示
                    default:[
                        {
                            id:"default_modify",
                            text:"修改",
                            icon:"el-icon-edit",
                            click:(row) => {
                                this.modifyButtonClick(row[key]);
                            }
                        },
                        {
                            id:"default_delete",
                            text:"删除",
                            icon:"el-icon-delete",
                            click:(row) => {
                                this.deleteButtonClick(row[key]);
                            }
                        }
                    ],
                    // 下拉显示
                    dropdown:[
                        {
                            id:"default_view",
                            text:"浏览",
                            icon:"el-icon-view",
                            click:(row) => {
                                this.viewButtonClick(row[key]);
                            }
                        }
                    ]
                }
            }
        }
    },
    methods:{// 自定义方法
        // 添加按钮点击事件
        addButtonClick(id){
            DefaultButtons.addButton(pageUrl,routerName);
        },
        // 修改按钮点击事件
        modifyButtonClick(id){
            DefaultButtons.modifyButton(pageUrl,routerName,id);
        },
        // 浏览按钮点击事件
        viewButtonClick(id){
            DefaultButtons.viewButton(pageUrl,routerName,id);
        },
        // 删除按钮点击事件
        deleteButtonClick(id){
            this.$confirm('确定删除？').then((res) => {
                deleted(id).then((res) => {
                    if(res.status == 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.$refs.table.refresh();
                    }
                });
            }).catch((err) => {
                    
            });
        },
        /**
         * 行选中事件:单选时触发
         * currentRow:当前行 oldCurrentRow:上一次选中的行
         */
        rowSelected(currentRow,oldCurrentRow){
            
        },
        /**
         * 行选中事件:多选时触发
         * rows：选中的所有行
         */
        rowsSelected(rows){
             
        },
        /**
         * 点击全选的checkbox触发
         * rows：选中的所有行
         */
        rowsSelectedAll(rows){
            
        }
    },
    /**
     * 计算属性（自定义方法）
     * 调用方式：是以属性的方式调用
     * 使用场景：对于任何复杂逻辑
     * 
     * computed是有缓存的功能
     */
    computed:{
        
    },
    watch: {
        // 监听路由变化
        $route(to,from){
            
        }
    },
    created:function(){// 组件创建后
        // DOTO 获取数据等
    },
    mounted:function(){// 组件加载完成
        // DOTO
    },
    beforeUpdate:function(){// 组件数据更新之前
        // DOTO
    },
    updated:function(){// 组件数据更新之后
        // DOTO
    }
}
</script>

<style>

</style>

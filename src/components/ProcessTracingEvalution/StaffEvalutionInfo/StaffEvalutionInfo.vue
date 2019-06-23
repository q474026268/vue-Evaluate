<template>
    <div id="customerSatisfactionView">
        <el-dialog :title="title"
        width="60%" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose" :close-on-click-modal="false">
            <h4>{{PlanName}}</h4>
            <div class="pDiv"><span>评价类别：{{evaluKind}}</span>    <span>评价表名：{{evaluateTname}}</span>  <span>评价方式：{{levelType}}</span></div>
            <div class="pDiv">  <span>制表部门：{{groupName}}</span>  <span>制表人：{{InputerFullName}}</span>  <span>制表时间：{{inputDate}}</span>   </div>
            <el-table
                :data="tableData"
                height="250"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                align="center">
                </el-table-column>
                <el-table-column
                prop="DoUserNo"
                label="评价人员工号"
                align="center">
                </el-table-column>
                <el-table-column
                prop="DoFullName"
                label="评价人姓名"
                align="center">
                </el-table-column>
                <el-table-column
                prop="DeptName"
                label="部门"
                align="center">
                </el-table-column>
                <el-table-column
                prop="InputDate"
                label="评价时间"
                :formatter="formatter"
                align="center">
                </el-table-column>
                <el-table-column
                prop="State"
                label="状态"
                align="center">
                </el-table-column>
                <el-table-column
                label="操作"
                width="190"
                align="center">
                    <template slot-scope="scope">
                        <el-button
                        title="废弃"
                        icon="el-icon-delete"
                        size="mini"
                        type="primary"
                        @click="handleDiscard(scope.$index, scope.row)"></el-button>

                        <el-button
                        title="催办"
                        size="mini"
                        icon="el-icon-s-promotion"
                        type="primary"
                        @click="handleCb(scope.$index, scope.row)"></el-button>

                        <el-button
                        title="查看"
                        size="mini"
                        icon="el-icon-view"
                        type="primary"
                        @click="handleLook(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[15, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>

<script>
// import {clientList,deletePeople,sendEmail} from './customerSatisfactionViewApi.js'
// import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
import {getList,deleteTableLists} from './StaffEvalutionInfo.js'
export default {
    name:'customerSatisfactionView',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            // 分页参数
            // 第几页
            currentPage4: 1,
            // 一页条数
            pageSize:15,
            // 总条数
            total:0,
            // 排序字段
            orders:[{prop:"pkid",order:"descending"}],
            // 评价表名
            evaluateTname:'',
            // 计划名称
            PlanName:'',
            // 制表人名
            InputerFullName:'',
            // 评价方式
            levelType:'',
            // 制表日期
            inputDate:'',
            // 评价类别
            evaluKind:'',
            // 通过夫路由传过来的id
            evaluateId:'',
            // 制表部门
            groupName:'',
            dialogFormVisible:true,
            title:'查看',
            tableData:[],
        }
    },
    methods:{// 自定义方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let filters={};
            filters.evaluateId=this.evaluateId;
            this.pageSize=val;
            getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
                console.log(result);
                this.tableData=result.data.content
                console.log(this.tableData);
                this.total=result.data.numberOfElements;
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let filters={};
            filters.evaluateId=this.evaluateId;
            this.currentPage4=val;
            getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
                console.log(result);
                this.tableData=result.data.content
                console.log(this.tableData);
                this.total=result.data.numberOfElements;
            })
        },
        handleClose(done) {
            this.$router.back();
        },
        formatter(row,column){
            return row.InputDate.substring(0,10)
        },
        // 废弃
        handleDiscard(index,row){
            if (row.State=='废弃') {
                this.$message({
                    message: '该条目已废弃，不可再废弃',
                    type: 'warning'
                });
            }else{
                deleteTableLists(row.PKID).then((result) => {
                    if (result.status==200) {
                        this.$message({
                            message: '废弃成功',
                            type: 'success'
                        });
                        this.$refs.table.refresh();
                    }else{
                        this.$message.error('废弃失败');
                    }
                })
                let filters={};
                filters.evaluateId=this.evaluateId;
                getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
                    this.tableData=result.data.content
                    this.total=result.data.numberOfElements;
                })
            }
            
        },
        // 催办
        handleCb(index,row){
            
        },
        // 查看
        handleLook(index,row){
            console.log(row);
            console.log(this.evaluKind);
            if (row.State=='废弃') {
                this.$message({
                    message: '该条目已废弃不可查看',
                    type: 'warning'
                });
            }else{
                this.$router.push({
                    name:'tableListViewStaff',
                    query:{
                        evaluKind:this.evaluKind,
                        evaluateTname:this.evaluateTname,
                        levelType:this.levelType,
                        InputDate:row.InputDate.substring(0,10),
                        InputerFullName:this.InputerFullName,
                        PKID:row.PKID,
                        EvaluateId:row.EvaluateId,
                        DeptName:row.DeptName
                    }
                })
            }
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
    watch:{
        
    },
    created:function(){// 组件创建后
        this.evaluateId=this.$route.query.evaluateId;
        this.evaluKind=this.$route.query.evaluKind;
        this.evaluateTname=this.$route.query.evaluateTName;
        this.groupName=this.$route.query.GroupName;
        this.inputDate=this.$route.query.StartDate.substring(0,10);
        this.InputerFullName=this.$route.query.InputerFullName;
        
        this.PlanName=this.$route.query.PlanName;
        this.levelType=this.$route.query.levelType;
        let filters={};
        filters.evaluateId=this.evaluateId;
        getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
            console.log(result);
            this.tableData=result.data.content
            console.log(this.tableData);
            this.total=result.data.numberOfElements;
        })
    },
    mounted:function(){// 组件加载完成
        // DOTO
        
    },
    beforeUpdate:function(){// 组件数据更新之前
        // DOTO
    },
    updated:function(){// 组件数据更新之后
        // DOTO
    },
}
</script>
<style scope>
    h4{
        font-size: 18px;
        color: #409EFF;
    }
    .el-dialog__body{
        padding: 5px 20px;
        padding-bottom: 20px;
    }
    .pDiv{
        margin-bottom: 22px;
        display: flex;
    }
    .pDiv span{
        display: block;
        margin-right: 25px;
    }
    .el-pagination{
      display: flex;
      justify-content: flex-end;
    }
</style>
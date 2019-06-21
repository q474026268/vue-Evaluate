<template>
    <div id="tableListView">
        <el-dialog :title="title"
        width="60%" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose" :close-on-click-modal="false">
            <h4>{{evaluateTname}}——{{InputerFullName}}</h4>
            <div class="pDiv"><span>评价类别：{{evaluKind}}</span>  <span>评价表名：{{evaluateTname}}</span>    <span>评价方式：{{levelType}}</span>    <span>开始时间：{{InputDate}}</span></div>
            <el-table
                :data="peopleTargetArr"
                height="250"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                align="center">
                </el-table-column>
                <el-table-column
                prop="doneFullName"
                label="姓名"
                align="center">
                </el-table-column>
                <el-table-column v-for="(item,index) in targetArr" align='center' :key="index" :label="item.TargetName">
                    <template class="iiiii" slot-scope="scope">
                        <el-select :disabled="disabled" v-model="item.targetInfoArr[scope.$index]">
                            <el-option value="A">A</el-option>
                            <el-option value="B">B</el-option>
                            <el-option value="C">C</el-option>
                            <el-option value="N">N</el-option>
                        </el-select>
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
    </div>
</template>

<script>
import {getList,getTargetItem} from './tableListView.js'
export default {
    name:'tableListViewStaff',
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
            // 制表人名
            InputerFullName:'',
            // 评价方式
            levelType:'',
            // 开始时间
            InputDate:'',
            // 评价表名
            evaluateTname:'',
            // 评价类别
            evaluKind:'',
            dialogFormVisible:true,
            title:'查看',
            // 指标
            targetArr:[],
            peopleTargetArr:[],
            tableData:[],
            disabled:true
        }
    },
    methods:{// 自定义方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let filters={};
            filters.evaluateListId=this.$route.query.PKID;
            let DeptName=this.$route.query.DeptName;
            getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
                this.peopleTargetArr=result.data.content;
                this.total=result.data.totalElements
                for (let i = 0; i < this.targetArr.length; i++) {
                    this.targetArr[i].targetInfoArr=[];
                    for (let j = 0; j < this.peopleTargetArr.length; j++) {
                        this.peopleTargetArr[j].DeptName=DeptName;
                        this.targetArr[i].targetInfoArr.push(this.peopleTargetArr[j]['target'+(i+1)]);
                    }
                }
                console.log(this.peopleTargetArr);
                console.log(this.targetArr);
                
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let filters={};
            filters.evaluateListId=this.$route.query.PKID;
            let DeptName=this.$route.query.DeptName;
            getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
                console.log(result.data.content);
                this.peopleTargetArr=result.data.content;
                this.total=result.data.totalElements
                for (let i = 0; i < this.targetArr.length; i++) {
                    this.targetArr[i].targetInfoArr=[];
                    for (let j = 0; j < this.peopleTargetArr.length; j++) {
                        this.peopleTargetArr[j].DeptName=DeptName;
                        this.targetArr[i].targetInfoArr.push(this.peopleTargetArr[j]['target'+(i+1)]);
                    }
                }
                console.log(this.peopleTargetArr);
                console.log(this.targetArr);
                
            })
        },
        handleClose(done) {
            this.$router.back();
        },
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
        this.evaluateTname=this.$route.query.evaluateTname;
        this.evaluKind=this.$route.query.evaluKind;
        this.levelType=this.$route.query.levelType;
        this.InputDate=this.$route.query.InputDate;
        this.InputerFullName=this.$route.query.InputerFullName;
        let evaluateId=this.$route.query.EvaluateId;
        let DeptName=this.$route.query.DeptName;
        let filters={};
        filters.evaluateListId=this.$route.query.PKID;
        getTargetItem(evaluateId).then((result) => {
            this.targetArr=result.data;
            console.log(this.targetArr);
            getList(this.currentPage4,this.pageSize,this.orders,filters).then((result) => {
                console.log(result.data.content);
                console.log(result.data);
                this.total=result.data.totalElements
                this.peopleTargetArr=result.data.content;
                for (let i = 0; i < this.targetArr.length; i++) {
                    this.targetArr[i].targetInfoArr=[];
                    for (let j = 0; j < this.peopleTargetArr.length; j++) {
                        this.peopleTargetArr[j].DeptName=DeptName;
                        this.targetArr[i].targetInfoArr.push(this.peopleTargetArr[j]['target'+(i+1)]);
                    }
                }
                console.log(this.peopleTargetArr);
                console.log(this.targetArr);
                
            })
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
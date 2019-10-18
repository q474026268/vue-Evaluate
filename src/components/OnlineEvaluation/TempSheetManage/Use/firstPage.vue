<template>
    <div id="firstPage">
        <el-dialog title="在线评价————年终员工达优测评" :visible=true @close="close" :width="dialogWidth">
            <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="pkid" label="编号" v-show="false">
                            <el-input v-model="formData.pkid" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="evaluKind" label="模板类别" class="item">
                            <label>{{formData.evaluKind}}</label>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="modelName" label="模板名称" class="item">
                            <label>{{formData.modelName}}</label>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="levelType" label="评价方式" class="item">
                            <label>{{formData.levelType}}</label>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="inputDate" label="制表时间" class="item">
                            <el-date-picker v-model="formData.inputDate" type="date" placeholder="选择结束时间" :disabled="Object.is(type,'view')"></el-date-picker>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item prop="groupName" label="制表部门" class="item">
                            <el-date-picker v-model="formData.groupName" type="date" :disabled="Object.is(type,'view')"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--
                    <el-col :span="8">
                        <el-form-item prop="emailDay" label="任务提示设置" class="item">
                            <label>{{formData.emailDay}}天</label>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="8">
                        <el-form-item prop="markType" label="打分方式" class="item">
                            <label>{{formData.markType}}</label>
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>
           <div class="evaluate-config">
               <div class="area evaluate-config-left">
                    <div>
                        <span class="detail_title">被评价部门</span>
                        <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                            <el-button type="primary" @click="addDetailRow_group" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                        </div>
                    </div>
                    <el-table :data="formDataDetail_group" style="width: 100%;" border height="360">
                        <el-table-column align="center" label="序号" width="50">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                                <label>{{ scope.$index+1 }}</label>
                            </template>
                        </el-table-column>
                         <el-table-column align="center" label="员工号" width=70>
                            <template slot-scope="scope">
                                <el-input size="mini" :name="'doneUserNo_'+scope.$index" v-model="scope.row.doUserNo" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('doUserNo_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                         <el-table-column align="center" label="姓名" width="55">
                            <template slot-scope="scope">
                                <el-input size="mini" :name="'doneFullName_'+scope.$index" v-model="scope.row.doFullName" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('doFullName_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="部门" width="65">
                            <template slot-scope="scope">
                                <el-input size="mini" :name="'groupName_'+scope.$index" v-model="scope.row.groupName" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('targetWeigth_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" min-width="40">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete_group(scope.$index, scope.row)" icon="el-icon-delete" title="删除"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
               <div class="area evaluate-config-center">
                   <div style="position: relative;">
                        <span  class="detail_title">评价指标</span>
                        <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                            <el-button type="primary" @click="addDetailRow_index" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                        </div>
                   </div>
                    <el-table :data="formDataDetail_index" style="width: 100%;" border height="360">
                        <el-table-column align="center" label="指标名称" width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                                <el-input size="mini" :name="'targetName_'+scope.$index" v-model="scope.row.targetName" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('targetName_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" min-width="40">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete_index(scope.$index, scope.row)" icon="el-icon-delete" title="删除"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
               <div class="area evaluate-config-right">
                   <div>
                        <span class="detail_title">被评价人</span>
                        <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                            <el-button type="primary" @click="addDetailRow_evaluate" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                        </div>
                   </div>
                    <el-table :data="formDataDetail_evaluate" style="width: 100%;" border height="360">
                        <el-table-column align="center" label="序号" width="50">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                                <label>{{ scope.$index+1 }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="员工号" width="70">
                            <template slot-scope="scope">
                                <el-input size="mini" :name="'doUserNo_'+scope.$index" v-model="scope.row.doUserNo" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('doUserNo_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="姓名" width="70">
                            <template slot-scope="scope">
                                <el-input size="mini" :name="'doFullName_'+scope.$index" v-model="scope.row.doFullName" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('doFullName_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="部门" width="80">
                            <template slot-scope="scope">
                                <el-input size="mini" :name="'groupName_'+scope.$index" v-model="scope.row.groupName" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('groupName_'+scope.$index)}"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" min-width="40">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete_evaluate(scope.$index, scope.row)" icon="el-icon-delete" title="删除"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
           </div>
            <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
               <!-- <el-button ref="saveButton" type="primary" @click="saveData">保存</el-button> -->
               <el-button @click="nextStep" type="primary">下一步</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// 表单样式
import '@/style/masterSlave.css'
// 请求后端接口的方法
// import { save,get,update,getDetailList } from '@/api/tempSheetManage.js'
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from '@/utils/common.js'
// 验证配置文件
import { addDictionary } from './validate.js'
// 主表主键字段
const mainKey = "guid";
export default {
    name:'firstPage',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            formRules:{},
            // 表单类型 add modify view
            type:'',
            // 主表主键值
            id:'',
            // 主表数据
            formData:{

            },
            // 明细数据
            formDataDetail_group:[],
            formDataDetail_index:[],
            formDataDetail_evaluate:[],
            // 明细删除的数据
            deleteDetailData_group:[],
            deleteDetailData_index:[],
            deleteDetailData_evaluate:[],
            // 弹出窗口宽度
            dialogWidth:"70%"
        }
    },
    methods:{// 自定义方法
        //关闭窗口返回的页面
        close(){
            this.$router.back(-1);
        },
        // // 表单提交前
        // beforeSubmit(){
        //     // TODO
        //     return true;
        // },
        // saveData(){
        //     this.$validator.validateAll().then((valid) => {
        //         if(valid && this.beforeSubmit()){
        //             //this.$refs.saveButton.loading = true;
        //             let data = this.formData;
        //             // 合并明细数据
        //             let newFormDataDetail = [...this.formDataDetail,...this.deleteDetailData];
        //             // 添加明细数据
        //             // 将明细的数据放在主表的childrens属性里面，后端的实体类也要有这个childrens属性
        //             data["childrens"] = Array.from(newFormDataDetail);
        //             if(Object.is(this.type,"add")){
        //                 save(data).then((res)=>{
        //                     if(res.status == 200){
        //                         this.$message({
        //                             message: '保存成功',
        //                             type: 'success'
        //                         });
        //                         this.close();
        //                     }
        //                 });
        //             }else if(Object.is(this.type,"modify")){
        //                 update(data).then((res)=>{
        //                     if(res.status == 200){
        //                         this.$message({
        //                             message: '保存成功',
        //                             type: 'success'
        //                         });
        //                         this.close();
        //                     }
        //                 });
        //             }
        //         }
        //         // 弹出错误信息
        //         if(!valid){
        //             let message = ``;
        //             for(let item of this.errors.items){
        //                 message += '<p style="margin-bottom:2px;">'+item.msg+'</p>';
        //             }
        //             this.$message({
        //                 dangerouslyUseHTMLString: true,
        //                 message: message,
        //                 type: 'error'
        //             });
        //         }
        //     });
            
            
        // },
        async getData(){
            // let fkguid = '';
            // // 获取主表数据
            // await get(this.id).then((res) => {
            //     if(res.status == 200){
            //        this.formData = res.data;
            //        fkguid = this.formData[mainKey];
            //     }
            // });
            // // 获取明细数据
            // await getDetailList(fkguid).then((res) => {
            //     if(res.status == 200){
            //        this.formDataDetail = res.data;
            //     }
            // });
        },
        // 添加行
        addDetailRow_group(){
            this.formDataDetail_group.push({doType:"add"});
        },
        addDetailRow_index(){
            this.formDataDetail_index.push({doType:"add"});
        },
        addDetailRow_evaluate(){
            this.formDataDetail_evaluate.push({doType:"add"});
        },
        // 删除行
        handleDelete_group(index,row){
            this.formDataDetail_group.splice(index, 1);
            this.deleteDetailData_group.push(Object.assign(row,{doType:"delete"}));
        },
        handleDelete_index(index,row){
            this.formDataDetail_index.splice(index, 1);
            this.deleteDetailData_index.push(Object.assign(row,{doType:"delete"}));
        },
        handleDelete_evaluate(index,row){
            this.formDataDetail_evaluate.splice(index, 1);
            this.deleteDetailData_evaluate.push(Object.assign(row,{doType:"delete"}));
        },
        // 下一步
        nextStep(){
            this.$router.push({path:'/secondPage',name:'secondPage'});
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
        // 监听明细数据的变化，添加错误信息翻译
        "formDataDetail":function(curVal,oldVal){
            let dics = {};
            for(let index of curVal.keys()){
                let count = index + 1;
                dics["name_"+index] = '第'+count+'行的名称';
                dics["model_"+index] = '第'+count+'行的型号';
                dics["count_"+index] = '第'+count+'行的数量';
                dics["price_"+index] = '第'+count+'行的单价';
            }
            addDictionary(dics);
        }
    },
    created:function(){// 组件创建后
        // DOTO
        this.type = this.$route.params.useType;
        this.id = this.$route.params.id;
        if(!Object.is(this.type,"add")){
            this.getData();
        }
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
<style scoped>
.evaluate-config{
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    position: relative;
    text-align: center;
    background-color: #f0f8ff;
}
.area{
    height: 100%;
    display: inline-block;
}
.evaluate-config-left{
    width: 31%;
    position: absolute;
    left: 5px;
}
.evaluate-config-right{
    width: 34%;
    position: absolute;
    right: 5px;
}
.evaluate-config-center{
    width: 31%;
    margin-right: 30px;
}
</style>

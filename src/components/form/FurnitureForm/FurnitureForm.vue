<template>
    <div id="furnitureForm">
        <el-dialog title="添加家具" :visible=true @close="close" :width="dialogWidth">
            <div class=main>
                <div class="hideArea" v-show="false">
                    <el-input v-model="formData.guid"></el-input>
                </div>
                <table class="main_table">
                    <tbody>
                        <tr class="main_tr">
                            <th class="main_th check">类型</th>
                            <td class="main_td">
                                <el-input name="type" v-validate="'required'" :class="{'error': errors.has('type')}" v-model="formData.type" :disabled="Object.is(type,'view')"></el-input>
                            </td>
                            <th class="main_th check">数量</th>
                            <td class="main_td">
                                <el-input name="count" v-validate="'required|isNumber'" :class="{'error': errors.has('count')}" v-model="formData.count" :disabled="Object.is(type,'view')"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <th class="main_th">总价</th>
                            <td class="main_td"><el-input v-model="formData.totalPrice" :disabled="Object.is(type,'view')"></el-input></td>
                            <th class="main_th"></th>
                            <td class="main_td"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class=detail>
                <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                    <el-button type="primary" @click="addDetailRow" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                </div>
                <el-table :data="formDataDetail" style="width: 100%" border>
                    <el-table-column align="center" label="名称" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.guid" v-show="false"></el-input>
                            <el-input :name="'name_'+scope.$index" v-model="scope.row.name" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('name_'+scope.$index)}"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="型号" width="200">
                        <template slot-scope="scope">
                            <el-input :name="'model_'+scope.$index" v-model="scope.row.model" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('model_'+scope.$index)}"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="数量" width="200">
                        <template slot-scope="scope">
                            <el-input :name="'count_'+scope.$index" v-model="scope.row.count" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('count_'+scope.$index)}"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="单价" width="200">
                        <template slot-scope="scope">
                            <el-input :name="'price_'+scope.$index" v-model="scope.row.price" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('price_'+scope.$index)}"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" min-width="80">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" title="删除"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
               <el-button ref="saveButton" type="primary" @click="saveData">保存</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// 表单样式
import '@/style/masterSlave.css'
// 请求后端接口的方法
import { save,get,update,getDetailList } from '@/api/furnitureForm.js'
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from '@/utils/common.js'
// 验证配置文件
import { addDictionary } from './validate.js'
// 主表主键字段
const mainKey = "guid";
export default {
    name:'furnitureForm',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            // 表单类型 add modify view
            type:'',
            // 主表主键值
            id:'',
            // 明细数据
            formDataDetail:[],
            // 主表数据
            formData:{},
            // 明细删除的数据
            deleteDetailData:[],
            // 弹出窗口宽度 默认为屏幕的50%
            dialogWidth:"50%"
        }
    },
    methods:{// 自定义方法
        //关闭窗口返回的页面
        close(){
            this.$router.push('/furnitureFormList');
        },
        // 表单提交前
        beforeSubmit(){
            // TODO
            return true;
        },
        saveData(){
            this.$validator.validateAll().then((valid) => {
                if(valid && this.beforeSubmit()){
                    //this.$refs.saveButton.loading = true;
                    let data = this.formData;
                    // 合并明细数据
                    let newFormDataDetail = [...this.formDataDetail,...this.deleteDetailData];
                    // 添加明细数据
                    // 将明细的数据放在主表的childrens属性里面，后端的实体类也要有这个childrens属性
                    data["childrens"] = Array.from(newFormDataDetail);
                    if(Object.is(this.type,"add")){
                        save(data).then((res)=>{
                            if(res.status == 200){
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.close();
                            }
                        });
                    }else if(Object.is(this.type,"modify")){
                        console.log(data);
                        update(data).then((res)=>{
                            if(res.status == 200){
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.close();
                            }
                        });
                    }
                }
                // 弹出错误信息
                if(!valid){
                    let message = ``;
                    for(let item of this.errors.items){
                        message += '<p style="margin-bottom:2px;">'+item.msg+'</p>';
                    }
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: message,
                        type: 'error'
                    });
                }
            });
            
            
        },
        async getData(){
            let fkguid = '';
            // 获取主表数据
            await get(this.id).then((res) => {
                if(res.status == 200){
                   this.formData = res.data;
                   fkguid = this.formData[mainKey];
                }
            });
            // 获取明细数据
            await getDetailList(fkguid).then((res) => {
                if(res.status == 200){
                   this.formDataDetail = res.data;
                }
            });
        },
        // 添加行
        addDetailRow(){
            this.formDataDetail.push({doType:"add"});
        },
        // 删除行
        handleDelete(index,row){
            this.formDataDetail.splice(index, 1);
            this.deleteDetailData.push(Object.assign(row,{doType:"delete"}));
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
        this.dialogWidth = this.$route.params.dialogWidth;
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
<style>
</style>

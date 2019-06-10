<template>
    <div id="userForm">
       <el-dialog title="添加用户" :visible=true @close="close" :width="dialogWidth">
           <el-form ref="form" :model="formData" :rules="formRules">
               <el-form-item prop="id" label="编号" v-show="false">
                   <el-input v-model="formData.id" placeholder="输入用户编号" :disabled="true"></el-input>
               </el-form-item>
               <el-form-item prop="name" label="姓名">
                   <el-input v-model="formData.name" placeholder="输入用户姓名" :disabled="Object.is(type,'view')"></el-input>
               </el-form-item>
               <el-form-item prop="username" label="用户名">
                   <el-input v-model="formData.username" placeholder="输入用户名" :disabled="Object.is(type,'view')"></el-input>
               </el-form-item>
               <el-form-item prop="email" label="邮箱">
                   <el-input v-model="formData.email" placeholder="输入邮箱" :disabled="Object.is(type,'view')"></el-input>
               </el-form-item>
           </el-form>
           <div id="toolbar" class="toolbar" slot="footer">
               <el-button ref="saveButton" type="primary" @click="saveData('form')">保存</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
           </div>
       </el-dialog>
    </div>
</template>
<script>
import { save,get,update } from '@/api/userForm.js'
import { guid } from '@/utils/common.js'
import Rules from './validate.js'
export default {
    name:'userForm',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            formRules: Rules,
            //表单类型
            type:'',
            // 表单数据
            formData:{},
            // 表单主键值
            id:'',
            // 弹出窗口宽度 默认为屏幕的50%
            dialogWidth:"50%"
        }
    },
    methods:{// 自定义方法
        // 关闭弹出框
        close(){
            this.$router.push('/userFormList');
        },
        // 表单提交前事件
        beforeSubmit(){
            // TODO
            return true;
        },
        saveData(formName){
            this.$refs[formName].validate((valid) => {
                if(valid && this.beforeSubmit()){
                    this.$refs.saveButton.loading = true;
                    let data = Object.assign({}, this.formData);
                    if(Object.is(this.type,"add")){
                        save(data).then((res)=>{
                            if(res.status == 200){
                                this.close();
                            }
                        });
                    }else if(Object.is(this.type,"modify")){
                        update(data).then((res)=>{
                            if(res.status == 200){
                                this.close();
                            }
                        });
                    }
                }
            });
        },
        getData(){
            get(this.id).then((res) => {
                if(res.status == 200){
                    this.formData = res.data;
                }
            });
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
        // TODO
    },
    beforeUpdate:function(){// 组件数据更新之前
        // TODO
    },
    updated:function(){// 组件数据更新之后
        // TODO
    }
}
</script>
<style>
</style>

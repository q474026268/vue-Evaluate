<template>
    <div id="fillEvaluation" class="content-height">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收到的评价表" name="first">
           <EvaluateReceived></EvaluateReceived>
            </el-tab-pane>
            <el-tab-pane label="个人评价管理" name="second">
             
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
//import EvaluateManage from './EvaluateManage'
import EvaluateReceived from './EvaluateReceived';
export default {
    name:'fillEvaluation',
    components:{//组件
       EvaluateReceived
    },
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {

            
            activeName:'first'
        }
    },
    methods:{// 自定义方法
        handleClick(){

        }
    },
    /**
     * 计算属性（自定义方法）
     * 调用方式：是以属性的方式调用
     * 使用场景：对于任何复杂逻辑
     *
     *///computed是有缓存的功能
    computed:{},
    // 组件创建后
    created:function(){},
    // 组件加载完成
    mounted:function(){},
    // 组件数据更新之前
    beforeUpdate:function(){},
    // 组件数据更新之后
    updated:function(){}
}
</script>
<style>
.el-tabs{
    height: 100%;
    text-align: center;
}
.el-tabs__content{
    height: 100%;
}
.el-tab-pane{
    height: 100%;
}
</style>

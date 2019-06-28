<template>
    <div id="fillEvaluation" class="content-height">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收到的评价表" name="first">
           <EvaluateReceived></EvaluateReceived>
            </el-tab-pane>
            <el-tab-pane label="个人评价管理" name="second">
             
            </el-tab-pane>
        </el-tabs> -->
        <div id="tjcxDiv">
            <router-link class="tjcxDivSon" tag='div' :to="{name:'evaluateReceivedStaff'}">员工评价表</router-link>
            <router-link class="tjcxDivSon" tag='div' :to="{name:'fillEvaluationList'}">内部顾客评价表</router-link>
            <router-link class="tjcxDivSon" tag='div' :to="{name:'personalEvaluationFeedbackStaff'}">个人评价反馈</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name:'fillEvaluationStaff',
    
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
    watch:{
        $route(to,from){
            let domArr=document.querySelector('#tjcxDiv').querySelectorAll('.tjcxDivSon');
            
            for(let i=0;i<domArr.length;i++){
                domArr[i].style.borderBottom='';
                domArr[i].style.color='';
            }
            
            switch(to.name){
                case "evaluateReceivedStaff":
                    domArr[0].style.borderBottom='2px solid #66b1ff';
                    domArr[0].style.color='#66b1ff';
                    break;
                case "fillEvaluationList":
                    domArr[1].style.borderBottom='2px solid #66b1ff';
                    domArr[1].style.color='#66b1ff';
                    break;
                case "personalEvaluationFeedbackStaff":
                    domArr[2].style.borderBottom='2px solid #66b1ff';
                    domArr[2].style.color='#66b1ff';
                    break;
            }
        }
    },
    // 组件创建后
    created:function(){},
    // 组件加载完成
    mounted:function(){
        let domArr=document.querySelector('#tjcxDiv').querySelectorAll('.tjcxDivSon')
        domArr[0].style.color='#66b1ff';
        domArr[0].style.borderBottom='2px solid #66b1ff';
    },
    // 组件数据更新之前
    beforeUpdate:function(){},
    // 组件数据更新之后
    updated:function(){}
}
</script>
<style>
    #fillEvaluation{
        height:100%;
        width:100%
    }
    #tjcxDiv{
        display: flex;
        border-bottom: 1px solid #ddd;
        height: 40px;
        margin-bottom: 5px;
    }
    #tjcxDiv>div{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>

<template>
    <div id="search">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="searchData.type" placeholder="类型"></el-input>
            </el-form-item>
            <el-form-item label="总价大于">
                <el-input v-model="searchData.totalPrice" placeholder="总价"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name:'search',
    inject: ["search"],
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            searchData:{
                type:'',
                totalPrice:''
            }
        }
    },
    methods:{// 自定义方法
        searching(){
            this.search(this.searchData);
        },
        clear(){
            this.searchData = {
                type:'',
                totalPrice:''
            };
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

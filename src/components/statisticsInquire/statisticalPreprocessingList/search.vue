<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row type="flex" justify="space-between" id="searchFrom">
        <el-col :span="5">
          <el-form-item label-width="100px">
            <el-select v-model="searchData.evaluKind" placeholder="请选择评价类别" size="small" clearable>
              <el-option
                v-for="item in evaluKindOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input v-model="searchData.taskName" placeholder="请输入任务名" size="small" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
           <el-date-picker size="small" v-model="searchData.inputDate" type="daterange" range-separator="至" 
            start-placeholder="制表开始时间" end-placeholder="制表结束时间" style="width:250px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="searchData.state" placeholder="请选择状态" size="small" clearable>
              <el-option
                v-for="item in statisticalStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-button
            style="margin-top: 4px;"
            type="primary"
            @click="searching"
            size="small"
            icon="el-icon-search"
          >查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {
  getEvaluKind,
  getLevelType,
  getStatisticalState
} from "@/components/OnlineEvaluation/onlineEvaluation.js";
export default {
  name: "search",
  inject: ["search"],
  props: {
    // 其他组件传入的值
  },
  data: function() {
    // 自定义变量
    return {
      searchData: {},
      //评价类别
      evaluKindOptions: [],
      //评价方式
      levelTypeOptions: [],
      //统计状态
      statisticalStateOptions: []
    };
  },
  methods: {
    // 自定义方法
    searching() {
      this.search(this.searchData);
    }
    // clear(){
    //     this.searchData = {
    //         evaluKind:'',
    //         evaluPlan:'',
    //         flag:''
    //     };
    // }
    // 清空
    // clearFrom(){
    //     this.searchData={};
    // },
  },
  /**
   * 计算属性（自定义方法）
   * 调用方式：是以属性的方式调用
   * 使用场景：对于任何复杂逻辑
   *
   * computed是有缓存的功能
   */
  computed: {},
  created: function() {
    // 组件创建后
    // 获取评价类别
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
      }
    });
    //获取评价方式
    getLevelType().then(res => {
      if (res.status == 200) {
        this.levelTypeOptions = res.data;
      }
    });
    //获取统计状态
    getStatisticalState().then(res => {
      if (res.status == 200) {
        this.statisticalStateOptions = res.data;
      }
    });
  },
  mounted: function() {
    // 组件加载完成
    // TODO
  },
  beforeUpdate: function() {
    // 组件数据更新之前
    // TODO
  },
  updated: function() {
    // 组件数据更新之后
    // TODO
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
#searchFrom {
  padding-right: 18%;
}
</style>

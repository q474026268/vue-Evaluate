<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row type="flex" justify="space-between" class="margin-top">
        <el-col :span="2">
            <el-input
              v-model="searchData.evaluateTName"
              placeholder="测评表名称"
              size="small"
              clearable
            ></el-input>
        </el-col>
        <el-col :span="2">
            <el-input
              v-model="searchData.GroupName"
              placeholder="制表部门"
              size="small"
              clearable
            ></el-input>
        </el-col>

        <el-col :span="2">
            <el-select
              v-model="searchData.levelType"
              placeholder="评价方式"
              size="small"
              clearable
            >
              <el-option
                v-for="item in levelTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-input
              v-model="searchData.InputerFullName"
              placeholder="制表人"
              size="small"
              clearable
            ></el-input>
        </el-col>
        <el-col :span="5">
            <el-date-picker
              size="small"
              v-model="searchData.dateFrame"
              type="daterange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="searching"
            size="small"
            icon="el-icon-search"
          >查询</el-button>
          <el-button
            type="primary"
            @click="clear"
            size="small"
            icon="el-icon-refresh"
          >清空</el-button>
        </el-col>
      </el-row>
      <el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getLevelType } from "../processTracing.js";
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
      levelTypeOptions: []
    };
  },
  methods: {
    // 自定义方法
    searching() {
      this.search(this.searchData);
    },
    clear() {
      this.searchData = {
        evaluateTName: "",
        GroupName: "",
        levelType: "",
        InputerFullName: "",
        dateFrame: ""
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
  computed: {},
  // 组件创建后
  created: function() {
    //获取打分方式
    getLevelType().then(res => {
      if (res.status == 200) {
        this.levelTypeOptions = res.data;
      }
    });
  },
  // 组件加载完成
  mounted: function() {},
  // 组件数据更新之前
  beforeUpdate: function() {},
  // 组件数据更新之后
  updated: function() {}
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
span{
  display: inline-block;
  margin-bottom: 10px;
}
.margin-top{
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>

<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row class="margin-top">
        <el-col :span="4" style="width:250px;">
          <el-form-item label="测评表名称">
            <el-input
              v-model="searchData.evaluateTName"
              placeholder="输入测评表名称"
              size="small"
              style="width:150px;"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="width:240px;">
          <el-form-item label="制表部门">
            <el-input
              v-model="searchData.GroupName"
              placeholder="输入制表部门"
              size="small"
              style="width:150px;"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width:240px;">
          <el-form-item label="评价方式">
            <el-select
              v-model="searchData.levelType"
              placeholder="请选择评价方式"
              size="small"
              clearable
              style="width:150px;"
            >
              <el-option
                v-for="item in levelTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="width:200px;">
          <el-form-item label="制表人">
            <el-input
              v-model="searchData.InputerFullName"
              placeholder="输入制表人"
              size="small"
              style="width:130px;"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="width:350px;">
          <el-form-item label="开始时间" label-width="80px">
            <el-date-picker
              size="small"
              v-model="searchData.dateFrame"
              type="daterange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              style="width:250px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3" style="width:50px;">
          <el-button
            style="margin-top: 4px;"
            type="primary"
            @click="searching"
            size="small"
            icon="el-icon-search"
          >查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <!-- <hr size="3px" noshade="true" style="border-color:#409EFF;">
        <span style="font-weight:bold;font-size:17px;color:#409EFF">评价计划名称</span> -->
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
      console.log(res.data);
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
</style>

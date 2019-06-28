<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row type="flex" justify="space-between">
        <!-- <el-col :span="3">
          <el-select
            v-model="searchData.evaluKind"
            placeholder="评价类别"
            size="small"
          >
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col> -->
        <el-col :span="2">
          <el-select
            v-model="searchData.markType"
            placeholder="评价方式"
            size="small"
          >
            <el-option
              v-for="item in levelTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="searchData.planName"
            placeholder="评价计划"
            size="small"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            size="small"
            style="width:100%"
            v-model="searchData.dateFrame"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="searchData.evaluateTname"
            placeholder="评价表名"
            size="small"
            clearable
          ></el-input>
        </el-col>

        <el-col :span="4">
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
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind, getEvaluteState,getLevelType } from "../fillEvaluation.js";
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
      evaluKindOptions: [],
      stateOptions: [],
      levelTypeOptions:[]
    };
  },
  methods: {
    // 自定义方法
    searching() {
      this.search(this.searchData);
    },
    clear() {
      this.searchData = {
        evaluKind: "",
        markType: "",
        planName: "",
        dateFrame: "",
        evaluateTname: "",
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
  created: function() {
    // 组件创建后
    // TODO
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
      }
    });
    getEvaluteState().then(res => {
      if (res.status == 200) {
        this.stateOptions = res.data;
      }
    });
    getLevelType().then(res => {
      if (res.status == 200) {
        this.levelTypeOptions = res.data;
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
.demo-form-inline{
  margin-bottom: 22px;
}
</style>

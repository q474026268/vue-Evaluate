<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row>
        <el-col :span="18">
          <el-form-item label="模板类别">
            <el-select
              v-model="searchData.evaluKind"
              placeholder="模板类别"
              style="width:230px;"
              clearable
              size="small"
            >
              <el-option
                v-for="item in evaluKindOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板名称">
            <el-input
              v-model="searchData.modelName"
              placeholder="模板名称"
              style="width:230px;"
              clearable
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input
              v-model="searchData.groupName"
              placeholder="部门"
              style="width:180px;"
              clearable
              size="small"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="17">
          <el-form-item label="创建人">
            <el-input
              v-model="searchData.inputFullName"
              placeholder="创建人"
              style="width:230px;margin-left:14px;"
              clearable
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="searchData.dateFrame"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              style="width:271px;"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind } from "../onlineEvaluation.js";
export default {
  name: "search",
  inject: ["search"],
  props: {
    // 其他组件传入的值
  },
  data: function() {
    // 自定义变量
    return {
      searchData: {
        evaluKind: "",
      },
      evaluKindOptions: []
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
        modelName: "",
        groupName: "",
        dateFrame: "",
        inputerFullName: ""
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
<style>
</style>

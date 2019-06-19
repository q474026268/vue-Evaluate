<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row>
        <el-col :span="16" style="width: 350px;">
            <el-form-item label="评价类别" size="small" label-width="100">
              <el-select v-model="searchData.evaluKind" placeholder="评价类别" style="width:255px;">
                <el-option
                  v-for="item in evaluKindOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="8" style="width: 200px;">
              <el-form-item label="指标名称" size="small" label-width="100">
                <el-input v-model="searchData.targetName" placeholder="输入指标名称进行查询" style="width:110px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="4"  style="width: 150px;">
                <el-form-item label="状态" size="small" label-width="100">
                  <el-select v-model="searchData.flag" placeholder="状态" style="width:80px;">
                    <el-option
                      v-for="item in flagOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
          </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind, PlanState } from "../onlineEvaluation.js";
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
      flagOptions: []
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
        targetName: ""
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
  },
  mounted: function() {
    // 组件加载完成
    // TODO
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
      }
    });
    PlanState().then(res => {
      if (res.status == 200) {
        this.flagOptions = res.data;
      }
    });
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

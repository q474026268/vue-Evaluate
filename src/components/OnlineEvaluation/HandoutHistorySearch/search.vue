<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-select
              v-model="searchData.evaluKind"
              placeholder="评价类别"
              size="small"
              style="width:305px;"
            >
              <el-option
                v-for="item in evaluKindOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-input
              v-model="searchData.planName"
              placeholder="评价名称"
              size="small"
              clearable
              style="width:305px;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-input
              v-model="searchData.evaluateTname"
              placeholder="评价表名"
              size="small"
              clearable
              style="width:435px;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
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
        <el-col :span="7">
          <el-form-item>
            <el-input
              v-model="searchData.groupName"
              placeholder="部门"
              size="small"
              style="width:305px;"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label-width="100px">
            <el-date-picker
              size="small"
              v-model="searchData.dateFrame"
              type="daterange"
              range-separator="至"
              start-placeholder="制表开始日期"
              end-placeholder="制表结束日期"
              style="width:305px;"
            ></el-date-picker>
          </el-form-item>
        </el-col >
        <el-col :span="3">
          <el-form-item>
            <el-input
              v-model="searchData.inputerFullName"
              placeholder="制表人"
              size="small"
              style="width:200px;"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select
              v-model="searchData.state"
              placeholder="状态"
              size="small"
               style="width:213px;"
            >
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button  style="margin-top: 4px;" type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind, getEvaluteState } from "../onlineEvaluation.js";
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
      stateOptions: []
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
        evaluPlan: "",
        flag: ""
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
</style>

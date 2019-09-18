<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-position="left">
        <el-form-item label="评价方式">
          <el-select v-model="searchData.markType" placeholder="评价方式" size="small" style="width:150px">
            <el-option
              v-for="item in levelTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价计划">
          <el-input v-model="searchData.planName" placeholder="评价计划" size="small" clearable style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            size="small"
            style="width:250px"
            v-model="searchData.dateFrame"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="评价表名">
          <el-input v-model="searchData.evaluateTname" placeholder="评价表名" size="small" clearable style="width:150px"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
    </el-form>
  </div>
</template>
<script>
import {
  getEvaluKind,
  getEvaluteState,
  getLevelType
} from "../fillEvaluation.js";
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
        evaluKind: "",
        markType: "",
        planName: "",
        dateFrame: "",
        evaluateTname: ""
      };
    }
  },
  created: function() {
    // 组件创建后
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
  }
};
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 6px;
}
.el-button{
  margin-top: 4px;
}
</style>

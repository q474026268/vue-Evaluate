<template>
  <div id="search">
    <el-form
      :inline="true"
      :model="searchData"
      label-position="left"
      label-width="70px"
    >
      <div style="margin-top: 5px;">
        <el-form-item label="评价类别" size="small">
          <el-select v-model="searchData.evaluKind" placeholder="评价类别" style="width:305px;">
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
      </div>
      <div style="margin-top: -6px;">
        <el-form-item label="指标名称" size="small">
          <el-input v-model="searchData.targetName" placeholder="指标名称" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="状态" size="small" label-width="50px">
          <el-select v-model="searchData.flag" placeholder="状态" style="width:100px;">
            <el-option
              v-for="item in flagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
      </div>
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
      searchData: {
        flag:0
      },
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
  mounted: function() {
    // 组件加载完成
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
  }
};
</script>
<style lang="scss" scoped>
#search {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  > div {
    display: flex;
    justify-content: space-between;
  }
}
</style>

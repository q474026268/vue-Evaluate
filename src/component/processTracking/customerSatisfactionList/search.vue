<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-position="left" label-width="90px">
      <el-form-item label="制表时间">
        <el-date-picker
          size="small"
          v-model="searchData.dateFrame"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="制表时间"
          end-placeholder="制表时间"
          style="width:230px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="评价表名称">
        <el-input
          v-model="searchData.evaluateTname"
          placeholder="评价表名称"
          size="small"
          style="width:260px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-button
        style="margin-top: 4px;"
        type="primary"
        @click="searching"
        size="small"
        icon="el-icon-search"
      >查询</el-button>
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind } from "@/components/OnlineEvaluation/onlineEvaluation.js";
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
      evaluKindOptions: []
    };
  },
  methods: {
    // 自定义方法
    searching() {
      this.search(this.searchData);
    }
  },
  created: function() {
    // 组件创建后
    // TODO
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
#searchFrom {
  padding-right: 18%;
}
.search {
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 85%;
  margin-top: 6px;
}
</style>

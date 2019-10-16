<template>
  <div id="search">
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
      label-position="left"
      label-width="70px"
    >
      <div>
        <el-form-item label="评价类别">
          <el-select v-model="searchData.evaluKind" placeholder="评价类别" size="small" clearable style="width:200px">
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名">
          <el-input v-model="searchData.taskName" placeholder="任务名" size="small" clearable style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="制表时间">
          <el-date-picker
            size="small"
            v-model="searchData.inputDate"
            type="daterange"
            range-separator="至"
            start-placeholder="制表开始时间"
            end-placeholder="制表结束时间"
            style="width:250px"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="状态">
          <el-select v-model="searchData.state" placeholder="状态" size="small" clearable style="width:200px">
            <el-option
              v-for="item in statisticalStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button
          style="margin-top: 4px;"
          type="primary"
          @click="searching"
          size="small"
          icon="el-icon-search"
        >查询</el-button>
      </div>
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
      // table宽度重设
      this.$parent.$refs['table'].$el.style=`width:${this.$tableWidth}px;`
    }
  },
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
  flex-wrap: wrap;
  text-align: center;
  margin-top: 6px;
  > div {
    display: flex;
    justify-content: space-between;
  }
}
</style>

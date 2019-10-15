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
        <el-form-item label="测评类别">
          <el-select
            v-model="searchData.evaluKind"
            placeholder="测评类别"
            size="small"
            style="width:290px;"
            @change="evaluKindChange"
          >
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价名称">
          <el-input
            v-model="searchData.planName"
            placeholder="评价名称"
            size="small"
            clearable
            style="width:290px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="评价表名">
          <el-input
            v-model="searchData.evaluateTname"
            placeholder="评价表名"
            size="small"
            clearable
            style="width:290px;"
          ></el-input>
        </el-form-item>
        <el-button
          style="margin-top: 4px;"
          type="primary"
          @click="searching"
          size="small"
          icon="el-icon-search"
        >查询</el-button>
      </div>
      <div>
        <el-form-item label="部门">
          <el-input
            v-model="searchData.groupName"
            placeholder="部门"
            size="small"
            style="width:290px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="制表时间">
          <el-date-picker
            size="small"
            v-model="searchData.dateFrame"
            type="daterange"
            range-separator="至"
            start-placeholder="制表开始日期"
            end-placeholder="制表结束日期"
            style="width:290px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="制表人">
          <el-input
            v-model="searchData.inputerFullName"
            placeholder="制表人"
            size="small"
            style="width:290px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-button
          style="margin-top: 4px;"
          type="primary"
          @click="clear"
          size="small"
          icon="el-icon-refresh"
        >清空</el-button>
      </div>
      <el-form-item label="状态">
        <el-select v-model="searchData.state" placeholder="状态" size="small" style="width:290px;">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
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
      searchData: {
        evaluKind: "内部顾客满意度测评"
      },
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
        evaluKind: "内部顾客满意度测评",
      };
    },
    //评价类别改变事件
    evaluKindChange(val) {
      if (val == "员工达优测评") {
        this.$router.push({
          name: "handoutHistorySearchListStaff"
        });
      } else {
        this.$router.push({
          name: "evaluateClientList"
        });
      }
    }
  },
  computed: {},
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
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
.el-radio-group {
  margin-top: 5px;
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

<template>
  <div id="search">
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
      label-position="left"
      label-width="90px"
    >
      <div>
        <el-form-item label="制表部门">
          <el-input v-model="searchData.GroupName" placeholder="制表部门" size="small" clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="评价方式">
          <el-select v-model="searchData.levelType" placeholder="评价方式" size="small" clearable style="width:300px">
            <el-option
              v-for="item in levelTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制表人">
          <el-input v-model="searchData.InputerFullName" placeholder="制表人" size="small" clearable style="width:300px"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开始时间">
          <el-date-picker
            size="small"
            style="width:300px"
            v-model="searchData.dateFrame"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="测评表名称">
          <el-input v-model="searchData.evaluateTName" placeholder="测评表名称" size="small" clearable style="width:300px"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
      </div>
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
  // 组件创建后
  created: function() {
    //获取打分方式
    getLevelType().then(res => {
      if (res.status == 200) {
        this.levelTypeOptions = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
span {
  display: inline-block;
  margin-bottom: 10px;
}
.margin-top {
  margin-top: 5px;
  margin-bottom: 10px;
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
.el-button{
  margin-top: 4px;
}
</style>

<template>
  <div id="search" class="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-select v-model="searchData.evaluKind" placeholder="评价类别" size="small">
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
          <el-form-item id="state">
            <el-select v-model="searchData.flag" placeholder="状态" size="small">
              <el-option
                v-for="item in flagOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="searchData.evaluPlan" placeholder="请输入评价名称进行查询" size="small" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind, getPlanState } from "../onlineEvaluation.js";
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
      let data={};
      data.flag=parseInt(this.searchData.flag);
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
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
      }
    });
    getPlanState().then(res => {
      if (res.status == 200) {
        this.flagOptions = res.data;
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
.search {
  text-align: center;
}

#state .el-select {
  width: 150px;
}

#state .el-option {
  width: 150px;
}
</style>

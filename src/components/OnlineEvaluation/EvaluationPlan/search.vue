<template>
  <div id="search" class="search">
    <!-- <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="评价类别">
        <el-select v-model="searchData.evaluKind" placeholder="评价类别" size="small" style="width:270px">
          <el-option
            v-for="item in evaluKindOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item id="state" label="状态">
        <el-select v-model="searchData.flag" placeholder="状态" size="small" style="width:270px">
          <el-option
            v-for="item in flagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评价名称">
        <el-input v-model="searchData.evaluPlan" placeholder="评价名称" size="small" clearable style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
      </el-form-item>
    </el-form> -->
    <div class="leftDiv">
      <div>
        <span class="labelSpan">评价类别</span>
        <el-select v-model="searchData.evaluKind" placeholder="评价类别" size="small" style="width:270px">
          <el-option
            v-for="item in evaluKindOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <span class="labelSpan">状态</span>
        <el-select v-model="searchData.flag" placeholder="状态" size="small" style="width:270px">
          <el-option
            v-for="item in flagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <span class="labelSpan">评价名称</span>
        <el-input v-model="searchData.evaluPlan" placeholder="评价名称" size="small" clearable style="width:270px"></el-input>
      </div>
    </div>
    <div class="rightDiv">
        <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
    </div>
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
      let data = {};
      data.flag = parseInt(this.searchData.flag);
      this.search(this.searchData);
      // table宽度重设
      this.$parent.$refs['table'].$el.style=`width:${this.$tableWidth}px;`
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
  }
};
</script>
<style scoped>
.search {
  display: flex;
  text-align: center;
  margin-top: 6px;
  flex-wrap: wrap;
}
.labelSpan{
  display: inline-block;
  width: 70px;
  color: #606266;
  text-align: left;
  font-size: 14px;
}
.leftDiv{
  display: flex;
  flex-wrap: wrap;
}
.leftDiv>div{
  margin-right: 20px;
  margin-bottom: 10px;
}
.rightDiv{
  display: flex;
  margin-right: 10px;
  height: 32px;
}
#state .el-select {
  width: 150px;
}

#state .el-option {
  width: 150px;
}
</style>

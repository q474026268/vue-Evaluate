<template>
  <div id="search">
    <el-form :inline="true" :model="searchData" class="demo-form-inline" label-position="left" label-width="70px">
      <div>
        <el-form-item label="模板类别">
          <el-select
            v-model="searchData.evaluKind"
            placeholder="模板类别"
            style="width:320px;"
            clearable
            size="small"
          >
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input
            v-model="searchData.modelName"
            placeholder="模板名称"
            style="width:320px;"
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" label-width="50px">
          <el-input
            v-model="searchData.groupName"
            placeholder="部门"
            style="width:320px;"
            clearable
            size="small"
          ></el-input>
        </el-form-item>
      </div>
      <div style="margin-top:-10px;">
        <el-form-item label="创建人">
          <el-input
            v-model="searchData.inputFullName"
            placeholder="创建人"
            style="width:320px;"
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
            <el-date-picker
              v-model="searchData.beganStartDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="创建开始日期"
              style="width:150px;"
              prefix-icon="el-icon-date"
              size="small"
            ></el-date-picker>
            <div
              style="width:12px;height:1px;vertical-align:middle;display:inline-block;background:#d4d3d3"
            ></div>
            <el-date-picker
              v-model="searchData.endStartDate"
              type="date"
              placeholder="创建结束日期"
              format="yyyy-MM-dd"
              prefix-icon="el-icon-date"
              value-format="yyyy-MM-dd"
              style="width:150px;"
              size="small"
            ></el-date-picker>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getEvaluKind } from "../onlineEvaluation.js";
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
        // evaluKind: "员工达优测评"
      },
      evaluKindOptions: []
    };
  },
  methods: {
    // 自定义方法
    searching() {
      this.searchData.dateFrame=[];
      if(this.searchData.beganStartDate==undefined){
         this.searchData.dateFrame.push("")
      }else{
        this.searchData.dateFrame.push(this.searchData.beganStartDate)
      }
       if(this.searchData.endStartDate==undefined){
         this.searchData.dateFrame.push("")
      }
      else{
       this.searchData.dateFrame.push(this.searchData.endStartDate)
      }
      console.log(this.searchData);
      this.search(this.searchData);
    },
    clear() {
      // this.searchData.evaluKind = ""
      // this.searchData.modelName = ""
      // this.searchData.groupName = ""
      // this.searchData.dateFrame = ""
      // this.searchData.inputFullName = ""
      // this.searchData.beganStartDate = ""
      // this.searchData.endStartDate = ""
      this.searchData={}
    }
  },
  created: function() {
    // 组件创建后
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  width: 85%;
  margin-top: 6px;
  > div {
    display: flex;
    justify-content: space-between;
  }
}
</style>

<template>
  <el-dialog
    id="selectTarget"
    title="选择指标"
    :visible="visible"
    @close="close"
    :modal="false"
    width="30%"
  >
    <div class="head-area">
      <el-form ref="form" :inline="true">
        <el-form-item>
          <el-input
            v-model="searchData.targetName"
            placeholder="输入指标名称"
            size="small"
            style="width:200px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="targetTable"
      :data="tableData"
      :row-style="{cursor:'pointer'}"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      height="300"
      v-loading.body="listLoading"
      element-loading-text="Loading"
    >
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
      <el-table-column
        v-for="(item,index) in tableColumnConfig"
        :key="index"
        :prop="item.id"
        :label="item.text"
        :align="item.align"
        :min-width="item.width"
        :formatter="item.formatter"
      ></el-table-column>
    </el-table>
    <div class="floot-area">
      <el-button type="primary" size="small" icon="el-icon-success" @click="determine">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getEvaluateTargetByEvaluKind } from "./evaluateTarget.js";
export default {
  name: "selectTarget",
  props: ["callback"],
  data() {
    return {
      listLoading: false,
      tableData: [],
      tableColumnConfig: [
        {
          id: "targetName",
          text: "指标名称",
          align: "center",
          width: 120
        },
        {
          id: "evaluStand",
          text: "评分标准",
          align: "center",
          width: 120
        }
      ],
      // 选中的值
      selectedDatas: [],
      visible: false,
      currentPage: 0,
      pageSize: 15,
      total: 0,
      searchData: {}
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.$refs.targetTable.clearSelection();
      this.visible = false;
    },
    // 查询
    search() {},
    // 确定
    determine() {
      this.callback(this.selectedDatas);
      this.close();
    },
    // 获取数据
    getData() {
      //获取评价指标的各个类型
      getEvaluateTargetByEvaluKind("员工达优测评").then(res => {
        //将获取的数据只取指标名称,评分标准进行拼接
        let hash = [];
        for (let i = 0; i < res.data.length; i++) {
          hash.push({
            targetName: res.data[i].TargetName,
            Description: res.data[i].Description,
            EvaluStand: res.data[i].EvaluStand
          });
        }
        //将重复的指标名称进行查重去除
        let hashs=[];
        for(let i=0;i<hash.length;i++){
          if(hashs.indexOf(hash[i].targetName)==-1){
              hashs.push(hash[i].targetName)
          }
        }
        //根据指标名称添加评价标准
        let targetDataArr=[]
        for (let i = 0; i < hashs.length; i++) {
          targetDataArr.push({targetName:hashs[i],evaluStand:[]})
          for (let j = 0; j < hash.length; j++) {
            if(hash[j].targetName==targetDataArr[i].targetName){
              targetDataArr[i].evaluStand.push(hash[j].EvaluStand+':'+hash[j].Description)
            }
          }
        }
        //得到的指标名称和评价标准复制和主表数据
       this.tableData=targetDataArr
      });
    },
    // 行选中事件
    handleSelectionChange(rows) {
      this.selectedDatas = [];
      rows.forEach(({ pkid, targetName,evaluStand }) => {
        this.selectedDatas.push({ pkid, targetName,evaluStand });
      });
    },
    // 选择 条/页
    handleSize(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    // 页码改变时都会触发
    handlePage(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    }
  },
  created() {
    // 获取数据
    this.getData();
    this.selectedDatas = this.selected;
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
.head-area {
  width: 100%;
  text-align: center;
}
.floot-area {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
</style>



<template>
  <el-dialog
    id="selectTarget"
    title="选择指标"
    :visible="visible"
    @close="close"
    :modal="false"
    width="30%"
  >
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
        }
      ],
      // 选中的值
      selectedDatas: [],
      visible: false,
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
      console.log("VueX数据");
      console.log(this.$store.state.target);
      console.log("选中的数据");
      console.log(this.selectedDatas);
      if (this.$store.state.target.length == 0) {
        this.callback(this.selectedDatas);
        this.close();
      } else {
        //存储指标名称相同
        let messageName = [];
        //存储指标名称不相同的
        let message = [];
        for (let i = 0; i < this.selectedDatas.length; i++) {
          let isHave = false;
          for (let j = 0; j < this.$store.state.target.length; j++) {
            if (this.$store.state.target[j].targetPkid ==this.selectedDatas[i].pkid) {
              messageName.push(this.selectedDatas[i].targetName + " ");
              if (j == this.$store.state.target.length - 1) {
                isHave = true;
                break;
              }
            }
          }
          if (!isHave) {
            if (messageName.length > 0) {
              this.$message.error("指标:" + messageName + "已经存在");
            } else {
              message.push(this.selectedDatas[i]);
              if (i == this.selectedDatas.length - 1) {
                this.callback(message);
                this.close();
              }
            }
          } else {
            this.$message.error("指标:" + messageName + "已经存在");
          }
        }
      }
    },
    search() {},
    // 获取数据
    getData() {
      getEvaluateTargetByEvaluKind("内部顾客满意度测评").then(res => {
        if (res.status == 200) {
          this.tableData = res.data;
        }
      });
    },
    // 行选中事件
    handleSelectionChange(rows) {
      this.selectedDatas = [];
      rows.forEach(({ pkid, targetName }) => {
        this.selectedDatas.push({ pkid, targetName });
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



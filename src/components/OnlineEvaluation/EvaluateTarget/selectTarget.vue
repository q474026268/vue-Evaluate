<template>
  <el-dialog
    id="selectTarget"
    title="选择指标"
    :visible="visible"
    @close="close"
    :modal="false"
    width="45%"
    :close-on-click-modal="false"
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
      height="400"
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
import {
  getEvaluateTargetByEvaluKind,
  getTargetIndexListB
} from "./evaluateTarget.js";
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
    search() {
      getTargetIndexListB(this.searchData.targetName).then(res => {
        let hash = [];
        for (let i = 0; i < res.data.length; i++) {
          hash.push({
            targetName: res.data[i].TargetName,
            Description: res.data[i].Description,
            EvaluStand: res.data[i].EvaluStand,
            pkid: res.data[i].PKID
          });
        }
        //将重复的指标名称进行查重去除
        let hashs = [];
        for (let i = 0; i < hash.length; i++) {
          if (hashs.indexOf(hash[i].targetName) == -1) {
            hashs.push(hash[i].targetName);
          }
        }
        let pkid = [];
        for (let i = 0; i < hash.length; i++) {
          if (pkid.indexOf(hash[i].pkid) == -1) {
            pkid.push(hash[i].pkid);
          }
        }
        //根据指标名称添加评价标准
        let targetDataArr = [];
        for (let i = 0; i < hashs.length; i++) {
          targetDataArr.push({
            targetName: hashs[i],
            evaluStand: [],
            pkid: pkid[i]
          });
          for (let j = 0; j < hash.length; j++) {
            if (hash[j].targetName == targetDataArr[i].targetName) {
              targetDataArr[i].evaluStand.push(
                hash[j].EvaluStand + ":" + hash[j].Description
              );
            }
          }
        }
        //得到的指标名称和评价标准复制和主表数据
        this.tableData = targetDataArr;
        let evaluStand = [];
        for (let i = 0; i < targetDataArr.length; i++) {
          evaluStand.push(targetDataArr[i].evaluStand);
        }
      });
    },
    // 确定
    determine() {
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
            if (
              this.$store.state.target[j].targetName ==
              this.selectedDatas[i].targetName
            ) {
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
            EvaluStand: res.data[i].EvaluStand,
            pkid: res.data[i].PKID
          });
        }
        //将重复的指标名称进行查重去除
        let hashs = [];
        for (let i = 0; i < hash.length; i++) {
          if (hashs.indexOf(hash[i].targetName) == -1) {
            hashs.push(hash[i].targetName);
          }
        }
        let pkid = [];
        for (let i = 0; i < hash.length; i++) {
          if (pkid.indexOf(hash[i].pkid) == -1) {
            pkid.push(hash[i].pkid);
          }
        }
        //根据指标名称添加评价标准
        let targetDataArr = [];
        for (let i = 0; i < hashs.length; i++) {
          targetDataArr.push({
            targetName: hashs[i],
            evaluStand: [],
            pkid: pkid[i]
          });
          for (let j = 0; j < hash.length; j++) {
            if (hash[j].targetName == targetDataArr[i].targetName) {
              targetDataArr[i].evaluStand.push(
                hash[j].EvaluStand + ":" + hash[j].Description
              );
            }
          }
        }
        //得到的指标名称和评价标准复制和主表数据
        this.tableData = targetDataArr;
      });
    },
    // 行选中事件
    handleSelectionChange(rows) {
      this.selectedDatas = [];
      rows.forEach(({ pkid, targetName, evaluStand }) => {
        this.selectedDatas.push({ pkid, targetName, evaluStand });
      });
      for (let i = 0; i < this.selectedDatas.length; i++) {
        this.selectedDatas[i].evaluStand = this.selectedDatas[
          i
        ].evaluStand.join(" ");
      }
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



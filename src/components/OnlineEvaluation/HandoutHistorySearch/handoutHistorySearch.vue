<template>
  <div id="firstPage">
    <el-dialog title="在线评价-年终员工达优测评" :visible="true" @close="close" :width="dialogWidth">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="pkid" label="编号" v-show="false">
              <el-input v-model="formData.id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="modelName" label="测评表名 :" class="item">
              <label>{{formData.modelName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="evaluKind" label="评价类别 :" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="modelName" label="模板名称 :" class="item">
              <label>{{formData.modelName}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item prop="levelType" label="评价方式 :" class="item">
              <label>{{formData.levelType}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="markType" label="打分方式 :" class="item">
              <label>{{formData.markType}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="groupName" label="制表部门 :" class="item">
              <label>{{formData.groupName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="inputerFullName" label="制表人 :" class="item">
              <label>{{formData.inputerFullName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="inputDate" label="制表时间 :" class="item">
              <label>{{formData.inputDate}}</label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table ref="multipleTable" :data="dataTable" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="doFullName" label="评价人" align="center"></el-table-column>
        <el-table-column prop="doneFullName" label="被评价人" align="center"></el-table-column>
        <el-table-column prop="targetName" label="指标名称" align="center"></el-table-column>
        <el-table-column label="查看" align="center">
          <template slot-scope="scope">
            <el-button @click="view(scope.row.doFullName)" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
        <el-button @click="handout" type="primary">分发</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 表单样式
import "@/style/masterSlave.css";
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from "@/utils/common.js";
// 验证配置文件
import { addDictionary } from "./validate.js";
import {
  get,
  getDetailList,
  getTargetNames,
  saveStartPlan
} from "./handoutHistorySearch.js";
import { formatDate } from "@/utils/common.js";
// 主表主键字段
const mainKey = "guid";
export default {
  name: "handoutHisotrySearch",
  components: {},
  props: {
    // 其他组件传入的值
  },
  provide: function() {
    return {
      rowSelected: this.rowSelected,
      rowsSelected: this.rowsSelected,
      rowsSelectedAll: this.rowsSelectedAll,
      getList: "",
      SearchPage: ""
    };
  },
  data: function() {
    // 自定义变量
    return {
      formRules: {},
      // 表单类型 add modify view
      type: "",
      // 主表主键值
      id: "",
      // 主表数据
      formData: {},
      // 明细数据
      formDataDetail: [],
      // 弹出窗口宽度
      dialogWidth: "70%",
      //表单数据
      dataTable: [],
      //返回方式
      back: ""
    };
  },
  methods: {
    // 自定义方法
    view(doFullName) {
      if (this.type == "modify") {
        this.$router.push({
          name: "handoutViewStaff",
          query: {
            useType: "modify",
            id: this.formData.id,
            doFullName: doFullName
          }
        });
      } else if (this.type == "view") {
        this.$router.push({
          name: "handoutViewStaff",
          query: {
            useType: "view",
            id: this.formData.id,
            doFullName: doFullName
          }
        });
      }
    },
    //关闭窗口返回的页面
    close() {
      this.$router.push({
        name: "handoutHistorySearchListStaff"
      });
    },
    // 表单提交前
    beforeSubmit() {
      return true;
    },
    //根据id获取数据
    async getData() {
      await get(this.id).then(res => {
        if (res.status == 200) {
          this.formData = res.data[0];
          this.formData.inputDate = formatDate(this.formData.inputDate);
          //评价人
          const evaluate = res.data[0].doFullName.split(",");
          //被评价人
          let group = res.data[0].donoFullName.split(",");
          // 获取指标名称
          for (let i = 0; i < evaluate.length; i++) {
            this.dataTable.push({
              doFullName: "",
              doneFullName: "",
              targetName: ""
            });
            this.dataTable[i].doFullName = evaluate[i];
            let doneFullNames = [];
            for (let j = 0; j < group.length; j++) {
              doneFullNames.push(group[j]);
            }
            this.dataTable[i].doneFullName = doneFullNames.join(",");
            getTargetNames(this.id).then(res => {
              const data = res.data;
              //指标名称
              let targetNames = [];
              for (let k = 0; k < data.length; k++) {
                targetNames.push(data[k].TargetName);
              }
              this.dataTable[i].targetName = targetNames.join(",");
            });
          }
          //存储数据到VueX
          this.$store.commit("setYt", {
            formData: this.formData,
            dataTable: this.dataTable
          });
        }
      });
    },
    // 分发
    handout() {
      //保存开始计划
      saveStartPlan(this.id).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "分发成功",
            type: "success"
          });
          this.$store.state.data.callback();
          this.close();
        }
      });
    },
    // 弹出框回调函数
    dialogCallback(data) {
      this.$refs.table.refresh();
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
  watch: {},
  created: function() {
    // 组件创建后
    this.id = this.$route.query.id;
    this.back = this.$route.query.back;
    this.type = this.$route.query.useType;
    if (!Object.is(this.type, "add")) {
      if (this.back != 1) {
        this.getData();
      } else {
        this.formData = this.$store.state.yt.formData;
        this.dataTable = this.$store.state.yt.dataTable;
      }
    }
  },
  mounted: function() {
    // 组件加载完成
  },
  beforeUpdate: function() {
    // 组件数据更新之前
  },
  updated: function() {
    // 组件数据更新之后
  }
};
</script>
<style>
</style>

<template>
  <div id="evaluateClientView">
    <el-dialog :visible="true" @close="close" :width="dialogWidth">
      <el-form ref="form" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="evaluKind" label="模板类别:" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="modelName" label="模板名称:" class="item">
              <label>{{formData.modelName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="levelType" label="评价方式:" class="item">
              <label>{{formData.levelType}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="inputDate" label="制表时间:" class="item">
              <label>{{formData.inputDate}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="groupName" label="制表部门:" class="item">
              <label>{{formData.groupName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="emailDay" label="任务提示设置:" class="item">
              <label>{{formData.emailDay}}天</label>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="markType" label="打分方式:" class="item">
              <label>{{formData.markType}}</label>
            </el-form-item>
            <el-form-item prop="planPkid" v-show="false"></el-form-item>
            <el-form-item prop="evaluPlan" v-show="false"></el-form-item>
            <el-form-item prop="emailDay" v-show="false"></el-form-item>
            <el-form-item prop="modelPkid" v-show="false"></el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div id="tData">
        <el-table :data="tData" style="width: 100%">
          <el-table-column
            v-for="(item,index) in tableColumn"
            :key="index"
            :prop="item.id"
            :label="item.name"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="tableColumn[index]['optional'+(scope.$index+1)]"
                @change="Change"
                v-if="item.id != 'target0'"
                :disabled="Object.is(type,'view') || !(tableColumn[index]['optional'+(scope.$index+1)])"
              ></el-checkbox>
              <el-select
                v-if="item.id != 'target0'"
                v-model="tableColumn[index]['target'+(scope.$index+1)]"
                :disabled="Object.is(type,'view') || !(tableColumn[index]['optional'+(scope.$index+1)])"
                @change="Change"
                size="mini"
                style="width:110px"
              >
                <el-option
                  v-for="(item,index) in selectOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  style="width:100px"
                ></el-option>
              </el-select>
              <label v-else>{{ scope.row.target }}</label>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="toolbar" class="toolbar" slot="footer">
        <el-button @click="saveData(1)" type="primary" v-show="Object.is(type,'modify')">保存</el-button>
        <el-button @click="saveData(0)" type="primary" v-show="Object.is(type,'add')">暂存</el-button>
        <el-button @click="cancel" icon="el-icon-close" v-show="Object.is(type,'modify')">取消</el-button>
        <el-button @click="close" icon="el-icon-close" v-show="Object.is(type,'view')">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 表单样式
import "@/style/masterSlave.css";
import ZTable from "@/components/zTable";
// 请求后端接口的方法
// import { save, get } from "./evaluateClient.js";
import { formatDate } from "@/utils/common.js";
import { getSelect } from "../onlineEvaluation.js";
import { getSaveTableList } from "./handoutHistorySearch.js";
// 主表主键字段
const mainKey = "id";
export default {
  name: "handoutView",
  components: {},
  props: {
    // 其他组件传入的值
  },
  provide: function() {
    return {};
  },
  data: function() {
    // 自定义变量
    return {
      // 表单类型 add modify view
      type: "",
      // 主表主键值
      id: "",
      // 主表数据
      formData: {},
      // 明细数据
      formDataDetail_target: [],
      // 弹出窗口宽度
      dialogWidth: "70%",
      //循环竖列的信息
      tableColumn: [],
      //表头信息
      tData: [],
      //下拉框的选项
      selectOptions: [],
      //员工号
      userNo: "",
      //下标
      number: "",
      id: "",
      //评价人姓名
      doFullName: ""
    };
  },
  methods: {
    // 自定义方法
    //下拉框及复选框的变化事件
    Change() {
      this.tableColumn.push("11");
      this.tableColumn.pop();
    },
    //关闭窗口返回的页面
    close() {
      if (this.type == "view") {
        this.$router.push({
          name: "handoutHistorySearch",
          query: {
            useType: "view",
            back: "1"
          }
        });
      } else if (this.type == "modify") {
        this.$router.push({
          name: "handoutHistorySearch",
          query: {
            useType: "modify",
            back: "1"
          }
        });
      }
    },
    //取消
    cancel() {
      this.close();
    },
    // 表单提交前
    beforeSubmit() {
      return true;
    },
    //保存数据
    saveData() {
      this.$validator.validateAll().then(valid => {
        if (valid && this.beforeSubmit()) {
          let datas = {
            tableColumn: this.tableColumn,
            userNo: this.userNo
          };
          datas.tableColumn.shift();
          this.$store.commit("setOne", datas);
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.cancel();
        }
      });
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
    this.type = this.$route.query.useType;
    this.id = this.$route.query.id;
    this.doFullName = this.$route.query.doFullName;
    let targets = [];
    getSaveTableList(this.id, this.doFullName).then(res => {
      targets.push(res.data[0].fillHtml.split("},"));
    });
    console.log(targets);
    console.log(targets.length);
    let datas = this.$store.state.yt;
    this.formData = datas.formData;
    this.formData.inputDate = formatDate(this.formData.inputDate);
    //循环指标数组
    const targetLength = datas.dataTable[0].targetName.split(",");
    let targetNames = [];
    for (let i = 0; i < targetLength.length; i++) {
      targetNames = targetLength;
    }
    //将指标数组循环加入
    for (let i = 0; i < targetNames.length; i++) {
      this.tData.push({ target: targetNames[i] });
    }
    this.tableColumn.push({ id: "target0", name: "指标名称" });

    //循环被评价人姓名
    let doneFullName = [];
    doneFullName = datas.dataTable[0].doneFullName.split(",");
    //将被评价人姓名循环加入
    for (let j = 0; j < doneFullName.length; j++) {
      this.tableColumn.push({
        id: "target" + (j + 1),
        name: doneFullName[j]
      });
    }
    //循环添加指标等级
    for (let j = 0; j < this.tData.length; j++) {
      for (let i = 1; i < this.tableColumn.length; i++) {
        this.tableColumn[i]["target" + (j + 1)] = "A";
        // datas[this.number].doneFullArr[i - 1]["target" + (j + 1)];
        this.tableColumn[i]["optional" + (j + 1)] = true;
        // datas[this.number].doneFullArr[i - 1]["optional" + (j + 1)];
      }
    }
  },
  mounted: function() {
    // 组件加载完成
    getSelect().then(res => {
      if (res.status == 200) {
        this.selectOptions = res.data;
      }
    });
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
.evaluate-config {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  position: relative;
  text-align: center;
  background-color: #f0f8ff;
}
.area {
  height: 100%;
  display: inline-block;
}
.evaluate-config-left {
  width: 31%;
  position: absolute;
  left: 5px;
}
.evaluate-config-right {
  width: 34%;
  position: absolute;
  right: 5px;
}
.evaluate-config-center {
  width: 31%;
  margin-right: 30px;
}
</style>

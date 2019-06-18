<template>
  <div id="evaluateClient">
    <el-dialog
      :title="formData.planName"
      :visible="true"
      @close="close"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="pkid" label="编号" v-show="false">
              <el-input v-model="formData.pkid" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="evaluKind" label="模板类别" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="modelName" label="模板名称" class="item">
              <label>{{formData.modelName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="levelType" label="评价方式" class="item">
              <el-select
                v-model="formData.levelType"
                placeholder="请选择"
                :disabled="Object.is(type,'view')"
                :change="levelTypeChange()"
              >
                <el-option
                  v-for="item in levelTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="inputDate" label="制表时间" class="item">
              <el-date-picker
                v-model="formData.inputDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择制表时间"
                :disabled="Object.is(type,'view')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="groupName" label="制表部门" class="item">
              <label>{{formData.groupName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="markType" label="打分方式" class="item">
              <el-select
                v-model="formData.markType"
                placeholder="请选择"
                :disabled="Object.is(type,'view')"
              >
                <el-option
                  v-for="item in markTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="evaluate-config">
        <div class="area evaluate-config-left">
          <div>
            <span class="detail_title">被评价人列表</span>
            <div class="detail_toolbar" v-show="!Object.is(type,'view')">
              <el-button
                type="primary"
                @click="addDetailRow_group"
                icon="el-icon-plus"
                size="mini"
                title="添加行"
              ></el-button>
            </div>
          </div>
          <el-table :data="formDataDetail_group" style="width: 100%;" border height="360">
            <el-table-column align="center" label="序号" width="30">
              <template slot-scope="scope">
                <label>{{ scope.$index+1 }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="员工号" width="66">
              <template slot-scope="scope">
                <label>{{ scope.row.doneUserNo }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="姓名" width="55">
              <template slot-scope="scope">
                <label>{{ scope.row.doneFullName }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="部门" width="68">
              <template slot-scope="scope">
                <label>{{ scope.row.groupName }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="40">
              <template slot-scope="scope">
                <el-button
                  :disabled="Object.is(type,'view')"
                  size="mini"
                  type="danger"
                  @click="handleDelete_group(scope.$index, scope.row)"
                  icon="el-icon-delete"
                  title="删除"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="area evaluate-config-center">
          <div style="position: relative;">
            <span class="detail_title">评价指标列表</span>
            <div class="detail_toolbar" style="height:28px;" v-show="!Object.is(type,'view')"></div>
          </div>
          <el-table :data="formDataDetail_index" style="width: 100%;" border height="360">
            <el-table-column align="center" label="指标名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                <label>{{ scope.row.targetName }}</label>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="area evaluate-config-right">
          <div>
            <span class="detail_title">评价人列表</span>
            <div class="detail_toolbar" v-show="!Object.is(type,'view')">
              <el-button
                type="primary"
                @click="addDetailRow_evaluate"
                icon="el-icon-plus"
                size="mini"
                title="添加行"
                :disabled="!showOperation()"
              ></el-button>
            </div>
          </div>
          <el-table :data="formDataDetail_evaluate" style="width: 100%;" border height="360">
            <el-table-column align="center" label="序号" width="30">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                <label>{{ scope.$index+1 }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="员工号">
              <template slot-scope="scope">
                <label>{{ scope.row.userNo }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">
                <label>{{ scope.row.doFullName }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="用户名" width="55" v-if="false">
              <template slot-scope="scope">
                <label>{{ scope.row.doUserName }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="部门">
              <template slot-scope="scope">
                <label>{{ scope.row.groupName }}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="showOperation()">
              <template slot-scope="scope">
                <el-button
                  :disabled="Object.is(type,'view')"
                  size="mini"
                  type="danger"
                  @click="handleDelete_evaluate(scope.$index, scope.row)"
                  icon="el-icon-delete"
                  title="删除"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
        <el-button @click="nextStep('form')" type="primary">下一步</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
      <select-depart ref="depart" :callback="departDialogCallback"></select-depart>
      <select-user ref="user" :callback="userDialogCallback"></select-user>
    </el-dialog>
  </div>
</template>
<script>
// 表单样式
import "@/style/masterSlave.css";
// 请求后端接口的方法
import { get, getCurrentEvaluate } from "./evaluateClient.js";
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from "@/utils/common.js";
// 验证配置文件
import Rules from "./validate.js";
//引用组件被评价人
import SelectDepart from "@/components/components/selectDepart/selectDepart";
//引用组件评价人
import SelectUser from "@/components/components/selectUser/selectUser";
//获取评价方式和打分方式
import { getLevelType, getMarkType } from "../onlineEvaluation.js";
// 主表主键字段
const mainKey = "id";
export default {
  name: "evaluateClient",
  props: {
    // 其他组件传入的值
  },
  components: {
    SelectDepart,
    SelectUser
  },
  data: function() {
    // 自定义变量
    return {
      formRules: Rules,
      // 表单类型 add(添加) modify(修改) view(查看)
      type: "",
      // 主表主键值
      id: "",
      // 主表数据
      formData: {},
      // 明细数据
      formDataDetail_group: [],
      formDataDetail_index: [],
      formDataDetail_evaluate: [],
      // 明细删除的数据
      deleteDetailData_group: [],
      deleteDetailData_index: [],
      deleteDetailData_evaluate: [],
      // 弹出窗口宽度
      dialogWidth: "80%",
      //评价方式列表
      levelTypeOptions: [],
      //打分方式列表
      markTypeOptions: [],
      //判断是否是使用
      isuse: ""
    };
  },
  methods: {
    // 自定义方法
    //关闭窗口返回的页面
    close() {
      this.$router.push("/");
    },
    //获取从selectDepart中查询到的数据存放
    departDialogCallback(data) {
      //被评价人明细数据
      //如果评价方式是互评就将被评价人数据赋值给评价人
      if (this.formData.levelType == "互评") {
        for (let i = 0; i < data.length; i++) {
          this.formDataDetail_group.push({
            doneFullName: data[i].name,
            doneUserNo: data[i].id,
            groupName: data[i].departmentName
          });
        }
        for (let i = 0; i < data.length; i++) {
          this.formDataDetail_evaluate.push({
            doFullName: data[i].name,
            userNo: data[i].id,
            groupName: data[i].departmentName,
            doUserName: data[i].userName
          });
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          this.formDataDetail_group.push({
            doneFullName: data[i].name,
            doneUserNo: data[i].id,
            groupName: data[i].departmentName
          });
        }
      }
      //将被评价人明细数据存储到VueX中
      let group = this.formDataDetail_group;
      this.$store.commit("setGroup", group);
    },
    //获取从selectUser中查询到的数据存放到formDataDetail_evaluate中
    userDialogCallback(data) {
      //评价人明细数据
      for (let i = 0; i < data.length; i++) {
        this.formDataDetail_evaluate.push({
          doFullName: data[i].name,
          userNo: data[i].id,
          groupName: data[i].departmentName,
          doUserName: data[i].userName
        });
      }
      //将评价人明细数据存储到VueX中
      let evaluate = this.formDataDetail_evaluate;
      this.$store.commit("setEvaluate", evaluate);
    },
    // 被评价人添加行
    addDetailRow_group() {
      if (this.formData.levelType == undefined) {
        this.$message.error("请先选择评价方式");
      } else {
        this.$refs.depart.open();
      }
    },
    //指标添加行
    addDetailRow_index() {
      this.formDataDetail_index.push({ doType: "add" });
    },
    //评价人添加行
    addDetailRow_evaluate() {
      if (this.formData.levelType == undefined) {
        this.$message.error("请先选择评价方式");
      } else if (this.formData.levelType == "互评") {
        this.$message.error("请选择被评价人");
      } else {
        this.$refs.user.open();
      }
    },
    // 被评价人删除行
    handleDelete_group(index, row) {
      if (this.formData.levelType == "互评") {
        this.formDataDetail_group.splice(index, 1);
        this.deleteDetailData_group.push(
          Object.assign(row, { doType: "delete" })
        );
        this.formDataDetail_evaluate.splice(index, 1);
        this.deleteDetailData_evaluate.push(
          Object.assign(row, { doType: "delete" })
        );
      } else {
        this.formDataDetail_group.splice(index, 1);
        this.deleteDetailData_group.push(
          Object.assign(row, { doType: "delete" })
        );
      }
      let group = this.formDataDetail_group;
      this.$store.commit("setGroup", group);
    },
    //指标删除行
    handleDelete_index(index, row) {
      this.formDataDetail_index.splice(index, 1);
      this.deleteDetailData_index.push(
        Object.assign(row, { doType: "delete" })
      );
    },
    //评价人删除行
    handleDelete_evaluate(index, row) {
      this.formDataDetail_evaluate.splice(index, 1);
      this.deleteDetailData_evaluate.push(
        Object.assign(row, { doType: "delete" })
      );
      let evaluate = this.formDataDetail_evaluate;
      this.$store.commit("setEvaluate", evaluate);
    },
    // 表单提交前事件
    beforeSubmit() {
      return true;
    },
    // 下一步
    nextStep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.beforeSubmit()) {
          // 被评价人列表数据
          let group = this.formDataDetail_group;
          //指标列表数据
          let index = this.formDataDetail_index;
          // 评价人列表数据
          let evaluate = this.formDataDetail_evaluate;
          if (group.length == 0 || evaluate.length == 0) {
            this.$message.error("评价人和被评价人不能为空");
          } else {
            let formData = this.formData;
            if (this.isUse != "true") {
              let targetName = [];
              let targetPkid = [];
              for (let i = 0; i < index.length; i++) {
                targetName.push(index[i].targetName);
                targetPkid.push(index[i].targetPkid);
              }
              this.formData.targetName = targetName.join(",");
              this.formData.targetPkid = targetPkid.join(",");
            }
            this.$store.commit("setData", {
              formData: this.formData,
              group,
              index,
              evaluate
            });
            this.$router.push({
              path: "/evaluateHistory",
              query: {
                useType: "add",
                modelPkid:this.id
              }
            });
          }
        }
      });
    },
    //根据评论状态是否显示评价人列表操作
    showOperation() {
      if (this.formData.levelType == "互评") {
        return false;
      } else {
        return true;
      }
    },
    //评价方式改变
    levelTypeChange() {
      let data=this.formData.levelType;
      this.$store.commit('setLeaveType',data)
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
    const data = this.$store.state.data.data;
    this.type = this.$route.query.useType;
    this.id = data.main.pkid;
    this.isuse = this.$route.query.isUse;
    // 获取模板数据
    this.formData = data.main;
    this.formDataDetail_index = data.detail;
    //在存储数据前 先清空vueX中的被评价人与评价人数据
    this.$store.state.group=[];
    this.$store.state.evaluate=[];
  },
  mounted: function() {
    // 组件加载完成
    // 获取评价方式
    getLevelType().then(res => {
      if (res.status == 200) {
        this.levelTypeOptions = res.data;
      }
    });
    //获取打分方式
    getMarkType().then(res => {
      if (res.status == 200) {
        this.markTypeOptions = res.data;
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

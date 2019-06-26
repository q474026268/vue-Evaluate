<template>
  <div id="indexManage">
    <el-dialog
      title="添加评价指标"
      :visible="true"
      @close="close"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item prop="pkid" label="编号" v-show="false">
          <el-input v-model="formData.pkid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="evaluKind" label="评价类别" class="item">
          <el-select
            v-model="formData.evaluKind"
            placeholder="请选择"
            :disabled="Object.is(type,'view')"
            @change="evaluKindChange"
          >
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="targetName" label="指标名称" class="item">
          <el-input
            v-model="formData.targetName"
            placeholder="输入指标名称"
            :disabled="Object.is(type,'view')"
          ></el-input>
        </el-form-item>
        <el-form-item label="指标含义" class="item" v-show="isShow">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.description"
            placeholder="输入指标含义"
            :disabled="Object.is(type,'view')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div id="toolbar" class="toolbar" slot="footer">
        <el-button
          ref="saveButton"
          type="primary"
          @click="saveData('form')"
          v-show="!Object.is(type,'view')"
        >保存</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { save, get } from "./indexManage.js";
import { getEvaluKind } from "../onlineEvaluation.js";
import { guid } from "@/utils/common.js";
import { formatDate } from "@/utils/common.js";
import Rules from "./validate.js";
export default {
  name: "indexManageStaff",
  props: {
    // 其他组件传入的值
  },
  data: function() {
    // 自定义变量
    return {
      formRules: Rules,
      //表单类型
      type: "",
      // 表单数据
      formData: {},
      // 表单主键值
      id: "",
      // 弹出窗口宽度 默认为屏幕的50%
      dialogWidth: "50%",
      // 评价类别
      evaluKindOptions: [],
      //指标含义是否显示
      isShow: false
    };
  },
  methods: {
    // 自定义方法
    // 关闭弹出框
    close() {
      this.$router.back(-1);
    },
    // 表单提交前事件
    beforeSubmit() {
      return true;
    },
    saveData(formName) {
      if (this.formData.evaluKind == "内部客户满意度评测") {
        if (this.formData.description == undefined||this.formData.description == "") {
          this.$message({
            message: "指标含义不能为空",
            type: "warning"
          });
          return;
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid && this.beforeSubmit()) {
          //部门ID
          this.formData.groupId = this.$store.state.userInfo.departmentId;
          //部门名称
          this.formData.groupName = this.$store.state.userInfo.departmentName;
          //录入人ID
          this.formData.inputerUserNo = this.$store.state.userInfo.id;
          //录入人姓名
          this.formData.inputerFullName = this.$store.state.userInfo.name;
          //录入时间
          this.formData.inputDate = formatDate(new Date());
          let data = Object.assign({}, this.formData);
          save(data).then(res => {
            if (res.status == 200) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$store.state.data.callback({
                type: this.type,
                data: res.data
              });
              this.close();
            }
          });
        }
      });
    },
    getData() {
      get(this.id).then(res => {
        if (res.status == 200) {
          this.formData = res.data;
        }
      });
    },
    //评价类别改变事件
    evaluKindChange(val) {
      if (val == "内部客户满意度评测") {
        let form = {};
        form.evaluKind = "内部客户满意度评测";
        this.formData = form;
        this.isShow = true;
      } else if (val == "员工达优测评") {
        let form = {};
        form.evaluKind = "员工达优测评";
        this.formData = form;
        this.isShow = false;
      }
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
    this.type = this.$store.state.data.useType;
    this.id = this.$store.state.data.id;
    this.dialogCallback = this.$store.state.data.dialogCallback;
    if (!Object.is(this.type, "add")) {
      this.getData();
    }
  },
  mounted: function() {
    // 组件加载完成
    //获取评价类别
    getEvaluKind().then(res => {
      if (res.status == 200) {
        this.evaluKindOptions = res.data;
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
.remarkText {
  padding: 0 20px 0 20px;
}
</style>

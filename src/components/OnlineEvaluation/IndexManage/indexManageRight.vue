<template>
  <div id="indexManage">
    <el-dialog
      title="添加评价标准及典型行为描述"
      :visible="true"
      @close="close"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="编号" v-show="false">
          <el-input v-model="formData.pkid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="evaluStand" label="评分标准" class="item">
          <el-select
            v-model="formData.evaluStand"
            placeholder="请选择"
            :disabled="Object.is(type,'view')"
          >
            <el-option
              v-for="item in evaluStandOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="典型行为" class="item">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="formData.description"
            :disabled="Object.is(type,'view')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div id="toolbar" class="toolbar" slot="footer">
        <el-button ref="saveButton" type="primary" @click="saveData('form')">保存</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { save, get } from "./indexManageRightList.js";
import { getEvaluStand } from "../onlineEvaluation.js";
import { guid } from "@/utils/common.js";
import { formatDate } from "@/utils/common.js";
import Rules from "./validate.js";
export default {
  name: "indexManageRight",
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
      evaluStandOptions: [],
      dialogCallback: function() {},
      callback: function() {
        this.dialogCallback({ type: this.type, data: this.formData });
      },
      //主表id
      firstPkid:""
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
      // TODO
      return true;
    },
    saveData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.beforeSubmit()) {
          let data = Object.assign({}, this.formData);
          data.flag = 0;
          data.inputerUserNo = this.$store.state.userInfo.id;
          data.inputerFullName = this.$store.state.userInfo.name;
          data.groupId = this.$store.state.userInfo.departmentId;
          data.groupName = this.$store.state.userInfo.departmentName;
          data.inputDate = formatDate(new Date());
          data.firstPkid=this.firstPkid;
          save(data).then(res => {
            if (res.status == 200) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$store.state.data.callback()
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
    this.type = this.$route.query.useType;
    this.id = this.$route.query.id;
    this.firstPkid=this.$route.query.firstPkid;
    this.dialogCallback = this.$route.query.dialogCallback;
    if (!Object.is(this.type, "add")) {
      this.getData();
    }
  },
  mounted: function() {
    // 组件加载完成
    // TODO
    getEvaluStand().then(res => {
      if (res.status == 200) {
        this.evaluStandOptions = res.data;
      }
    });
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
<style>
.remarkText {
  padding: 0 20px 0 20px;
}
</style>

<template>
  <div id="evaluateModel">
    <el-dialog
      title="添加在线评价模板"
      :visible="true"
      @close="close"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <!-- <el-form-item prop="pkid" label="编号" v-show="false">
          <el-input v-model="formData.pkid" :disabled="true"></el-input>
        </el-form-item>-->
        <el-form-item prop="flag" v-show="false">
          <el-input v-model="formData.flag" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="evaluKind" label="模板类别" class="item">
          <el-select v-model="formData.evaluKind" placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in evaluKindOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="modelName" label="模板名称" class="item">
          <el-input
            v-model="formData.modelName"
            placeholder="输入模板名称"
            :disabled="Object.is(type,'view')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="detail">
        <div class="detail_toolbar" v-show="!Object.is(type,'view')">
          <el-button
            type="primary"
            @click="addDetailRow"
            icon="el-icon-plus"
            size="mini"
            title="添加行"
          ></el-button>
        </div>
        <el-table :data="formDataDetail" style="width: 100%" border>
          <el-table-column align="center" label="指标名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pkid" v-show="false"></el-input>
              <label>{{ scope.row.targetName }}</label>
              <el-input v-model="formDataDetail.flag" v-show="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="评分标准">
            <template slot-scope="scope">
              <label>{{ scope.row.evaluStand }}</label>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" v-if="!Object.is(type,'view')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
                title="删除"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="toolbar" class="toolbar" slot="footer">
        <el-button ref="saveButton" type="primary" @click="saveData('form',0)">保存</el-button>
        <el-button type="primary" @click="saveData('form',1)" icon="el-icon-success">保存并使用模板</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
      <select-target ref="target" :callback="targetDialogCallback"></select-target>
    </el-dialog>
  </div>
</template>
<script>
import "@/style/masterSlave.css";
import { save, get, getRunningPlan } from "./evaluateModel.js";
import { getEvaluKind } from "../onlineEvaluation.js";
import { guid } from "@/utils/common.js";
import { formatDate } from "@/utils/common.js";
import Rules, { addDictionary } from "./validate.js";
import SelectTarget from "../EvaluateTarget/selectTarget.vue";
export default {
  name: "evaluateModelStaff",
  props: {
    // 其他组件传入的值
  },
  components: {
    SelectTarget
  },
  data: function() {
    // 自定义变量
    return {
      formRules: Rules,
      //表单类型
      type: "",
      // 表单数据
      formData: {
        evaluKind: "员工达优测评",
        flag: "0"
      },
      // 明细数据
      formDataDetail: [],
      // 明细删除的数据
      deleteDetailData: [],
      // 表单主键值
      id: "",
      // 弹出窗口宽度 默认为屏幕的50%
      dialogWidth: "45%",
      // 评价类别
      evaluKindOptions: []
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
    //根据按钮状态保存(保存,保存并使用模板)
    async saveData(formName, mark) {
      let valid1 = false;
      let valid2 = false;
      await this.$validator.validateAll().then(valid => {
        valid1 = valid;
      });
      await this.$refs[formName].validate(valid => {
        valid2 = valid;
      });
      this.formData.inputerUserNo = this.$store.state.userInfo.id;
      this.formData.inputFullName = this.$store.state.userInfo.name;
      this.formData.groupId = this.$store.state.userInfo.departmentId;
      this.formData.groupName = this.$store.state.userInfo.departmentName;
      this.formData.inputDate = formatDate(new Date());
      if (Object.is(this.type, "add")) {
        let targetPkid = [];
        for (let i = 0; i < this.formDataDetail.length; i++) {
          targetPkid.push(this.formDataDetail[i].pkid);
        }

        for (let i = 0; i < this.formDataDetail.length; i++) {
          this.formDataDetail[i].targetPkid = targetPkid[i];
          this.formDataDetail[i].pkid = "";
        }
      }else if(Object.is(this.type, "view")){
        console.log(this.formDataDetail);
      }

      console.log(this.formDataDetail);
      // 合并明细数据
      let newFormDataDetail = [
        ...this.formDataDetail,
        ...this.deleteDetailData
      ];
      // 添加明细数据
      // 将明细的数据放在主表的childrens属性里面，后端的实体类也要有这个childrens属性
      if (valid1 && valid2 && this.beforeSubmit()) {
        let data = Object.assign({}, this.formData);
        data["childrens"] = Array.from(newFormDataDetail);
        console.log(data);
        if (mark == 0) {
          save(data).then(res => {
            if (res.status == 200) {
              let callback = this.$store.state.data.callback;
              if (callback) {
                callback({ type: this.type, data: res.data });
              }
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.close();
            }
          });
        } else {
          getRunningPlan().then(res => {
            if (res.data == 0) {
              this.$message.error("暂无评价计划");
            } else {
              save(data).then(res => {
                if (res.status == 200) {
                  let callback = this.$store.state.data.callback;
                  if (callback) {
                    callback({ type: this.type, data: res.data });
                  }
                  // 保存并使用
                  this.$store.commit("setData", {
                    data: res.data,
                    datas: data
                  });
                  this.$router.push({
                    name: "evaluateClientStaff",
                    query: {
                      useType: "addtow"
                    }
                  });
                }
              });
            }
          });
        }
      }
    },
    //根据id获取数据
    getData() {
      get(this.id).then(res => {
        if (res.status == 200) {
          this.formData = res.data.main;
          this.formDataDetail = res.data.detail;
          // let targetPkid=[];
          // for(let i=0;i<this.formDataDetail.length;i++){
          //  targetPkid.push(this.formDataDetail[i].targetPkid)
          // }
          // for(let i=0;i<this.formDataDetail.length;i++){
          //   this.formDataDetail[i].pkid=targetPkid[i]
          //   this.formDataDetail[i].targetPkid=""
          // }
          // console.log(this.formDataDetail);
          let target = this.formDataDetail;
          this.$store.commit("setTarget", target);
        }
      });
    },
    // 添加行
    addDetailRow() {
      this.$refs.target.open();
    },
    // 删除行
    handleDelete(index, row) {
      this.formDataDetail.splice(index, 1);
      let target = this.formDataDetail;
      this.$store.commit("setTarget", target);
      if (Object.is(row.doType, "add")) {
        return;
      }
      this.deleteDetailData.push(Object.assign(row, { doType: "delete" }));
    },
    //指标数据回调
    targetDialogCallback(data) {
      data.forEach(({ pkid: pkid, targetName, evaluStand }) => {
        this.formDataDetail.push({
          pkid,
          targetName,
          evaluStand,
          doType: "add"
        });
      });
      let target = this.formDataDetail;
      this.$store.commit("setTarget", target);
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
    this.type = this.$store.state.data.useType;
    this.id = this.$store.state.data.id;
    this.$store.state.target = [];
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

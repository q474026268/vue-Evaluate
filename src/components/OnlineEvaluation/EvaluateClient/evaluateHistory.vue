<template>
  <div id="firstPage">
    <el-dialog
      title="在线评价-年终员工达优测评"
      :visible="true"
      @close="close"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form ref="formData" :model="formData" label-width="100px" :rules="formRules">
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="evaluateTname" label="测评表名 :" class="item">
              <el-input v-model="formData.evaluateTname" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="groupName" label="制表部门 :" class="item">
              <label>{{formData.groupName}}</label>
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
          <el-col :span="4">
            <el-form-item prop="markType" label="打分方式 :" class="item">
              <label>{{formData.markType}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="evaluKind" label="评价类别 :" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="inputerFullName" label="制表人 :" class="item">
              <label>{{formData.inputerFullName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="inputDate" label="制表时间 :" class="item">
              <label>{{formData.inputDate}}</label>
            </el-form-item>
          </el-col>
          <el-form-item prop="evaluPlan" v-show="false">
            <label>{{formData.evaluPlan}}</label>
          </el-form-item>
          <el-form-item prop="modelPkid" v-show="false"></el-form-item>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item prop="emailDay" label="催办提前期" class="item">
              <el-input type="number" v-model="emailDay" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table ref="multipleTable" :data="dataTable" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="doFullName" label="评价人" width="100" align="center"></el-table-column>
        <el-table-column prop="doneFullName" label="被评价人" align="center"></el-table-column>
        <el-table-column prop="targetName" label="指标" width="320" align="center"></el-table-column>
        <el-table-column prop="groupName" label="部门" v-if="false"></el-table-column>
        <el-table-column prop="userNo" label="员工号" v-if="false"></el-table-column>
        <el-table-column label="调整" align="center">
          <template slot-scope="scope">
            <el-button @click="update(scope.row,scope.$index)" type="primary" size="mini">调整</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
        <el-button @click="handout('formData',0)" type="primary">分发</el-button>
        <el-button @click="handout('formData',1)" type="primary">暂存</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal='false' title="设置催办邮件信息" width="700px" :visible.sync="dialogFormVisible">
      <div class='itemDiv'>
        <span class="labelSpan">邮件标题</span>
        <el-input v-model="emailSubject"></el-input>
      </div>
      <div class='itemDiv'>
        <span class="labelSpan">邮件内容</span>
        <el-input
          type="textarea"
          placeholder=""
          v-model="emailContent"
          maxlength="200"
          show-word-limit
          rows='4'
        >
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMail">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 表单样式
import "@/style/masterSlave.css";
import DefaultButtons from "../../zTable/zTable.js";
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from "@/utils/common.js";
// 验证配置文件
import { addDictionary } from "../HandoutHistorySearch/validate.js";
import {
  get,
  getDetailList
} from "../HandoutHistorySearch/handoutHistorySearch.js";
import { time } from "@/utils/common.js";
import { getCurrentEvaluate } from "./evaluateClient.js";
import { save } from "./evaluateClient.js";
// 主表主键字段
const mainKey = "guid";
// 路由的名称
const routerName = "evaluateClientViewStaff";
export default {
  name: "handoutHisotrySearch",
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
      dataTable: [],
      //表格列表
      tableList: [],
      formRules: {
        evaluateTname: [
          { required: true, message: "请输入评价表名", trigger: "blur" }
        ]
      },
      // 表单类型 add modify view
      type: "",
      // 主表主键值
      id: "",
      // 主表数据
      formData: {},
      //计划评价表PKID
      planPkid: "",
      //催办提前期
      emailDay: "",
      //计划名称
      evaluPlan:"",
      // 明细数据
      formDataDetail: [],
      // 弹出窗口宽度
      dialogWidth: "1200px",
      //存储的targetName,ModelPkid,targetPkid
      index: [],
      dialogFormVisible:false,
      // 邮件标题
      emailSubject:'',
      // 邮件内容
      emailContent:''
    };
  },
  methods: {
    //自定义方法
    //关闭窗口返回到模板表管理首页
    close() {
      this.$router.push({
        name: "evaluateModelListStaff"
      });
    },
    // 表单提交前
    beforeSubmit() {
      return true;
    },
    //调整
    update(row, number) {
      const loading = this.$loading({
        lock: true,
        text: "数据加载中,请稍等",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store.commit("setHistory", {
        //主表数据
        formData: this.formData,
        //明细表数据
        dataTable: this.dataTable,
        //指标名称
        index: this.index,
        //员工号
        userNo: row.userNo,
        number: number
      });
      loading.close();
      this.$router.push({
        name: "evaluateClientViewStaff",
        query: {
          useType: "modify"
        }
      });
    },
    // 发送邮件
    sendMail(){
      // 指标数据
      let targetName = this.formData.targetName.split(",");
      let targetPkid = this.formData.targetPkid.split(",");
      let headChildrens = [];
      for (let i = 0; i < this.formData.targetCount; i++) {
        headChildrens.push({
          targetName: targetName[i],
          targetPKID: targetPkid[i]
        });
      }
      // 评价人与被评价人数据
      let evaluate = this.$store.state.data.evaluate;
      for (let i = 0; i < evaluate.length; i++) {
        this.dataTable[i].doneFullArr = this.$store.state.clientView[
          i
        ].doneFullArr;
      }
      let listChildrens = [];
      for (let i = 0; i < this.dataTable.length; i++) {
        listChildrens.push({
          doFullName: this.dataTable[i].doFullName,
          doneFullArr: [],
          doneFullName: this.dataTable[i].doneFullName,
          deptName: this.dataTable[i].groupName,
          targetName: this.dataTable[i].targetName,
          doUserNo: this.dataTable[i].userNo,
          doUserName: this.$store.state.data.evaluate[i].doUserName
        });
      }
      for (let i = 0; i < this.dataTable.length; i++) {
        listChildrens[i].doneFullArr = JSON.stringify(
          this.dataTable[i].doneFullArr
        );
      }

      this.formData.emailDay=this.emailDay
      let data = this.formData;
      data["headChildrens"] = Array.from(headChildrens);
      data["listChildrens"] = Array.from(listChildrens);
      console.log(data);
      data.emailSubject=this.emailSubject
      data.emailContent=this.emailContent
      const loading = this.$loading({
        lock: true,
        text: "保存数据中,请稍等",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      save(data).then(res => {
        if (res.status == 200) {
          loading.close();
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$store.state.handout.callback();
          this.close();
        }
      });
    },
    // 分发 暂存
    handout(formName, mark) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.emailDay=='' || !this.emailDay) {
            this.$message({
              message: '请填写催办提前期',
              type: 'warning'
            });
          }
          // 指标数据
          let targetName = this.formData.targetName.split(",");
          let targetPkid = this.formData.targetPkid.split(",");
          let headChildrens = [];
          for (let i = 0; i < this.formData.targetCount; i++) {
            headChildrens.push({
              targetName: targetName[i],
              targetPKID: targetPkid[i]
            });
          }
          // 评价人与被评价人数据
          let evaluate = this.$store.state.data.evaluate;
          for (let i = 0; i < evaluate.length; i++) {
            this.dataTable[i].doneFullArr = this.$store.state.clientView[
              i
            ].doneFullArr;
          }
          let listChildrens = [];
          for (let i = 0; i < this.dataTable.length; i++) {
            listChildrens.push({
              doFullName: this.dataTable[i].doFullName,
              doneFullArr: [],
              doneFullName: this.dataTable[i].doneFullName,
              deptName: this.dataTable[i].groupName,
              targetName: this.dataTable[i].targetName,
              doUserNo: this.dataTable[i].userNo,
              doUserName: this.$store.state.data.evaluate[i].doUserName
            });
          }
          for (let i = 0; i < this.dataTable.length; i++) {
            listChildrens[i].doneFullArr = JSON.stringify(
              this.dataTable[i].doneFullArr
            );
          }
          // 主表数据
          if (mark == 0) {
            this.formData.state = "开始";
            this.dialogFormVisible=true
          } else {
            this.formData.state = "暂存";
            this.formData.emailDay=this.emailDay
            let data = this.formData;
            data["headChildrens"] = Array.from(headChildrens);
            data["listChildrens"] = Array.from(listChildrens);
            console.log(data);
            const loading = this.$loading({
              lock: true,
              text: "保存数据中,请稍等",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            save(data).then(res => {
              if (res.status == 200) {
                loading.close();
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$store.state.handout.callback();
                this.close();
              }
            });
          }
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
    if (!Object.is(this.type, "add")) {
      //将数据从VueX(前面存入)中取出
      let datas = this.$store.state.history;
      this.formData = datas.formData;
      // //格式化显示日期
      this.formData.inputDate = time(this.formData.inputDate);
      this.dataTable = datas.dataTable;
    } else {
      const data = this.$store.state.data;
      this.formData = data.formData;
      this.formData.inputDate = time(this.formData.inputDate);
      this.index = data.index;
      console.log(this.index);
      // 获取计划信息
      getCurrentEvaluate().then(res => {
        if (res.status == 200) {
          this.planPkid = res.data.pkid;
          // 催办提前期
          this.emailDay = res.data.emailDay;
          this.evaluPlan=res.data.evaluPlan;
        }
        //将计划信息中的数据赋值给主表数据
        //计划pKid
        this.formData.planPkid = this.planPkid;
        //模板pKid
        this.formData.modelPkid = this.$route.query.modelPkid;
        this.formData.planName=this.evaluPlan;
      });
      //评价指标列表数据
      let index = data.index;
      //评价人列表数据
      let evaluate = data.evaluate;
      //被评价人列表数据
      let group = data.group;
      //主表指标个数
      this.formData.targetCount = index.length;
      //主表评价人数
      this.formData.doUserCount = evaluate.length;
      //主表评价人姓名
      let doFullName = [];
      for (let i = 0; i < evaluate.length; i++) {
        doFullName.push(evaluate[i].doFullName);
      }
      this.formData.doFullName = doFullName.join(",");
      //主表被评价人数
      this.formData.doneUserCount = group.length;
      //主表被评价人姓名
      let donoFullName = [];
      for (let i = 0; i < group.length; i++) {
        donoFullName.push(group[i].doneFullName);
      }
      this.formData.donoFullName = donoFullName.join(",");
      //主表制表人ID
      this.formData.inputerUserNo = this.$store.state.userInfo.id;
      //主表部门ID
      this.formData.groupId = this.$store.state.userInfo.departmentId;
      //主表部门全路径ID
      this.formData.groupFullId = "";
      //主表部门名称
      this.formData.groupName = this.$store.state.userInfo.departmentName;
      //主表填写人名称
      this.formData.inputerFullName = this.$store.state.userInfo.name;
      //主表是否在过程跟踪中调整
      this.formData.eidtFlag = "是";
      //主表完整的填表人数
      this.formData.fillNum = "0";
      //明细表数据
      for (let i = 0; i < evaluate.length; i++) {
        this.dataTable.push({
          doneFullArr: [],
          doFullName: "",
          doneFullName: "",
          targetName: "",
          groupName: ""
        });
        //明细表评价人列表数据
        this.dataTable[i].doFullName = evaluate[i].doFullName;
        //明细表评价人部门名称
        this.dataTable[i].groupName = evaluate[i].groupName;
        //明细表评价人员工号
        this.dataTable[i].userNo = evaluate[i].userNo;
        //明细表被评价人列表数据
        let doneFullNames = [];
        for (let i = 0; i < group.length; i++) {
          doneFullNames.push(group[i].doneFullName);
        }
        this.dataTable[i].doneFullName = doneFullNames.join(",");
        //明细表指标名称
        let targetNames = [];
        for (let i = 0; i < index.length; i++) {
          targetNames.push(index[i].targetName);
        }
        this.dataTable[i].targetName = targetNames.join(",");
      }
      let itemArr = [];
      for (let i = 0; i < this.dataTable.length; i++) {
        itemArr.push({
          userNo: this.dataTable[i].userNo,
          doFullName: this.dataTable[i].doFullName,
          targetNames: this.dataTable[i].targetName,
          doneFullArr: []
        });
        for (let k = 0; k < group.length; k++) {
          itemArr[i].doneFullArr.push({
            doneFullName: group[k].doneFullName,
            doUserNo: group[k].doneUserNo
          });
          for (let j = 0; j < data.index.length; j++) {
            itemArr[i].doneFullArr[k]["optional" + (j + 1)] = true;
            itemArr[i].doneFullArr[k]["target" + (j + 1)] =null;
          }
        }
      }
      console.log(itemArr);
      this.$store.commit("setClientView", itemArr);
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
<style scoped>
.itemDiv{
  display: flex;
  align-items: center;
}
.itemDiv:first-child{
  margin-bottom: 20px;
}
.labelSpan{
  width: 100px;
}
</style>

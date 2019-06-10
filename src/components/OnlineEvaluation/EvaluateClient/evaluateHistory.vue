<template>
  <div id="firstPage">
    <el-dialog title="在线评价-年终员工达优测评" :visible="true" @close="close" :width="dialogWidth">
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
            <el-form-item prop="evaluateTname" label="测评表名 :" class="item">
              <el-input v-model="evaluateTname" size="mini"></el-input>
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
          <el-col :span="6">
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
          <el-form-item prop="evaluPlan" v-show="false">
            <label>{{formData.evaluPlan}}</label>
          </el-form-item>
          <el-form-item prop="modelPkid" v-show="false"></el-form-item>
        </el-row>
        <div v-show="false">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="targetCoun" label="指标个数">
                <label>{{formData.targetCoun}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="planPkid" label="计划评价表PKID">
                <label>{{planPkid}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="emailDay" label="催办提前期">
                <label>{{emailDay}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item prop="doFullName" label="评价人姓名">
                <label>{{formData.doFullName}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="doUserCount" label="评价人数">
                <label>{{formData.doUserCount}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="donoFullName" label="被评价人姓名">
                <label>{{formData.donoFullName}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="doneUserCount" label="被评价人数">
                <label>{{formData.doneUserCount}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item prop="inputFullName" label="制表人名称">
                <label>{{formData.inputFullName}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="groupId" label="部门Id">
                <label>{{formData.groupId}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="groupFullId" label="部门全路径Id">
                <label>{{formData.groupFullId}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="groupName" label="部门名称">
                <label>{{formData.groupName}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item prop="eidtFlag" label="是否在过程跟踪中调整" label-width="160px">
                <label>{{formData.eidtFlag}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="fillNum" label="完整的填表人数" label-width="160px">
                <label>{{formData.fillNum}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="finishDate" label="完成时间">
                <label>{{formData.finishDate}}</label>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="flag" label="flag">
                <label>{{formData.flag}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="state">
                <label>{{formData.state}}</label>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-table ref="multipleTable" :data="dataTable" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="doFullName" label="评价人" width="100" align="center"></el-table-column>
        <el-table-column prop="doneFullName" label="被评价人" align="center"></el-table-column>
        <el-table-column prop="targetName" label="指标" width="300" align="center"></el-table-column>
        <el-table-column prop="groupName" label="部门" v-if="false"></el-table-column>
        <el-table-column prop="userNo" label="员工号" v-if="false"></el-table-column>
        <el-table-column label="调整" align="center">
          <template slot-scope="scope">
            <el-button @click="update(scope.row,scope.$index)" type="primary" size="mini">调整</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
        <el-button @click="handout()" type="primary">执行</el-button>
        <el-button @click="saveData('form')" type="primary">暂存</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
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
import { formatDate } from "@/utils/common.js";
import { getCurrentEvaluate } from "./evaluateClient.js";
import { save } from "./evaluateClient.js";
//import Rules from "./validate.js";
// 主表主键字段
const mainKey = "guid";
// 路由的名称
const routerName = "check";
export default {
  name: "handoutHisotrySearch",
  components: {
    //ZTable
  },
  props: {
    // 其他组件传入的值
  },
  provide: function() {
    return {
      rowSelected: this.rowSelected,
      rowsSelected: this.rowsSelected,
      rowsSelectedAll: this.rowsSelectedAll,
      getList: this.getList,
      SearchPage: ""
    };
  },
  data: function() {
    // 自定义变量
    return {
      dataTable: [],
      //表格列表
      tableList: [],
      formRules: {},
      // 表单类型 add modify view
      type: "",
      // 主表主键值
      id: "",
      // 主表数据
      formData: {},
      //测评表名
      evaluateTname: "",
      //计划评价表PKID
      planPkid: "",
      //催办提前期
      emailDay: "",
      // 明细数据
      formDataDetail: [],
      // 弹出窗口宽度
      dialogWidth: "70%",
      //存储的targetName,ModelPkid,targetPkid
      index: [],
      doUserName: ""
    };
  },
  methods: {
    // 自定义方法
    //关闭窗口返回到模板表管理首页
    close() {
      this.$router.push({
        name: "evaluateModelList"
      });
    },
    // 表单提交前
    beforeSubmit() {
      return true;
    },
    update(row, index) {
      // this.formData.evaluateTname = this.evaluateTname;
      // this.formData.planPkid = this.planPkid;
      // this.formData.emailDay = this.emailDay;
      this.$store.commit("setHistory", {
        formData: this.formData,
        dataTable: this.dataTable,
        index: this.index,
        row: row,
        index: index,
        callback: this.dialogCallback
      });
      this.$router.push({
        name: "evaluateClientView",
        query: {
          useType: "modify"
        }
      });
    },
    //暂存
    saveData() {},
    // 分发执行
    handout() {
      //指标数据
      let headChildrens = this.index;
      //评价人与被评价人数据
      let listChildrens = this.dataTable;
      //主表数据
      let data = this.formData;
      data["headChildrens"] = Array.from(headChildrens);
      data["listChildrens"] = Array.from(listChildrens);
      // listChildrens[0].push({check:true})
      // for(let i=0;i<headChildrens.length;i++){
      //    listChildrens.push({check:true})
      // }
      console.log(listChildrens);
      this.$store.commit("setInitialization", data);
      this.$message({
        message: "保存成功",
        type: "success"
      });
      // save(data).then(res => {
      //   if (res.status == 200) {
      //   }
      // });
    },
    getList() {},
    modifyButtonClick() {
      DefaultButtons.modifyButton(pageUrl, routerName);
    },
    /**
     * 浏览按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    viewButtonClick() {
      DefaultButtons.viewButton(pageUrl, routerName);
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
  watch: {
    // 监听明细数据的变化，添加错误信息翻译
    formDataDetail: function(curVal, oldVal) {
      let dics = {};
      for (let index of curVal.keys()) {
        let count = index + 1;
        dics["name_" + index] = "第" + count + "行的名称";
        dics["model_" + index] = "第" + count + "行的型号";
        dics["count_" + index] = "第" + count + "行的数量";
        dics["price_" + index] = "第" + count + "行的单价";
      }
      addDictionary(dics);
    }
  },
  created: function() {
    // 组件创建后
    this.type = this.$route.query.useType;
    if (!Object.is(this.type, "add")) {
      let datas = this.$store.state.history;
      this.formData = datas.formData;
      this.dataTable = datas.dataTable;
      this.evaluateTname = datas.formData.evaluateTname;
      this.planPkid = datas.formData.planPkid;
      this.emailDay = datas.formData.emailDay;
      this.index = this.$store.state.data.data.index;
    } else {
      const data = this.$store.state.data.data;
      this.formData = data.formData;
      this.index = data.index;
      let formData = this.formData;
      // 获取计划信息
      getCurrentEvaluate().then(res => {
        if (res.status == 200) {
          this.planPkid = res.data.pkid;
          this.emailDay = res.data.emailDay;
          this.evaluateTname = res.data.evaluPlan;
        }
      });
      //格式化显示日期
      this.formData.inputDate = formatDate(this.formData.inputDate);
      //评价指标列表数据
      let index = data.index;
      //评价人列表数据
      let evaluate = data.evaluate;
      //被评价人列表数据
      let group = data.group;
      //主表指标个数
      this.formData.targetCoun = index.length;
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
      this.formData.groupFullId = "1";
      //主表部门名称
      this.formData.groupName = this.$store.state.userInfo.departmentName;
      //主表是否在过程跟踪中调整
      this.formData.eidtFlag = "是";
      //主表完整的填表人数
      this.formData.fillNum = "0";
      //主表State
      this.formData.state = "0";
      //明细表数据
      for (let i = 0; i < evaluate.length; i++) {
        this.dataTable.push({
          doFullName: "",
          doneFullName: "",
          targetName: "",
          groupName: "",
          check:"",
        });
        //明细表复选框值
        this.dataTable[i].check=true;
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
    }
    this.formData.evaluateTname = this.evaluateTname;
    this.formData.planPkid = this.planPkid;
    this.formData.emailDay = this.emailDay;
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

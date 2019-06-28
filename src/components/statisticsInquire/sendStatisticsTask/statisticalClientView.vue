<template>
  <div id="evaluateClientView">
    <el-dialog
      :title="formData.planName"
      :visible="true"
      @close="close"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item prop="id" label="编号" v-show="false">
              <el-input v-model="formData.id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="evaluKind" label="评价类别：" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="taskName" label="任务名称：" class="item">
              <label>{{formData.taskName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="inputDate" label="制表时间：" class="item">
              <label>{{formData.inputDate}}</label>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item prop="inputerFullName" label="制表人：" class="item">
              <label>{{formData.inputerFullName}}</label>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <el-table :data="tableData">
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
      <div id="toolbar" class="toolbar" slot="footer">
        <el-button @click="saveData(1)" type="primary" v-show="!Object.is(type,'view')">分发</el-button>
        <el-button @click="saveData(0)" type="primary" v-show="!Object.is(type,'view')">暂存</el-button>
        <el-button @click="close" icon="el-icon-close" v-show="!Object.is(type,'view')">取消</el-button>
        <el-button @click="close" icon="el-icon-close" v-show="Object.is(type,'view')">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ZTable from "@/components/zTable";
// 请求后端接口的方法
import { save, getA } from "./evaluateClient.js";
import { getLoginInfo } from "../onlineEvaluation.js";
import { formatDate } from "@/utils/common.js";
// 主表主键字段
const mainKey = "id";
export default {
  name: "evaluateClientViewStaff",
  components: {
    ZTable
  },
  props: {
    // 其他组件传入的值
  },
  provide: function() {
    return {
      rowSelected: this.rowSelected,
      rowsSelected: this.rowsSelected,
      rowsSelectedAll: this.rowsSelectedAll,
      getList: "",
      SearchPage: "",
      beforeGetListData: this.beforeGetListData
    };
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
      formDataDetail_evaluate: [],
      // 弹出窗口宽度
      dialogWidth: "64%",
      //明细表数据
      tableData:[],
      tableColumnConfig: [
        {
          id: "EvaluateTname",
          text: "测评表名",
          align: "center",
          width: 80,
          sortable: false
        },
        {
          id: "GroupName",
          text: "制表部门",
          align: "center",
          width: 80,
          sortable: false
        },
        {
          id: "InputerFullName",
          text: "制表人",
          align: "center",
          width: 80,
          sortable: false
        },
        {
          id: "DoneUserCount",
          text: "评价人数",
          align: "center",
          width: 80,
          sortable: false
        },
        {
          id: "DoUserCount",
          text: "被评价人数",
          align: "center",
          width: 80,
          sortable: false
        }
      ]
    };
  },
  methods: {
    // 自定义方法
    //关闭窗口返回的页面
    close() {
      if (Object.is(this.type, "add") && !this.$route.query.nowPage) {
        this.$router.push({ name: "evaluateModelListStaff" });
      } else if (this.$route.query.nowPage == "statisticalPreprocessingList") {
        this.$router.push({ name: "statisticalPreprocessingListStaff" });
      } else {
        this.$router.push({ name: "evaluateClientListStaff" });
      }
    },
    // 表单提交前
    beforeSubmit() {
      // TODO
      return true;
    },
    saveData(mark) {
      // this.$validator.validateAll().then((valid) => {
      //     if(valid && this.beforeSubmit()){
      //         this.formData.state = mark == 0?'暂存':'分发';
      //         let data = Object.assign({},this.formData,getLoginInfo());
      //         // 添加明细数据
      //         data["headChildrens"] = Array.from(this.formDataDetail_target);
      //         data["listChildrens"] = Array.from(this.formDataDetail_evaluate);
      //         save(data).then((res)=>{
      //             if(res.status == 200){
      //                 let callback = this.$store.state.data.callback;
      //                 if(callback){
      //                     callback({type:this.type,data:res.data});
      //                 }
      //                 this.$message({
      //                     message: '保存成功',
      //                     type: 'success'
      //                 });
      //                 this.close();
      //             }
      //         });
      //     }
      // });
    },
    // 分发
    handout() {},
    async dataToview() {
      // if(!Object.is(this.type,"add") && !Object.is(this.type,'amodify')){
      //     this.id = this.$route.query.id;
      //     await get(this.id).then((res) => {
      //         this.formData = res.data.main;
      //         this.formDataDetail_target = res.data.headDetail;
      //         this.formDataDetail_evaluate = res.data.listDetail;
      //     });
      // }else{
      //     let data = this.$store.state.data.data;
      //     this.formData = data.main;
      //     this.formDataDetail_target = data.headDetail;
      //     this.formDataDetail_evaluate = data.listDetail;
      //     this.formData.groupName = getLoginInfo('groupName');
      // }
      // let tableData = [];
      // this.formData.inputDate = formatDate(this.formData.inputDate);
      // let doFullNames = this.formData.doFullName;
      // let doneFullNames = this.formData.doneFullName;
      // let targetNames = '';
      // this.formDataDetail_target.forEach(({targetName},index) => {
      //     if(index != 0){
      //         targetNames += `,`
      //     }
      //     targetNames += `${targetName}`
      // });
      // doFullNames.split(',').forEach(val => {
      //     tableData.push(
      //         {
      //             doFullName:val,
      //             groupName:doneFullNames,
      //             targetName:targetNames
      //         }
      //     );
      // });
      // return Promise.resolve({status:200,data:tableData});
    },
    rowSelected() {},
    rowsSelected() {},
    rowsSelectedAll() {},
    // 请求列表数据之前
    beforeGetListData(currentPage, pageSize, order, filters) {}
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
    const data = this.$route.query.formDate;
    if (Object.is(this.type, "modify")) {
      this.type = "amodify";
    }
    if (Object.is(this.type, "view")) {
      this.formData.evaluKind = data.EvaluKind;
      this.formData.taskName = data.TaskName;
      this.formData.inputDate = formatDate(data.InputDate);
      // this.formatDate.inputerFullName=data.InputerFullName;
      let dataApi={};
      dataApi.evaluateId=this.id;
      dataApi.evaluKind=this.$route.query.EvaluKind;
      getA(dataApi).then(res => {
        this.tableData=res.data;
      });
    }
  },
  mounted: function() {
    // 组件加载完成
    // DOTO
  },
  beforeUpdate: function() {
    // 组件数据更新之前
    // DOTO
  },
  updated: function() {
    // 组件数据更新之后
    // DOTO
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

<template>
  <div id="check">
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
          <el-col :span="7">
            <el-form-item prop="evaluKind" label="评价类别" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="evaluateTname" label="测评表名称" class="item">
              <label>{{formData.evaluateTname}}</label>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item prop="levelType" label="评价方式" class="item">
              <label>{{formData.levelType}}</label>
            </el-form-item>
          </el-col>
         <el-col :span="5">
            <el-form-item prop="inputDate" label="开始时间" class="item">
              <label>{{formData.inputDate}}</label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <z-table
        ref="table"
        :tableColumnConfig="tableColumnConfig"
        :tableBaseConfig="tableBaseConfig"
        :toolBarConfig="toolBarConfig"
      ></z-table>
      <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
        <el-button @click="handout" type="primary">分发</el-button>
        <el-button @click="saveData" type="primary">暂存</el-button>
        <el-button @click="close" icon="el-icon-close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 表单样式
import "@/style/masterSlave.css";
import DefaultButtons from "../../zTable/zTable.js";
import ZTable from "@/components/zTable";
// 请求后端接口的方法
// import { save,get,update,getDetailList } from '@/api/tempSheetManage.js'
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from "@/utils/common.js";
// 验证配置文件
import { addDictionary } from "./validate.js";
// 主表主键字段
const mainKey = "guid";
export default {
  name: "firstPage",
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
      getList: this.getList,
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

      tableBaseConfig: {
        showOperation:false,
        showPageBar: false,
        tableHeight: 250
      },
      toolBarConfig: {
        top:{},
        eachRow: {
          default: [],
          dropdown: []
        }
      },

      // 列表配置
      tableColumnConfig: [
        {
          id: "doFullName",
          text: "学习发展能力",
          align: "center",
          width: 80,
          sortable: false
        },
        {
          id: "groupName",
          text: "主动性",
          align: "center",
          width: 200,
          sortable: false
        },
        {
          id: "targetName",
          text: "责任心",
          align: "center",
          width: 100,
          sortable: false
        }
      ]
    };
  },
  methods: {
    // 自定义方法
    //关闭窗口返回的页面
    close() {
      this.$router.back(-1);
    },
    // 表单提交前
    beforeSubmit() {
      // TODO
      return true;
    },
    saveData() {
      this.$validator.validateAll().then(valid => {
        if (valid && this.beforeSubmit()) {
          //this.$refs.saveButton.loading = true;
          let data = this.formData;
          // 合并明细数据
          let newFormDataDetail = [
            ...this.formDataDetail,
            ...this.deleteDetailData
          ];
          // 添加明细数据
          // 将明细的数据放在主表的childrens属性里面，后端的实体类也要有这个childrens属性
          data["childrens"] = Array.from(newFormDataDetail);
          if (Object.is(this.type, "add")) {
            save(data).then(res => {
              if (res.status == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.close();
              }
            });
          } else if (Object.is(this.type, "modify")) {
            update(data).then(res => {
              if (res.status == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.close();
              }
            });
          }
        }
        // 弹出错误信息
        if (!valid) {
          let message = ``;
          for (let item of this.errors.items) {
            message += '<p style="margin-bottom:2px;">' + item.msg + "</p>";
          }
          this.$message({
            dangerouslyUseHTMLString: true,
            message: message,
            type: "error"
          });
        }
      });
    },
    async getData() {
      // let fkguid = '';
      // // 获取主表数据
      // await get(this.id).then((res) => {
      //     if(res.status == 200){
      //        this.formData = res.data;
      //        fkguid = this.formData[mainKey];
      //     }
      // });
      // // 获取明细数据
      // await getDetailList(fkguid).then((res) => {
      //     if(res.status == 200){
      //        this.formDataDetail = res.data;
      //     }
      // });
    },
    // 分发
    handout() {},
    getList() {
      return Promise.resolve({ status: 200, data: [] });
    },
    modifyButtonClick(id) {
      DefaultButtons.modifyButton(pageUrl, routerName, id, this.dialogWidth);
    },
    /**
     * 浏览按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    viewButtonClick(id) {
      DefaultButtons.viewButton(pageUrl, routerName, id);
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
    // DOTO
    this.type = this.$route.params.useType;
    this.id = this.$route.params.id;
    if (!Object.is(this.type, "add")) {
      this.getData();
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
</style>

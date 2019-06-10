<template>
  <div id="table">
    <el-dialog title="XXXXXXXXXXXXXXXXX" :visible="true" @close="close" :width="dialogWidth">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="id" label="table主表主键" v-show="false">
              <el-input v-model="formData.id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item prop="evaluKind" label="评价类别 :" class="item">
              <label>{{formData.evaluKind}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="evaluateTname" label="测评表名称 :" class="item">
              <label>{{formData.evaluateTname}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="LevelType" label="评价方式 :" class="item">
              <label>{{formData.levelType}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="groupName" label="制表部门 :" class="item">
              <label>{{formData.groupName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="inputerFullName" label="制表人 :" class="item">
              <label>{{formData.inputerFullName}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="startDate" label="开始时间 :" class="item">
              <label>{{formData.startDate}}</label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div id="tablelist">
        <z-table
          ref="tablelist"
          :tableColumnConfig="tableColumnConfig"
          :toolBarConfig="toolBarConfig"
          :tableBaseConfig="tableBaseConfig"
        ></z-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ZTable from "../../zTable";
import DefaultButtons from "../../zTable/zTable.js";
import { getList } from "./evaluateRetroaction.js";
import { formatDate } from "@/utils/common.js";
const pageUrl = "/staffEavlution"; // 表单的路由路径
const routerName = "staffEavlution"; // 路由的名称
const key = "pkid"; // 主键字段
export default {
  name: "evaluateRetroactionList",
  //组件名称
  components: {
    ZTable
  },
  // 其他组件传入的值
  props: {},
  provide: function() {
    return {
      rowSelected: this.rowSelected,
      rowsSelected: this.rowsSelected,
      rowsSelectedAll: this.rowsSelectedAll,
      getList: getList
    };
  },
  data: function() {
    // 自定义变量
    return {
      type:"",
      id:"",
      tableBaseConfig: {
        tableHeight: "calc(100% - 140px)", // 列表的其他配置
        currentSort: [{ prop: "id", order: "descending" }] // 默认排序
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluKind",
          text: "评价人员工号",
          align: "center",
          width: 40,
          sortable: true
        },
        {
          id: "evaluateTName",
          text: "评价人姓名",
          align: "center",
          width: 40,
          sortable: true
        },
        {
          id: "groupName",
          text: "制表部门",
          align: "center",
          width: 80,
          sortable: true
        },

        {
          id: "StartDate",
          text: "评价时间",
          align: "center",
          width: 80,
          sortable: true,
          formatter: function(row, column) {
            return formatDate(row.StartDate);
          }
        },
        {
          id: "inputerFullName",
          text: "状态",
          align: "center",
          width: 20,
          sortable: true
        }
      ],
      // 工具栏配置
      toolBarConfig: {
        // 列表上方按钮
        top: [],
        // 列表行内按钮
        eachRow: {
          // 默认显示
          default: [
            {
              id: "default_view",
              text: "废弃",
              icon: "el-icon-view",
              click: row => {
                this.viewButtonClick(row[key], row.state);
              }
            },
            {
              id: "default_view",
              text: "催办",
              icon: "el-icon-view",
              click: row => {
                this.viewButtonClick(row[key], row.state);
              }
            },
            {
              id: "default_view",
              text: "浏览",
              icon: "el-icon-view",
              click: row => {
                this.viewButtonClick(row[key], row.state);
              }
            }
          ],
          // 下拉显示
          dropdown: []
        }
      }
    };
  },
  methods: {
    // 自定义方法
    viewButtonClick(id, state) {
      this.$router.push({
        path: "/",
        name: "",
        params: {
          useType: "view",
          id
        }
      });
    },
    /**
     * 行选中事件:单选时触发
     * currentRow:当前行 oldCurrentRow:上一次选中的行
     */
    rowSelected(currentRow, oldCurrentRow) {},
    /**
     * 行选中事件:多选时触发
     * rows：选中的所有行
     */
    rowsSelected(rows) {},
    /**
     * 点击全选的checkbox触发
     * rows：选中的所有行
     */
    rowsSelectedAll(rows) {}
  },
  /**
   * 计算属性（自定义方法）
   * 调用方式：是以属性的方式调用
   * 使用场景：对于任何复杂逻辑
   *
   * computed是有缓存的功能
   */
  computed: {},
  // 监听路由变化
  watch: {
    $route(to, from) {}
  },
  // 组件创建后
  created: function() {
    this.type=this.$route.query.useType,
    this.getData();
  },
  // 组件加载完成
  mounted: function() {},
  // 组件数据更新之前
  beforeUpdate: function() {},
  // 组件数据更新之后
  updated: function() {}
};
</script>

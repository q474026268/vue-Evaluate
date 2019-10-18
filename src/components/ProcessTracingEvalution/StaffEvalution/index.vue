<template>
  <div  id="evaluateRetroactionList" style="width:100%;" class="content-height">
    <z-table
      ref="table"
      :tableColumnConfig="tableColumnConfig"
      :toolBarConfig="toolBarConfig"
      :tableBaseConfig="tableBaseConfig"
    ></z-table>
    <router-view></router-view>
  </div>
</template>
<script>
import ZTable from "../../zTable";
import DefaultButtons from "../../zTable/zTable.js";
import SearchPage from "./search";
import { getList, deleted } from "./evaluateRetroaction.js";
import { formatDate } from "@/utils/common.js";
const pageUrl = "/evaluateRetroaction"; // 表单的路由路径
const routerName = "evaluateRetroaction"; // 路由的名称
const key = "id"; // 主键字段
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
      getList: getList,
      SearchPage: SearchPage,
      beforeGetListData:''
    };
  },
  data: function() {
    // 自定义变量
    return {
      tableBaseConfig: {
        tableHeight: "calc(100% - 178px)", // 列表的其他配置
        currentSort: [{ prop: "id", order: "descending" }], // 默认排序
        opertionColumnWidth:65
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluKind",
          text: "评价类别",
          align: "center",
          width: 120,
          sortable: true
        },
        {
          id: "evaluateTName",
          text: "测评表名称",
          align: "center",
          width: 150,
          sortable: true
        },
        {
          id: "levelType",
          text: "评价方式",
          align: "center",
          width: 70,
          sortable: true
        },
        {
          id: "GroupName",
          text: "制表部门",
          align: "center",
          width: 120,
          sortable: true
        },

        {
          id: "StartDate",
          text: "开始时间",
          align: "center",
          width: 70,
          sortable: true,
          formatter: function(row, column) {
            // return formatDate(row.StartDate);
            return row.StartDate.substring(0,10)
          }
        },
        {
          id: "InputerFullName",
          text: "制表人",
          align: "center",
          width: 60,
          sortable: true
        },
        {
          id: "DoUserCount",
          text: "评价人数",
          align: "center",
          width: 70,
          sortable: true
        },
        {
          id: "DoneUserCount",
          text: "被评价人数",
          align: "center",
          width: 80,
          sortable: true
        },
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
              text: "浏览",
              icon: "el-icon-view",
              click: row => {
                // this.$store.commit("setData",{callback:this.dialogCallback})
                this.$router.push({
                  name:'StaffEvalutionInfoStaff',
                  query:{
                    evaluateId:row.Id,
                    evaluKind:row.evaluKind,
                    evaluateTName:row.evaluateTName,
                    GroupName:row.GroupName,
                    StartDate:row.StartDate,
                    PlanName:row.PlanName,
                    InputerFullName:row.InputerFullName,
                    levelType:row.levelType
                  }
                })
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
  created: function() {}, 
  // 组件加载完成
  mounted: function() {}, 
  // 组件数据更新之前
  beforeUpdate: function() {}, 
  // 组件数据更新之后
  updated: function() {} 
};
</script>

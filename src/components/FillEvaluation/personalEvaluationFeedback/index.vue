<template>
  <div id="personalEvaluationFeedback" class="content-height">
    <z-table
      ref="table"
      :tableColumnConfig="tableColumnConfig"
      :toolBarConfig="toolBarConfig"
      :tableBaseConfig="tableBaseConfig"
    ></z-table>
  </div>
</template>
<script>
//------------------------------------------------
import ZTable from "../../zTable";
import DefaultButtons from "../../zTable/zTable.js";
import SearchPage from "./search";
import { getList, deleted } from "./personalEvaluationFeedback.js";
import { formatDate } from "@/utils/common.js";
//------------------------------------------------
const pageUrl = "/evaluateReceived"; // 表单的路由路径
const routerName = "evaluateReceived"; // 路由的名称
const key = "id"; // 主键字段
//------------------------------------------------
export default {
  name: "personalEvaluationFeedback",
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
      getList: getList,
      SearchPage: SearchPage,
      beforeGetListData: ''
    };
  },
  data: function() {
    // 自定义变量
    return {
      // 列表的其他配置
      tableBaseConfig: {
        tableHeight: "calc(100% - 140px)",
        // 默认排序
        currentSort: [{ prop: "id", order: "descending" }],
        opertionColumnWidth:65
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluateTname",
          text: "评价表名称",
          align: "center",
          width: 120,
          sortable: true
        },
        {
          id: "planName",
          text: "评价计划",
          align: "center",
          width: 80,
          sortable: true
        },
        {
          id: "evaluKind",
          text: "评价类别",
          align: "center",
          width: 80,
          sortable: true
        },
        {
          id: "levelType",
          text: "评价方式",
          align: "center",
          width: 100,
          sortable: true
        },
        {
          id: "inputDate",
          text: "开始时间",
          align: "center",
          width: 80,
          sortable: true,
          formatter: function(row, column) {
            return formatDate(row.inputDate);
          }
        },
        {
          id: "state",
          text: "状态",
          align: "center",
          width: 60,
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
    /**
     * 添加按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    addButtonClick(id) {
      DefaultButtons.addButton(pageUrl, routerName, this.dialogWidth);
    },
    /**
     * 修改按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    modifyButtonClick(id) {
      DefaultButtons.modifyButton(pageUrl, routerName, id, this.dialogWidth);
    },
    /**
     * 浏览按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    viewButtonClick(id, state) {
      console.log(1111);
      
      switch (state) {
        case "暂存":
          this.$router.push({
            path: "/handoutHistorySearch",
            name: "handoutHistorySearch",
            params: {
              useType: "modify",
              id: id
            }
          });
          break;
        case "分发":
          this.$message({
            message: "分发状态下不可查看",
            type: "warning"
          });
          break;
        case "完成":
          this.$router.push({
            path: "/evaluateTableView",
            name: "evaluateTableView",
            params: {
              useType: "view",
              id
            }
          });
          break;
      }
    },
    // 删除按钮点击事件
    deleteButtonClick(id) {
      this.$confirm("确定删除？")
        .then(res => {
          deleted(id).then(res => {
            if (res.status == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.$refs.table.refresh();
            }
          });
        })
        .catch(err => {});
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
  watch: {
    // 监听路由变化
    $route(to, from) {}
  },
  created: function() {
    // 组件创建后
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

<template>
  <div id="indexManageRightList">
    <z-table
      ref="table"
      :tableColumnConfig="tableColumnConfig"
      :toolBarConfig="toolBarConfig"
      :tableBaseConfig="tableBaseConfig"
    ></z-table>
  </div>
</template>
<script>
import ZTable from "../../zTable";
import DefaultButtons from "../../zTable/zTable.js";
import { formatDate } from "@/utils/common.js";
import { getListRight, deleted } from "./indexManageRightList.js";
// 表单的路由路径
const pageUrl = "/indexManageRightStaff";
// 路由的名称
const routerName = "indexManageRightStaff";
// 主键字段
const key = "pkid";
export default {
  name: "indexManageRightListStaff",
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
      getList: getListRight,
      SearchPage: ""
    };
  },
  data: function() {
    // 自定义变量
    return {
      // 列表的其他配置
      tableBaseConfig: {
        tableHeight:'563px',
        // 默认排序
        currentSort: [{ prop: "pkid", order: "descending" }],
        showPageBar: false,

      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluStand",
          text: "评分标准",
          align: "center",
          width: 120,
          sortable: true
        },
        {
          id: "description",
          text: "典型行为",
          align: "center",
          width: 100,
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
              id: "default_modify",
              text: "修改",
              icon: "el-icon-edit",
              click: row => {
                this.modifyButtonClick(row[key]);
              }
            },
            {
              id: "default_delete",
              text: "删除",
              icon: "el-icon-delete",
              click: row => {
                this.deleteButtonClick(row[key]);
              }
            },
            {
              id: "default_view",
              text: "浏览",
              icon: "el-icon-view",
              click: row => {
                this.viewButtonClick(row[key]);
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
      DefaultButtons.addButton(pageUrl, routerName, this.dialogCallback);
    },
    /**
     * 修改按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    modifyButtonClick(id) {
      DefaultButtons.modifyButton(pageUrl, routerName, id, this.dialogCallback);
    },
    /**
     * 浏览按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    viewButtonClick(id) {
      DefaultButtons.viewButton(pageUrl, routerName, id);
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
    // 弹出框回调函数
    dialogCallback(data) {
      this.$refs.table.refresh();
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

<template>
  <div id="evaluationPlanList" class="content-height">
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
import SearchPage from "./search";
import { getList, deleted, complete, getRunningET } from "./evaluationPlan.js";
import { formatDate } from "@/utils/common.js";
import { planStates } from "../onlineEvaluation.js";

// 路由的名称
const routerName = "evaluationPlan";
// 主键字段
const key = "pkid";
export default {
  name: "evaluationPlanList",
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
      beforeGetListData: this.beforeGetListData
    };
  },
  data: function() {
    // 自定义变量
    return {
      // 列表的其他配置
      tableBaseConfig: {
        tableHeight: "calc(100% - 140px)",
        // 默认排序
        currentSort: [{ prop: "pkid", order: "descending" }]
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluKind",
          text: "评价类别",
          align: "center",
          sortable: true
        },
        {
          id: "evaluPlan",
          text: "计划名称",
          align: "center",
          sortable: true
        },
        {
          id: "startDate",
          text: "开始时间",
          align: "center",
          width: 90,
          sortable: true,
          formatter: function(row, column) {
            return formatDate(row.startDate);
          }
        },
        {
          id: "endDate",
          text: "结束时间",
          align: "center",
          width: 90,
          sortable: true,
          formatter: function(row, column) {
            return formatDate(row.endDate);
          }
        },
        {
          id: "inputerFullName",
          text: "编制人",
          align: "center",
          width: 80,
          sortable: true
        },
        {
          id: "flag",
          text: "状态",
          align: "center",
          width: 40,
          sortable: true,
          formatter: function(row, column) {
            return planStates[row.flag].label;
          }
        }
      ],
      // 工具栏配置
      toolBarConfig: {
        // 列表上方按钮
        top: [
          {
            id: "default_add", // 编号
            text: "添加", // 按钮名称
            icon: "el-icon-plus", // 按钮图标
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            click: () => {
              // 点击事件
              this.addButtonClick();
            }
          },
          {
            id: "completionPlan",
            text: "完成计划",
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            icon: "el-icon-success",
            click: () => {
              if (this.selectedPkid == undefined || this.selectedPkid == "") {
                this.$message({
                  message: "请先选择要完成的计划",
                  type: "warning"
                });
                return false;
              }
              if (this.flag == 3) {
                this.$message({
                  message: "计划已经完成",
                  type: "warning"
                });
                return;
              }
              getRunningET(this.selectedPkid).then(res => {
                if (res.status == 200) {
                  if (res.data == true) {
                    this.$message({
                      message:
                        "该计划还有测评表正在进行，请等待全部测评表结束后完成计划",
                      type: "warning"
                    });
                  } else {
                    this.$confirm("确定完成计划吗？")
                      .then(res => {
                        complete(this.selectedPkid).then(res => {
                          if (res.status == 200) {
                            this.$message({
                              message: "完成计划成功",
                              type: "success"
                            });
                            this.$refs.table.refresh();
                          } else {
                            this.$message({
                              message: "完成计划失败",
                              type: "warning"
                            });
                          }
                        });
                      })
                      .catch(err => {});
                  }
                } else {
                  this.$message({
                    message: "完成计划失败",
                    type: "warning"
                  });
                }
              });
            }
          }
        ],
        // 列表行内按钮
        eachRow: {
          // 默认显示
          default: [
            {
              id: "default_modify",
              text: "修改",
              icon: "el-icon-edit",
              click: row => {
                this.modifyButtonClick(row[key], row);
              }
            },
            {
              id: "default_delete",
              text: "删除",
              icon: "el-icon-delete",
              click: row => {
                this.deleteButtonClick(row[key], row.flag);
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
      },
      //查询的记录的pkid
      selectedPkid: "",
      //查询选中记录的状态
      flag: ""
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
    addButtonClick() {
      this.$store.commit("setData", {
        useType: "add",
        callback: this.dialogCallback
      });
      this.$router.push({ name: routerName });
    },
    /**
     * 修改按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    modifyButtonClick(id, row) {
      if (row.flag == 2) {
        this.$message({
          message: "计划已经执行，不可修改",
          type: "warning"
        });
      } else if (row.flag == 3) {
        this.$message({
          message: "计划已经完成，不可修改",
          type: "warning"
        });
      } else {
        this.$store.commit("setData", {
          id,
          useType: "modify",
          callback: this.dialogCallback
        });
        this.$router.push({ name: routerName });
      }
    },
    /**
     * 浏览按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    viewButtonClick(id) {
      this.$store.commit("setData", {
        useType: "view",
        id,
        callback: this.dialogCallback
      });
      this.$router.push({ name: routerName });
    },
    // 删除按钮点击事件
    deleteButtonClick(id, flag) {
      if (flag == 0 || flag == 1) {
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
      } else if (flag == 2) {
        this.$message({
          message: "计划已经执行，不能删除计划",
          type: "warning"
        });
      } else if (flag == 3) {
        this.$message({
          message: "计划已经完成，不能删除计划",
          type: "warning"
        });
      }
    },
    // 弹出框回调函数
    dialogCallback(data) {
      this.$refs.table.refresh();
    },
    /**
     * 行选中事件:单选时触发
     * currentRow:当前行 oldCurrentRow:上一次选中的行
     */
    rowSelected(currentRow, oldCurrentRow) {
      this.selectedPkid = currentRow[key];
      this.flag = currentRow.flag;
    },
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

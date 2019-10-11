<template>
  <div id="evaluateModelList" class="content-height">
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
import { getList, deleted, get, getRunningPlan } from "./evaluateModel.js";
import { formatDate } from "@/utils/common.js";
import { time } from "@/utils/common.js";
import { getCustomer } from "@/component/OnlineEvaluation/EvaluateModel/evaluateModel.js";
// 表单的路由路径
const pageUrl = "/evaluateModelStaff";
// 路由的名称
const routerName = "evaluateModelStaff";
// 主键字段
const key = "pkid";
export default {
  name: "evaluateModelListStaff",
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
      beforeGetListData: this.beforeGetListData,
      SearchPage: SearchPage
    };
  },
  data: function() {
    // 自定义变量
    return {
      // 列表的其他配置
      tableBaseConfig: {
        tableHeight: "calc(100% - 230px)",
        // 默认排序
        currentSort: [{ prop: "pkid", order: "descending" }]
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluKind",
          text: "模板类别",
          align: "center",
          width: 120,
          sortable: true
        },
        {
          id: "modelName",
          text: "模板名称",
          align: "center",
          width: 160,
          sortable: true
        },
        {
          id: "groupName",
          text: "所属部门",
          align: "center",
          width: 140,
          sortable: true
        },
        {
          id: "inputDate",
          text: "创建时间",
          align: "center",
          width: 80,
          sortable: true,
          formatter: function(row, column) {
            return time(row.inputDate);
          }
        },
        {
          id: "inputFullName",
          text: "创建人",
          align: "center",
          width: 60,
          sortable: true
        },
        {
          id: "useFreq",
          text: "使用次数",
          align: "center",
          width: 80,
          sortable: true
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
            id: "use",
            text: "使用",
            icon: "el-icon-document",
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            click: () => {
              if (this.selectedPkid == "") {
                this.$message({
                  message: "请先选择模板",
                  type: "warning"
                });
                return;
              }
              if (this.evaluKind == "员工达优测评") {
                this.$store.commit("setHandout", {
                  callback: this.dialogCallback
                });
                getRunningPlan(this.evaluKind).then(res => {
                  if (res.data == 0) {
                    this.$message.error("暂无评价计划");
                  } else {
                    get(this.selectedPkid).then(res => {
                      if (res.status == 200) {
                        this.$store.commit("setData", { data: res.data });
                        this.$router.push({
                          name: "evaluateClientStaff",
                          query: {
                            useType: "add",
                            isUse: "true"
                          }
                        });
                      }
                    });
                  }
                });
              } else {
                getCustomer(this.selectedPkid).then(res => {
                  if (res.status == 200) {
                    this.$store.commit("setData", { data: res.data });
                    this.$router.push({
                      path: "/evaluateClient",
                      name: "evaluateClient",
                      query: {
                        useType: "add",
                        mark: 1
                      }
                    });
                  }
                });
              }
            }
          },
          {
            id: "refresh",
            text: "刷新",
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            icon: "el-icon-refresh",
            click: row => {
              this.$refs.table.refresh();
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
                this.deleteButtonClick(row[key]);
              }
            },
            {
              id: "default_view",
              text: "浏览",
              icon: "el-icon-view",
              click: row => {
                this.viewButtonClick(row[key], row);
              }
            }
          ],
          // 下拉显示
          dropdown: []
        }
      },
      selectedPkid: "",
      //评价类别
      evaluKind: ""
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
      this.$store.commit("setHandout", {
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
      if (row.evaluKind == "员工达优测评") {
        this.$store.commit("setData", {
          id,
          useType: "modify",
          callback: this.dialogCallback
        });
        this.$router.push({ name: routerName });
      } else {
        this.$store.commit("setData", {
          useType: "modify",
          id,
          callback: this.dialogCallback
        });
        this.$router.push({ name: "evaluateModel" });
      }
    },
    /**
     * 浏览按钮点击事件
     * pageUrl：页面的路由路径
     * routerName：路由名称
     * dialogWidth；窗口宽度
     */
    viewButtonClick(id, row) {
      if (row.evaluKind == "员工达优测评") {
        this.$store.commit("setData", {
          useType: "view",
          id,
          callback: this.dialogCallback
        });
        this.$router.push({ name: routerName });
      } else {
        this.$store.commit("setData", {
          useType: "view",
          id,
          callback: this.dialogCallback
        });
        this.$router.push({ name: "evaluateModel"});
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
    // 弹出框回调函数
    dialogCallback(data) {
      this.$refs.table.refresh();
    },
    beforeGetListData() {},
    /**
     * 行选中事件:单选时触发
     * currentRow:当前行 oldCurrentRow:上一次选中的行
     */
    rowSelected(currentRow, oldCurrentRow) {
      this.selectedPkid = currentRow[key];
      this.evaluKind = currentRow.evaluKind;
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

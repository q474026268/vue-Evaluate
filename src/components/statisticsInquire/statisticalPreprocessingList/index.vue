<template>
  <div id="customerSatisfactionList" class="content-height">
    <z-table
      style="clear:both"
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
import { getList, deleted } from "./statisticalPreprocessingList";
import { formatDate } from "@/utils/common.js";
const key = "pkid";
export default {
  name: "customerSatisfactionList",
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
        opertionColumnWidth: 152,
        tableHeight: "calc(100% - 215px)",
        // 默认排序
        currentSort: [
          { prop: "InputDate", order: "descending" },
          { prop: "evaluateTname", order: "descending" }
        ]
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "EvaluKind",
          text: "评价类别",
          align: "center",
          width: 80,
          sortable: true
        },
        {
          id: "TaskName",
          text: "任务名称",
          align: "center",
          width: 125,
          sortable: true
        },
        {
          id: "InputDate",
          text: "制表时间",
          align: "center",
          width: 90,
          sortable: true,
          formatter: function(row, column) {
            return row.InputDate.substring(0,10)
          }
        },
        {
          id: "state",
          text: "状态",
          align: "center",
          width: 60,
          sortable: true,
          formatter: function(row, column) {
            if (row.State == "finish") {
              return "已统计";
            } else {
              return "统计中";
            }
          }
        }
      ],
      // 工具栏配置
      toolBarConfig: {
        // 列表上方按钮
        top: [
          {
            id: "nb",
            text: "内部顾客统计任务",
            icon: "el-icon-s-promotion",
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            click: row => {
              this.$store.commit("setData",{callback:this.dialogCallback});
              this.$router.push({name:'sendStatisticsTask'});
            }
          },
          {
            id: "yg",
            text: "员工统计任务",
            icon: "el-icon-s-promotion",
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            click: row => {
              this.$store.commit("setData", { callback: this.dialogCallback });
              this.$router.push({ name: "sendStatisticsTaskStaff" });
            }
          }
        ],
        // 列表行内按钮
        eachRow: {
          // 默认显示
          default: [
            {
              id: "view",
              text: "查看",
              icon: "el-icon-view",
              click: row => {
                console.log(row);
                if (row.State == "finish") {
                  this.$router.push({
                    name: "statisticalClientViewStaff",
                    query: {
                      useType: "view",
                      id: row.EvaluateId,
                      nowPage: "statisticalPreprocessingList",
                      formDate:row,
                      EvaluKind:row.EvaluKind,
                    }
                  });
                } else {
                  this.$message({
                    message: "未统计状态下不可查看！",
                    type: "warning"
                  });
                }
              }
            },
            {
              id: "default_delete",
              text: "删除",
              icon: "el-icon-delete",
              click: row => {
                this.deleteButtonClick(row.TaskId);
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
    // 删除按钮点击事件
    deleteButtonClick(id) {
        this.$confirm("确定删除该记录？")
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
    viewButtonClick(id, state) {},
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
    // 弹出框回调函数
    dialogCallback(data) {
      this.$refs.table.refresh();
    },
    /**
     * 点击全选的checkbox触发
     * rows：选中的所有行
     */
    rowsSelectedAll(rows) {},
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

<style scope>
</style>

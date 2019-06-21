<template>
  <el-row>
    <el-col :span="14">
      <div id="indexManageList" style="position: relative;width:100%;">
        <z-table
          ref="table"
          :tableColumnConfig="tableColumnConfig"
          :toolBarConfig="toolBarConfig"
          :tableBaseConfig="tableBaseConfig"
        ></z-table>
        <router-view></router-view>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="right_button">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.prevent="addButtonClickRight()"
        >添加</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click.prevent="modifyButtonClickRight(targetPkid,formPkid)"
        >修改</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="small"
          @click.prevent="deleteButtonClickRight(targetPkid)"
        >删除</el-button>
      </div>
      <div class="rightList">
        <el-table
          ref="rightList"
          :data="rightList"
          :row-style="{cursor:'pointer'}"
          :border="true"
          fit
          highlight-current-row
          @row-click="openDetails"
          id="rightTableHeight"
        >
          <el-table-column prop="pkid" label="pkid" align="center" v-if="false"></el-table-column>
          <el-table-column prop="evaluStand" label="评分标准" align="center"></el-table-column>
          <el-table-column prop="description" label="典型行为" align="center"></el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import ZTable from "../../zTable";
import SearchPage from "./search";
import {
  getList,
  deleted,
  findTargetDetail,
  exportTarget
} from "./indexManage.js";
import { formatDate } from "@/utils/common.js";
import { States } from "../onlineEvaluation.js";
import DefaultButtons from "../../zTable/zTable.js";
import { getListRight, deletedRight } from "./indexManageRightList.js";
// 路由的名称
const routerName = "indexManageStaff";
// 主键字段
const key = "pkid";
export default {
  name: "indexManageListStaff",
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
      rightList: [],
      // 列表的其他配置
      tableBaseConfig: {
        tableHeight: 'calc(100%)',
        // 默认排序
        currentSort: [{ prop: "pkid", order: "descending" }],
        opertionColumnWidth:170,
      },
      // 列表配置
      tableColumnConfig: [
        {
          id: "evaluKind",
          text: "评价类别",
          align: "center",
          width: 87,
          sortable: true
        },
        {
          id: "targetName",
          text: "指标名称",
          align: "center",
          width: 85,
          sortable: true
        },
        {
          id: "groupName",
          text: "所属部门",
          align: "center",
          width: 150,
          sortable: true
        },
        {
          id: "flag",
          text: "状态",
          align: "center",
          width: 61,
          sortable: true,
          formatter: function(row, column) {
            return States[row.flag].label;
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
            id: "export",
            text: "导出",
            icon: "el-icon-document",
            style: "background: #70d5e9;border-color: #70d5e9;color: #fff;",
            click: () => {
              // exportTarget().then((res) => {
              //     if(res.status == 200){
              //       this.$message({
              //           message: '导出成功',
              //           type: 'success'
              //       });
              //     }
              // });
              window.open("api/evaluateTarget/exportTarget");
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
                this.modifyButtonClick(row[key], row.flag);
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
          dropdown: [],
          //指标列表的pkid
          targetPkid: "",
          //主表的pkid
          formPkid: "",
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
    modifyButtonClick(id, flag) {
      if (flag == "1") {
        this.$message({
          message: "该条记录已经是无效，不可修改",
          type: "warning"
        });
      } else {
        this.$store.commit("setData", {
          useType: "modify",
          id,
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
      if (flag == 1) {
        this.$message({
          message: "该条记录已经是无效，不可修改",
          type: "warning"
        });
      } else {
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
      }
    },
    //指标列表删除
    deleteButtonClickRight(id) {
      if (this.formPkid == undefined) {
        this.$message({
          message: "未选择指标",
          type: "warning"
        });
      } else {
        if (id == undefined || this.targetPkid == undefined) {
          this.$message({
            message: "未选择评分标准",
            type: "warning"
          });
        } else {
          this.$confirm("确定删除？")
            .then(res => {
              deletedRight(id).then(res => {
                if (res.status == 200) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  for (let i = 0; i < this.rightList.length; i++) {
                    if (this.rightList[i].pkid == this.targetPkid) {
                      this.rightList.splice(i, 1);
                      break;
                    }
                  }
                  this.targetPkid = undefined;
                }
              });
            })
            .catch(err => {});
        }
      }
    },
    //指标列表修改
    modifyButtonClickRight(id, formPkid) {
      if (this.formPkid == undefined) {
        this.$message({
          message: "未选择指标",
          type: "warning"
        });
      } else {
        if (id == undefined || this.targetPkid == undefined) {
          this.$message({
            message: "未选择评分标准",
            type: "warning"
          });
        } else {
          this.$router.push({
            path: "/indexManageRightStaff",
            query: {
              useType: "modify",
              firstPkid: this.formPkid,
              id,
              formPkid
            }
          });
          this.$store.commit("setData", {
            callback: this.rightListLoad
          });
          this.targetPkid = undefined;
        }
      }
    },
    //指标列表增加
    addButtonClickRight() {
      if (this.formPkid == undefined) {
        this.$message({
          message: "未选择指标",
          type: "warning"
        });
      } else {
        this.$router.push({
          path: "/indexManageRightStaff",
          query: {
            useType: "add",
            firstPkid: this.formPkid
          }
        });
        this.$store.commit("setData", {
          callback: this.rightListLoad
        });
      }
    },
    //右侧列表行选中事件：单选是触发
    openDetails(row) {
      this.targetPkid = row.pkid;
    },
    // 弹出框回调函数
    dialogCallback(data) {
      this.$refs.table.refresh();
    },
    //右边指标列表数据回调
    rightListLoad() {
      findTargetDetail(this.formPkid).then(res => {
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            evaluStand: res.data[i].EvaluStand,
            description: res.data[i].Description,
            pkid: res.data[i].PKID
          });
        }
        this.rightList = arr;
      });
    },
    /**
     * 行选中事件:单选时触发
     * currentRow:当前行 oldCurrentRow:上一次选中的行
     */
    rowSelected(currentRow, oldCurrentRow) {
      this.formPkid = currentRow.pkid;
      //获取指标明细表
      findTargetDetail(currentRow.pkid).then(res => {
        this.targetPkid = undefined;
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            evaluStand: res.data[i].EvaluStand,
            description: res.data[i].Description,
            pkid: res.data[i].PKID
          });
        }
        this.rightList = arr;
      });
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
    let leftDivDom=document.getElementById("indexManageList")
    let divHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    leftDivDom.style.height=divHeight*0.61+"px";
    let rightDivDom=document.getElementById("rightTableHeight");
    rightDivDom.style.height=divHeight*0.61+53+"px";
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
#indexManageList {
  float: left;
}
.rightList {

}
.right_button {
  margin-top: 1%;
  margin-left: 50%;
  height: 97px;
}
</style>

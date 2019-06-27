<template>
  <div id="evaluateReceivedList" class="content-height">
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
//------------------------------------------------
import ZTable from "../../zTable";
import DefaultButtons from "../../zTable/zTable.js";
import SearchPage from "./search";
import { getList, deleted } from "./evaluateReceived.js";
import { formatDate } from "@/utils/common.js";
//------------------------------------------------
const pageUrl = "/evaluateReceivedStaff"; // 表单的路由路径
const routerName = "evaluateReceivedStaff"; // 路由的名称
const key = "id"; // 主键字段
//------------------------------------------------
export default {
  name: "evaluateReceivedList",
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
        currentSort: [{ prop: "pkid", order: "descending" }],
        opertionColumnWidth:130
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
          id:"FinishDate",
          text:"结束时间",
          align:"center",
          width:80,
          sortable:true,
          formatter:function(row,column){
              if(row.FinishDate != null){
                  return formatDate(row.FinishDate);
              }
          }
        },
        {
          id: "state",
          text: "状态",
          align: "center",
          width: 60,
          sortable: true,
          // formatter:function(row,column){
            
          // }
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
            // {
            //   id: "default_view",
            //   text: "执行",
            //   icon: "el-icon-tickets",
            //   click: row => {
            //     console.log(row);
                  // this.$store.commit("setData",{callback:this.dialogCallback})
                  // this.$router.push({
                  //   name:'EvaluateClientSecEditStaff',
                  //   query:{
                  //     evaluKind:row.evaluKind,
                  //     evaluateTname:row.evaluateTname,
                  //     levelType:row.levelType,
                  //     startDate:row.inputDate,
                  //     pkid:row.id,
                  //   }
                  // })
            //   }
            // },
            {
              id:"fill",
              text:"填写",
              icon:"el-icon-edit",
              click:(row) => {
                  console.log(row);
                  if (row.evaluKind=="员工达优测评") {
                    this.$store.commit("setData",{callback:this.dialogCallback})
                    this.$router.push({
                      name:'EvaluateClientSecEditStaff',
                      query:{
                        evaluKind:row.evaluKind,
                        evaluateTname:row.evaluateTname,
                        levelType:row.levelType,
                        startDate:row.inputDate,
                        pkid:row.id,
                      }
                    })
                  }else{
                    if(row.State=='finish' || row.State=='consign'){
                        this.$message({
                            message: '根据该条目状态判定不可填写',
                            type: 'warning'
                        });
                    }else{
                        this.$store.commit("setData",{callback:this.dialogCallback})
                        this.$router.push(
                            {
                                name:'evaluateClientSec',
                                query:{
                                    EvaluKind:row.EvaluKind,
                                    EvaluateTname:row.EvaluateTname,
                                    StartDate:row.InputDate,
                                    state:'add',
                                    nowState:row.State,
                                    id:row.EvaluateId,
                                    EvaluateListPKID:row.EvaluateListPKID,
                                    type:row.type,
                                    inputerUserNo:this.$route.query.doUserNo
                                }
                            }
                        ); 
                    }
                  }
              }
          },
          {
              id:"consign",
              text:"委托",
              icon:"el-icon-caret-right",
              click:(row) => {
                if (row.evaluKind=="内部顾客满意度评测") {
                  this.$store.commit("setData",{callback:this.dialogCallback})
                  if(row.type==1 || row.State=='finish' || row.State=='consign'){
                      this.$message({
                          message: '根据该条目状态判定不可委托',
                          type: 'warning'
                      });
                  }else{
                      this.$router.push({name:'evaluateConsign',query:{PlanName:row.PlanName,EvaluateId:row.EvaluateId,EvaluateListPKID:row.EvaluateListPKID}}); 
                  }
                }else{
                  this.$message({
                    message: '类别为员工达优测评，不可委托',
                    type: 'warning'
                  });
                }
              }
          },
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
    // 弹出框回调函数
    dialogCallback(data){
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
    // 请求列表数据之前
    beforeGetListData(currentPage,pageSize,order,filters){
        filters.loginUser=this.$store.state.userInfo.userName;
        filters.state='待填';
    },
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

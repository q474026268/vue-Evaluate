<template>
  <el-dialog
    id="selectUser"
    title="评价人列表"
    :visible="visible"
    @close="close"
    :modal="false"
    width="30%"
    :close-on-click-modal="false"
  >
    <div class="head-area">
      <el-form ref="form" :inline="true">
        <el-form-item>
          <el-input
            v-model="searchData.name"
            placeholder="用户名或姓名"
            size="small"
            style="width:200px;"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="userTable"
      :data="tableData"
      :row-style="{cursor:'pointer'}"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      height="300"
      v-loading.body="listLoading"
      element-loading-text="Loading"
    >
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
      <el-table-column
        v-for="(item,index) in tableColumnConfig"
        :key="index"
        :prop="item.id"
        :label="item.text"
        :align="item.align"
        :min-width="item.width"
        :formatter="item.formatter"
      ></el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[15, 20, 50, 100]"
        @size-change="handleSize"
        @current-change="handlePage"
      ></el-pagination>
    </div>
    <div class="floot-area">
      <el-button type="primary" size="small" icon="el-icon-success" @click="determine">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "selectUser",
  props: ["callback"],
  data() {
    return {
      listLoading: false,
      tableData: [
        {
          id: "001",
          name: "荣红光",
          userName: "rong_hg",
          departmentName: "研发部"
        },
        {
          id: "002",
          name: "陈敏",
          userName: "chen_m2",
          departmentName: "人事部"
        },
        {
          id: "003",
          name: "陈立",
          userName: "chen_li",
          departmentName: "市场部"
        },
        {
          id: "004",
          name: "杨晨",
          userName: "yang_ch",
          departmentName: "客服部"
        }
      ],
      tableColumnConfig: [
        {
          id: "id",
          text: "员工号",
          align: "center",
          width: 80
        },
        {
          id: "name",
          text: "姓名",
          align: "center",
          width: 80
        },
        {
          id: "departmentName",
          text: "部门",
          align: "center",
          width: 100
        },
      ],
      // 选中的值
      selectedDatas: [],
      visible: false,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      searchData: {}
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.$refs.userTable.clearSelection();
      this.visible = false;
    },
    // 确定
    determine() {
      let isHave = false;
      if (this.$store.state.evaluate.length == 0) {
        this.callback(this.selectedDatas);
        this.close();
      } else {
        if (isHave == false) {
          let message = [];
          for (let i = 0; i < this.$store.state.evaluate.length; i++) {
            for (let j = 0; j < this.selectedDatas.length; j++) {
              if (
                this.$store.state.evaluate[i].doFullName ==
                this.selectedDatas[j].name
              ) {
                message.push({
                  name: this.selectedDatas[j].name
                });
              } else {
                isHave = true;
              }
            }
          }
          let name = "";
          for (let i = 0; i < message.length; i++) {
            name += message[i].name + " ";
          }
          if (message.length == 0) {
            this.$message.error("被评价人不能为空");
          } else {
            this.$message.error(name + "已存在");
          }
        } else {
          this.callback(this.selectedDatas);
          this.close();
        }
      }
    },
    // 查询
    search() {
      let requestParams = {
        baseURL: process.env.USER_API,
        url: "/service-user/users/name",
        params: {
          name: this.searchData.name
        },
        method: "GET"
      };
      request(requestParams).then(res => {
        this.tableData = res.data;
        this.total = res.data.length;
      });
    },
    // 获取数据
    getData() {
      let requestParams = {
        baseURL: process.env.USER_API,
        url: "/service-user/users/page",
        params: {
          page: this.currentPage - 1,
          size: this.pageSize
        },
        method: "GET",
        headers: {
          JSESSIONID: "20DBF4658572B6D1B0CC836484C9EA17",
          io: "wmztgwSmaM5O2ZawAACB"
        }
      };
      request(requestParams).then(res => {
        if (res.status == 200) {
          this.tableData = res.data.content;
          this.total = res.data.totalElements;
        }
      });
    },
    // 行选中事件
    handleSelectionChange(rows) {
      this.selectedDatas = [];
      rows.forEach(({ id, userName, name, departmentName }) => {
        this.selectedDatas.push({ id, userName, name, departmentName });
      });
    },
    // 选择条/页
    handleSize(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    // 页码改变时都会触发
    handlePage(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    }
  },
  created() {
    // 获取数据
    this.getData();
    this.selectedDatas = this.selected;
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
.head-area {
  width: 100%;
  text-align: center;
}
.floot-area {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
</style>
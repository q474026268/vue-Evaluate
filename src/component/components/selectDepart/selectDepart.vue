<template>
  <el-dialog
    id="selectDepart"
    title="部门选择"
    :visible="visible"
    @close="close"
    :modal="false"
    width="30%"
  >
    <div class="head-area">
      <el-form ref="form" :inline="true">
        <el-form-item>
          <el-input
            v-model="searchData.id"
            placeholder="输入部门编号"
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
      ref="departTable"
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
import { getInterFace } from "@/utils/interface";

export default {
  name: "selectDepart",
  props: ["callback"],
  data() {
    return {
      listLoading: false,
      tableData: [],
      tableColumnConfig: [
        {
          id: "name",
          text: "部门名称",
          align: "center",
          width: 120
        }
      ],
      // 选中的值
      selectedDatas: [],
      visible: false,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      searchData: {},
      JSESSIONID:"",
      io:"",
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.$refs.departTable.clearSelection();
      this.visible = false;
    },
    // 查询
    search() {},
    // 确定
    determine() {
      this.callback(this.selectedDatas);
      this.close();
    },
    search() {
      let requestParams = {
        baseURL: process.env.USER_API,
        url: `/service-user/department/id/${this.searchData.id}`,
        method: "GET"
      };
      request(requestParams).then(res => {
        this.tableData = [res.data];
        this.total = this.tableData.length;
      });
    },
    // 获取数据
    getData() {
      let requestParams = {
        baseURL: process.env.USER_API,
        url: "/service-user/departments",
        params: {
          page: this.currentPage - 1,
          size: this.pageSize
        },
        method: "GET",
        headers: {
          JSESSIONID: this.JSESSIONID,
          io: this.io
        }
      };
      request(requestParams).then(res => {
        if (res.status == 200) {
          this.tableData = res.data;
          this.total = res.data.length;
        }
      });
      // let data = [
      //     {
      //         name:'部门1'
      //     },
      //     {
      //         name:'部门2'
      //     },
      //     {
      //         name:'部门3'
      //     },
      //     {
      //         name:'部门4'
      //     },
      //     {
      //         name:'部门5'
      //     }
      // ]
      // this.tableData = data;
    },
    // 行选中事件
    handleSelectionChange(rows) {
      this.selectedDatas = [];
      rows.forEach(({ id, name }) => {
        this.selectedDatas.push({ id, name });
      });
    },
    // 选择 条/页
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
    //获取接口信息
    getInterFace().then(res => {
      this.JSESSIONID = res.data[0].value;
      this.io = res.data[1].value;
    });
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



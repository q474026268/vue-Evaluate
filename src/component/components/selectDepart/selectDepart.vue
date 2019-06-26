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
        },
        {
          id: "005",
          name: "胡振浩",
          userName: "hu_zh",
          departmentName: "研发部"
        },
        {
          id: "006",
          name: "郜诚",
          userName: "gao_chen",
          departmentName: "客服部"
        },
        {
          id: "007",
          name: "徐超",
          userName: "xu_chao",
          departmentName: "客服部"
        },
        {
          id: "008",
          name: "解歆耀",
          userName: "xie_xy",
          departmentName: "客服部"
        },
        {
          id: "009",
          name: "叶特",
          userName: "ye_te",
          departmentName: "客服部"
        },
        {
          id: "010",
          name: "张天齐",
          userName: "zhang_tq",
          departmentName: "客服部"
        },
        {
          id: "011",
          name: "孙超",
          userName: "sun_chao",
          departmentName: "客服部"
        },
        {
          id: "012",
          name: "姜程鹏",
          userName: "jiang_cp",
          departmentName: "客服部"
        },
        {
          id: "013",
          name: "吕明",
          userName: "lv_ming",
          departmentName: "客服部"
        },
        {
          id: "014",
          name: "张嘉豪",
          userName: "zhang_jh",
          departmentName: "客服部"
        },
        {
          id: "015",
          name: "宗凯星",
          userName: "zong_kx",
          departmentName: "客服部"
        },
        {
          id: "016",
          name: "徐东飞",
          userName: "xu_df",
          departmentName: "客服部"
        },
        {
          id: "017",
          name: "吴建华",
          userName: "wu_jh",
          departmentName: "客服部"
        },
        {
          id: "018",
          name: "商林楠",
          userName: "shang_ln",
          departmentName: "客服部"
        },
        {
          id: "019",
          name: "王涛",
          userName: "wang_tao",
          departmentName: "客服部"
        },
        {
          id: "020",
          name: "曹俊",
          userName: "cao_jun",
          departmentName: "客服部"
        }
       ],
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



<template>
  <div id="evaluateClientSec">
    <el-dialog
      width="60%"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <h4>{{EvaluateTname}}——当前用户: {{name}}</h4>
      <div class="blockDiv">
        <div>
          <span>评价类别：</span>
          <em>{{EvaluKind}}</em>
        </div>
        <div>
          <span>评价方式：</span>
          <em>{{levelType}}</em>
        </div>
        <div>
          <span>开始时间：</span>
          <em>{{StartDate}}</em>
        </div>
      </div>

      <el-table border v-loading="loading" :data="tableTarget">
        <el-table-column prop="TargetName" label="指标" width="180"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableArr"
          align="center"
          :key="index"
          :label="item.doneFullName"
          :prop="'target'+(index+1)"
        >
          <template class="iiiii" slot-scope="scope">
            <el-select
              :disabled="!tableArr[index]['optional'+(scope.$index+1)] || look"
              v-model="tableArr[index]['target'+(scope.$index+1)]"
            >
              <el-option value="A">A</el-option>
              <el-option value="B">B</el-option>
              <el-option value="C">C</el-option>
              <el-option value="N">N</el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="!look" class="rightBtnGroup">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="temporaryStorage">暂存</el-button>
        <el-button type="info" @click="handleClose">关闭</el-button>
      </div>
      <h5>“A”对应100%，“B”对应85%，“C”对应70%，“D”对应65%，“E”对应50%</h5>
      <footer v-show="description!=''">
        <div>{{evaluKind}}</div>
        <div>{{description}}</div>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import {
  evaluateContent,
  getTargetItem,
  saveFillContent,
  saveConsignFillContent,
  getDeatailList
} from "./evaluateClientSecApi.js";
export default {
  name: "evaluateClientSec",
  props: {
    // 其他组件传入的值
  },
  data: function() {
    // 自定义变量
    return {
      nowUserName: "",
      dialogFormVisible: true,
      EvaluKind: "",
      EvaluateTname: "",
      StartDate: "",
      tableTarget: [],
      tableArr: [],
      // 后台获取表信息最大data
      bigData: {},
      // 指标信息
      evaluKind: "",
      description: "",
      targeDescripts: {},
      loading: true,
      look: "",
      //当前用户姓名
      name: "",
      //评价方式
      levelType: ""
    };
  },
  methods: {
    // 自定义方法
    handleClose(done) {
      this.$router.back();
    },
    // 参数提示
    hoverTitle(index) {
      if (!this.targeDescripts[index]) {
        getTargetItem(this.tableTarget[index].targetPKID)
          .then(result => {
            this.description = result.data.description;
            this.targeDescripts[index] = this.description;
          })
          .catch(err => {});
      } else {
        this.description = this.targeDescripts[index];
      }
      this.evaluKind = this.tableTarget[index].targetName;
    },
    // 暂存
    temporaryStorage() {
      this.bigData.fillHtml = JSON.stringify(this.tableArr);
      saveConsignFillContent(this.bigData).then(result => {
        if (result.status == 200) {
          this.$router.back();
          this.$message({
            message: "暂存成功",
            type: "success"
          });
          this.$store.state.data.callback();
        } else {
          this.$message.error("暂存失败");
        }
      });
    },
    // 提交
    submit() {
      for (let i = 0; i < this.tableArr.length; i++) {
        this.tableArr[i].evaluatePkid = this.bigData.evaluateId;
        this.tableArr[i].evaluateListId = this.bigData.pkid;
        this.tableArr[i].flag = 2;
        this.tableArr[i].doneUserNo = "";
      }
      console.log(this.tableArr);
      for (let i = 0; i < this.tableArr.length; i++) {
        for (let j = 0; j < this.tableTarget.length; j++) {
          if (this.tableArr[i]['target'+(j+1)]=='') {
            return false
            this.$message({
              message: `${this.tableArr[i].doneFullName}的${this.tableTarget[j].TargetName没有填写}！`,
              type: 'warning'
            });
          }
        }
      }
      
      saveFillContent(this.tableArr).then(result => {
        if (result.status == 200) {
          this.$router.back();
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$store.state.data.callback();
        } else {
          this.$message.error("保存失败");
        }
      });
    }
  },
  /**
   * 计算属性（自定义方法）
   * 调用方式：是以属性的方式调用
   * 使用场景：对于任何复杂逻辑
   *
   * computed是有缓存的功能
   */
  computed: {},
  watch: {},
  created: function() {
    // 组件创建后
    this.look = this.$route.query.look;
    this.nowUserName = this.$store.state.userInfo.userName;
    this.EvaluKind = this.$route.query.evaluKind;
    this.levelType = this.$route.query.levelType;
    this.EvaluateTname = this.$route.query.evaluateTname;
    this.name = this.$store.state.userInfo.name;
    this.StartDate = this.$route.query.startDate.substring(0, 10);
    let pkid = this.$route.query.pkid;
    let id = this.$route.query.id;
    if (this.look) {
      getDeatailList(pkid).then(result => {
        this.bigData = result.data;
        this.tableArr = result.data;
        this.loading = false;
      }),
        //获取哪几个指标
        getTargetItem(id, this.nowUserName).then(result => {
          this.tableTarget = result.data;
        });
    } else {
      // 获取人物内具体指标
      evaluateContent(pkid, this.nowUserName).then(result => {
        this.bigData = result.data[0];
        this.tableArr = JSON.parse(result.data[0].fillHtml);
        this.loading = false;
      }),
        //获取哪几个指标
        getTargetItem(pkid, this.nowUserName).then(result => {
          this.tableTarget = result.data;
        });
    }
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
.blockDiv {
  display: flex;
  margin-bottom: 15px;
}
.blockDiv > div {
  margin-right: 40px;
}
.blockDiv em {
  font-style: normal;
}
.rightBtnGroup {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.rightBtnGroup > button {
  margin-right: 15px;
}
h5 {
  text-align: center;
}
footer div {
  margin-right: 40px;
  margin-left: 40px;
  border: 1px solid #ddd;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
footer div:first-child {
  border-bottom: none;
}
h4 {
  font-size: 18px;
  color: #409eff;
}
.labelBlue {
  color: #409eff;
}
/* .leftDiv{
        display: flex;
        flex-wrap: wrap;
        width: 80px;
        margin: 0;
        padding: 0;
    }
    .leftDiv span{
        display: block;
        border: 1px solid #eee;
    }
    .leftDiv span{
        height: 30px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .leftDiv span:first-child{
        height: 50px;
    }
    .bothDiv{
        display: flex;
        font-size: 12px;
        justify-content: center;
    }
    .bothDiv>div{
        display: flex;
    }
    .rightDiv{
        display: flex;
    }
    .rightDiv>span{
        display: flex;
        width: 70px;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .rightDiv em{
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        widows: 70px;
        height: 50px;
        font-style: normal;
        border: 1px solid #eee;
    }
    .rightDiv select{
        display: block;
    }
    .selSpan{
        display: flex;
        width: 70px;
        justify-content: center;
        align-items: center;
        height: 30px;
        border: 1px solid #eee;
    } */
</style>
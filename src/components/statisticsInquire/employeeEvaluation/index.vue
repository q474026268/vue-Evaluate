<template>
  <div id="employeeEvaluation">
    <div class="exportedDataFormat">
      <span class="formate">数据格式：</span>
      <el-radio-group v-model="exportedDataFormat" @change="exportedDataFormatChange">
        <el-radio label="1">基本数据</el-radio>
        <el-radio label="2">总分统计</el-radio>
        <el-radio label="3">单项指标统计表</el-radio>
        <el-radio label="4">统计图</el-radio>
      </el-radio-group>
    </div>
    <div class="year">
      <span>年度：</span>
      <el-radio-group class="yearRadioGroup" @change="yearChange" v-model="year">
        <el-radio label="1">单选年度</el-radio>
        <el-radio label="2">连续年度</el-radio>
      </el-radio-group>
      <el-date-picker
        v-model="startYear"
        placeholder="请选择初始年度"
        size="mini"
        format="yyyy-MM"
        @change="startYearChange"
        type="month"
      ></el-date-picker>
      <!-- <el-select @change="startYearChange" v-model="startYear" placeholder="请选择初始年度" size="mini">
                <el-option
                v-for="item in yearShowData"
                :key="item.pkid"
                :label="item.evaluPlan"
                :value="item.pkid">
                </el-option>
      </el-select>-->
      <span style="margin-right:10px;margin-left:10px;width:10px;">至</span>
      <el-date-picker
        v-model="endYear"
        placeholder="请选择结束年度"
        size="mini"
        format="yyyy-MM"
        :disabled="year==1"
        @change="endYearChange"
        type="month"
      ></el-date-picker>
      <!-- <el-select @change="endYearChange" v-model="endYear" :disabled="year==1" placeholder="请选择结束年度" size="mini">
                <el-option
                v-for="item in yearShowData"
                :key="item.pkid"
                :label="item.evaluPlan"
                :value="item.pkid">
                </el-option>
      </el-select>-->
    </div>
    <div class="lastDiv">
      <div>
        <el-select
          v-model="evaluationForm"
          placeholder="评价表"
          size="mini"
          @change="evaluationFormSelChange"
        >
          <el-option
            v-for="item in evaluationFormSel"
            :key="item.taskId"
            :label="item.taskName"
            :value="item.taskId"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-select
          :disabled="exportedDataFormat!=3"
          @change="getTarget"
          v-model="evaluKind"
          placeholder="指标类型"
          size="mini"
        >
          <el-option
            v-for="item in indicatorTypeSel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-select
          :disabled="exportedDataFormat!=3"
          v-model="specificTarget"
          placeholder="具体指标"
          size="mini"
        >
          <el-option
            v-for="(item,index) in specificIndicatorsSel"
            :key="index"
            :label="item.targetName"
            :value="item.pkid"
          ></el-option>
        </el-select>
      </div>
       <el-button @click="confirm" type="primary" size="mini" style="margin-left:2%">确定</el-button>
        <el-button @click="clear" size="mini">清空</el-button>
    </div>
    <div id="myChart" :style="{width: '1000px', height: '500px'}" v-show="this.echatFlag"></div>
    <iframe
      :src="srcUrl"
      frameborder="0"
      style="width:100%;height:500px;"
      allowfullscreen
      v-show="iframeFlag"
    ></iframe>
  </div>
</template>

<script>
import {
  //   gets,
  getByYear,
  getByEvaluKind,
  exportExcel,
  getTu
} from "./employeeEvaluation.js";
import { getLoginInfo } from "../../OnlineEvaluation/onlineEvaluation.js";
import { formatDate } from "@/utils/common.js";
import { getReportBaseUrl } from "@/utils/interface";
export default {
  name: "employeeEvaluationStaff",
  props: {
    // 其他组件传入的值
  },
  data: function() {
    // 自定义变量
    return {
      // 显示数据
      yearShowData: [],
      evaluationFormSel: [],
      indicatorTypeSel: [
        {
          label: "员工达优测评",
          value: "员工达优测评"
        },
        {
          label: "内部顾客满意度测评",
          value: "内部顾客满意度测评"
        }
      ],
      specificIndicatorsSel: [],
      // 导出的数据格式
      exportedDataFormat: "1",
      year: "1",
      startYear: "",
      endYear: "",
      // 评价表
      evaluationForm: "",
      // 指标类型
      evaluKind: "",
      // 具体指标
      specificTarget: "",
      // 链接
      evaluateIds: "1",
      //评价表数据对应的taskId
      taskID: "",
      //iframe引入页面地址
      srcUrl: "",
      //是否显示echat页面
      echatFlag: false,
      //帆软报表地址前缀
      reportBaseUrl: "",
      //iframe页面是否隐藏
      iframeFlag: false
      // srcUrl:`http://10.214.93.90:8075/WebReport/ReportServer?reportlet=vue%2FBasicData.cpt&__bypagesize__=false&evaluateIds=${evaluateIds}`,
    };
  },
  methods: {
    // 自定义方法
    yearChange() {
      this.iframeFlag = false;
      this.evaluationForm = "";
      this.startYear = "";
      this.endYear = "";
      this.evaluKind = "";
      this.specificTarget = "";
      this.echatFlag = false;
      if (this.year == 1) {
        this.endYear = "";
        if (this.startYear != "") {
          let data = {};
          data.planPKID = this.startYear;
          getByYear(data).then(result => {
            console.log(result.data);
            this.evaluationFormSel = result.data;
          });
        } else {
          this.$message({
            message: "请选择初始年度选项!",
            type: "warning"
          });
        }
      } else {
        if (this.startYear == "") {
          this.$message({
            message: "请选择初始年度选项!",
            type: "warning"
          });
        } else {
          this.$message({
            message: "请选择结束年度选项!",
            type: "warning"
          });
        }
      }
    },
    // 初始年度变化
    startYearChange() {
      if (this.year == 1) {
        let data = {};
        data.yearO = formatDate(this.startYear).substring(0, 7);
        getByYear(data).then(result => {
          this.evaluationFormSel = result.data;
        });
      } else {
        if (this.endYear == "") {
          this.$message({
            message: "请选择结束年度选项!",
            type: "warning"
          });
        } else {
          let data = {};
          let yearArr = [];
          for (let i = 0; i < this.yearShowData.length; i++) {
            if (this.yearShowData[i].pkid == this.startYear) {
              yearArr.push(this.yearShowData[i].inputDate);
              break;
            }
          }
          for (let i = 0; i < this.yearShowData.length; i++) {
            if (this.yearShowData[i].pkid == this.endYear) {
              yearArr.push(this.yearShowData[i].inputDate);
            }
          }
          data.yearRange = yearArr.join(",");
          console.log(data);
          getByYear(data).then(result => {
            console.log(result.data);
            this.evaluationFormSel = result.data;
          });
        }
      }
    },
    // 结束年度变化
    endYearChange() {
      if (this.startYear > this.endYear) {
        this.$message({
          message: "开始不能大于结束时间，请重新输入",
          type: "warning"
        });
        this.endYear = "";
        return;
      }
      if (this.year != 1) {
        let data = {};
        data.yearO = this.startYear;
        data.yearT = this.endYear;
        console.log(data);
        getByYear(data).then(result => {
          this.evaluationFormSel = result.data;
        });
      } else {
        if (this.endYear == "") {
          this.$message({
            message: "请选择结束年度选项!",
            type: "warning"
          });
        } else {
          let data = {};
          let yearArr = [];
          for (let i = 0; i < this.yearShowData.length; i++) {
            if (this.yearShowData[i].pkid == this.startYear) {
              yearArr.push(this.yearShowData[i].inputDate);
              break;
            }
          }
          for (let i = 0; i < this.yearShowData.length; i++) {
            if (this.yearShowData[i].pkid == this.endYear) {
              yearArr.push(this.yearShowData[i].inputDate);
            }
          }
          data.yearRange = yearArr.join(",");
          console.log(data);
          getByYear(data).then(result => {
            console.log(result.data);
            this.evaluationFormSel = result.data;
          });
        }
      }
    },
    // 指标类型变化
    getTarget() {
      getByEvaluKind(this.evaluKind).then(result => {
        console.log("获取指标");
        console.log(result);
        this.specificIndicatorsSel = result.data;
      });
    },
    // 确定
    confirm() {
      this.iframeFlag = false;
      this.echatFlag = false;
      if (this.startYear == "") {
        this.$message({
          message: "请选择初始年度选项!",
          type: "warning"
        });
        return false;
      }
      if (this.year == 2 && this.endYear == "") {
        this.$message({
          message: "请选择结束年度选项!",
          type: "warning"
        });
        return false;
      }
      if (this.evaluationForm == "") {
        this.$message({
          message: "请选择评价表!",
          type: "warning"
        });
        return false;
      }

      if (this.evaluKind == "" && this.exportedDataFormat == 3) {
        this.$message({
          message: "请选择指标类型!",
          type: "warning"
        });
        return false;
      }
      if (this.specificTarget == "" && this.exportedDataFormat == 3) {
        this.$message({
          message: "请选择具体指标!",
          type: "warning"
        });
        return false;
      }
      let evaluateId = "";
      let taskId = "";
      let planPkid = "";
      let taskArr = [];
      for (let i = 0; i < this.evaluationFormSel.length; i++) {
        if (this.taskID == this.evaluationFormSel[i].taskId) {
          taskArr.push({
            evaluateId: this.evaluationFormSel[i].evaluateId,
            planPkid: this.evaluationFormSel[i].planPKID,
            taskId: this.evaluationFormSel[i].taskId
          });
        }
      }
      console.log(taskArr);
      taskId = taskArr[0].taskId;
      planPkid = taskArr[0].planPkid;
      evaluateId = taskArr[0].evaluateId;
      console.log(taskId, planPkid, evaluateId);
      // let evaluateIdsArr=[];
      // let evaluateIdsStr='';
      // let taskId='';
      // evaluateIdsArr=this.evaluationForm.split(',');
      // for(let i=0;i<evaluateIdsArr.length;i++){
      //     evaluateIdsStr+="'"+evaluateIdsArr[i]+"',"
      // }
      // evaluateIdsStr=evaluateIdsStr.substring(0,evaluateIdsStr.length-1);

      // console.log(this.evaluationForm);

      // for(let i=0;i<this.evaluationFormSel.length;i++){
      //     if(this.evaluationForm==this.evaluationFormSel[i].evaluateId){
      //         console.log('=====');
      //         taskId=this.evaluationFormSel[i].taskId;
      //         break;
      //     }
      // }

      // console.log(evaluateIdsStr);
      // console.log(taskId);
      switch (this.exportedDataFormat) {
        case "1":
          this.iframeFlag = true;
          this.srcUrl = `${
            this.reportBaseUrl
          }reportlet=基本数据.cpt&op=write&taskId=${taskId}&planPkid=${planPkid}&evaluateIds=${evaluateId}`;
          break;
        case "2":
          this.iframeFlag = true;
          this.srcUrl = `${
            this.reportBaseUrl
          }reportlet=zongfen.cpt&op=write&taskId=${taskId}`;
          break;
        case "3":
          this.iframeFlag = true;
          this.srcUrl = `${
            this.reportBaseUrl
          }reportlet=%5B5206%5D%5B9879%5D%5B5236%5D%5B8868%5D.cpt&op=write&taskId=${taskId}&planPkid=${planPkid}&evaluateIds=${evaluateId}&TargetPkid=${
            this.specificTarget
          }`;
          break;
        case "4":
          this.echatFlag = true;
          getTu(taskId).then(res => {
            this.drawLine(res.data);
          });
          break;
      }

      console.log(this.srcUrl);
    },
    // 清空
    clear() {
      this.startYear = "";
      this.endYear = "";
      this.evaluationForm = "";
      this.evaluKind = "";
      this.specificTarget = "";
      this.iframeFlag=false;
      this.echatFlag=false;
    },
    //评价表改变事件
    evaluationFormSelChange(val) {
      this.taskID = val;
    },
    //echat视图
    drawLine(data) {
      let myChart = this.$echarts.init(
        document.getElementById("myChart"),
        "macarons"
      );
      //获取用户名
      let userfullname = [];
      for (let i = 0; i < data.length; i++) {
        userfullname.push(data[i].UserFullName);
      }
      let tagetA = [];
      for (let i = 0; i < data.length; i++) {
        tagetA.push(data[i].A);
      }
      let tagetB = [];
      for (let i = 0; i < data.length; i++) {
        tagetB.push(data[i].B);
      }
      let tagetC = [];
      for (let i = 0; i < data.length; i++) {
        tagetC.push(data[i].C);
      }
      let tagetN = [];
      for (let i = 0; i < data.length; i++) {
        tagetN.push(data[i].N);
      }
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["A", "B", "C", "N"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: userfullname
          }
        ],
        series: [
          {
            name: "A",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                label: { show: true, position: "insideRight" },
                barBorderRadius: 7
              },
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: tagetA,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            }
          },
          {
            name: "B",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                label: { show: true, position: "insideRight" },
                barBorderRadius: 7
              },
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: tagetB,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            }
          },
          {
            name: "C",
            type: "bar",
            stack: "总量",
            iitemStyle: {
              normal: {
                label: { show: true, position: "insideRight" },
                barBorderRadius: 7
              },
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: tagetC,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            }
          },
          {
            name: "N",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                label: { show: true, position: "insideRight" },
                barBorderRadius: 7
              },
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: tagetN
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    //根据选中项改变事件隐藏echat视图
    exportedDataFormatChange() {
      this.echatFlag = false;
      this.iframeFlag = false;
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
    //获取帆软报表的地址前缀
    getReportBaseUrl().then(res => {
      this.reportBaseUrl = res.data[0].value;
    });
    // 组件创建后
    // gets()
    //   .then(result => {
    //     this.yearShowData = result.data.content;
    //     console.log(this.yearShowData);
    //   })
    //   .catch(err => {});
  },
  mounted: function() {
    // 组件加载完成
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
#employeeEvaluation {
  padding: 30px;
}
.exportedDataFormat {
  display: flex;
  align-items: center;
  height: 50px;
  width: 690px;
  justify-content: space-between;
}
.exportedDataFormat > div {
  width: 552px;
  display: flex;
  justify-content: space-between;
}
.exportedDataFormat > span {
  font-size: 14px;
  line-height: -1px;
}
.year {
  display: flex;
  height: 50px;
  align-items: center;
}
.yearRadioGroup {
  display: flex;
  justify-content: space-between;
  width: 229px;
  margin-right: 68px;
}
.year > span {
  font-size: 14px;
  display: block;
  display: inline-block;
  width: 70px;
  text-align: right;
  margin-right: 69px;
}
.lastDiv > div:first-child {
  margin-right: 78px;
}
.lastDiv > div:nth-child(2) {
  margin-right: 30px;
}
.lastDiv {
  display: flex;
  align-items: center;
  height: 50px;
  margin-top: 10px;
  padding-left: 140px;
}
.lastDiv > div > span {
  font-size: 14px;
}
.footDiv {
  margin-left: 140px;
  margin-top: 10px;
}
footer {
  display: flex;
  padding-left: 140px;
  height: 50px;
  align-items: center;
  margin-top: 20px;
}
footer button {
  margin-right: 40px !important;
}
.formate {
  margin-left: 42px;
}
</style>
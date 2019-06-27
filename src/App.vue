<template>
  <div id="app" :style="'height:'+appHeight+'px;'">
    <div id="bothAll" style="height:100%;">
      <div id="firstJ">
        <el-menu
          default-active="/evaluatePlanListStaff"
          class="el-menu-vertical-demo"
          :collapse="false"
          background-color="#0099ff"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu index="/">
            <template slot="title">
              <span slot="title">员工达优测评</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/evaluatePlanListStaff">评价计划
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/fillEvaluationStaff">评价表填写
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/processTracingStaff">过程跟踪
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/statisticsInquireStaff">统计查询
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/onlineEvaluationr">
            <template slot="title">
              <span slot="title">内部顾客满意度测评</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/evaluatePlanList">评价计划</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/fillEvaluation">评价表填写</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="">过程跟踪</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/statisticsInquire">统计查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Home from "./components/home/home.vue";
export default {
  name: "App",
  components: {
    Home
  },
  data: function() {
    return {
      appHeight: window.innerHeight - 67
    };
  },
  created() {},
  mounted() {
    // 监听窗口大小变化
    let self = this;
    window.onresize = function() {
      self.appHeight = window.innerHeight - 67;
    };
  }
};
</script>

<style>
body .el-table th.gutter {
  display: table-cell !important;
}
#bothAll {
  display: flex;
}
#firstJ {
  margin-right: 10px;
  /* background: #0099ff; */
  color: #fff;
}
.divHand {
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-bottom: 1px solid #ddd;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 120px;
  min-height: 104%;
}

.el-submenu .el-menu-item {
  min-width: 100px;
  height: 30px;
  line-height: 30px;
}
</style>

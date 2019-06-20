<template>
  <div id="app" :style="'height:'+appHeight+'px;'">
    <div id="bothAll" style="height:100%;">
      <div id="firstJ">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          :collapse="false"
          background-color="#0099ff"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
        >
          <el-submenu index="1">
            <template slot="title">
              <span slot="title">员工达优测评</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link tag="div" :to="{name:'onlineEvaluationStaff'}">评价计划</router-link>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-2">
                <router-link tag="div" :to="{name:'fillEvaluationStaff'}">评价表填写</router-link>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">
                <router-link tag="div" :to="{name:'processTracingStaff'}">过程跟踪</router-link>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-4">
                <router-link tag="div" :to="{name:'statisticsInquireStaff'}">统计查询</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span slot="title">内部顾客满意度</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link class="divHand" tag="div" :to="{name:'customeronlineEvaluation'}">评价计划</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-2">评价表填写</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-3">过程跟踪</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-4"><router-link class="divHand" tag="div" :to="{name:'statisticsInquire'}">统计查询</router-link></el-menu-item>
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

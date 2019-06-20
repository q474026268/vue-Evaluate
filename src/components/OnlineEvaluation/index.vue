<template>
  <div id="evaluationManage">
    <div id="nbgkmydDiv">
      <router-link class="nbgkmydDivSon" tag="div" :to="{name:'evaluatePlanListStaff'}">评价计划</router-link>
      <router-link class="nbgkmydDivSon" tag="div" :to="{name:'indexManageListStaff'}">指标管理</router-link>
      <router-link class="nbgkmydDivSon" tag="div" :to="{name:'evaluateModelListStaff'}">模板表管理</router-link>
      <router-link class="nbgkmydDivSon" tag="div" :to="{name:'handoutHistorySearchListStaff'}">分发历史查询</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "evaluationManage",
  components: {},
  props: {
    // 其他组件传入的值
  },
  data: function() {
    // 自定义变量
    return {
      activeName: "first"
    };
  },
  methods: {
    // 自定义方法
    handleClick() {}
  },
  watch: {
    $route(to, from) {
      let domArr = document
        .querySelector("#nbgkmydDiv")
        .querySelectorAll(".nbgkmydDivSon");
      for (let i = 0; i < domArr.length; i++) {
        domArr[i].style.borderBottom = "";
        domArr[i].style.color='';
      }
      switch (
        to.name //加个点击效果的蓝条条
      ) {
        case "evaluatePlanListStaff":
          domArr[0].style.borderBottom = "2px solid #66b1ff";
          domArr[0].style.color='#66b1ff';
          break;
        case "indexManageListStaff":
          domArr[1].style.borderBottom = "2px solid #66b1ff";
          domArr[1].style.color='#66b1ff';
          break;
        case "evaluateModelListStaff":
          domArr[2].style.borderBottom = "2px solid #66b1ff";
          domArr[2].style.color='#66b1ff';
          break;
        case "handoutHistorySearchListStaff":
          domArr[3].style.borderBottom = "2px solid #66b1ff";
          domArr[3].style.color='#66b1ff';
          break;
      }
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
  created: function() {
    // 组件创建后
    // TODO
  },
  mounted: function() {
    // 组件加载完成
    let domArr = document
      .querySelector("#nbgkmydDiv")
      .querySelectorAll(".nbgkmydDivSon");
    domArr[0].style.borderBottom = "2px solid #66b1ff";
    domArr[0].style.color='#66b1ff';
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
#evaluationManage {
  height: 100%;
  width: 100%;
}
#nbgkmydDiv {
  display: flex;
  border-bottom: 1px solid #ddd;
  height: 40px;
}
#nbgkmydDiv > div {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

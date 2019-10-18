<template>
  <div id="processTracing" class="content-height" style="width:100%">
    <div id="nbgkmydDiv">
      <router-link class="nbgkmydDivSon" tag="div" :to="{name:'staffEvalutionListStaff'}">员工达优测评</router-link>  
      <router-link class="nbgkmydDivSon" tag="div" :to="{name:'customerSatisfactionList'}">顾客满意度评测</router-link>  
       </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "processTracingStaff",
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
  }, //computed是有缓存的功能
  watch: {
    $route(to, from) {
      let domArr = document
        .querySelector("#nbgkmydDiv")
        .querySelectorAll(".nbgkmydDivSon");

      for (let i = 0; i < domArr.length; i++) {
        domArr[i].style.borderBottom = "";
        domArr[i].style.color='';
      }
      switch(to.name){
        case "staffEvalutionListStaff":
          domArr[0].style.borderBottom='2px solid #66b1ff';
          domArr[0].style.color='#66b1ff';
          break;
        case "customerSatisfactionList":
          domArr[1].style.borderBottom='2px solid #66b1ff';
          domArr[1].style.color='#66b1ff';
          break;
      }
    }
  },
  /**
   * 计算属性（自定义方法）
   * 调用方式：是以属性的方式调用
   * 使用场景：对于任何复杂逻辑
   *
   */ computed: {},
  // 组件创建后
  created: function() {},
  // 组件加载完成
  mounted: function() {
    // 组件加载完成
    // TODO
    let domArr = document
      .querySelector("#nbgkmydDiv")
      .querySelectorAll(".nbgkmydDivSon");
    domArr[0].style.borderBottom = "2px solid #66b1ff";
    domArr[0].style.color='#66b1ff';
  },
  beforeUpdate: function() {},
  // 组件数据更新之后
  updated: function() {}
};
</script>
<style scoped> 
#fillEvaluation {
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

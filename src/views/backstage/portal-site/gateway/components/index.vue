<template>
  <div class="gateway">
    <el-container>
      <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理"  name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
      <div class="left-cla">
        <i class="el-icon-menu"></i>
        <span class="m-r-10">党建标准话产品</span>
      </div>
      <div class="back-cla">
        <i class="el-icon-menu"></i>
          <span class="m-r-10">后台管理系统</span>
      </div>

      <el-footer>
        版权所有：安徽智侒信信息技术有限公司
        <span class="height-cla"/>
        皖ICP备14016050号-1
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "Index",
    data(){
      return {
        activeName:'second'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: rgb(237 60 59);
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .height-cla {
    display: inline-block;
    width: 100px;
  }

  /* 头部样式的调整 start */
  .gateway >>> .el-tabs--border-card>.el-tabs__header {
      background-color: #dc0409;
      border-bottom: 1px solid #f3f9f9;
      margin: 0;
      font-size: 16px;
    }

  .gateway >>> .el-tabs__header {
    padding-bottom: 0;
    color: #ffffff;
  }

  .gateway >>> .el-tabs__item {
    color: #FFF;
    cursor: pointer;
  }

  .gateway >>> .el-tabs__item:hover {
    color: #ED3C3C;
    cursor: pointer;
  }

  .gateway >>> .el-tabs__nav {
    white-space: nowrap;
    position: relative;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    float: left;
    z-index: 2;
    margin-left: 20%;
  }

  /* 登出 */
  .back-cla {
    position: absolute;
    right: 3%;
    top: 27.5px;
    color: #f7f4f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
  .back-cla:hover {
    color: #ED3C3C;
  }

  .left-cla {
    position: absolute;
    left: 1.5%;
    top: 18px;
    color: #f7f4f0;
    font-weight: 600;
    font-size: 24px;
  }

  .el-icon-menu {
    color: #e18912;
  }
</style>

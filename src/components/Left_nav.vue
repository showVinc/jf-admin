<template>
  <div class="leftNav">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo leftNavToolbar"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>资讯管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data(){
      return {}

    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .leftNav{
    width: 200px;
    min-height: 100vh;
    background: #324157;
  }
</style>
<style type="text/less" lang="less">
  .leftNavToolbar{
    background: #324157!important;
    .el-submenu__title{
      color: #fff;
    }
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover{
      background: #48576a!important;
      color: #fff;
    }
    .el-menu{
      background: #1f2d3d!important;
    }
  }
</style>

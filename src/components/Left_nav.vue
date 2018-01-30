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
      <el-submenu v-for="res,num in nav" :key="num" :index="`${num}`">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{res.name}}</span>
        </template>
        <el-menu-item-group v-for="item,index in newsList" :key="index">
          <template slot="title">{{item.name}}</template>
          <el-menu-item v-for="el,key in item.children" :key="key" :index="`${key}`">{{el.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        nav:[
          {
            name:'用户'
          },
          {
            name:'咨询管理'
          }
        ],
        newsList:[
          {
            name:'文章管理',
            children:[
              {
                name:'文章列表'
              },
              {
                name:'测试多数据'
              }
            ]
          }
        ]
      }

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
      color: #97a8be;
      .el-menu-item-group__title{
        color: #fff;
      }
      .el-menu-item{
        color: #97a8be;
      }
    }
  }
</style>

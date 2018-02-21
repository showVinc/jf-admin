<template>
  <div class="leftNav">
    <ul class="ulWrap">
      <li v-for="item,index in nav" class="liWrap" :key="index">
        <div @click="navNum = index">
          {{item.name}}
          <i class="el-icon-arrow-down" :class="{navActive:navNum == index}"></i>
        </div>
        <ul v-show="navNum == index">
          <li v-for="el in item.content.children" @click="detailClick(el)">
            {{el.name}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props:['num'],
    data(){
      return {
        navNum:null,
        nav:[
          {
            name:'资讯管理',
            content:{
              name:'文章管理',
              children:[
                {
                  name:'文章列表',
                  url:'/news'
                },
                {
                  name:'新增文章',
                  url:'/news/add'
                },
                {
                  name:'资讯分类',
                  url:'/news/category'
                },
                {
                  name:'资讯列表',
                  url:'/news/categoryList'
                }
              ]
            }
          },
          {
            name:'用户管理',
            content:{
              name:'文章管理',
              children:[
                {
                  name:'文章列表',
                  url:'/news'
                },
                {
                  name:'测试多数据',
                  url:'/news/detail'
                }
              ]
            }
          },
        ],
      }
    },
    methods:{
      detailClick(item){
        this.$router.push(item.url)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
      this.navNum = this.num || 0
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .leftNav{
    width: 200px;
    min-height: 100vh;
    background: #324157;
    .ulWrap{
      .liWrap{
        min-height: 40px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #bfcbd9;
        div{
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          min-height: 40px;
          &:hover{
            background: #48576a;
          }
          i{
            position: absolute;
            right: 15px;
            top:calc(~'50% - 7px');
            &.navActive{
              transition: all .4s ease-in-out;
              transform: rotate(180deg);
            }
          }
        }
        ul{
          width: 100%;
          background: #1f2d3d;
          li{
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
              background: #48576a;
            }
          }
        }
      }
    }
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

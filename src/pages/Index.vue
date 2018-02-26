<template>
  <div class="home">
    <left-nav></left-nav>
    <div class="main">
      <public-head></public-head>
      <div class="mainWrap">
        我是内容
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading:false,
        userInfo:{},
        bannerInfo:{
          list:[],
          page:{
            p:1,
            total_pages:1
          }
        },
        lists:{
          list:[],
          page:{
            p:'',
            total_pages:''
          }
        }
      }
    },
    methods: {
    },
    created() {
      let self = this
      window.scrollTo(0,0)
    },
    mounted(){
      let self = this
    },
    //获取底部组件
    components: {}
  }
</script>
<style lang="less" scoped type="text/less">
  .home{
    display: flex;
    justify-content: space-between;
    .main{
      width: calc(~'100% - 200px');
      .mainWrap{
        margin: 15px;
        background: #fff;
        padding: 15px;
        box-sizing: border-box;
      }
    }
  }
</style>
<style lang="less" type="text/less">

</style>

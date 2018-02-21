<template>
  <div class="head">
    <div>
      <img src="../assets/images/public_img/user.jpg">vinc
    </div>
    <i class="el-icon-circle-close" @click="$router.push('/login')"></i>
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .head{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
    padding-right: 30px;
    box-sizing: border-box;
    background: #fff;
    div{
      display: flex;
      align-items: center;
      img{
        width: 30px;
        height: 30px;
        margin-right: 5px;
        border-radius: 50%;
        border: 1px solid #999;
      }
    }
    i{
      margin-left: 15px;
    }
  }
</style>

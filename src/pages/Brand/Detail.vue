<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="1"></nav-public>
    <div class="brandDetail">
      <div class="brandHead">
        <div class="cover">
          <img :src="info.cover_pic">
        </div>
        <div class="brandHeadContent">
          <div>
            {{info.title}}
          </div>
          <p v-html="info.details"></p>
          <span @click="$router.push('/')">
            <img src="../../assets/images/public_img/arrow.png">
            {{$t('returnBrand')}}
          </span>
        </div>
      </div>
      <div class="brandMain">
        <div class="brandNav">
          <p :class="{'active':navNum==1}" @click="navNum=1">
            {{$t('commodityIntroduction')}}
          </p>
          <p :class="{'active':navNum==2}" @click="navNum=2">
            {{$t('relevantImg')}}
          </p>
        </div>
        <div class="brandIntroduce" v-show="navNum==1">
          <ul>
            <li>
              <p>{{$t('brand')}}</p>
              <span>{{info.brand_name}}</span>
            </li>
            <li>
              <p>{{$t('material')}}</p>
              <span>{{info.material_name}}</span>
            </li>
            <li>
              <p>{{$t('movement')}}</p>
              <span>{{info.movement_name}}</span>
            </li>
            <li>
              <p>{{$t('function')}}</p>
              <span>{{info.function_name}}</span>
            </li>
            <li>
              <p>{{$t('shape')}}</p>
              <span>{{info.shape_name}}</span>
            </li>
            <!--<li>-->
              <!--<p>{{$t('fineness')}}</p>-->
              <!--<span>{{info.fineness}}</span>-->
            <!--</li>-->
            <li>
              <p>{{$t('diameter')}}</p>
              <span>{{info.diameter}}</span>
            </li>
            <!--<li>-->
              <!--<p>{{$t('publishTime')}}</p>-->
              <!--<span>{{info.publish_time}}</span>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="img" v-show="navNum==2">
          <img v-for="item in info.file_pic" :src="item">
        </div>
      </div>
    </div>
    <like-public></like-public>
    <foot-public></foot-public>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        navNum: 1,
        info: {},
      }
    },
    methods: {},
    created() {
      window.scrollTo(0, 0)
    },
    mounted() {
      this.$http.get(`${process.env.API.API}/watch/info`,{params:{gid:this.$route.query.gid}}).then(res=>{
        if(res.data.errcode=='0'){
          res.data.data.file_pic = res.data.data.file_pic.split(',')
          this.info = res.data.data
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取底部组件
    components: {},
    watch: {
      '$route' (to, from) {
        // 获取最新的id 调用获取数据方法
        location.reload()
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  @media screen and (max-width: 1200px){
    .img{
      img{
        width: 500px!important;
        height: 500px!important;
      }
    }
  }
  @media screen and (max-width: 1130px){
    .img{
      img{
        width: 440px!important;
        height: 440px!important;
      }
    }
  }
  .brandDetail {
    .brandHead {
      display: flex;
      padding: 40px 50px;
      background: #f9f9f9;
      .cover {
        width: 300px;
        height: 300px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .brandHeadContent {
        width: calc(~'100% - 330px');
        padding: 20px 0;
        div {
          font-size: 20px;
          font-weight: bold;
        }
        p {
          word-break: break-all;
          margin: 30px 0 40px;
          font-size: 14px;
          color: #333;
        }
        span {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #007099;
          img {
            margin-right: 10px;
            display: block;
          }
        }
      }
    }
    .brandMain {
      width: 100%;
      box-sizing: border-box;
      .brandNav {
        height: 60px;
        padding: 0 20px;
        display: flex;
        background: #4a4a4a;
        font-size: 14px;
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          height: 100%;
          color: #fdfdfd;
          margin-right: 20px;
          &.active {
            color: #cdcdcd;
            position: relative;
            &:before{
              position: absolute;
              left: calc(~'50% - 13px');
              bottom: -1px;
              content: '';
              width:0;
              height:0;
              border-width:0 13px 13px;
              border-style:solid;
              border-color:transparent transparent #fff;/*透明 透明  灰*/
            }
          }
        }
      }
      .brandIntroduce{
        padding: 40px 50px 60px;
        ul{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          li{
            width:45%;
            display: flex;
            padding: 12px 0;
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #f2f2f2;
            &:nth-child(1){
              border-top: 1px solid #f2f2f2;
            }
            &:nth-child(2){
              border-top: 1px solid #f2f2f2;
            }
            p{
              min-width: 120px;
              color: #999;
              margin-right: 20px;
            }
          }
        }
      }
      .img{
        padding: 40px 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        img{
          width: 530px;
          height: 530px;
          object-fit: cover;
          margin-bottom: 40px;
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
</style>

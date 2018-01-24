<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="4" :name="$t('place')"></nav-public>
    <div class="bgImg">
      <img src="../../assets/images/about/map.png" class="map">
      <div class="placeMain">
        <div class="placeAddress">
          <div>
            <img src="../../assets/images/about/sign.png">
            {{aboutInfo.title}}
          </div>
          <span>
            {{aboutInfo.address}}
          </span>
        </div>
        <div class="placeEmail">
          <div class="placeFirst" v-if="aboutInfo.email!=-1">
            <p>{{$t('Email')}}</p>
            <span>{{aboutInfo.email}}</span>
          </div>
          <div class="placeFirst"  v-if="aboutInfo.business_hours!=-1">
            <p>{{$t('businessHours')}}</p>
            <span>{{aboutInfo.business_hours}}</span>
          </div>
        </div>
        <div class="placeTel">
          <div class="placeFirst" v-if="aboutInfo.tel">
            <p>{{$t('tel')}}</p>
            <span>{{aboutInfo.tel}}</span>
          </div>
          <div class="placeFirst"  v-if="aboutInfo.fax">
            <p>{{$t('fax')}}</p>
            <span>{{aboutInfo.fax}}</span>
          </div>
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
        aboutInfo:{}
      }
    },
    methods: {
      //点击入口进入对应页面
    },
    created() {
      window.scrollTo(0,0)
    },
    mounted(){
      let self = this
      self.$http.get(`${process.env.API.API}/aboutus/index`).then(res=>{
        if(res.data.errcode=='0'){
          self.aboutInfo = res.data.data[0]
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取底部组件
    components: {}
  }
</script>
<style lang="less" scoped type="text/less">
  .bgImg{
    border-bottom: none;
    .map{
      width: 100%;
      min-height: 500px;
      object-fit: cover;
    }
  }
  .placeMain{
    background: #f9f9f9;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 50px;
    font-size: 14px;
    .placeAddress{
      width: 40%;
      div{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img{
          margin-right: 10px;
        }
      }
      span{
        word-break: break-all;
      }
    }
    .placeFirst{
      display: flex;
      p{
        font-weight: bold;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    /*.placeEmail{*/
      /*div{*/
        /*div{*/
          /*font-weight: bold;*/
        /*}*/
      /*}*/
    /*}*/
    /*.placeTel{*/
    /*}*/
  }
</style>
<style lang="less">
</style>

<template>
  <div class="news">
    <head-public></head-public>
    <nav-public :type="3"></nav-public>
    <div class="publicMain">
      <div class="newsDetail">
        <div class="newsDetailTit">
          <p>{{detailInfo.title}}</p>
          <div>
            {{detailInfo.publish_time}}
            <span>
              {{detailInfo.reporter}}
            </span>
          </div>
        </div>
        <div v-html="detailInfo.content" class="newsDetailContent">
        </div>
        <span class="next" @click="$router.push('/news')">
          <img src="../../assets/images/public_img/arrow.png">
          {{$t('newsMore')}}
        </span>
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
        detailInfo:{}
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
      self.$http.get(`${process.env.API.API}/news/info`,{params:{aid:self.$route.query.aid}}).then(res=>{
        if(res.data.errcode=='0'){
          res.data.data.publish_time = self.$moment(res.data.data.publish_time*1000).format('YYYY-MM-DD')
          self.detailInfo = res.data.data
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
  .news{
    .newsDetail{
      .newsDetailTit{
        margin-bottom: 40px;
        p{
          font-size: 24px;
          color: #333;
          margin-bottom: 15px;
        }
        div{
          font-size: 13px;
          color: #999;
          display: flex;
          align-items: center;
          span{
            margin-left: 30px;
          }
        }
      }
    }
    .next{
      font-size: 13px;
      color: #007099;
      margin-top: 40px;
      display: block;
      img{
        margin-right: 10px;
      }
    }
  }
</style>
<style type="text/less" lang="less">
  .newsDetailContent{
    width: 100%;
    img{
      max-width: 100%!important;
    }
  }
</style>

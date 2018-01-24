<template>
  <div class="news">
    <head-public></head-public>
    <nav-public :type="3"></nav-public>
    <div class="bgImg">
      <no-more v-if="bannerInfo&&!bannerInfo.cover_pic"></no-more>
      <img class="isBg" :src="bannerInfo.cover_pic">
      <div class="contentShow">
        <p>
          {{bannerInfo.title}}
        </p>
      </div>
    </div>
    <div class="publicMain">
      <div class="newsMainTit">
        <p>{{$t('activity')}}</p>
        <!--<div class="search">-->
          <!--<input type="text" :placeholder="$t('inputTitle')">-->
          <!--<span>-->
            <!--<img src="../../assets/images/public_img/search.png">-->
          <!--</span>-->
        <!--</div>-->
      </div>
      <no-more v-if="newsList.list.length<=0"></no-more>
      <ul class="newsMain" v-loading="loading">
        <li v-for="item in newsList.list"  @click="detailClick(item)">
          <div class="newsImg">
            <img :src="item.cover_pic">
          </div>
          <div class="newsContent">
            <div>{{item.title}}</div>
            <p v-html="item.summary"></p>
            <span><img src="../../assets/images/public_img/arrow.png">
              {{$t('readMore')}}
            </span>
          </div>
        </li>
      </ul>
      <div class="pages" v-if="newsList.list.length>0">
        <el-pagination
          layout="prev, pager, next"
          @current-change="pageShow"
          :total="parseInt(newsList.page.total_count)">
        </el-pagination>
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
        loading:false,
        bannerInfo:{},
        newsList:{
          list:[],
          page:{
            p:1,
            total_pages:''
          }
        }
      }
    },
    methods: {
      //点击入口进入对应页面
      detailClick(item){
        this.$router.push(`/news/detail?aid=${item.aid}`)
      },
      //分页
      pageShow(val){
        let self = this
        self.loading = true
        self.$http.get(`${process.env.API.API}/news/list`,{params:{rows:10,p:val}}).then(res=>{
          if(res.data.errcode=='0'){
            self.newsList.list = []
            for(let value of res.data.data){
              value.content_pic = value.content_pic.split(',')
              self.newsList.list.push(value)
            }
            self.newsList.page = res.data.page
            window.scrollTo(0,595)
          }
          self.loading = false
        }).catch(err=>{
          console.log(err)
          self.loading = false
        })
      }
    },
    created() {
      window.scrollTo(0,0)
    },
    mounted(){
      let self = this
      //资讯列表
      self.$http.get(`${process.env.API.API}/news/list`,{params:{sid:self.$route.query.sid,rows:10,p:1}}).then(res=>{
        self.loading = true
        if(res.data.errcode=='0'){
          for(let value of res.data.data){
            value.content_pic = value.content_pic.split(',')
            self.newsList.list.push(value)
          }
          self.newsList.page = res.data.page
          self.bannerInfo = res.data.subject_info
        }
        self.loading = false
      }).catch(err=>{
        console.log(err)
        self.loading = false
      })
    },
    //获取底部组件
    components: {}
  }
</script>
<style lang="less" scoped type="text/less">
  .news{
    .newsMainTit{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      p{
        font-size: 24px;
      }
      div{
        height: 40px;
        width: 260px;
        display: flex;
        input{
          width: calc(~'100% - 40px');
          height: 100%;
          background: #f2f2f2;
          outline: none;
        }
        span{
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #dedede;
          img{
            width: 14px;
            height: 14px;
          }
        }
      }
    }
    .newsMain{
      li{
        display: flex;
        margin-bottom: 40px;
        .newsImg{
          width: 350px;
          height: 234px;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .newsContent{
          padding-left: 30px;
          width: calc(~'100% - 350px');
          box-sizing: border-box;
          color: #333;
          div{
            font-size: 16px;
          }
          p{
            font-size: 13px;
            color: #999;
            line-height: 24px;
            margin: 15px 0 30px;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:3;
          }
          span{
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #007099;
            img{
              width: 6px;
              height: 10px;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .pages{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

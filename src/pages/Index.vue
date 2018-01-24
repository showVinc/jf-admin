<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="1"></nav-public>
    <div class="topBanner">
      <el-carousel indicator-position="outside" class="homeBanner">
        <el-carousel-item v-for="item,index in bannerInfo.list" :key="index">
          <img :src="item.file_pic" @click="urlShow(item)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="publicMain"  v-loading="loading">
      <div class="brand">
        <div class="brandTit">
          {{$t('brand')}}
        </div>
        <ul>
          <li v-for="item in lists.list" @click="brandClick(item)">
            <img :src="item.logo_pic" alt="">
          </li>
        </ul>
        <div class="moreBtn" v-if="lists.page.p<lists.page.total_pages" @click="moreBtn">
          <p>
            {{$t('lookMore')}}
          </p>
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
      brandClick(item){
        this.$router.push({name:'Brand',query:{id:item.id}})
      },
      moreBtn(){
        let self = this
        self.lists.page.p++
        self.$http.get(`${process.env.API.API}/dict/brand`,{params:{rows:20,p:self.lists.page.p}}).then(res=>{
          self.loading = true
          if(res.data.errcode=='0'){
            self.lists.list =  self.lists.list.concat(res.data.data)
            self.lists.page = res.data.page
            setTimeout(()=>{
              self.loading = false
            },2000)
          }else{
            self.loading = false
          }
        }).catch(err=>{
          self.loading = false
          console.log(err)
        })
      },
      urlShow(item){
        if(item.url){
          window.open(item.url)
        }
      }
    },
    created() {
      let self = this
      window.scrollTo(0,0)
      setTimeout(()=>{
        self.userInfo = self.$store.state.userInfo
      },300)
    },
    mounted(){
      let self = this
      if(this.$route.params&&this.$route.params.isOne==1){
        location.reload()
      }
      self.$http.get(`${process.env.API.API}/ad/index`).then(res=>{
        if(res.data.errcode=='0'){
          self.bannerInfo.list = res.data.data
          self.bannerInfo.page = res.data.page
        }
      }).catch(err=>{
        console.log(err)
      })

      self.$http.get(`${process.env.API.API}/dict/brand`,{params:{rows:20,p:1}}).then(res=>{
        if(res.data.errcode=='0'){
          self.lists.list = res.data.data
          self.lists.page = res.data.page
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
  .brand{
    .brandTit{
      font-size: 24px;
      margin-bottom: 40px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 23%;
        height: 100px;
        margin-right: 2.5%;
        margin-bottom: 2.5%;
        &:nth-child(4n){
          margin-right: 0;
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          opacity: 0.7;
          transition: all 0.5s;
          &:hover{
            filter: grayscale(0);
            opacity: 1;
          }
        }
      }
    }
    .moreBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      font-size: 14px;
      P{
        min-width: 110px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        background: #333;
        color: #fafafa;
      }
    }
  }
</style>
<style lang="less" type="text/less">

</style>

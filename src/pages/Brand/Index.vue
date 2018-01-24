<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="1"></nav-public>
    <div class="bgImg">
      <img class="isBg" :src="lists.info.cover_pic">
    </div>
    <div class="publicMain">
      <div class="brand">
        <div class="brandTit">
          {{$t('brandStory')}}
        </div>
        <div v-html="lists.info.remark" class="brandContent">
        </div>
        <div class="brandMain" v-loading="loading">
          <span class="pageBtn firstBtn" @click="more(1)"></span>
          <ul>
            <li v-for="item in lists.list" @click="detailClick(item)">
              <img :src="item.cover_pic">
              <p>{{item.title}}</p>
              <span>
                  <img src="../../assets/images/public_img/arrow.png">
                  {{$t('understandMore')}}
                </span>
            </li>
          </ul>
          <span class="pageBtn lastBtn" @click="more(2)"></span>
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
        lists:{
          list:[],
          info:{},
          page:{
            p:'',
            total_pages:''
          }
        }
      }
    },
    methods: {
      detailClick(item){
        this.$router.push(`/brand/detail?gid=${item.gid}`)
      },
      more(index){
        let self = this
        if(index==1){
          if(self.lists.page.p<=1){
            return false
          }else{
            self.lists.page.p--
            self.loading = true
            this.$http.get(`${process.env.API.API}/watch/list`,{params:{id:this.$route.query.id,rows:4,p:self.lists.page.p}}).then(res=>{
              if(res.data.errcode=='0'){
                this.lists.list = res.data.data
                this.lists.page = res.data.page
                setTimeout(()=>{
                  self.loading = false
                },1000)
              }else{
                self.loading = false
              }
            }).catch(err=>{
              self.loading = false
              console.log(err)
            })
          }
        }else{
          if(self.lists.page.p>=self.lists.page.total_pages){
            return false
          }else{
            self.lists.page.p++
            self.loading = true
            this.$http.get(`${process.env.API.API}/watch/list`,{params:{id:this.$route.query.id,rows:4,p:self.lists.page.p}}).then(res=>{
              if(res.data.errcode=='0'){
                this.lists.list = res.data.data
                this.lists.page = res.data.page
                setTimeout(()=>{
                  self.loading = false
                },1000)
              }else{
                self.loading = false
              }
            }).catch(err=>{
              self.loading = false
              console.log(err)
            })
          }
        }
      }
    },
    created() {
      window.scrollTo(0,0)
    },
    mounted(){
      this.$http.get(`${process.env.API.API}/dict/info/brand`,{params:{id:this.$route.query.id}}).then(res=>{
        if(res.data.errcode=='0'){
          res.data.data.remark =res.data.data.remark.replace(res.data.data.remark ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "\'");

          this.lists.info = res.data.data

        }
      }).catch(err=>{
        console.log(err)
      })

      this.$http.get(`${process.env.API.API}/watch/list`,{params:{id:this.$route.query.id,rows:4,p:1}}).then(res=>{
        if(res.data.errcode=='0'){
          this.lists.list = res.data.data
          this.lists.page = res.data.page
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
    .brandContent{
      margin-bottom: 40px;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 60px;
    }
    .brandMain{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .pageBtn{
        width: 50px;
        height: 50px;
        display: block;
        transition: 0.5s all;
        &.firstBtn{
          background-image: url("../../assets/images/museum/left.png");
          background-repeat: no-repeat;
          &:hover{
            background-image: url("../../assets/images/museum/leftActive.png");
          }
        }
        &.lastBtn{
          background-image: url("../../assets/images/museum/right.png");
          background-repeat: no-repeat;
          &:hover{
            background-image: url("../../assets/images/museum/rightActive.png");
          }
        }
      }
      ul{
        display: flex;
        width: calc(~'100% - 100px');
        max-width: 1000px;
        box-sizing: border-box;
        padding: 0 15px;
        li{
          width: 23%;
          box-sizing: border-box;
          margin-right: 2.6%;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          /*justify-content: center;*/
          transition: 0.5s all;
          background: #fff;
          border:1px solid #fff;
          &:hover{
            border-color:#333;
          }
          &:last-child{
            margin: 0!important;
          }
          p{
            margin: 20px 0 10px;
            font-weight: bold;
            width: 80%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          img{
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          span{
            font-size: 13px;
            color: #007099;
            img{
              width: 6px;
              height: 10px;
            }
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

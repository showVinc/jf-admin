<template>
  <div class="modify">
    <head-public></head-public>
    <div class="modifyMain">
      <div class="modifyTit">
        {{title}}
      </div>
      <div class="successWrap">
        <div class="successMain">
          <img src="../../assets/images/public_img/success.png">
          <p v-if="key==1">
            {{$t('registerSuccessText')}}{{num}}s{{$t('goIndex')}}
          </p>
          <p v-if="key==2||key==3">
            {{$t('modifySuccessText')}}{{num}}s{{$t('goLoginText')}}
          </p>
        </div>
        <div class="loginBtn" @click="loginClick">
          <p>{{subBtn}}</p>
        </div>
      </div>
    </div>
    <foot-public></foot-public>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShow:false,
        msg:'',
        key:'',
        num:5,
        title:'',
        subBtn:'',
        post:{
          email:''
        }
      }
    },
    methods:{
      emailBlur(){
        let self = this
        self.isShow = false
      },
      loginClick(){
        let self = this
        if(self.key==1){
          this.$router.push('/')
        }else{
          this.$router.push('/login')
        }
      },
    },
    created(){
      let self = this
      window.scrollTo(0,0)
      if(this.$route.params&&this.$route.params.isOne==1){
        location.reload()
      }
      console.log(this.$route.query.key)
      if(this.$route.query.key==1){
        self.title = this.$t('registerSuccess')
        self.subBtn = this.$t('goHome')
      }else if(this.$route.query.key==2){
        self.title = this.$t('modifySuccess')
        self.subBtn = this.$t('goLogin')
      }else if(this.$route.query.key==3){
        self.title = this.$t('settingSuccess')
        self.subBtn = this.$t('goLogin')
      }else{
        self.$router.push('/login')
        return false
      }
      self.key = this.$route.query.key
      let timeShow = setInterval(function () {
        if(self.$route.name!='LoginSuccess'){
          clearInterval(timeShow)
          return false
        }else if (self.num <= 0&&self.$route.name=='LoginSuccess') {
          if(self.key==1){
            self.$router.push('/')
          }else{
            self.$router.push('/login')
          }
          clearInterval(timeShow)
        } else {
          self.num--
        }
      }, 1000)
    },
    mounted(){
    }
  }
</script>
<style type="text/less" lang="less" scoped>
  .modify{
    .modifyMain {
      padding: 60px 50px 0;
      color: #333;
      .modifyTit{
        font-size: 24px;
        margin-bottom: 40px;
      }
    }
    .successWrap{
      font-size: 14px;
      .successMain{
        margin-bottom: 30px;
        img{
          width: 47px;
          height: 36px;
          display: block;
        }
        p{
          color: #333;
          margin-top: 15px;
        }
      }
    }
  }
</style>

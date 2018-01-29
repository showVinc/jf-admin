<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {}
    },
    created(){
      let self = this
//      let langList=[
//        'zh-TW',
//        'en-US'
//      ]
//      let lang = navigator.browserLanguage?navigator.browserLanguage:navigator.language
//      if(langList.indexOf(lang)!=-1){
//        if(!localStorage.getItem('lang')){
//          if(langList.indexOf(lang)!=-1){
//            switch(lang){
//              case 'zh-TW':
//                lang='zh-hk'
//                break;
//              case 'en-US':
//                lang='en-us'
//                break;
//            }
//            localStorage.setItem('lang',lang)
//          }else{
//            localStorage.setItem('lang','zh-hk')
//          }
//          setTimeout(()=>{
//            location.reload()
//          },500)
//          return false
//        }
//      }
    },
    mounted(){
      let self = this
      let uid = localStorage.getItem('authorization')
      if(uid){
        self.$http.get(`${process.env.API.API}/user/pi`).then(res=>{
          if(res.data.errcode=='0'){
            this.$store.state.userInfo = res.data.data
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="less" type="text/less">
  *{
    font-family: "Microsoft YaHei";
  }
  #app{
    min-height: 100vh;
    background: #f2f2f2;
    /*margin-bottom: 30px;*/
  }
</style>

<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="4"></nav-public>
    <div class="bgImg">
      <img class="isBg" :src="aboutInfo.cover_pic">
      <div class="contentShow">
        <p>
          {{$t('about')}}
        </p>
      </div>
    </div>
    <div class="publicMain">
      <div v-html="aboutInfo.content">
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
</style>
<style lang="less" type="text/less">
</style>

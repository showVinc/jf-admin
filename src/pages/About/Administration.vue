<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="4" :name="$t('administration')"></nav-public>
    <div class="publicMain">
      <div v-html="aboutInfo.mission"></div>
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
          res.data.data[0].mission =res.data.data[0].mission.replace(res.data.data[0].mission ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "\'");
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
<style lang="less">
</style>

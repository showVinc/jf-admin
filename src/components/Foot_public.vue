<template>
  <div class="publicFoot">
    <div class="footLeft">
      <img src="../assets/images/public_img/foot_logo.png" @click="$router.push('/')">
      <span>
        {{$t('copyright')}}
      </span>
    </div>
    <div class="footRight">
      <ul>
        <li v-for="item in footList" @click="footClick(item)">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        footList:[
          {
            name:this.$t('foot1'),
          },
          {
            name:this.$t('foot2'),
          },
//          {
//            name:this.$t('foot3'),
//          },
          {
            name:this.$t('foot4'),
          },
          {
            name:this.$t('foot5'),
          },
          {
            name:this.$t('foot6'),
          }
        ]
      }
    },
    methods:{
      footClick(item){
        switch (item.name){
          case this.$t('foot1'):
            this.$router.push('/about')
            break;
          case this.$t('foot2'):
            this.$router.push('/news')
            break;
          case this.$t('foot4'):
            this.$router.push('/about/place')
            break;
          case this.$t('foot5'):
            this.$router.push('/about/contact')
            break;
          case this.$t('foot6'):
            this.$router.push('/about/administration')
            break;
        }
      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .publicFoot{
    height: 120px;
    background: #212125;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    min-width: 1024px;
    max-width: 1200px;
    box-sizing: border-box;
    color: #ebebeb;
    font-size: 13px;
    padding: 0 50px;
    .footLeft{
      display: flex;
      flex-direction: column;
      img{
        width: 35px;
        height: 35px;
        margin-bottom: 10px;
      }
    }
    .footRight{
      ul{
        display: flex;
        min-height: 50px;
        li{
          position: relative;
          margin-right: 60px;
          display: flex;
          align-items: center;
          &:before{
            content: '';
            width: 4px;
            height: 4px;
            background: #ebebeb;
            position: absolute;
            border-radius: 50%;
            right: -30px;
            top:calc(~'50% - 2px');
          }
          &:last-child{
            margin: 0;
            &:before{
              content: '';
              width: 0;
              height: 0;
            }
          }
        }
      }
    }
  }
</style>

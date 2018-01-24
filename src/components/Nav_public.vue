<template>
  <div class="publicNav">
    <ul>
      <li :class="{navActive:type==1}" @click="$router.push('/')">
        {{navList[0].title}}
      </li>
      <li :class="{navActive:type==2}">
        <p>
          {{identifyName}}
          <img src="../assets/images/about/downBlack.png" :class="{'active':isIdentify}">
        </p>
        <el-select v-model="identify" @change="identifyChange" class="navSelect" @visible-change="identifyShow">
          <el-option
            v-for="item in navList[1].options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li :class="{navActive:type==3}" @click="$router.push('/news')">
        {{navList[2].title}}
      </li>
      <li :class="{navActive:type==4}">
        <p>
          {{this.aboutName}}
          <img src="../assets/images/about/downBlack.png" :class="{'active':isAbout}">
        </p>
        <el-select v-model="about" @change="aboutChange" class="navSelect" @visible-change="aboutShow">
          <el-option
            v-for="item in navList[3].options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props:{
      name:String,
      img:String,
      type:Number
    },
    data(){
      return {
        isIdentify:false,
        isAbout:false,
        identify:'',
        identifyName:'',
        about:'',
        aboutName:this.$t('aboutIndex'),
        navList:[
          {
            title:this.$t('watchIndex')
          },
          {
            options:[
              {
                value: 'identification',
                label: this.$t('identifyImg')
              },
              //历史持有人&证书一期隐藏
//              {
//                value: 'history',
//                label: this.$t('historyName')
//              },
//              {
//                value: 'certificate',
//                label: this.$t('certificate')
//              }
            ]
          },
          {
            title:this.$t('article')
          },
          {
            options:[
              {
                value: 'about',
                label: this.$t('aboutIndex')
              },
              //博物馆一期隐藏
//              {
//                value: 'museum',
//                label: this.$t('museum')
//              },
              {
                value: 'administration',
                label: this.$t('administration')
              },
              {
                value: 'place',
                label: this.$t('place')
              },
              {
                value: 'contact',
                label: this.$t('foot5')
              }
            ]
          }
        ]
      }
    },
    methods:{
      identifyShow(){
        this.isIdentify = !this.isIdentify
      },
      aboutShow(){
        this.isAbout = !this.isAbout
      },
      identifyChange(){
        if(this.identify){
          if(this.identify=='identification'){
            this.$router.push(`/identify`)
          }else{
            this.$router.push(`/identify/${this.identify}`)
          }
        }
      },
      aboutChange(){
        if(this.about){
          if(this.about=='about'){
            this.$router.push(`/about`)
          }else{
            this.$router.push(`/about/${this.about}`)
          }
        }
      }
    },
    mounted(){
      this.aboutName = this.name?this.name:this.$t('aboutIndex')
      this.identifyName = this.img?this.img:this.$t('analysis')
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .publicNav{
    position: fixed;
    background: #fff;
    top: 90px;
    /*left: 0;*/
    width: 100%;
    max-width: 1200px;
    min-width: 1024px;
    z-index: 999;
    margin: 0 auto;
    ul{
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 50px;
      li{
        min-width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 50px;
        height: 100%;
        font-size: 14px;
        position: relative;
        p{
          display: flex;
          align-items: center;
          img{
            width: 8px;
            margin-left: 10px;
            transition: 0.5s all;
            &.active{
              transform: rotate(180deg);
            }
          }
        }
        &.navActive{
          &:before{
            content: '';
            width: 100%;
            height: 3px;
            background: #333;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .publicNav{
    .navSelect{
      position: absolute!important;
      opacity: 0;
      width: 100%;
    }
    .el-icon-caret-top:before {
      content: "\E603";
      color: #333!important;
    }
    .el-input__inner{
      border:none!important;
      color: #212125;
      width: 100%;
    }
  }
  .el-select-dropdown__item.selected.hover{
    background-color: #ebebeb!important;
    color: #333!important;
  }
  .el-select-dropdown__item.selected{
    background-color: #ebebeb!important;
    color: #333!important;
  }
  .el-select-dropdown__list{
    padding: 0!important;
  }
</style>

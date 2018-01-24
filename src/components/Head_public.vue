<template>
  <div class="publicTop">
    <div class="headLeft" @click="$router.push('/')">
      <img src="../assets/images/public_img/logo.png">
    </div>
    <div class="headRight">
      <div class="selLang">
        <p>{{langName}}<img src="../assets/images/public_img/down.png" :class="{'active':langShow}"></p>
        <el-select v-model="value" :placeholder="$t('choice')" @change="langChange" @visible-change="isLang">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--<div class="searchTop">-->
        <!--<input type="text" :placeholder="$t('search')">-->
        <!--<span>-->
          <!--<img src="../assets/images/public_img/search.png">-->
        <!--</span>-->
      <!--</div>-->
      <div class="loginBtn" @click="$router.push('/login')" v-show="!uid">
        {{$t('login')}}
      </div>
      <div class="user" v-show="uid">
        <p>
          <el-button type="primary" :loading="isLogin">{{userInfo.email}}</el-button>
          <!--{{userInfo.email}}-->
          <img src="../assets/images/public_img/downWhite.png" :class="{'active':userShow}">
        </p>
        <el-select v-model="userEmail" :placeholder="$t('choice')"  v-show="true" @change="userChange" @visible-change="isUser">
          <el-option
            v-for="item in userList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        langShow:false,
        userShow:false,
        userInfo:{},
        isLogin:false,
        uid:'',
        options: [{
          value: 'zh-hk',
          label: '繁體中文'
        },{
          value: 'en-us',
          label: 'English'
        }],
        value: '',
        userList: [{
          value: 'user',
          label: this.$t('personalCenter')
        },{
          value: 'identify',
          label: this.$t('identifyList')
        },{
          value: 'logout',
          label: this.$t('logout')
        }],
        userEmail: '',
        langName:'繁体中文'
      }
    },
    methods:{
      langChange(){
        for(let value of this.options){
          if(value.value == this.value){
            this.langName = value.label
            localStorage.setItem('lang',value.value)
            location.reload()
          }
        }
      },
      userChange(){
        if(this.userEmail=='user'){
          this.$router.push('/user')
        }else if(this.userEmail == 'identify'){
          this.$router.push('/user/identify')
        }else{
          if(!this.isLogin){
            this.isLogin = true
            this.$http.post(`${process.env.API.API}/user/lo`).then(res=>{
              if(res.data.errcode=='0'){
                localStorage.removeItem('authorization')
                location.reload()
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        }
      },
      isLang(){
        this.langShow = !this.langShow
      },
      isUser(){
        this.userShow = !this.userShow
      }
    },
    created(){

    },
    mounted(){
      this.uid = localStorage.getItem('authorization')
      let self = this
      setTimeout(()=>{
        self.userInfo = self.$store.state.userInfo
      },300)

      let lang = localStorage.getItem('lang')
      if(lang){
        for(let value of self.options){
          if(lang==value.value){
            self.langName = value.label
          }
        }
      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .loginBtn{
    margin: 0;
  }
  .publicTop{
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
    min-width: 1024px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50px;
    position: fixed;
    top: 0;
    background: #fff;
    z-index:999;
    &:before{
      content: '';
      position: absolute;
      width: calc(~'100% - 100px');
      left: 50px;
      bottom: 0;
      height: 1px;
      background: #f2f2f2;
    }
    .headLeft{
      display: flex;
      align-items: center;
    }
    .headRight{
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #212125;
      .searchTop{
        width: 260px;
        height: 40px;
        display: flex;
        margin: 0 10px;
        input{
          width: calc(~'100% - 40px');
          background: #f2f2f2;
          padding-left: 15px;
          box-sizing: border-box;
          border: none;
          outline: none;
        }
        span{
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #dedede;
          img{
            width: 14px;
            height: 14px;
            display: block;
          }
        }
      }
      .loginBtn{
        min-width: 110px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #333;
        color: #fafafa;
        border-radius: 3px;
      }
    }
  }
  .user{
    position: relative;
    p{
      width: 100px;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 40px;
      text-align: center;
      background: #333;
      color: #fafafa;
      border-radius: 2px;
      padding: 0 20px 0 5px;
      box-sizing: border-box;
      position: relative;
      img{
        position: absolute;
        right: 8px;
        top:calc(~'50% - 3px');
        transition: 0.5s all;
        &.active{
          transform: rotate(180deg);
        }
      }
    }
  }
  .selLang{
    position: relative;
    margin-right: 30px;
    p{
      height: 40px;
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 40px;
      text-align: center;
      background: #fff;
      color: #333;
      border-radius: 2px;
      padding: 0 20px 0 5px;
      box-sizing: border-box;
      position: relative;
      img{
        position: absolute;
        right: 8px;
        top:calc(~'50% - 3px');
        transition: 0.5s all;
        &.active{
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .el-select-dropdown__item.selected.hover{
    background-color: #ebebeb!important;
    color: #333!important;
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

  .el-input__inner{
    border:none!important;
    width: 100px;
    height: 40px;
    border-radius: 2px!important;
  }

  .el-icon-caret-top:before {
    content: "\E603";
  }


  .publicTop{
    .el-select{
      opacity: 0;
      position: absolute!important;
      top:0;
      left: 0;
    }
  }
  .el-button.is-loading:before{
    background: none!important;
  }
  .user{
    p{
      .el-button{
        width: 100%;
        padding: 0;
        height: 100%;
        background:none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border:none;
      }
    }
    .el-input__inner{
      background: #333!important;
      color: #fafafa;
      overflow: hidden!important;
      white-space: nowrap!important;
      text-overflow: ellipsis!important;
    }
    .el-icon-caret-top:before {
      color: #fafafa!important;
    }
  }
  .selLang{
    .el-icon-caret-top:before {
      color: #333!important;
    }

    .el-input__inner{
      background: none!important;
      color: #212125;
    }

  }
</style>

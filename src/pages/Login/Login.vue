<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/images/public_img/logo.png">
    </div>
    <div class="loginMain">
      <div class="loginTit">
        {{$t('login')}}
      </div>
      <div class="mainWrap">
        <div class="mainLeft">
          <div class="inputShow">
            <input type="text" v-model="post.user" :class="{'active':isUser}" ref="inputUser" @blur="errBlur" placeholder="请输入用户名">
            <div class="errInfo">
              <transition name="fade">
                <p v-show="isUser">{{msg}}</p>
              </transition>
            </div>
          </div>
          <div class="inputShow">
            <input type="password" v-model="post.password"  @keyup.13="sub" :class="{'active':isPassword}" ref="inputPassword" @blur="errBlur" placeholder="请输入密码">
            <div class="errInfo">
              <transition name="fade">
                <p v-show="isPassword">{{msg}}</p>
              </transition>
            </div>
          </div>
          <div class="isLogin">
            <div @click="sub">
              {{$t('login')}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      © Copyright 2018 金丰 版权所有 All Rights Reserved.
    </div>
  </div>
</template>
<script>
  import SHA1 from '@/plugin/sha1'
  export default {
    data() {
      return {
        msg:'',
        token:'',
        sid:'',
        isUser:false,
        isPassword:false,
        post:{
          user:'',
          password:''
        }
      }
    },
    methods:{
      errBlur(){
        let self = this
        self.isUser = false
        self.isPassword = false
      },
      sub(){
        let self = this
        self.msg = ''
        if(!self.post.user){
          self.msg = '用户名不能为空'
          self.isUser = true
          this.$refs['inputUser'].focus()
        }else if(!self.post.password){
          self.msg = this.$t('noPassword')
          self.isPassword = true
          this.$refs['inputPassword'].focus()
        }

        if(self.msg){
          return false
        }else{
          self.$fun.post(`${process.env.API.API}/admin/ali`,{username:self.post.user,password:SHA1(`${self.post.user}_${self.post.password}`)},res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:self.$t('loginSuccess'),
                type: 'success'
              });
              sessionStorage.setItem('authorization',res.authorization)
              self.$router.push('/news')
            }else{
              self.$notify({
                message:res.errmsg,
                type: 'warning'
              });
            }
          })
        }
      }
    },
    mounted(){
      localStorage.removeItem('authorization')
    }
  }
</script>
<style type="text/less" lang="less">
  .login{
    min-height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo{
      margin-bottom: 60px;
      img{
        min-width: 180px;
      }
    }
    .foot{
      text-align: center;
      color: #7a8ca5;
      margin-top: 150px;
      padding-bottom: 20px;
      font-size: 14px;
    }
  }
  .loginMain {
    padding: 60px 50px;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    .loginTit {
      font-size: 28px;
      margin-bottom: 40px;
    }
    .mainWrap {
      display: flex;
      justify-content: center;
      .mainLeft {
        min-width: 400px;
        flex:1;
        .isLogin{
          display: flex;
          margin-top: 10px;
          font-size: 14px;
          div{
            min-width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            background: #212125;
            justify-content: center;
            color: #fafafa;
            border-radius:3px;
            margin-right: 50px;
          }
          span{
            display: flex;
            align-items: center;
            color: #007099;
            font-size: 13px;
            img{
              width: 6px;
              height: 10px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>

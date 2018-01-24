<template>
  <div class="modify">
    <head-public></head-public>
    <div class="modifyMain">
      <div class="modifyTit">
        {{$t('settingPassword')}}
      </div>
      <div class="modifyWrap">
        <div class="inputShow">
          <span>{{$t('email')}}</span>
          <div class="tit">
            {{post.email}}
          </div>
        </div>
        <div class="inputShow">
          <span>{{$t('newPassword')}}<span style="color: #ff4242;">*</span></span>
          <input type="password" v-model="post.password" :class="{'active':password}" ref="password" @blur="errBlur">
          <div class="errInfo">
            <transition name="fade">
              <p v-show="password">{{msg}}</p>
            </transition>
          </div>
        </div>
        <div class="inputShow">
          <span>{{$t('confirmPassword')}}<span style="color: #ff4242;">*</span></span>
          <input type="password" v-model="post.repassword" :class="{'active':repassword}" ref="repassword" @blur="errBlur">
          <div class="errInfo">
            <transition name="fade">
              <p v-show="repassword">{{msg}}</p>
            </transition>
          </div>
        </div>
        <div class="isLogin" @click="sub">
          {{$t('confirm')}}
        </div>
      </div>
    </div>
    <foot-public></foot-public>
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
        password:false,
        repassword:false,
        post:{
          email:'',
          password:'',
          repassword:'',
          key:''
        }
      }
    },
    methods:{
      errBlur(){
        let self = this
        self.password = false
        self.repassword = false
      },
      sub(){
        let self = this
        self.msg = ''
        if(!self.post.password){
          self.msg = this.$t('noNewPassword')
          self.password = true
          this.$refs['password'].focus()
        }else if(!self.post.repassword){
          self.msg = this.$t('noConfirmPassword')
          self.repassword = true
          this.$refs['repassword'].focus()
        }else if(self.post.password!=self.post.repassword){
          self.msg = this.$t('atypism')
          self.repassword = true
          this.$refs['repassword'].focus()
        }

        if(self.msg){

          return false
        }else{
          this.$http.post(`${process.env.API.API}/user/reg`,{email:self.post.email,password:SHA1(self.post.password),repassword:SHA1(self.post.repassword),key:self.post.key}).then(res=>{
            if(res.data.errcode=='0'){
              localStorage.setItem('authorization',res.data.authorization)
              this.$router.push({name:'LoginSuccess',query:{key:1},params:{isOne:1}})
            }else{
              self.$notify({
                message:this.$t('settingError'),
                type: 'success'
              });
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },
    mounted(){
      this.post.email = this.$fun.GetQueryString('email','login/password')
      this.post.key = this.$fun.GetQueryString('key','login/password')
    }
  }
</script>
<style type="text/less" lang="less">
  .modify{
    margin-top: -60px;
    .modifyMain {
      padding: 60px 50px 0;
      color: #333;
      .modifyTit{
        font-size: 24px;
        margin-bottom: 40px;
      }
    }
    .modifyWrap{
      font-size: 14px;
      .inputShow {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 15px;
        span{
          margin-bottom: 10px;
        }
        input {
          border: 1px solid #f2f2f2;
          background: #fafafa;
          width: 500px;
          height: 40px;
        }
        p{
          font-size: 14px;
          color: #999;
          margin-top: 15px;
        }
        .tit{
          width: 500px;
          height: 40px;
          background: #fafafa;
          display: flex;
          align-items: center;
          padding-left: 15px;
          box-sizing: border-box;
          border:1px solid #f2f2f2;
          color: #999;
        }
      }
      .isLogin{
        width: 200px;
        height: 40px;
        background: #212125;
        color: #fafafa;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
      }
    }
  }
</style>

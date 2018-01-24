<template>
  <div class="modify">
    <head-public></head-public>
    <div class="modifyMain">
      <div class="modifyTit">
        {{$t('modifyPassword')}}
      </div>
      <div class="modifyWrap">
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
          <input type="password" v-model="post.passwordsure" :class="{'active':passwordsure}" ref="passwordsure" @blur="errBlur">
          <div class="errInfo">
            <transition name="fade">
              <p v-show="passwordsure">{{msg}}</p>
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
        password:false,
        passwordsure:false,
        post:{
          email:'',
          password:'',
          passwordsure:'',
          key:''
        }
      }
    },
    methods:{
      errBlur(){
        let self = this
        self.password = false
        self.passwordsure = false
      },
      sub(){
        let self = this
        self.msg = ''
        if(!self.post.password){
          self.msg = this.$t('noNewPassword')
          self.password = true
          this.$refs['password'].focus()
        }else if(!self.post.passwordsure){
          self.msg = this.$t('noConfirmPassword')
          self.passwordsure = true
          this.$refs['passwordsure'].focus()
        }else if(self.post.password!=self.post.passwordsure){
          self.msg = this.$t('atypism')
          self.passwordsure = true
          this.$refs['passwordsure'].focus()
        }

        if(self.msg){

          return false
        }else{
          self.$http.post(`${process.env.API.API}/user/fep`,{email:self.post.email,key:self.post.key,password:SHA1(self.post.password),new_password:SHA1(self.post.passwordsure)}).then(res=>{
            if(res.data.errcode=='0'){
              this.$router.push({name:'LoginSuccess',query:{key:2}})
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },
    mounted(){
      this.post.email = this.$fun.GetQueryString('email','login/modify')
      this.post.key = this.$fun.GetQueryString('key','login/modify')
    }
  }
</script>
<style type="text/less" lang="less">
  .modify{
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

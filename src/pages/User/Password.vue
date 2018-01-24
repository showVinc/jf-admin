<template>
  <div class="home">
    <head-public></head-public>
    <div class="publicUser">
      <div class="userLeft">
        <ul>
          <li class="active" @click="$router.push('/user')">
            {{$t('personalCenter')}}
          </li>
          <li @click="$router.push('/user/identify')">
            {{$t('identifyList')}}
          </li>
        </ul>
      </div>
      <div class="userRight">
        <div class="infoBreadcrumb">
          <p>{{$t('currentPage')}}> <span>{{$t('personalCenter')}}</span></p>
        </div>
        <div class="info">
          <div class="infoTit">
            {{$t('personalData')}}
          </div>
          <div class="infoMain">
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
              <input type="password" v-model="post.passwordsure" :class="{'active':passwordsure}" ref="passwordsure" @blur="errBlur">
              <div class="errInfo">
                <transition name="fade">
                  <p v-show="passwordsure">{{msg}}</p>
                </transition>
              </div>
            </div>
          </div>
          <div class="loginBtn">
            <p @click="sub">{{$t('confirm')}}</p>
          </div>
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
        password:false,
        passwordsure:false,
        msg:'',
        post:{
          email:'',
          password:'',
          passwordsure:''
        }
      }
    },
    methods: {
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
          self.$http.post(`${process.env.API.API}/user/ep`,{password:SHA1(self.post.password),new_password:SHA1(self.post.passwordsure)}).then(res=>{
            if(res.data.errcode=='0'){
              self.$notify({
                message:this.$t('settingSuccess'),
                type: 'success'
              });
              localStorage.removeItem('authorization')
              self.$router.push({name:'LoginSuccess',query:{key:3},params:{isOne:1}})
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
    created() {
    },
    mounted() {
      this.post.email = this.$fun.GetQueryString('email','user/password')
      let self = this
      self.uid = localStorage.getItem('authorization')
      if(!self.uid){
        self.$router.push({name:'Index',params:{isOne:1}})
      }
    },
    //获取底部组件
    components: {}
  }
</script>
<style lang="less" scoped type="text/less">
  .publicUser {
    margin-top: -60px;
    padding: 50px 50px 0;
    display: flex;
    min-height:calc(~'100vh - 270px');
    box-sizing: border-box;
    .userLeft{
      margin-right: 40px;
      ul{
        li{
          width: 180px;
          height: 40px;
          line-height: 40px;
          padding-left:10px ;
          &.active{
            background: #4a4a4a;
            color: #fafafa;
          }
        }
      }
    }
    .userRight{
      border-left: 1px solid #f2f2f2;
      padding-left: 50px;
      width: calc(~'100% - 230px');
      .infoBreadcrumb{
        font-size: 16px;
        color: #999;
        margin-bottom: 50px;
        span{
          color: #333;
        }
      }
      .infoSuccess{
        padding-bottom: 100px;
        .infoTit{
          font-size: 24px;
          padding: 50px 0 40px;
        }
        ul{
          li{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            font-size: 14px;
            p{
              color: #333;
            }
            span{
              color: #999;
            }
          }
        }
      }
      .info{
        padding-bottom: 100px;
        .infoTit{
          font-size: 24px;
          padding: 10px 0 40px;
        }
        .infoMain{
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          .inputShow{
            width: 500px;
            font-size: 14px;
            .tit{
              width: 100%;
              height: 40px;
              background: #fafafa;
              display: flex;
              align-items: center;
              padding-left: 15px;
              box-sizing: border-box;
              border:1px solid #f2f2f2;
              color: #999;
            }
            .inputWrap{
              position: relative;
              display: flex;
              border:1px solid #f2f2f2;
              span{
                margin: 0;
                width: 75px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fafafa;
                position: relative;
                &:before{
                  content: '';
                  width: 1px;
                  height: 20px;
                  background: #e6e6e6;
                  position: absolute;
                  right: 0;
                  top: calc(~'50% - 10px');
                }
                img{
                  margin-left: 10px;
                }
              }
              input{
                width: calc(~'100% - 75px');
                border:none;
              }
            }
            .genderSelect{
              border:1px solid #f2f2f2!important;
            }
          }
        }
        /*.saveBtn{*/
        /*display: flex;*/
        /*p{*/
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*color: #fafafa;*/
        /*background: #333;*/
        /*min-width: 110px;*/
        /*height: 40px;*/
        /*font-size: 14px;*/
        /*border-radius: 2px;*/
        /*}*/
        /*}*/
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .dateShow{
    .el-date-editor.el-input{
      width: 100%;
    }
    input{
      border:1px solid #f2f2f2!important;
    }
  }
</style>

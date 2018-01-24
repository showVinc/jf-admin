<template>
  <div class="home">
    <head-public></head-public>
    <div class="publicUser">
      <div class="userLeft">
        <ul>
          <li class="active">{{$t('personalCenter')}}</li>
          <li @click="$router.push('/user/identify')">
            {{$t('identifyList')}}
          </li>
        </ul>
      </div>
      <div class="userRight" v-loading="loading">
        <div class="infoBreadcrumb">
          <p @click="history">{{$t('currentPage')}}> <span>{{$t('personalCenter')}}</span></p>
        </div>
        <div class="emailInfo">
          <div class="infoTit">
            {{$t('accountInfo')}}
          </div>
          <div class="psw">
            <div>{{$t('account')}}：</div><p>{{userInfo.email}}</p>
          </div>
          <div class="psw">
            <div>{{$t('password')}}：</div>
            <p @click="passwordClick">******
              <span>
                <img src="../../assets/images/public_img/arrow.png">
                {{$t('resetPassword')}}
              </span>
            </p>
          </div>
        </div>
        <div class="info" v-if="userInfo&&userInfo.is_fillin==0">
          <div class="infoTit">
            {{$t('personalData')}}
          </div>
          <div class="infoMain">
            <div class="inputShow">
              <span>{{$t('name')}}</span>
              <input type="text" v-model="post.name">
            </div>
            <div class="inputShow">
              <span>{{$t('surname')}}</span>
              <input type="text" v-model="post.surname">
            </div>
            <div class="inputShow">
              <span>{{$t('gender')}}</span>
              <el-select v-model="post.gender" class="genderSelect">
                <el-option
                  v-for="item in genderList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="inputShow">
              <span>{{$t('birthdayDate')}}</span>
              <div class="block dateShow">
                <el-date-picker
                  v-model="post.date"
                  type="date"
                  :placeholder="$t('choiceDate')">
                </el-date-picker>
              </div>
            </div>
            <div class="inputShow">
              <span>{{$t('tel')}}</span>
              <div class="inputWrap">
                <span>
                  <span :class="{'active':telShow}">+{{telNum}}<img src="../../assets/images/public_img/down.png" alt=""></span>
                  <el-select v-model="post.telTit" class="telSelect" @visible-change="isTelShow" @change="telChange">
                    <el-option
                      v-for="item in numList"
                      :key="item.id"
                      :label="item.country_code"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </span>
                <input type="text" v-model="post.tel">
              </div>
            </div>
          </div>
          <div class="loginBtn">
            <p @click="saveBtn">{{$t('save')}}</p>
          </div>
        </div>
        <div class="infoSuccess" v-if="userInfo&&userInfo.is_fillin==1">
          <div class="infoTit">
            {{$t('personalData')}}
          </div>
          <ul>
            <li>
              <div>
                {{$t('userName')}}：
              </div>
              <span>
                {{userInfo.truename}} {{userInfo.surname}}
              </span>
            </li>
            <li>
              <div>
                {{$t('gender')}}：
              </div>
              <span>
                {{userInfo.sex==1?$t('man'):$t('woman')}}
              </span>
            </li>
            <li>
              <div>
                {{$t('birthdayDate')}}：
              </div>
              <span>
                {{userInfo.birthday}}
              </span>
            </li>
            <li>
              <div>
                {{$t('tel')}}：
              </div>
              <span>
                {{userInfo.tel}}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <foot-public></foot-public>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uid:'',
        loading:false,
        telShow:false,
        genderList:[
          {
            value:'1',
            label:this.$t('man')
          },
          {
            value:'2',
            label:this.$t('woman')
          }
        ],
        numList:[],
        telNum:86,
        post:{
          name:'',
          surname:'',
          gender:'',
          date:'',
          tel:'',
          telTit:'',
        },
        userInfo:{}
      }
    },
    methods: {
      isTelShow(){
        let self = this
        self.telShow = !self.telShow
      },
      history(){
        history.back(-1)
      },
      passwordClick(){
        this.$router.push({name:'UserPassword',query:{email:this.userInfo.email}})
      },
      telChange(){
        for(let value of this.numList){
          if(value.id==this.post.telTit){
            this.telNum= value.country_code
          }
        }
      },
      saveBtn(){
        let self = this
        if(self.post.name||self.post.surname||self.post.gender||self.post.date||self.post.tel){
          self.post.date = self.$moment(self.post.date).format('YYYY-MM-DD')
          self.$http.post(`${process.env.API.API}/user/epi`,{truename:self.post.name,surname:self.post.surname,sex:self.post.gender,birthday:self.post.date,tel:self.post.tel,country_code:self.telNum}).then(res=>{
            self.loading = true
            if(res.data.errcode=='0'){
              setTimeout(()=>{
                self.loading = false
                location.reload()
              },2000)
            }else{
              self.loading = false
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          return false
        }
      }
    },
    created(){
      let self = this
      setTimeout(()=>{
        self.userInfo = self.$store.state.userInfo
        self.$http.get(`${process.env.API.API}/dict/country`).then(res=>{
          if(res.data.errcode=='0'){
            self.numList = res.data.data
          }
        }).catch(err=>{
          console.log(err)
        })
      },300)
    },
    mounted() {
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
      .emailInfo{
        padding-bottom: 60px;
        border-bottom: 1px solid #f2f2f2;
        .infoTit{
          margin-bottom: 30px;
        }
        .psw{
          font-size: 14px;
          display: flex;
          margin-bottom: 20px;
          &:last-child{
            margin: 0;
          }
          p{
            color: #999;
            display: flex;
            align-items: center;
            span{
              color: #007099;
              font-size: 13px;
              margin-left: 40px;
              display: flex;
              align-items: center;
              img{
                margin-right: 10px;
              }
            }
          }
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
          padding: 50px 0 40px;
        }
        .infoMain{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .inputShow{
            width: 45%;
            font-size: 14px;
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
                img{
                  transition: all 0.5s;
                }
                &.active{
                  img{
                    transform: rotate(180deg);
                  }
                }
                .telSelect{
                  opacity: 0;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                }
                &:before{
                  content: '';
                  width: 1px;
                  height: 20px;
                  background: #e6e6e6;
                  position: absolute;
                  right: 0;
                  top: calc(~'50% - 10px');
                  z-index: 1;
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

<template>
  <div class="contact">
    <head-public></head-public>
    <nav-public :type="4" :name="$t('contact')"></nav-public>
    <div class="publicMain">
      <div class="contactTit">
        {{$t('contact')}}
      </div>
      <div class="contactWrap" v-loading="loading">
        <div class="contactLeft">
          <!--<div class="inputShow">-->
            <!--<span>{{$t('theme')}}</span>-->
            <!--<el-select v-model="post.theme" :placeholder="$t('choice')">-->
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
          <div class="inputShow">
            <span>{{$t('name')}}<span style="color: #ff4242;">*</span></span>
            <input type="text" v-model="post.name" :class="{'active':nameShow}" ref="inputName" @blur="errBlur">
            <div class="errInfo">
              <transition name="fade">
                <p v-show="nameShow">{{msg}}</p>
              </transition>
            </div>
          </div>
          <div class="inputShow">
            <span>{{$t('surname')}}<span style="color: #ff4242;">*</span></span>
            <input type="text" v-model="post.surname" :class="{'active':surnameShow}" ref="inputSurname" @blur="errBlur">
            <div class="errInfo">
              <transition name="fade">
                <p v-show="surnameShow">{{msg}}</p>
              </transition>
            </div>
          </div>
          <div class="inputShow">
            <span>{{$t('Email')}} <span style="color: #ff4242;">*</span></span>
            <input type="text" v-model="post.email" :class="{'active':emailShow}" ref="inputEmail" @blur="errBlur">
            <div class="errInfo">
              <transition name="fade">
                <p v-show="emailShow">{{msg}}</p>
              </transition>
            </div>
          </div>
          <!--<div class="inputShow">-->
            <!--<span>{{$t('isEmail')}}*</span>-->
            <!--<input type="text" v-model="post.emailsure" ref="inputEmailsure" @blur="errBlur">-->
            <!--<div class="errInfo">-->
              <!--<transition name="fade">-->
                <!--<p v-show="emailsureShow">{{msg}}</p>-->
              <!--</transition>-->
            <!--</div>-->
          <!--</div>-->
          <div class="inputShow">
            <span>{{$t('tel')}}</span>
            <input type="text" v-model="post.tel">
          </div>
          <div class="inputShow">
            <span>{{$t('remarks')}}</span>
            <textarea rows="5" v-model="post.marker"></textarea>
          </div>
          <div class="subBtn" @click="subClick">
            <p>{{$t('submit')}}</p>
          </div>
        </div>
        <div class="contactRight">
          <div class="rightWrap">
            <div>
              <img src="../../assets/images/about/sign.png">
              {{$t('mailingAddress')}}
            </div>
            <span class="name">{{$t('addressName')}}</span>
            <span>{{$t('addressText')}}</span>
          </div>
        </div>
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
        options:[
          {
            value:'123',
            label:'主題1'
          }
        ],
        uid:'',
        msg:'',
        loading:false,
        nameShow:false,
        surnameShow:false,
        emailShow:false,
        emailsureShow:false,
        post:{
          theme:'',
          name:'',
          surname:'',
          email:'',
          emailsure:'',
          tel:'',
          marker:''
        }
      }
    },
    methods: {
      errBlur(){
        let self = this
        self.nameShow = false
        self.surnameShow = false
        self.emailShow = false
        self.emailsureShow = false
      },
      subClick(){
        let self = this
        this.msg = ''
        if(!self.uid){
          this.$confirm(this.$t('noLogin'), this.$t('prompt'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          }).then(() => {
            this.$router.push('/login')
          }).catch((err) => {
            console.log(err)
          });
        }
        if(!self.post.name){
          this.msg = this.$t('noName')
          self.nameShow = true
          this.$refs['inputName'].focus()
        }else if(!self.post.surname){
          this.msg = this.$t('noSurname')
          self.surnameShow = true
          this.$refs['inputSurname'].focus()
        }else if(!self.post.email){
          this.msg = this.$t('noEmail')
          self.emailShow = true
          this.$refs['inputEmail'].focus()
        }
//        else if(!self.post.emailsure){
//          this.msg = this.$t('noVerificationEmail')
//          self.emailsureShow = true
//          this.$refs['inputEmailsure'].focus()
//        }

        if(this.msg){
          return false
        }else{
          self.loading = true
          self.$http.post(`${process.env.API.API}/ctus/index`,{surname:self.post.surname,username:self.post.name,tel:self.post.tel,email:self.post.email,title:self.post.theme,content:self.post.marker}).then(res=>{
            if(res.data.errcode=='0'){
              self.$notify({
                message:self.$t('postSuccess'),
                type: 'success'
              });
              setTimeout(()=>{
                self.loading = false
                location.reload()
              },2000)
            }else{
              self.loading = false
            }
          }).catch(err=>{
            self.loading = false
            console.log(err)
          })
        }
      }
    },
    created() {
      window.scrollTo(0,0)
    },
    mounted(){
      this.uid = localStorage.getItem('authorization')
    },
    //获取底部组件
    components: {}
  }
</script>
<style lang="less" scoped type="text/less">
  .contactTit{
    font-size: 24px;
    margin-bottom: 40px;
  }
  .contactWrap{
    display: flex;
    .contactLeft{
      flex:1;
      margin-right: 70px;
      .inputShow{
        textarea{
          width: 100%;
          resize:none;
          outline: none;
          border:1px solid #f2f2f2;
          background: #fafafa;
        }
        .el-select{
          border:1px solid #f2f2f2;
        }
      }
      .subBtn{
        color: #fafafa;
        display: flex;
        align-items: center;
        p{
          background: #333;
          min-width: 110px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          font-size: 14px;
        }
      }
    }
    .contactRight{
      flex:1;
      .rightWrap{
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        padding: 60px;
        margin-top: 30px;
        div{
          font-weight: bold;
          display: flex;
          align-items: center;
          img{
            margin-right: 10px;
          }
        }
        span{
          display: block;
          &.name{
            margin: 20px 0;
          }
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .contact{
    .el-select{
      width: 100%;
      height: 40px;
      .el-input{
        height: 100%;
      }
      .el-input__inner{
        background: #fafafa;
        border-color: #f2f2f2;
        height: 100%;
        &:focus{
          border-color: #8391a5!important;
        }
      }
      .el-icon-caret-top{
        &:before{
          content: "\E603"!important;
          color: #333!important;
        }
      }
    }
  }
</style>

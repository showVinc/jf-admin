<template>
  <div class="home">
    <head-public></head-public>
    <div class="publicUser">
      <div class="userLeft">
        <ul>
          <li @click="$router.push('/user')" >{{$t('personalCenter')}}</li>
          <li class="active">{{$t('identifyList')}}</li>
        </ul>
      </div>
      <div class="userRight" v-loading="loading">
        <div class="infoBreadcrumb">
          <p @click="history">{{$t('currentPage')}}> <span>{{$t('identifyContent')}}</span></p>
        </div>
        <no-more v-if="identifyList&&!identifyList.list.report_status_name"></no-more>
        <div class="identifyMain" v-show="identifyList&&identifyList.list.report_status_name">
          <div class="identifySuccess" v-if="identifyList.list.report_status==1||identifyList.list.report_status==2">
            <div class="successTit">
              <p>{{$t('identifyResult')}}</p>
              <span>({{identifyList.list.apply_time}})</span>
            </div>
            <span v-html="identifyList.list.report_report">
            </span>
            <img src="../../assets/images/identify/success.png" v-if="identifyList.list.report_status==1">
            <img src="../../assets/images/identify/error.png" v-if="identifyList.list.report_status==2">
          </div>
          <div class="imgInfo">
            <div class="imgInfoTit">
              <div>
                {{$t('imgInfo')}}
              </div>
              <span v-if="identifyList.list.report_status==0">
                <img src="../../assets/images/identify/loading.png">
                {{identifyList.list.report_status_name}}
              </span>
            </div>
            <ul>
              <li v-for="item in identifyList.list.credential_pic">
                <img :src="item">
              </li>
            </ul>
            <div class="imgInfoDate">
              {{$t('applicationDate')}}<span>{{identifyList.list.apply_time}}</span>
            </div>
          </div>
        </div>
        <div class="pages" v-show="identifyList&&identifyList.list.report_status_name">
          <el-pagination
            layout="prev, pager, next"
            @current-change="pageShow"
            :page-size="1"
            :total="parseInt(identifyList.page.total_count)">
          </el-pagination>
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
        loading:false,
        identifyList:{
          list:[],
          page:{}
        },
      }
    },
    methods: {
      history(){
        history.back(-1)
      },
      //分页
      pageShow(val){
        let self = this
        self.loading = true
        self.$http.get(`${process.env.API.API}/certify/wtct`,{params:{rows:1,p:val}}).then(res=>{
          if(res.data.errcode=='0'){
            self.identifyList.list = []
            self.identifyList.page = {}
            res.data.data[0].apply_time = self.$moment( res.data.data[0].apply_time*1000).format('YYYY-MM-DD')
            res.data.data[0].report_time = self.$moment( res.data.data[0].report_time*1000).format('YYYY-MM-DD')
            res.data.data[0].credential_pic = res.data.data[0].credential_pic.split(',')
            self.identifyList.list = res.data.data[0]
            self.identifyList.page = res.data.page
            setTimeout(()=>{
              self.loading = false
            },1000)
          }else{
            self.loading = false
            self.$notify({
              message:res.data.errmsg,
              type: 'warning'
            });
          }
        }).catch(err=>{
          self.loading = false
          console.log(err)
        })
      },
      passwordClick(){
        this.$router.push(`/user/password?email=${this.info.email}`)
      },
      saveBtn(){
        let self = this
        if(self.post.name||self.post.surname||self.post.gender||self.post.date||self.post.tel){
          this.info.isShow = 1
          return false
          //self.$http.post(`/demo`,{post}).then(res=>{
//            if(res.data.errcode=='0'){
//              self.$router.push(`/user/success`)
//            }
//          }).catch(err=>{
//            console.log(err)
//          })
        }else{
          return false
        }
      }
    },
    created() {
    },
    mounted() {
      let self = this
      self.uid = localStorage.getItem('authorization')
      if(!self.uid){
        self.$router.push({name:'Index',params:{isOne:1}})
      }

      self.$http.get(`${process.env.API.API}/certify/wtct`,{params:{rows:1,p:1}}).then(res=>{
        if(res.data.errcode=='0'){
          res.data.data[0].apply_time = self.$moment( res.data.data[0].apply_time*1000).format('YYYY-MM-DD')
          res.data.data[0].report_time = self.$moment( res.data.data[0].report_time*1000).format('YYYY-MM-DD')
          res.data.data[0].credential_pic = res.data.data[0].credential_pic.split(',')
          self.identifyList.list = res.data.data[0]
          self.identifyList.page = res.data.page
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
  @-webkit-keyframes loadRotate{
    from{
      -webkit-transform:rotateZ(0deg);
    }
    to{
      -webkit-transform:rotateZ(360deg);
    }
  }
  .userRight{
    .pages{
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media screen and (max-width: 1200px){
    .imgInfo{
      li{
        img{
          width: 130px!important;
          height: 130px!important;
        }
      }
    }
  }

  @media screen and (max-width: 1100px){
    .imgInfo{
      li{
        margin-bottom: 10px!important;
        img{
          width: 110px!important;
          height: 110px!important;
        }
      }
    }
  }
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
      padding-bottom: 120px;
      .infoBreadcrumb{
        font-size: 16px;
        color: #999;
        margin-bottom: 50px;
        span{
          color: #333;
        }
      }
      .identifyMain{
        background: #f9f9f9;
        padding: 20px;
        box-sizing: border-box;
        .identifySuccess{
          font-size: 14px;
          padding-bottom: 20px;
          position: relative;
          margin-bottom: 20px;
          img{
            position: absolute;
            right: -10px;
            top: -10px;
          }
          &:before{
            content: '';
            width: calc(~'100% + 40px');
            height: 1px;
            background: #f2f2f2;
            position: absolute;
            bottom: 0;
            left: -20px;
          }
          .successTit{
            display: flex;
            margin-bottom: 10px;
            p{
              font-size: 16px;
              font-weight: bold;
            }
            span{
              color: #999;
              display: flex;
              align-items: center;
              margin-left: 10px;
            }
          }
          span{
            color: #007099;
            display: block;
            line-height: 24px;
            width: calc(~'100% - 155px');
          }
        }
        .imgInfo{
          .imgInfoTit{
            padding: 0 0 30px;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            div{
              font-weight: bold;
            }
            span{
              color: #22afb4;
              img{
                margin-right: 5px;
                -webkit-animation:loadRotate 3s linear infinite;
                -webkit-animation-fill-mode:both;
                animation:loadRotate 5s linear infinite;
                /*动画从头到尾的速度是相同的  liner*/
                /*指定动画应该播放无限次（永远）*/
                animation-fill-mode:both;
                /*动画结束前和结束后都应用该属性 animation-fill-mode:both; */
              }
            }
          }
          ul{
            display: flex;
            flex-wrap: wrap;
            li{
              width: 20%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 15px;
              img{
                width: 140px;
                height: 140px;
                object-fit: cover;
              }
            }
          }
          .imgInfoDate{
            color: #999;
            margin-top: 10px;
            span{
              color: #333;
            }
          }
        }
      }
      .nextBtn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #007099;
        margin-top: 20px;
        span{
          margin-left: 10px;
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

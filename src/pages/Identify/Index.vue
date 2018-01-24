<template>
  <div class="home">
    <head-public></head-public>
    <nav-public :type="2" :img="$t('analysis')"></nav-public>
    <div class="bgImg">
      <img class="isBg" src="../../assets/images/identify/identifyImg.png">
      <div class="contentShow">
        <p>
          {{$t('identifyImg')}}
        </p>
      </div>
    </div>
    <div class="publicMain" v-loading="loading">
      <div class="identifyTitle">
        <div>
          {{$t('uploadImg')}}
        </div>
        <span>
          {{$t('uploadImgText')}}
        </span>
      </div>
      <div class="identifyMain">
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess0"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[0].img" :src="img[0].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[0]">{{$t('img1')}}</p>
            <span v-show="post.file_id[0]" @click.stop="removeImg(0)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[1].img" :src="img[1].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[1]">{{$t('img2')}}</p>
            <span v-show="post.file_id[1]" @click.stop="removeImg(1)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[2].img" :src="img[2].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[2]">{{$t('img3')}}</p>
            <span v-show="post.file_id[2]" @click.stop="removeImg(2)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[3].img" :src="img[3].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[3]">{{$t('img4')}}</p>
            <span v-show="post.file_id[3]" @click.stop="removeImg(3)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess4"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[4].img" :src="img[4].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[4]">{{$t('img5')}}</p>
            <span v-show="post.file_id[4]" @click.stop="removeImg(4)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess5"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[5].img" :src="img[5].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[5]">{{$t('img6')}}</p>
            <span v-show="post.file_id[5]" @click.stop="removeImg(5)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess6"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[6].img" :src="img[6].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[6]">{{$t('img7')}}</p>
            <span v-show="post.file_id[6]" @click.stop="removeImg(6)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess7"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[7].img" :src="img[7].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[7]">{{$t('img8')}}</p>
            <span v-show="post.file_id[7]" @click.stop="removeImg(7)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
        <div class="identifyImgWrap">
          <el-upload
            :headers="head"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess8"
            :before-upload="beforeAvatarUpload">
            <img v-if="img[8].img" :src="img[8].img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p v-show="!post.file_id[8]">{{$t('img9')}}</p>
            <span v-show="post.file_id[8]" @click.stop="removeImg(8)"><img src="../../assets/images/identify/delete.png"></span>
          </el-upload>
        </div>
      </div>
      <div class="subBtn" @click="subIdentify">
        <p>{{$t('submit')}}</p>
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
        uid:'',
        //上传图片的url
        uploadUrl:`${process.env.API.API}/upload`,
        //上传图片需要的头伏
        head: {
          Authorization: localStorage.getItem('authorization')
        },
        loading:false,
        img:[
          {
            img:require('../../assets/images/identify/1.png')
          },  {
            img:require('../../assets/images/identify/2.png')
          },  {
            img:require('../../assets/images/identify/3.png')
          },  {
            img:require('../../assets/images/identify/4.png')
          },  {
            img:require('../../assets/images/identify/5.png')
          },  {
            img:require('../../assets/images/identify/6.png')
          },  {
            img:require('../../assets/images/identify/7.png')
          },  {
            img:require('../../assets/images/identify/8.png')
          },  {
            img:require('../../assets/images/identify/9.png')
          },
        ],
        post:{
          file_id:[]
        }
      }
    },
    methods: {
      removeImg(index){
        switch (index){
          case 0:
            this.img[0].img = require('../../assets/images/identify/1.png')
            break
          case 1:
            this.img[1].img = require('../../assets/images/identify/2.png')
            break
          case 2:
            this.img[2].img = require('../../assets/images/identify/3.png')
            break
          case 3:
            this.img[3].img = require('../../assets/images/identify/4.png')
            break
          case 4:
            this.img[4].img = require('../../assets/images/identify/5.png')
            break
          case 5:
            this.img[5].img = require('../../assets/images/identify/6.png')
            break
          case 6:
            this.img[6].img = require('../../assets/images/identify/7.png')
            break
          case 7:
            this.img[7].img = require('../../assets/images/identify/8.png')
            break
          case 8:
            this.img[8].img = require('../../assets/images/identify/9.png')
            break
        }
        this.post.file_id[index] = ''
      },
      handleAvatarSuccess0(res, file) {
        let self = this
        console.log(URL.createObjectURL(file.raw))
        if(res.errcode=='0'){
          self.img[0].img = URL.createObjectURL(file.raw);
          self.post.file_id[0] = res.fileinfo.fid;
        }else{
          self.$notify({
            message:res.errmsg,
            type: 'success'
          });
        }
      },
      handleAvatarSuccess1(res, file) {
        this.img[1].img = URL.createObjectURL(file.raw);
        this.post.file_id[1] = res.fileinfo.fid;
      },
      handleAvatarSuccess2(res, file) {
        this.img[2].img = URL.createObjectURL(file.raw);
        this.post.file_id[2] = res.fileinfo.fid;
      },
      handleAvatarSuccess3(res, file) {
        this.img[3].img = URL.createObjectURL(file.raw);
        this.post.file_id[3] = res.fileinfo.fid;
      },
      handleAvatarSuccess4(res, file) {
        this.img[4].img = URL.createObjectURL(file.raw);
        this.post.file_id[4] = res.fileinfo.fid;
      },
      handleAvatarSuccess5(res, file) {
        this.img[5].img = URL.createObjectURL(file.raw);
        this.post.file_id[5] = res.fileinfo.fid;
      },
      handleAvatarSuccess6(res, file) {
        this.img[6].img = URL.createObjectURL(file.raw);
        this.post.file_id[6] = res.fileinfo.fid;
      },
      handleAvatarSuccess7(res, file) {
        this.img[7].img = URL.createObjectURL(file.raw);
        this.post.file_id[7] = res.fileinfo.fid;
      },
      handleAvatarSuccess8(res, file) {
        this.img[8].img = URL.createObjectURL(file.raw);
        this.post.file_id[8] = res.fileinfo.fid;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;
        let self = this
        if(!self.uid){
          self.$confirm(this.$t('noLogin'), this.$t('prompt'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          }).then(() => {
            this.$router.push('/login')
          }).catch((err) => {
            console.log(err)
          });
          return false
        }

        if (!isJPG) {
          self.$notify({
            message:self.$t('isImg'),
            type: 'warning'
          });
        }
        if (!isLt5M) {
          self.$notify({
            message:self.$t('is5MB'),
            type: 'warning'
          });
        }
        return isJPG && isLt5M;
      },
      subIdentify(){
        let self = this
        if(!self.uid){
          self.$confirm(this.$t('noLogin'), this.$t('prompt'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
          }).then(() => {
            this.$router.push('/login')
          }).catch((err) => {
            console.log(err)
          });
          return false
        }
        if(!self.post.file_id[0]||!self.post.file_id[1]||!self.post.file_id[2]||!self.post.file_id[3]||!self.post.file_id[4]||!self.post.file_id[5]||!self.post.file_id[6]){
          self.$notify({
            message:self.$t('errorImg'),
            type: 'warning'
          });
        }else{
          self.$http.post(`${process.env.API.API}/certify/wtct`,{file_fid_list:self.post.file_id}).then(res=>{
            if(res.data.errcode=='0'){
              self.$confirm(this.$t('submitSuccess'), this.$t('prompt'), {
                confirmButtonText: this.$t('reload'),
                cancelButtonText: this.$t('goHome'),
                type: 'warning'
              }).then(() => {
                location.reload()
              }).catch((err) => {
                this.$router.push('/')
                console.log(err)
              });
            }else{
              self.$notify({
                message:res.data.errmsg,
                type: 'warning'
              });
            }
          }).catch(err=>{
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
  .identifyTitle{
    div{
      font-size: 24px;
      margin-bottom: 15px;
    }
    span{
      color: #999;
      font-size: 14px;
    }
  }
  .identifyMain{
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 0;
    .identifyImgWrap{
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;
      p{
        position: absolute;
        bottom: 15px;
        left: 0;
        width: 100%;
        font-size: 16px;
        color: #fff;
      }
      span{
        position: absolute;
        top: -15px;
        right: -15px;
        img{

        }
      }
    }
  }
  .subBtn{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    p{
      min-width: 110px;
      height: 40px;
      background: #333;
      color: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
    }
  }
</style>
<style lang="less" type="text/less">
  @media screen and (max-width: 1250px){
    .identifyImgWrap{
      .avatar-uploader{
        width: 185px;
        height: 185px;
      }
      .el-upload{
        width: 185px;
        height: 185px;
        .avatar{
          width: 185px;
          height: 185px;
        }
      }
    }
  }
  @media screen and (max-width: 1150px){
    .identifyImgWrap{
      .avatar-uploader{
        width: 160px!important;
        height: 160px!important;
      }
      .el-upload{
        width: 160px!important;
        height: 160px!important;
        .avatar{
          width: 160px!important;
          height: 160px!important;
        }
      }
    }
  }
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader{
    display: block;
    box-sizing: border-box;
    width: 200px;
    height: 200px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    display: block;
    object-fit: cover;
    width: 200px;
    height: 200px;
  }
</style>

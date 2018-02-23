<template>
  <div class="home">
    <left-nav :num="0"></left-nav>
    <div class="main">
      <public-head></public-head>
      <div class="mainWrap">
        <ul>
          <li>
            <span>
              所属分类
            </span>
            <el-select v-model="post.code" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>
              *分类名称
            </span>
            <el-input v-model="post.name"></el-input>
          </li>
          <li>
            <span>
              排序
            </span>
            <el-input v-model="post.sort"></el-input>
          </li>
          <li v-show="!post.code">
            <span>
              *路由
            </span>
            <el-input v-model="post.url"></el-input>
          </li>
          <li>
            <span>
              icon
            </span>
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadShow"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
          <li>
            <span>
              封面
            </span>
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              :headers="header"
              :show-file-list="false"
              :on-success="coverShow"
              :before-upload="beforeAvatarUpload">
              <img v-if="coverUrl" :src="coverUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
        </ul>
        <div class="subBtn" @click="sub">
          提交
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        serverUrl: `${process.env.API.API}/upload`,
        imageUrl: '',
        coverUrl:'',
        header: {Authorization: sessionStorage.authorization},
        loading:false,
        userInfo:{},
        options: [],
        post:{
          name:'',
          code:'',
          sort:'',
          url:'',
          icon_fid:'',
          cover_fid:''
        }
      }
    },
    methods: {
      sub(){
        let self = this
        if(self.post.code){
          if(!self.post.name){
            self.$notify({
              message:'请填写完内容',
              type: 'warning'
            });
            return false
          }
        }else{
          if(!self.post.name||!self.post.url){
            self.$notify({
              message:'请填写完内容',
              type: 'warning'
            });
            return false
          }
        }

        if(self.$route&&self.$route.query.code){
          self.$fun.put(`${process.env.API.API}/admin/news/arc`,self.post,res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:'修改成功',
                type: 'success'
              });
              self.$router.push('/news/categoryList')
            }
          })
        }else{
          self.$fun.post(`${process.env.API.API}/admin/news/arc`,self.post,res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:'提交成功',
                type: 'success'
              });
              this.$router.push('/news/categoryList')
            }
          })
        }
      },
      uploadShow(res, file) {
        if(res.errcode=='0'){
          this.post.icon_fid = res.fileinfo.fid
        }
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      coverShow(res, file) {
        if(res.errcode=='0'){
          this.post.cover_fid = res.fileinfo.fid
        }
        this.coverUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/bmp') {

        } else {
          this.$notify({
            message:'图片格式有误',
            type: 'warning'
          });
          return false
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$notify({
            message:'图片不能超过5MB!',
            type: 'warning'
          });
        }
        return isLt5M;
      },
    },
    created() {
      let self = this
      window.scrollTo(0,0)
      setTimeout(()=>{
        self.userInfo = self.$store.state.userInfo
      },300)
    },
    mounted(){
      let self = this
      self.$fun.get(`${process.env.API.API}/admin/news/fmtcate`,{},res=>{
        self.options = res.data
      })
      if(self.$route&&self.$route.query.code){
        self.$fun.get(`${process.env.API.API}/admin/news/arci`,{code:self.$route.query.code},res=>{
          self.post.name = res.data.name
          self.post.sort = res.data.sort
          self.post.cover_fid = res.data.cover_fid
          self.post.icon_fid = res.data.icon_fid
          self.post.url = res.data.url
          self.post.id = res.data.id
          self.post.code = res.data.parent
          self.post.self_code = self.$route.query.code
          self.imageUrl = res.data.icon_pic
          self.coverUrl = res.data.cover_pic
        })
      }
    },
    //获取底部组件
    components: {
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .home{
    display: flex;
    justify-content: space-between;
    .main{
      width: calc(~'100% - 200px');
      .mainWrap{
        margin: 15px;
        background: #fff;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        ul{
          width: 100%;
          margin-bottom: 15px;
          li{
            display: flex;
            margin-bottom: 15px;
            font-size: 14px;
            color: #606266;
            span{
              width: 100px;
              display: flex;
              padding-top: 8px;
              justify-content: flex-end;
              margin-right: 10px;
            }
          }
        }
        .subBtn{
          width: 100px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 14px;
          margin: 50px auto 0;
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .el-input{
    width: calc(~'100% - 120px');
  }
  .el-select{
    width: calc(~'100% - 120px');
  }
  .quill-editor{
    width: calc(~'100% - 120px');
  }
</style>

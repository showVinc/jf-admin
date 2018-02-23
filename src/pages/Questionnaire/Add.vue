<template>
  <div class="home">
    <left-nav :num="1"></left-nav>
    <div class="main">
      <public-head></public-head>
      <div class="mainWrap">
        <ul>
          <li>
            <span>
              *问卷标题
            </span>
            <el-input v-model="post.title" placeholder="请输入内容"></el-input>
          </li>
          <li>
            <span>
              *类型
            </span>
            <el-select v-model="post.category_code" placeholder="请选择">
              <el-option
                v-for="item in list"
                :key="item.kind"
                :label="item.name"
                :value="item.kind">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>
              排序
            </span>
            <el-input v-model="post.source"></el-input>
          </li>
        </ul>
        <ul>
          <li v-for="item,index in options">
            选项{{index+1}}
            <el-input v-model="item.content" style="width: 400px"></el-input>
            <el-input v-model="item.score" style="width: 100px"></el-input>
          </li>
        </ul>
        <div class="subBtn" @click="sub">
          发布
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SHA1 from '@/plugin/sha1'
  export default {
    data() {
      return {
        serverUrl: `${process.env.API.API}/upload`,
        imageUrl: '',
        options:[
          {
            content:'',
            score:''
          }
        ],
        list:[
          {
            name:'财务状况',
            kind:1
          }, {
            name:'投资目标',
            kind:2
          }, {
            name:'风险承受',
            kind:3
          }, {
            name:'投资经验',
            kind:4
          }
        ],
        recommends:[
          {
            label:'推荐',
            value:1
          },
          {
            label:'不推荐',
            value:0
          }
        ],
        loading:false,
        userInfo:{},
        post:{
          title:'',
          content:'',
          category_code: '',
          author:'',
          cover_fid:'',
          pv:'',
          is_recommend:'',
          summary:'',
          source:''
        }
      }
    },
    methods: {
      sub(){
        let self = this
        if(!self.post.title||!self.post.category_code||!self.post.cover_fid||!self.post.summary||!self.post.content){
          self.$notify({
            message:'请填写完内容',
            type: 'warning'
          });
          return false
        }
        if(self.$route&&self.$route.query.aid){
          self.post.aid = self.$route.query.aid
          self.$fun.put(`${process.env.API.API}/admin/news/arts`,self.post,res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:'修改成功',
                type: 'success'
              });
              self.$router.push('/news')
            }
          })
        }else{
          self.$fun.post(`${process.env.API.API}/admin/news/arts`,self.post,res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:'提交成功',
                type: 'success'
              });
              self.$router.push('/news')
            }
          })
        }
      },
      uploadShow(res, file) {
        if(res.errcode=='0'){
          this.post.cover_fid = res.fileinfo.fid
        }
        this.imageUrl = URL.createObjectURL(file.raw);
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
      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.errcode == '0') {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          let url = `${process.env.API.API}/media/getfile/${res.fileinfo.fid}?editor=${SHA1('news')}`
          quill.insertEmbed(length, 'image',url)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$notify({
            message:'上传失败',
            type: 'warning'
          });
        }
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
      if(self.$route&&self.$route.query.aid){
        self.$fun.get(`${process.env.API.API}/admin/news/info`,{aid:self.$route.query.aid},res=>{
          self.post.title = res.data.title
          self.post.content = res.data.content
          self.post.category_code =res.data.category_code
          self.post.source = res.data.source
          self.post.summary = res.data.summary
          self.post.cover_fid = res.data.cover_fid
          self.post.pv = res.data.pv?res.data.pv:''
          self.post.author = res.data.author?res.data.author:''
          self.post.is_recommend = res.data.is_recommend
          self.imageUrl = res.data.cover_pic
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

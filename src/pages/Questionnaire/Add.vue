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
            <el-select v-model="post.kind" placeholder="请选择">
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
            <el-input v-model="post.sort" type="number"></el-input>
          </li>
        </ul>
        <ul class="options">
          <li v-for="item,index in post.selection">
            <span>
              选项{{index+1}}
            </span>
            <div>
              <input type="text" v-model="item.selection" class="first">
              <input type="text" v-model="item.score" class="last">
            </div>
          </li>
        </ul>
        <div class="add" @click="addOption()">
          <img src="../../assets/images/public_img/add.png">
        </div>
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
          kind:'',
          sort:'',
          selection:[
            {
              selection:'',
              score:''
            }
          ]
        }
      }
    },
    methods: {
      addOption(){
        let self = this
        if(self.post.selection.length>8){
          return false
        }
        self.post.selection.push({
          content:'',
          score:''
        })
      },
      sub(){
        let self = this
        if(!self.post.title||!self.post.kind){
          self.$notify({
            message:'请填写完内容',
            type: 'warning'
          });
          return false
        }
        if(self.$route&&self.$route.query.qid){
          self.post.qid = self.$route.query.qid
          self.$fun.put(`${process.env.API.API}/admin/qunn/ques`,self.post,res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:'修改成功',
                type: 'success'
              });
              self.$router.push('/questionnaire')
            }
          })
        }else{
          self.$fun.post(`${process.env.API.API}/admin/qunn/ques`,self.post,res=>{
            if(res.errcode=='0'){
              self.$notify({
                message:'提交成功',
                type: 'success'
              });
              self.$router.push('/questionnaire')
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
      }
    },
    created() {
      let self = this
      window.scrollTo(0,0)
    },
    mounted(){
      let self = this
      if(self.$route&&self.$route.query.qid){
        self.$fun.get(`${process.env.API.API}/admin/qunn/quesinfo`,{qid:self.$route.query.qid},res=>{
          self.post.title = res.data.title
          self.post.kind = res.data.kind
          self.post.sort = res.data.sort
          self.post.selection = res.data.selection
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
        .options{
          li{
            display: flex;
            div{
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: calc(~'100% - 100px');
              input{
                border:1px solid #bfcbd9;
                height: 36px;
                padding: 3px 10px;
                border-radius: 4px;
                &.first{
                  width: calc(~'100% - 100px');
                }
                &.last{
                  width: 80px;
                }
              }
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
        .add{
          margin: 0 auto;
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

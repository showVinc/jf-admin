<template>
  <div class="home">
    <left-nav :num="1"></left-nav>
    <div class="main">
      <public-head></public-head>
      <div class="mainWrap">
        <ul>
          <li>
            <span>
              *评分标题
            </span>
            <el-input v-model="post.title" placeholder="请输入内容"></el-input>
          </li>
          <li>
            <span>
              *评分描述
            </span>
            <textarea rows="10" cols="30" v-model="post.description">
            </textarea>
          </li>
          <li>
            <span>
              *低分
            </span>
            <el-input v-model="post.score_lower" type="number"></el-input>
          </li>
          <li>
            <span>
              *高分
            </span>
            <el-input v-model="post.score_high" type="number"></el-input>
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
        loading:false,
        userInfo:{},
        post:{
          title:'',
          description:'',
          score_high:'',
          score_lower:''
        }
      }
    },
    methods: {
      sub(){
        let self = this
        if(!self.post.title||!self.post.description||!self.post.score_high||!self.post.score_lower){
          self.$notify({
            message:'请填写完内容',
            type: 'warning'
          });
          return false
        }

        self.$fun.post(`${process.env.API.API}/admin/qunn/score`,self.post,res=>{
          if(res.errcode=='0'){
            self.$notify({
              message:'提交成功',
              type: 'success'
            });
            self.$router.push('/questionnaire/score')
          }
        })
      }
    },
    created() {
      let self = this
      window.scrollTo(0,0)
    },
    mounted(){
      let self = this
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
            textarea{
              width: calc(~'100% - 120px');
              resize: none;
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

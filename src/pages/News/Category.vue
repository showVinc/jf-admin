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
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>
              *分类名称
            </span>
            <el-input v-model="post.name"></el-input>
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
        editorOption:{},
        loading:false,
        userInfo:{},
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        post:{
          name:'',
          code:'',
        }
      }
    },
    methods: {
      sub(){
        let self = this
        self.$fun.post(`${process.env.API.API}/admin/news/arc`,self.post,res=>{
          console.log(res)
        })

//        self.$http.post(`${process.env.API.API}/admin/news/arc`,self.post).then(res=>{
//          console.log(res)
//        })
      }
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

//      self.$http.get(`${process.env.API.API}/dict/brand`,{params:{rows:20,p:1}}).then(res=>{
//        if(res.data.errcode=='0'){
//          self.lists.list = res.data.data
//          self.lists.page = res.data.page
//        }
//      }).catch(err=>{
//        console.log(err)
//      })
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

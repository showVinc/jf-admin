<template>
  <div class="home">
    <left-nav :num="0"></left-nav>
    <div class="main" v-loading="loading">
      <public-head></public-head>
      <div class="mainWrap">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="文章标题">
          </el-table-column>
          <el-table-column
            prop="publish_time"
            label="发布时间"
            width="160">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
              @click.native.prevent="getUrl(scope.$index)"
              type="text"
              size="small">
              获取数据
              </el-button>
              </template>
          </el-table-column>
        </el-table>
        <ul>
          <li>
            <span>
              *爬取链接
            </span>
            <el-input v-model="url"></el-input>
          </li>
        </ul>
        <div class="subBtn" @click="getData">
          获取列表
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url:'',
        tableData: [],
        loading:false,
        userInfo:{},
        post:{}
      }
    },
    methods: {
      getData(){
        let self = this
        self.$fun.get(`${process.env.API.API}/admin/news/worm`,{u:self.url},res=>{
          self.tableData = res.data
        })
      },
      getUrl(index){
        let self = this
        self.$fun.get(`${process.env.API.API}/admin/news/worm`,{u:self.tableData[index].url,kind:2},res=>{
          if(res.errcode=='0'){
            self.$notify({
              message:self.$t('获取成功'),
              type: 'success'
            });
            self.tableData.splice(index,1)
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
          margin-top: 50px;
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
</style>

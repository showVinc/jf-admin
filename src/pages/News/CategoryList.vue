<template>
  <div class="home">
    <left-nav :num="0"></left-nav>
    <div class="main">
      <public-head></public-head>
      <div class="mainWrap">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="分类名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="level"
            label="分类级别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="category"
            label="所属分类">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="subBtn" @click="$router.push('/news/Category')">
          新增资讯分类
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          category: '一级',
          title:'测试标题',
          level:'测试分类',
        }],
        loading:false,
        userInfo:{},
        post:{}
      }
    },
    methods: {
      sub(){

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
      self.$fun.get(`${process.env.API.API}/news/list`,{},res=>{
        console.log(res)
      })
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

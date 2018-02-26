<template>
  <div class="home">
    <left-nav :num="1"></left-nav>
    <div class="main" v-loading="loading">
      <public-head></public-head>
      <div class="mainWrap">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="220">
          </el-table-column>
          <el-table-column
            prop="score_lower"
            label="低分"
            width="60">
          </el-table-column>
          <el-table-column
            prop="score_high"
            label="高分"
            width="60">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" v-show="page.total_count>10">
          <el-pagination
            layout="prev, pager, next"
            :total="page.total_count"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <div class="subBtn" @click="$router.push('/questionnaire/scoreAdd')">
          新增评分
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page:{
          p:1,
          total_pages:10
        },
        tableData: [],
        loading:false,
        post:{}
      }
    },
    methods: {
      sub(){
        console.log(this.post)
      },
      handleCurrentChange(val){
        let self = this
        self.loading = true
        self.tableData = []
        self.$fun.get(`${process.env.API.API}/admin/qunn/score`,{rows:10,p:val},res=>{
          self.tableData = res.data
          self.page = res.page
        })
        setTimeout(()=>{
          self.loading = false
        },600)
      },
      deleteRow(index){
        let self = this
        self.$fun.delete(`${process.env.API.API}/admin/qunn/score`,{id:self.tableData[index].id},res=>{
          if(res.errcode=='0'){
            self.tableData.splice(index,1)
          }
        })
      },
    },
    created() {
      let self = this
      window.scrollTo(0,0)
    },
    mounted(){
      let self = this
      self.$fun.get(`${process.env.API.API}/admin/qunn/score`,{rows:10},res=>{
        self.tableData = res.data
        self.page = res.page
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

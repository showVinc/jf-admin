<template>
  <div class="publicLike">
    <div class="likeTit">{{$t('like')}}</div>
    <ul>
      <li v-for="item in footList" @click="detailClick(item)">
        <img :src="item.cover_pic">
        <p>{{item.title}}</p>
        <span>{{item.content}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        footList:[]
      }
    },
    methods:{
      detailClick(item){
        this.$router.push({name:'BrandDetail',query:{gid:item.gid},params:{isOne:2}})
      }
    },
    mounted(){
      this.$http.get(`${process.env.API.API}/watch/pud?rows=4`).then(res=>{
        if(res.data.errcode=='0'){
          this.footList = res.data.data
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  @media screen and (max-width: 1150px) {
    .publicLike{
      ul{
        li{
          img{
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .publicLike {
    border-top: 1px solid #f2f2f2;
    padding: 60px 50px;
    min-width: 1024px;
    box-sizing: border-box;
    .likeTit{
      font-size: 24px;
      margin-bottom: 30px;
    }
    ul{
      display: flex;
      justify-content: space-between;
      li{
        width: 23%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 0 20px;
        box-sizing: border-box;
        border:1px solid #f2f2f2;
        transition: 0.5s all;
        overflow: hidden;
        &:hover{
          border-color: #333;
        }
        p{
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
        }
        img{
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        p{
          font-size: 14px;
          margin: 15px 0 10px;
        }
        span{
          color: #999;
          font-size: 13px;
        }
      }
    }
  }
</style>

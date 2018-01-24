<template>
  <div class="noData">
    {{$t('noData')}}
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .noData{
    width: 100%;
    height: 300px;
    font-size: 42px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

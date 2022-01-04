<template>
  <div class="base-table-empty" v-if="size>=800">
    <img src="@/assets/image/noData/noData.png" alt="">
    <div class="base-txt">暂无数据</div>
  </div>
  <div class="base-table-empty-small" v-else-if="size<800&&size>=600">
    <img src="@/assets/image/noData/noData.png" alt="">
    <div class="base-txt">暂无数据</div>
  </div>
  <div class="base-table-empty-small-s" v-else>
    <img src="@/assets/image/noData/noData.png" alt="">
    <div class="base-txt">暂无数据</div>
  </div>
</template>

<script>
  export default {
    name: 'BaseDpTableEmpty',
    props:{
      size : { // 单选还是多选
        type: Number,
        default: 1000
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-table-empty {
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    text-align: center;
    color:#fff;

    > img {
      width: 6vw;
      height: 10vh;
      margin-bottom: 10px;
      margin-right: 0;
    }
    >.base-txt{
      font-size: 0.78vw;
      color: #fff;
      line-height:0.8;
    }
  }
  .base-table-empty-small {
    height: 18.5vh;
    position: relative;

    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 4.43vw;
    }
    >.base-txt{
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -75%);
      font-size: 0.78vw;
      color: #fff;
    }
  }
  .base-table-empty-small-s {
    height: 16.67vh;
    position: relative;

    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3.65vw;
    }
    >.base-txt{
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -75%);
      font-size: 0.78vw;
      color: #fff;
    }
  }
</style>

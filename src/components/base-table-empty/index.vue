<template>
  <div class="base-table-empty" v-if="size>=800">
    <img src="@/assets/page/icon-empty.png" alt="">
  </div>
  <div class="base-table-empty-small" v-else-if="size<800&&size>=600">
    <img src="@/assets/page/icon-empty.png" alt="">
  </div>
  <div class="base-table-empty-small-s" v-else>
    <img src="@/assets/page/icon-empty.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BaseTableEmpty',
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
    height: 530px;
    position: relative;

    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 210px;
    }
  }
  .base-table-empty-small {
    height: 400px;
    position: relative;

    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 170px;
    }
  }
  .base-table-empty-small-s {
    height: 360px;
    position: relative;

    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 140px;
    }
  }
</style>

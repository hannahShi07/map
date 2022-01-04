<template>
  <div>
    <div class="base-table-empty">
      <img src="@/assets/page/icon-develop.png" alt="">
      <span style="font-size: 22px;line-height: 17px;color: #999999;text-align: center">页面正在开发，待续...</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="scss">
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
  >span{
    position: absolute;
    top: 75%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  }
</style>

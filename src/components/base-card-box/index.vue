<template>
  <div class="base-card-box" :class="{
    'margin-top': margin.top,
    'margin-right': margin.right,
    'margin-bottom': margin.bottom,
    'margin-left': margin.left,
  }">
    <div class="base-card-box__header" :class="{'bottom-border': headerBottomBorder}" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="base-card-box__body">
      <div class="head-img" v-if="isImg">
        <img :class="{'square': imgSquare}" :src="imgUrl" alt="">
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseCardBox',
    props: {
      header: {},
      // 头部下边框
      headerBottomBorder: {
        type: Boolean,
        default: true
      },
      // 是否有图片
      isImg: Boolean,
      // 图片是否是正方形
      imgSquare: Boolean,
      // 图片地址
      imgUrl: String,
      // margin4个边距
      margin: {
        type: Object,
        default: () => ({top: false, right: false, bottom: false, left: false})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .base-card-box {
    position: relative;
    background: #fff;

    &.margin-top {
      margin-top: 20px;
    }

    &.margin-right {
      margin-right: 20px;
    }

    &.margin-bottom {
      margin-bottom: 20px;
    }

    &.margin-left {
      margin-left: 20px;
    }

    .base-card-box__header {
      height: 47px;
      line-height: 47px;
      text-align: left;
      padding: 0 20px;
      color: #666666;
      font-size: 16px;
      font-weight: bold;

      &.bottom-border {
        border-bottom: 1px solid #EEEEEE;
      }
    }

    .base-card-box__body {
      padding-bottom: 20px;

      .head-img {
        position: absolute;
        right: 20px;
        top: 60px;
        background: #fff;
        z-index: 2;

        img {
          width: 95px;
          height: 133px;
        }

        .square {
          width: 111px;
          height: 111px;
        }
      }
    }
  }

</style>

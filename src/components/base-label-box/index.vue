<template>
  <div class="base-label-box" :style="{marginBottom: visibleBottomMargin ? '0' : '20px'}">
    <label class="base-label-box__label" v-if="label || $slots.label">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="base-label-box__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseLabelBox',
    props: {
      label: {
        type: String,
        default: ''
      },
      // ȥ���ײ�margin
      visibleBottomMargin: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-label-box {
    display: inline-block;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    .base-label-box__label {
      display: inline-block;
      padding-right: 12px;
      font-size: 14px;
      line-height: 1;
      color: #888888;
      width:100px;
      text-align:right;
    }

    .base-label-box__content {
      display: inline-block;
    }
  }
</style>

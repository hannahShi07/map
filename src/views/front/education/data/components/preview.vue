<template>
  <div class="preview">
    <div class="title">
      {{selfData.fileTitle}}
    </div>

    <div class="time">
      <span class="time-left">{{parentData.formTab === 'voice' ? '视频' : '材料'}}来源： {{selfData.materialsSource | tableEmptyText}}</span>
      <span class="time-right">发布时间：{{selfData.createTime | tableEmptyText}}</span>
    </div>

    <el-divider/>

    <div class="text">
      <video :src="selfData.url" width="100%" height="100%" controls v-if="parentData.formTab === 'voice'">
        您的浏览器不支持 video 标签。
      </video>

      <div class="ql-editor" v-html="selfData.articleText" v-else></div>
    </div>

    <div class="fixed-back">
      <div>
        <img src="@/assets/page/icon-data-msg.png" width="21" height="17" alt="">
        <span style="color: #7D7D7D;font-size: 18px">详情</span>
      </div>
      <el-button size="medium" @click="backBtn">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {getEducationDataMsg} from '@/api/backstage/education/data'

  export default {
    props: ['params'],
    data () {
      return {
        parentData: {},
        selfData: {}
      }
    },
    activated(){
      this.parentData = this.params.params

      getEducationDataMsg({id: this.parentData.fileId}).then(res => {
        this.selfData = res
      })
    },
    created () {
      this.parentData = this.params.params

      getEducationDataMsg({id: this.parentData.fileId}).then(res => {
        this.selfData = res
      })
    },
    methods: {
      backBtn () {
        this.$emit('handleSwitch', {name: 'Index'})
      }
    }
  }
</script>

<style scoped>
  .preview {
    background: #fff;
    min-height: calc(100% - 148px);
  }

  .title {
    padding: 20px 25px;
    margin-top: 80px;
    font-size: 37px;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }

  .time {
    font-size: 16px;
    color: #999999;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .time-left {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time-right {
    text-align: right;
    width: 300px;
  }

  .text {
    padding: 13px;
    margin-bottom: 75px;
  }

  .fixed-back {
    position: fixed;
    left: 200px;
    right: 0;
    top: 68px;
    height: 60px;
    padding: 0 20px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

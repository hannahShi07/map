<template>
  <div>
    <div class="title">
      {{selfData.fileTitle}}
    </div>

    <div class="time">
      <span class="time-left">{{parentData.formTab === 'voice' ? '视频' : '材料'}}来源： {{selfData.materialsSource}}</span>
      <span class="time-right">发布时间：{{selfData.createTime}}</span>
    </div>

    <el-divider/>

    <div class="text">
      <video :src="selfData.url" width="100%" height="100%" controls v-if="parentData.formTab === 'voice'">
        您的浏览器不支持 video 标签。
      </video>

      <div class="ql-editor" v-html="selfData.articleText" v-else></div>
    </div>

    <div class="fixed-back">
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
      this.parentData = {}
      this.selfData = {}
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
  .title {
    padding: 40px 25px;
    /*margin: 40px 0;*/
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
    right: 0;
    bottom: 0;
    left: 200px;
    height: 74px;
    background: #fff;
    text-align: center;
    box-shadow: 3px -2px 4px rgba(0, 0, 0, 0.11);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

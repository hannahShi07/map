<template>
  <div style="background: #EFEFEF; padding-bottom: 2px;">
    <div style="font-size: 16px;color: #666666;margin-top: 15px">
      <i class="el-icon-warning-outline"/> 该模块下共有 <span style="color: #ED3C3C;">{{total}}条</span>
    </div>

    <div v-loading="loading">
      <div class="voice">
        <div class="voice-box" v-for="item in tableData" :key="item.fileId">
          <div class="voice-box-top" @click="editBtn(5, item)">
            <img class="voice-top-cover" :src="item.thumbUrl" alt="">
            <div class="play"><img src="@/assets/page/icon-play.png" width="52" height="52" alt=""></div>
          </div>
          <div class="voice-box-bottom">
            <div class="box-bottom-p1">
              <span class="bottom-bg">{{item.addType === '2297065814069249126' ? '视频' : '音频'}}</span>
              {{item.fileTitle}}
            </div>
            <div class="box-bottom-p2">{{item.description}}</div>
            <div class="box-bottom-p3">
            <span class="bottom-bg2">
              <img src="@/assets/page/icon-play2.png" style="vertical-align: middle;" height="11" width="11" alt="">
              {{item.duration | tableEmptyText}}
            </span>
              <span>{{item.startTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空数据样式 -->
    <base-table-empty v-if="!tableData.length && !loading"/>

    <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                     :layout="'prev, pager, next, jumper, total'"
                     style="text-align: center; margin-bottom: 70px;"
                     @pageChange="getEducationDataByPageFn"/>

    <!-- 音乐播放 -->
    <audio-player ref="refAudio"/>
  </div>
</template>

<script>
  import AudioPlayer from './audio-player'
  import {
    getEducationDataByPage,
    addEducationDataSum
  } from '@/api/backstage/education/data'

  export default {
    components: {AudioPlayer},
    data () {
      return {
        tableData: [],
        loading: false,
        total: 0,
        pageNum: 1,
        pageSize: 12,
      }
    },
    created () {
      this.getEducationDataByPageFn()
    },
    methods: {
      editBtn (t, row) {
        switch (t) {
          // 条件查询
          case 1:
            this.pageNum = 1
            this.getEducationDataByPageFn()
            break

          // 5详情
          case 5:
            // 增加点击量
            addEducationDataSum({id: row.fileId})

            if (row.addType === '2297065814069249126') {
              // 视频
              this.$emit('handleSwitch', {name: 'PreviewModal', params: {...row, formTab: 'voice'}})
            } else {
              // 音频
              this.$refs['refAudio'].show({
                title: row.fileTitle,
                artist: row.startTime,
                src: row.url,
                pic: row.thumbUrl
              })
            }
            break
        }
      },
      getEducationDataByPageFn (refresh) {
        this.loading = true
        getEducationDataByPage({
          fileType: '1295281048032116736',
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.tableData = res.records
          this.total = res.total
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @media all and(min-width: 1901px) {
    .voice-box {
      width: calc(24.9% - 10px);

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  @media all and(max-width: 1900px) {
    .voice-box {
      width: calc(33.33% - 10px);

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .voice {
    display: flex;
    flex-wrap: wrap;
  }

  .voice-box {
    position: relative;
    height: 343px;
    background: #fff;
    margin-top: 15px;
    margin-right: 15px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    .voice-box-top {
      position: relative;
      width: 100%;
      height: 240px;
      cursor: pointer;

      .voice-top-cover {
        width: 100%;
        height: 100%;
      }

      .play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .voice-box-bottom {
      margin: 9px 16px;

      .bottom-bg, .bottom-bg2 {
        background: #EEEEEE;
        padding: 5px 10px;
        border-radius: 2px;
        font-size: 12px;
        color: #666666;
      }

      .bottom-bg2 {
        border-radius: 11px;
      }

      .box-bottom-p1 {
        line-height: 26px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333333;
      }

      .box-bottom-p2 {
        margin-top: 12px;
        font-size: 14px;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }

      .box-bottom-p3 {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #999999;
      }
    }
  }
</style>

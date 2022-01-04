<template>
  <div style="background: #EFEFEF; padding-bottom: 2px;">
    <div style="background: #fff;">
      <!-- 条件盒子 -->
      <div class="page-search-box" style="padding-top: 0;">
        <base-label-box label="发布组织">
          <el-input placeholder="请输入" v-model="orgName" @keyup.enter.native="editBtn(1)" clearable maxlength="100"/>
        </base-label-box>
        <base-label-box label="标题">
          <el-input placeholder="请输入" v-model="title" @keyup.enter.native="editBtn(1)" clearable maxlength="100"/>
        </base-label-box>
        <base-label-box label="发布日期">
          <el-date-picker v-model="date" type="date" placeholder="请选择" value-format="yyyy-MM-dd" @change="editBtn(1)"/>
        </base-label-box>
        <base-label-box label="音频类型">
          <el-select v-model="addType" class="wp-100" placeholder="请选择" @change="editBtn(1)" clearable>
            <el-option v-for="item in addTypeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </base-label-box>
      </div>

      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(3)"/>
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
        </div>
      </div>
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
            <!--<div class="box-bottom-p2">{{item.description}}</div>-->
            <div class="box-bottom-p2">{{item.orgName}}</div>
            <div class="box-bottom-p3">
            <span class="bottom-bg2">
              <img src="@/assets/page/icon-play2.png" style="vertical-align: middle;" height="11" width="11" alt="">
              {{item.duration | tableEmptyText}}
            </span>
              <span>{{item.publishTime}}</span>
            </div>
          </div>

          <div class="box-edit" v-if="!curOrgPerid(item.orgId)">
            <div class="box-edit-wrap" @click="editBtn(4, item)">
              <img src="@/assets/page/icon-edit2.png" alt="">
            </div>
            <div class="box-edit-wrap" @click="editBtn(6, item)">
              <img src="@/assets/page/icon-delete2.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空数据样式 -->
    <base-table-empty v-if="!tableData.length && !loading"/>

    <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                     style="text-align: center; margin-bottom: 70px;" :layout="'prev, pager, next, jumper, total'"
                     @pageChange="getEducationDataByPageFn"/>

    <!-- 编辑新增模态 -->
    <voice-edit-dialog ref="refEdit" @refresh="editBtn(1)"/>

    <!-- 音乐播放 -->
    <audio-player ref="refAudio"/>
  </div>
</template>

<script>
  import AudioPlayer from './audio-player'
  import VoiceEditDialog from './voice-edit-dialog'
  import commonReq from '@/api/public/commonReq'
  import {
    getEducationDataByPage,
    delEducationData,
    addEducationDataSum
  } from '@/api/backstage/education/data'

  export default {
    components: {VoiceEditDialog, AudioPlayer},
    data () {
      return {
        orgName: '',
        title: '',
        date: '',
        addType: '',
        // 列表数据
        tableData: [],
        loading: false,
        total: 0,
        pageNum: 1,
        pageSize: 12,

        addTypeList: []
      }
    },
    created () {
      this.getEducationDataByPageFn()

      commonReq.getHistoryDict({types: ['video_type']}).then(res => {
        this.addTypeList = res.video_type
      })
    },
    methods: {
      editBtn (t, row) {
        switch (t) {
          // 条件查询
          case 1:
            this.pageNum = 1
            this.getEducationDataByPageFn()
            break

          // 重置
          case 2:
            this.getEducationDataByPageFn(true)
            break

          // 3新增 4编辑
          case 3:
          case 4:
            this.$refs['refEdit'].show(t === 3, row)
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

          // 删除
          case 6:
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              delEducationData({id: row.fileId}).then(response => {
                this.$message(this.successTip())
                this.editBtn(1)
              })
            }).catch(() => {
            })
            break
        }
      },
      getEducationDataByPageFn (refresh) {
        if (refresh === true) {
          this.title = ''
          this.orgName = ''
          this.date = ''
          this.addType = ''
          this.pageNum = 1
        }

        this.loading = true
        getEducationDataByPage({
          fileType: '1295281048032116736',
          fileTitle: this.title,
          orgName: this.orgName,
          addType: this.addType,
          startTime: this.date,
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
    margin-top: 5px;
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

  .box-edit {
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 4px;

    .box-edit-wrap {
      display: inline-block;
      padding: 9px 8px 6px 8px;
      cursor: pointer;

      &:not(:first-child) {
        border-left: 1px solid rgba(255, 255, 255, 0.4);
      }

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
</style>

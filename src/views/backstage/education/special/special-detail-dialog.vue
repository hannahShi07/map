<template>
  <el-dialog
    title="学习详情"
    :visible.sync="visible"
    width="880px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-form :model="formData" ref="refForm" label-width="90px">

      <div class="divider-h1">学习信息</div>
      <el-form-item label="学习主题">
        <span class="msg-text">{{formData.themeName}}</span>
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="开始时间" prop="startDate">
            <span class="msg-text">{{formData.startDate}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="结束时间" prop="endDate">
            <span class="msg-text">{{formData.endDate}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="divider-h1">学习对象</div>
      <el-form-item label="学习组织">
        <span class="msg-text">{{formData.orgStr.map(item => item.name).join('、')}}</span>
      </el-form-item>

      <div class="divider-h1">学习资料</div>
      <el-form-item label="学习资料" prop="fileStr">
        <span style="color: #53A0FF; cursor: pointer;" @click="editBtn(2)">
          <i class="iconfont icon-xiangqing"/>
          预览学习资料
        </span>
      </el-form-item>

      <div class="divider-h1">学习状态</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="学习状态">
            <span style="color: #FC8F21;font-size: 14px;">{{formData.learnStatus}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="学习结果">
             <span style="color: #53A0FF; cursor: pointer;" @click="editBtn(4)" v-if="formData.learnStatus =='已结束'">
              <i class="iconfont icon-xiangqing"/>
              查看学习结果
             </span>
             <span style="color:rgb(204, 204, 204); cursor: pointer;" v-else>
                <i class="iconfont icon-xiangqing"/>
                查看学习结果
              </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 预览学习 -->
    <data-preview-dialog ref="refDataPreview"/>

    <!-- 学习结果 -->
    <special-study-dialog ref="refStudy"/>

    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="visible = false">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import SpecialStudyDialog from './special-study-dialog'
  import DataPreviewDialog from './data-preview-dialog'
  import {
    getEducationSpecialDetail
  } from '@/api/backstage/education/special'

  export default {
    components: {DataPreviewDialog, SpecialStudyDialog},
    data () {
      return {
        visible: false,
        formData: {
          id: '',
          themeName: '',
          startDate: '',
          endDate: '',
          images: '',
          learnType: '',
          msgSendType: '',
          fileStr: [],
          orgStr: []
        },
      }
    },
    methods: {
      show (row) {
        this.visible = true

        // 待学习2279477819906843175 学习中2279477819906843178 已结束2279477819906843181
        getEducationSpecialDetail({id: row.id}).then(res => {
          let {learnStatus} = res.djLearnTheme
          this.formData = {
            id: row.id,
            themeName: res.djLearnTheme.themeName,
            startDate: res.djLearnTheme.startDate,
            endDate: res.djLearnTheme.endDate,
            images: '',
            learnStatus: learnStatus === '2279477819906843175' ? '待学习' : learnStatus === '2279477819906843178' ? '学习中' : '已结束',
            learnType: res.djLearnTheme.learnType,
            msgSendType: res.djLearnTheme.msgSendType,
            fileStr: res.needFileList.map(item => ({
              ...item,
              fileId: item.id,
              requiredRead: item.requiredRead === '2279477819906843189'
            })),
            orgStr: res.needDjOrgList.map(item => ({name: item.orgName, id: item.orgId}))
          }
        })
      },
      editBtn (t) {
        switch (t) {
          // 预览
          case 2:
            this.$refs['refDataPreview'].show(this.formData)
            break

          // 查看学习结果
          case 4:
            this.$refs['refStudy'].show(this.formData)
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .divider-h1 {
    margin-bottom: 20px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    border-bottom: 1px solid #F3F3F3;
  }

  .msg-text {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }
</style>

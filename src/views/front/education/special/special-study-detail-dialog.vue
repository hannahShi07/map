<template>
  <el-dialog
    title="详情"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    append-to-body
  >

    <el-row class="box">
      <el-col :span="4">
        <span class="label">应参与人员</span>
      </el-col>
      <el-col :span="7">
        <span class="value">{{data.shouldNum}}个 &nbsp;</span>
      </el-col>
      <el-col :span="4" :push="1">
        <span class="label">未参与人员</span>
      </el-col>
      <el-col :span="8" :push="1">
        <span class="value">{{data.notNum}}个</span>
      </el-col>
    </el-row>


    <div class="mt-20">
      <span style="color: #888888;padding-right: 15px;">必读完成情况</span>
      <el-select v-model="formData.join" placeholder="请选择必读完成情况" style="width: 445px;"
                 @change="getEducationSpecialStudyDetailFn" clearable>
        <el-option label="已参与" value="1"/>
        <el-option label="未参与" value="2"/>
      </el-select>
    </div>
    <div class="mt-20">
      <span style="color: #888888;padding-right: 15px;">选读完成情况</span>
      <el-select v-model="formData.notJoin" placeholder="请选择选读完成情况" style="width: 445px;"
                 @change="getEducationSpecialStudyDetailFn" clearable>
        <el-option label="已参与" value="1"/>
        <el-option label="未参与" value="2"/>
      </el-select>
    </div>

    <el-table :data="tableData" tooltip-effect="dark" row-key="id" v-loading="loading" class="mt-20"
              :header-cell-style="{'text-align':'center'}">
      <el-table-column label="编号" type="index" align="center" width="55px"/>
      <el-table-column label="人员名称" prop="name" align="center" show-overflow-tooltip/>
      <el-table-column label="必学完成情况" prop="mustRemark" align="center"/>
      <el-table-column label="选学完成情况" prop="notMustRemark" align="center"/>

      <!-- 空数据样式 -->
      <base-table-empty slot="empty"/>
    </el-table>

    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="visible = false">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getEducationSpecialStudyDetail,
    getEducationSpecialDetailExport
  } from '@/api/backstage/education/special'

  export default {
    data () {
      return {
        title: '',
        visible: false,
        loading: false,
        tableData: [],
        formData: {
          currentOrgId: '',
          join: '',
          notJoin: '',
          themeId: '',
          orgName: '',
        },
        data: {}
      }
    },
    methods: {
      show (row) {
        this.visible = true
        this.formData = {
          currentOrgId: row.currentOrgId,
          join: '',
          notJoin: '',
          themeId: row.themeId,
          orgName: row.orgName
        }

        this.getEducationSpecialStudyDetailFn()
      },
      editBtn () {
        getEducationSpecialDetailExport(this.formData)
      },
      getEducationSpecialStudyDetailFn () {
        this.loading = true
        getEducationSpecialStudyDetail(this.formData).then(res => {
          this.data = res
          this.tableData = res.mapArrayList
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    padding: 16px 0;
    border-bottom: 1px solid #F3F3F3;
  }

  .label {
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .value {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }

  .msg-text {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }
</style>

<template>
  <el-dialog
    title="专题学习结果"
    :visible.sync="visible"
    width="880px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    append-to-body
  >

    <el-row class="box">
      <el-col :span="3">
        <span class="label">发布组织</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.orgName}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="3">
        <span class="label">应参与组织</span>
      </el-col>
      <el-col :span="7">
        <span class="value">{{formData.shouldOrgNum}}个 &nbsp;</span>
      </el-col>
      <el-col :span="3" :push="1">
        <span class="label">未参与组织</span>
      </el-col>
      <el-col :span="9" :push="1">
        <span class="value">{{formData.notOrgNum}}个</span>
      </el-col>
    </el-row>

    <div style="margin: 10px 0;">
      <el-radio-group v-model="participationRate" @change="getEducationSpecialStudyFn">
        <el-radio label="1">参与率由高到低</el-radio>
        <el-radio label="2">参与率由低到高</el-radio>
      </el-radio-group>
    </div>

    <el-table :data="tableData" tooltip-effect="dark" row-key="id" v-loading="loading"
              :header-cell-style="{'text-align':'center'}">
      <el-table-column label="排名" type="index" align="center" width="55px"/>
      <el-table-column label="组织名称" prop="orgName" align="center" show-overflow-tooltip/>
      <el-table-column label="参与率" prop="joinRate" align="center" width="120px"/>
      <el-table-column label="应参与学习人数" prop="shouldNum" align="center" width="120px"/>
      <el-table-column label="实际参与学习人数" prop="alreadyNum" align="center" width="150px"/>
      <el-table-column label="学习情况" width="120" align="center">
        <template slot-scope="{row}">
          <base-table-a type="detail" @click="editBtn(row)">详情</base-table-a>
        </template>
      </el-table-column>

      <!-- 空数据样式 -->
      <base-table-empty slot="empty"/>
    </el-table>

    <!-- 学习结果详情 -->
    <special-study-detail-dialog ref="refDetail"/>

    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="visible = false">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import SpecialStudyDetailDialog from './special-study-detail-dialog'
  import {
    getEducationSpecialStudy
  } from '@/api/backstage/education/special'

  export default {
    components: {SpecialStudyDetailDialog},
    data () {
      return {
        visible: false,
        participationRate: '1',
        id: '',
        loading: false,
        tableData: [],
        formData: {}
      }
    },
    methods: {
      show (row) {
        this.visible = true
        this.participationRate = '1'
        this.id = row.id

        this.getEducationSpecialStudyFn()
      },
      editBtn (row) {
        this.$refs['refDetail'].show({themeId: this.id, currentOrgId: row.orgId, orgName: row.orgName})
      },
      getEducationSpecialStudyFn () {
        this.loading = true
        getEducationSpecialStudy({
          participationRate: this.participationRate,
          themeId: this.id
        }).then(res => {
          this.formData = res
          this.tableData = res.rankingList
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

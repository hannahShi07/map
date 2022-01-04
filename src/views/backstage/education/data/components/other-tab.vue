<template>
  <div>
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

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" tooltip-effect="dark" row-key="fileId" v-loading="loading"
                :header-cell-style="{'text-align':'center'}">
        <el-table-column type="index" label="序号" width="50px" align="center"/>
        <el-table-column label="标题" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.fileTitle | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布组织" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.orgName | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.publishTime | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <base-table-a type="detail" @click="editBtn(5, row)">详情</base-table-a>
            <base-table-a type="edit" @click="editBtn(4, row)" v-if="!curOrgPerid(row.orgId)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(6, row)" v-if="!curOrgPerid(row.orgId)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                       @pageChange="getEducationDataByPageFn"/>
    </div>

    <!-- 编辑新增模态 -->
    <other-edit-dialog ref="refEdit" @refresh="editBtn(1)"/>
  </div>
</template>

<script>
  import OtherEditDialog from './other-edit-dialog'
  import {
    getEducationDataByPage,
    delEducationData,
    addEducationDataSum
  } from '@/api/backstage/education/data'

  export default {
    components: {OtherEditDialog},
    data () {
      return {
        orgName: '',
        title: '',
        date: '',
        // 列表数据
        tableData: [],
        loading: false,
        total: 0,
        pageNum: 1,
        pageSize: 10
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

            this.$emit('handleSwitch', {name: 'PreviewModal', params: {...row, formTab: 'other'}})
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
          this.pageNum = 1
        }

        this.loading = true
        getEducationDataByPage({
          fileType: '1295281394175442944',
          fileTitle: this.title,
          orgName: this.orgName,
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

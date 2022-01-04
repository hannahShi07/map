<template>
  <div>
    <div style="height: 20px;background: #EEE;"></div>

    <div class="mr-20 ml-20 mt-20">
      <el-table :data="tableData" tooltip-effect="dark" row-key="fileId" v-loading="loading" border
                @row-click="editBtn(5, $event)"
                :header-cell-style="{'text-align':'center'}" header-row-class-name="page-table-header">
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
            <span>{{row.startTime | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                       @pageChange="getEducationDataByPageFn"/>
    </div>
  </div>
</template>

<script>
  import {
    getEducationDataByPage,
    addEducationDataSum
  } from '@/api/backstage/education/data'

  export default {
    data () {
      return {
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

          // 5详情
          case 5:
            // 增加点击量
            addEducationDataSum({id: row.fileId})

            this.$emit('handleSwitch', {name: 'PreviewModal', params: {...row, formTab: 'other'}})
            break
        }
      },
      getEducationDataByPageFn (refresh) {
        this.loading = true
        getEducationDataByPage({
          fileType: '1295281394175442944',
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

<style scoped>

</style>

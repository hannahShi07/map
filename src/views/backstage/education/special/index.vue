<template>
  <div>
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="专题名称">
        <el-input placeholder="请输入" style="width: 230px;" v-model="themeName" @keyup.enter.native="editBtn(1)" clearable
                  maxlength="100"/>
      </base-label-box>

      <base-label-box label="学习状态">
        <el-select v-model="learnStatus" filterable placeholder="请选择" style="width: 230px" @change="editBtn(1)"
                   clearable>
          <el-option v-for="item in learnStatusList" :label="item.name" :value="item.id"/>
        </el-select>
      </base-label-box>

      <base-label-box label="学习时间">
        <el-date-picker style="width: 140px;" v-model="startTime" type="date" value-format="yyyy-MM-dd"
                        :picker-options="pickerOptionsDisabled('start', 'endTime')" placeholder="请选择"/>
        <el-date-picker style="width: 140px;" v-model="endTime" type="date" value-format="yyyy-MM-dd"
                        :picker-options="pickerOptionsDisabled('end', 'startTime')" placeholder="请选择"/>
      </base-label-box>

      <base-label-box label="发布时间">
        <el-date-picker style="width: 140px;" v-model="publishStartDate" type="date" value-format="yyyy-MM-dd"
                        :picker-options="pickerOptionsDisabled('start', 'publishEndDate')" placeholder="请选择"/>
        <el-date-picker style="width: 140px;" v-model="publishEndDate" type="date" value-format="yyyy-MM-dd"
                        :picker-options="pickerOptionsDisabled('end', 'publishStartDate')" placeholder="请选择"/>
      </base-label-box>

      <base-label-box>
        <el-checkbox v-model="isLearn" @change="editBtn(1)">仅显示需本组织学习</el-checkbox>
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
      <el-table :data="tableData" tooltip-effect="dark" row-key="id" v-loading="loading"
                :header-cell-style="{'text-align':'center'}">
        <el-table-column type="index" label="序号" width="50px" align="center" fixed/>
        <el-table-column label="学习主题" align="center" width="460px" show-overflow-tooltip fixed>
          <template slot-scope="{row}">
            <span>{{row.themeName | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="学习状态" align="center">
          <template slot-scope="{row}">
            <span>{{row.learnStatusName | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否已停用" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.isBlockUp === '0' ? '是' : '否'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="需本组织学习" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.isLearn  === '0' ? '是' : '否'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布组织" width="400px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{(row.orgId && row.orgId.data) | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.publishTime | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="开始时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.startDate | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="结束时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.endDate | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center" fixed="right" show-overflow-tooltip>
          <template slot-scope="{row}">
            <base-table-a type="detail" @click="editBtn(5, row)">详情</base-table-a>
            <base-table-a type="edit" @click="editBtn(4, row)">编辑</base-table-a>
            <base-table-a :type="row.isBlockUp === '0' ? 'start' : 'stop'" @click="editBtn(6, row)">
              {{row.isBlockUp === '0' ? '启动' : '停用'}}
            </base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                       @pageChange="getEducationSpecialByPageFn"/>
    </div>

    <!-- 编辑新增模态 -->
    <special-edit-dialog ref="refEdit" @refresh="editBtn(1)"/>

    <!-- 详情模态 -->
    <special-detail-dialog ref="refDetail"/>
  </div>
</template>

<script>
  import commonReq from '@/api/public/commonReq'
  import SpecialEditDialog from './special-edit-dialog'
  import SpecialDetailDialog from './special-detail-dialog'
  import {
    getEducationSpecialByPage,
    setEducationSpecialStatus
  } from '@/api/backstage/education/special'

  export default {
    components: {SpecialEditDialog, SpecialDetailDialog},
    data () {
      return {
        themeName: '',
        learnStatus: '',
        startTime: '',
        endTime: '',
        publishStartDate: '',
        publishEndDate: '',
        isLearn: false,
        // 列表数据
        tableData: [],
        loading: false,
        total: 0,
        pageNum: 1,
        pageSize: 10,

        // 学习状态
        learnStatusList: []
      }
    },
    created () {
      this.getEducationSpecialByPageFn()

      commonReq.getHistoryDict({types: ['learn_state']}).then(res => {
        this.learnStatusList = res.learn_state
      })
    },
    methods: {
      editBtn (t, row) {
        switch (t) {
          // 条件查询
          case 1:
            this.pageNum = 1
            this.getEducationSpecialByPageFn()
            break

          // 重置
          case 2:
            this.getEducationSpecialByPageFn(true)
            break

          // 3新增 4编辑
          case 3:
          case 4:
            this.$refs['refEdit'].show(t === 3, row)
            break

          // 5详情
          case 5:
            this.$refs['refDetail'].show(row)
            break

          // 启用 停用
          case 6:
            this.$confirm(`是否${row.isBlockUp === '0' ? '启用' : '停用'}该条数据？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              setEducationSpecialStatus({id: row.id, isBlockUp: row.isBlockUp === '0' ? '1' : '0'}).then(response => {
                this.$message(this.successTip())
                this.editBtn(1)
              })
            }).catch(() => {
            })
            break
        }
      },
      getEducationSpecialByPageFn (refresh) {
        if (refresh === true) {
          this.themeName = ''
          this.learnStatus = ''
          this.startTime = ''
          this.endTime = ''
          this.publishStartDate = ''
          this.publishEndDate = ''
          this.isLearn = false
          this.pageNum = 1
        }

        this.loading = true
        getEducationSpecialByPage({
          model: {
            themeName: this.themeName,
            learnStatus: this.learnStatus,
            startTime: this.startTime,
            endTime: this.endTime,
            publishStartDate: this.publishStartDate,
            publishEndDate: this.publishEndDate,
            isLearn: this.isLearn ? 0 : '',
          },
          // pageNumber: this.pageNum,
          // pageSize: this.pageSize
          current: this.pageNum,
          size: this.pageSize


        }).then(res => {
          this.tableData = res.records
          this.total = res.total
        }).finally(() => {
          this.loading = false
        })
      },
      // 时间限制配置 type: start表示开始使用  end表示结束使用    name: 为限制的日期(与type反向)
      pickerOptionsDisabled (type, name) {
        return {
          disabledDate: (time) => {
            if (type === 'start') {
              if (this[name]) {
                return time.getTime() > new Date(this[name]).getTime()
              }
            } else {
              if (this[name]) {
                return time.getTime() < new Date(this[name]).getTime() - 86400000
              }
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>

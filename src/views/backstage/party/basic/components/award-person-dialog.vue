<template>
  <el-dialog :visible.sync="visible" append-to-body title="添加人员" :close-on-click-modal="false"
             :close-on-press-escape="false" width="600px">

    <el-input v-model="org" @click.native="orgClick" readonly placeholder="请选择组织"/>
    <div style="margin: 10px 0;display: flex;">
      <el-input v-model="personName" style="flex: 1;margin-right: 10px;" size="medium" placeholder="请输入人员姓名/手机号检索"
                clearable @keyup.enter.native="selectPersons"/>
      <el-button class="el-icon-search" style="margin-right: 0;" type="primary" size="medium"
                 @click="selectPersons">
        查询
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      max-height="530px"
      highlight-current-row
      @current-change="rowClick"
    >
      <el-table-column align="center" width="55">
        <template slot-scope="{row}">
          <el-radio :label="row.id" v-model="radioId">&nbsp</el-radio>
        </template>
      </el-table-column>

      <el-table-column type="index" label="序号" width="50px" align="center"/>
      <el-table-column label="姓名" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.name | tableEmptyText}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.phone | tableEmptyText}}</span>
        </template>
      </el-table-column>

      <!-- 空数据样式 -->
      <base-table-empty slot="empty"/>
    </el-table>

    <base-org-tree ref="orgTree" @refresh="orgEvent"/>

    <div slot="footer" class="text-center">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>//
import {getOrgName} from '@/api/backstage/party/basic/org/org'

export default {
  data () {
    return {
      visible: false,
      loading: false,
      org: '',
      orgId: '',
      personName: '',
      personData: {},

      tableData: [],
      radioId: '',
    }
  },
  methods: {
    show (params) {
      this.visible = true
      this.org = ''
      this.orgId = ''
      this.radioId = ''
      this.tableData = []

      this.selectPersons()
    },
    orgEvent (val) {
      this.org = val.data
      this.orgId = val.key

      this.selectPersons()
    },
    orgClick () {
      this.$refs['orgTree'].show()
    },
    rowClick (row) {
      if (row) {
        this.personData = row
        this.radioId = row.id
      }

    },
    // 查询人员
    selectPersons () {
      this.loading = true

      getOrgName({
        info: this.personName,
        orgId: {
          key: this.orgId
        }
      }).then(res => {
        this.tableData = res
        this.radioId = ''
      }).finally(() => {
        this.loading = false
      })
    },
    // 确定
    save () {
      this.visible = false
      this.$emit('refresh', Object.keys(this.personData).length ? this.personData : {
        name: '',
        id: '',
        idCode: '',
        orgId: {data: ''}
      })
    }
  }
}
</script>

<style scoped>

</style>


<template>
  <div class="party">
    <base-page-tree  ref="refTree"  @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="党员姓名">
          <el-input v-model="memberName" placeholder="请输入" style="width: 280px" clearable
                    @keyup.enter.native="editBtn(1)"/>
        </base-label-box>

        <base-label-box label="批准日期">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="editBtn(1)"/>
        </base-label-box>

        <base-label-box label="奖惩分类">
          <el-select v-model="type" placeholder="请选择" style="width: 280px" clearable @change="editBtn(1)">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </base-label-box>
      </div>

      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(3)"/>
          <base-page-button title="导入" imgType="import" @click="editBtn(5)"/>
          <base-page-button title="导出" imgType="export" @click="editBtn(6)"/>
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
        </div>
      </div>

      <div class="mr-20 ml-20" v-cloak>
        <el-table :data="tableData" tooltip-effect="dark" row-key="id" v-loading="loading"
                  :header-cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="序号" width="50px" align="center"/>
          <el-table-column label="党员姓名" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.memberName | tableEmptyText}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属组织" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.orgName | tableEmptyText}}</span>
            </template>
          </el-table-column>

          <el-table-column label="奖惩分类" width="150px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.type.data | tableEmptyText}}</span>
            </template>
          </el-table-column>

          <el-table-column label="批准机关" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.approvaOffice | tableEmptyText}}</span>
            </template>
          </el-table-column>

          <el-table-column label="批准日期" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.approvalDate | tableEmptyText}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="260" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <base-table-a type="edit" @click="editBtn(4, row)">编辑</base-table-a>
              <base-table-a @click="editBtn(7, row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(8, row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                         @pageChange="getAwardPartyByPageFn"/>
      </div>
    </base-page-tree>

    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="editBtn(1)" title="导入党员奖惩" :action="action" :templateUrl="templateUrl"
                     :otherData="otherData" :isHaveOrg="true" :fixed="true" :templateName="templateName"/>

    <!-- 新增修改 -->
    <party-edit-dialog ref="refEdit" @refresh="editBtn(1)"/>

    <!-- 详情 -->
    <party-msg-dialog ref="refMsg"/>
  </div>
</template>

<script>
  import PartyMsgDialog from './party-msg-dialog'
  import PartyEditDialog from './party-edit-dialog'
  import commonReq from '@/api/public/commonReq'
  import {getAwardPartyByPage, delAwardParty, getAwardPartyExport} from '@/api/backstage/party/award/org'

  export default {
    components: {PartyEditDialog, PartyMsgDialog},
    data () {
      return {
        // 组织编码
        orgCode: '',
        memberName: '',
        date: '',
        type: '',
        typeList: [],

        loading: false,
        // 列表数据
        tableData: [],
        total: 0,
        pageNum: 1,
        pageSize: 10,
        // 导入接口
        action: `${process.env.VUE_APP_BASE_API}/partycloud/memberPrizePunish/importMemberPrizePunish`,
        // 导入模板
        templateUrl: `${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dyjc.xlsx`,
        templateName: '党员奖惩模版.xlsx',
        otherData: {
          orgId: '1'
        }
      }
    },
    mounted () {
      this.getCondition()
      this.getAwardPartyByPageFn(true)
    },
    methods: {
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['member_rp_type']}).then(response => {
          const res = response
          this.typeList = res.member_rp_type
        })
      },
      //获取列表数据
      getAwardPartyByPageFn (refresh) {
        this.loading = true
        if (refresh === true) {
          this.date = ''
          this.memberName = ''
          this.orgCode = ''
          this.type = ''
          this.current = 1
          this.$refs.refTree.getTree("clear")
          return
        }

        getAwardPartyByPage({
          model: {
            approvalDate: this.date,
            memberName: this.memberName,
            orgCode: this.orgCode,
            type: {key: this.type},
          },
          current: this.pageNum,
          size: this.pageSize
        }).then(res => {
          this.tableData = res.records
          this.total = res.total
        }).finally(() => {
          this.loading = false
        })
      },
      editBtn (t, row) {
        switch (t) {
          // 条件查询
          case 1:
            this.pageNum = 1
            this.getAwardPartyByPageFn()
            break

          // 重置
          case 2:
            this.getAwardPartyByPageFn(true)
            break

          // 3新增 4编辑
          case 3:
          case 4:
            this.$refs['refEdit'].show(t === 3, row)
            break

          // 导入
          case 5:
            this.$refs['refImport'].show(row)
            break

          // 导出
          case 6:
            getAwardPartyExport({
              model: {
                approvalDate: this.date,
                memberName: this.memberName,
                orgCode: this.orgCode,
                type: {key: this.type},
              },
              current: this.pageNum,
              size: this.pageSize
            })
            break

          // 详情
          case 7:
            this.$refs['refMsg'].show(row)
            break

          // 删除
          case 8:
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              delAwardParty({ids: [row.id]}).then(response => {
                this.$message(this.successTip())
                this.editBtn(1)
              }).finally(() => {
                this.loading = false
              });
            }).catch(() => {
            })
            break
        }
      },
      handleTreeClick (row) {
        this.orgCode = row.code

        this.getAwardPartyByPageFn()
      }
    }
  }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #eee;
  }
</style>

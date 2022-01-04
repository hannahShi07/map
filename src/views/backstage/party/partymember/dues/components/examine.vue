<template>
  <div class="examine">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="收费组织">
        <el-input v-model="org" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="党员信息">
        <el-input v-model="member" placeholder="请输入姓名/身份证号码/手机号" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
        </div>
      </div>

      <!-- 表格 -->
      <div class="mr-20 ml-20" v-cloak>
        <el-table
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="duesTable"
          :data="duesTable"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收费组织" min-width="240px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'org.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党员姓名" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'member.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党费性质" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'moneyType.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="缴费月份" min-width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'month')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="提交日期" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'createTime')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="缴纳金额" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'amount')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(1,row)">审核</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <dues-examine ref="refAdd" @refresh="pageChange" />
  </div>
</template>

<script>
import {dueAudit} from "@/api/backstage/party/partymember/dues/dues.js"
import DuesExamine from './dues-examine'
export default {
  name: "index",
  components: {DuesExamine},
  data () {
    return {
      org:"",//收费组织
      member:"",//党员信息
      total:1,
      pageNum:1,
      pageSize:10,
      duesTable:[]
    }
  },
  mounted(){
    this.pageChange()
  },
  methods: {
    // 列表请求
    pageChange () {
      let params = {
        current: this.pageNum,
        model: {
          memberStr: this.member,
          orgName: this.org,
        },
        size: this.pageSize
      }
      this.loading = true;
      dueAudit(params).then(response => {
        this.duesTable = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    //按钮点击事件
    editBtn (t, row) {
      switch (t) {
        case 1://新增
          this.$refs['refAdd'].show(t,row)
          break

        case 4://查询
          this.pageNum = 1;
          this.pageChange();
          break;

        case 5://重置
          this.pageNum = 1;
          this.org = "";
          this.member = "";
          this.pageChange();
          break;
      }
    },
  }
}
</script>

<style scoped>
.examine{
  width: 100%;
  height: calc(100vh - 240px);
  background-color: #fff;
  overflow: auto;
}
.page-search-box{
  padding: 0;
}
.page-search-box >>> .el-input__inner{
  width: 280px;
}
</style>

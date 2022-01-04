<template>
  <div class="dues">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="收费组织">
        <el-input v-model="org" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="党员信息">
        <el-input v-model="member" placeholder="请输入姓名/身份证号码/手机号" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="缴费状态">
        <el-select
              filterable
              v-model="state"
              placeholder="请选择"
              style="width:100%;"
              clearable
              @change="pageChange()">
              <el-option
                  v-for="item in stateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
          </el-select>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
          <base-page-button title="导出" imgType="export" @click="editBtn(3)" />
        </div>

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
          <el-table-column label="姓名" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'memberName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="手机号码" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="身份证号码" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'idCard')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收费组织" min-width="240px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="缴费状态" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'state') | duesState}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下次应缴月份" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'needPayMonth')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(6,row)">缴费记录</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <dues-add ref="refAdd" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" :action="action" :otherData='{}' :templateUrl="templateUrl" :templateName="templateName" title="导入党费管理信息"/>
  </div>
</template>

<script>
import DuesAdd from './dues-add'
import {duesList,getHistoryExport} from "@/api/backstage/party/partymember/dues/dues.js"
export default {
  name: "index",
  components: {DuesAdd},
  data () {
    return {
      org:"",//收费组织
      member:"",//党员信息
      state:"",//缴费状态
      stateList:[
        {
          name:"未缴",
          id:"1"
        },{
          name:"欠费",
          id:"2"
        },{
          name:"正常",
          id:"3"
        }
      ],//缴费状态
      total:1,
      pageNum:1,
      pageSize:10,
      duesTable:[],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/dueRecord/importDueRecord`,//导入接口
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/0000/2021/03/4b263651-d353-4a73-9036-0711eb181945.xlsx`,//党费管理附件模板
      templateName:'党费收缴导入模块.xlsx',
    }
  },
  mounted(){
    this.pageChange()
  },
  methods: {
    // 列表请求
    pageChange () {
      this.loading = true;
      let params = {
        current: this.pageNum,
        model: {
          memberStr: this.member,
          orgName: this.org,
          state: this.state
        },
        size: this.pageSize,
        sort:""
      }
      duesList(params).then(response => {
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
          this.$refs['refAdd'].show(t)
          break

        case 2://导入
          this.$refs['refImport'].show(t, row)
          break;

        case 3://导出
          this.exportExc()
          break;

        case 4://查询
          this.pageNum = 1;
          this.pageChange();
          break;

        case 5://重置
          this.org = "";
          this.member = "";
          this.state = "";
          this.pageNum = 1;
          this.pageChange();
          break;

        case 6:
          this.$emit('handleSwitch', {name: 'duesRecord', params: row});
          break;
      }
    },
    exportExc(){
      let params = {
        memberStr:this.member,
        orgName:this.org,
        state:this.state
      }
      getHistoryExport(params);
    },
  },
  filters:{
    duesState(val){
      switch(val){
        case 1:
          return " 未缴";
          break;
        case 2:
          return "欠费";
          break;
        case 3:
          return "正常";
          break;
      }
    }
  }
}
</script>

<style scoped>
.dues{
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

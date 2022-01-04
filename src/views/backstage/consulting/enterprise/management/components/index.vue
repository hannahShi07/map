<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="企业名称">
        <el-input placeholder="请输入企业名称" v-model="name" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="管理员">
        <el-input placeholder="请输入姓名、电话" v-model="phone" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
    </div>

    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)" v-show="selfType != '1248620116917092352' || selfCode == '1001'"/>
        <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
      </div>
    </div>

      <!-- 表格 -->
      <div class="mr-20 ml-20" v-cloak v-loading="loading">
        <el-table
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="tableData"
          :data="tableData"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="关联党组织" min-width="200px"  align="left" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党员数" width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'memberNum')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="管理员姓名" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'adminName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'phone') | processingDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增时间" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'createTime') | processingDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(6,row)">编辑</base-table-a>
              <base-table-a type="delete" @click="editBtn(7,row)" :class="selfCode=='1001'?'':'color-grad'">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <!-- 新增/编辑 -->
      <management-add ref="refEdit" @refresh="pageChange" />
  </div>
</template>

<script>
import {enterprisePage,updateEnterprise,getEnterpriseExport} from "@/api/backstage/consulting/enterprise/management/management.js"
import ManagementAdd from './management-add'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "index",
  components: {
    ManagementAdd
  },
  data() {
    return {
      value:"",
      options: [],
      returnTime:'',//返还年份
      loading:false,//加载
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orgName:"",
      selfCode:"",//登录人党组织编码
      selfType:"",//登录人类型
      name:"",
      phone:"",
      ids:[],
      multipleSelection:[],
      tableData:[],//企业管理格数据
      title:"",
      // action:`${process.env.VUE_APP_BASE_API}/partycloud/memberDuesBack/importMemberDuesBack`,//导入地址
      // templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dffh.xls`,//党费公示附件模板
      templateName:"企业管理导入模板.xls",
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    //分页
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          "nature":1,
          "adminName": this.phone,
          "name": this.name
        },
        size: this.pageSize
      }
      this.loading = true;
      enterprisePage(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    //跳转
    editBtn (t, row) {
      switch (t) {
        case 1: //新增
          this.$refs['refEdit'].show(t, row)
          break

        case 2://导入
          this.$refs['refImport'].show(t, row)
          break

        case 3://导出
          let params = {
            model: {
              "adminName": this.phone,
              "name": this.name
            }
          }
          getEnterpriseExport(params);
          break

        case 4://搜索
          this.pageNum = 1;
          this.pageChange()
          break

        case 5:
          this.pageNum = 1;
          this.returnTime='';
          this.name='';
          this.phone='';
          this.pageChange()
          break

        case 6: //编辑
          this.$refs['refEdit'].show(t, row)
          break

        case 7://删除
          this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let param = {
              ids:[row.id]
            }
            this.loading = true;
            updateEnterprise(param).then(response => {
              this.$message(this.successTip())
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          }).catch(() => {

          })
          break
      }
    },
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      this.selfType = db.get('USER').djOrg.type;
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfCode=res.data.orgCode;
        // this.orgName=res.data.orgName;
        this.pageChange()
      })
    },
  },
  filters :{
    processingDate(val){
      let date=val.split(" ")[0]
      return date
    }
  }
}
</script>

<style scoped>
  .page-search-box >>> .el-input__inner{
    width: 280px;
  }
  .return >>> .base-label-box .base-label-box__label{
    width: auto;
  }
  .fl >>> .page-btn{
    float: left;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>

<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="组织名称">
        <el-input placeholder="请输入组织名称" v-model="name" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="返还年份">
        <el-date-picker
          v-model="returnTime"
          type="year"
          placeholder="请选择"
          :editable="false"
          clearable
          :picker-options="pickerOptions"
          @change="pageChange()"
          value-format="yyyy">
        </el-date-picker>
      </base-label-box>
    </div>

    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" v-if="selfCode == '1001'" @click="editBtn(1)"/>
        <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
        <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
      </div>
    </div>

      <!-- 表格 -->
      <div class="mr-20 ml-20" v-cloak>
        <el-table
          v-loading="loading"
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="returnTable"
          :row-key="bindRowKeys"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="实缴金额" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'practicalMoney')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="返还金额" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'returnMoney')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返还年份" width="180px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'returnTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返还日期" width="180px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime') | processingDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(6,row)" :class="selfCode=='1001'?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="delete" @click="editBtn(7,row)" :class="selfCode=='1001'?'':'color-grad'">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" v-show="!loading"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <!-- 新增/编辑 -->
      <return-add ref="refEdit" @refresh="pageChange" />
      <!-- 导入 -->
      <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" title="导入党费返还信息" :otherData='{}' :templateName="templateName" :action="action" :templateUrl='templateUrl'/>
  </div>
</template>

<script>
import {getReturnExport,getReturnList,deleteReturnList} from "@/api/backstage/party/dues/return/return.js"
import ReturnAdd from './return-add'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "index",
  components: {
    ReturnAdd
  },
  data() {
    return {
      value:"",
      options: [],
      returnTime:'',//返还年份
      loading:true,//加载
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orgName:"",
      selfCode:"",//登录人党组织编码
      name:"",
      ids:[],
      multipleSelection:[],
      tableData:[],//党费返还表格数据
      title:"",
      action:`${process.env.VUE_APP_BASE_API}/partycloud/memberDuesBack/importMemberDuesBack`,//导入地址
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dffh.xls`,//党费公示附件模板
      templateName:"党费返还导入模板.xls",
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
    //多选框
    bindRowKeys(row){
      return row.id;
    },
    //多选框-改变选中状态
    handleSelectionChange(val) {
      this.ids=[];
      this.multipleSelection = val;
      if(this.multipleSelection!='' && this.multipleSelection!=undefined && this.multipleSelection!=null && this.multipleSelection!='null' && this.multipleSelection.length>0){
        for(var i=0;i<this.multipleSelection.length;i++){
          this.ids.push(this.multipleSelection[i].id)
        }
      }
    },
    //分页
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          orgName: this.name,
          returnTime: this.returnTime
        },
        size: this.pageSize
      }
      this.loading = true;
      getReturnList(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
        this.loading = false;
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
              orgName: this.name,
              returnTime: this.returnTime
            }
          }
          getReturnExport(params);
          break

        case 4://搜索
          this.pageChange()
          break

        case 5:
          this.returnTime='';
          this.name=''
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
              id:row.id
            }
            this.loading = true;
            deleteReturnList(param).then(response => {
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
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfCode=res.data.orgCode;
        this.orgName=response.data.orgName;
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
</style>

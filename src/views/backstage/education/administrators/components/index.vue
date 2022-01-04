<template>
  <div class="administrators">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="站点管理员姓名">
        <el-input placeholder="请输入站点管理员姓名" v-model="name" clearable @keyup.enter.native="pageChange()" maxlength="100"/>
      </base-label-box>
      <base-label-box label="联系方式">
        <el-input placeholder="请输入联系方式" v-model="phone" clearable @keyup.enter.native="pageChange()" maxlength="100"/>
      </base-label-box>
      <base-label-box label="身份证号码">
        <el-input placeholder="请输入身份证号码" v-model="idCode" clearable @keyup.enter.native="pageChange()" maxlength="100"/>
      </base-label-box>
    </div>

    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
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
        :data="tableData"
      >
        <el-table-column label="序号" width="50px" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="站点管理员姓名" min-width="240px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'manager')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="联系方式" min-width="240px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="身份证号码" min-width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'idCode')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="学历" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'educationName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="任职日期" min-width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'appointmentDate')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a type="edit" @click="editBtn(6,row)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(7,row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <!-- 新增/编辑 -->
    <administrators-add ref="refEdit" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" title="导入站点管理员信息" :otherData='{}' :action="action" :templateUrl='templateUrl' :templateName='templateName'/>
  </div>
</template>

<script>
import {findPage,deleteAdministrators,getHistoryExport} from "@/api/backstage/education/administrators/administrators.js"
import AdministratorsAdd from './administrators-add'
export default {
  name: "index",
  components: {
    AdministratorsAdd
  },
  data() {
    return {
      loading:false,//加载
      pageNum: 1,
      pageSize: 10,
      total: 0,
      phone:"",//联系方式
      idCode:"",//身份证号
      name:"",
      tableData:[
        {
          "appointmentDate": "",//	任职日期
          "appointmentEnd": "",//任职结束日期
          "appointmentStart": "",//任职开始日期
          "createOrg": 0,//	创建组织id
          "education": 0,//学历(数据字典id)
          "educationName": "",//学历(字符串类型)
          "id": 0,//	站点管理员id
          "idCode": "",//	身份证号码
          "manager": "",//	管理员名称
          "phone": ""//	联系方式
        }
      ],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/siteManager/importExcel`,//导入接口
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/zdgly.xlsx`,//站点管理员附件模板
      templateName:"站点管理员管理导入模板.xlsx"
    }
  },
  mounted() {
    this.pageChange()
  },
  methods: {
    //分页
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          idCode: this.idCode,
          phone: this.phone,
          manager: this.name
        },
        size: this.pageSize
      }
      this.loading = true;
      findPage(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    // 按钮点击事件
    editBtn(t,row){
      switch(t){
        case 1:
          this.$refs['refEdit'].show(1)
          break;
        case 2://导入
          this.$refs['refImport'].show(t, row)
          break
        case 3:
          this.exportExc();
          break
        case 4:
          this.pageNum = 1;
          this.pageChange();
          break;
        case 5:
          this.idCode=""
          this.name=""
          this.phone=""
          this.pageNum = 1;
          this.pageChange();
          break;
        case 6:
          this.$refs['refEdit'].show(t,row)
          break;
        case 7:
          this.$confirm('是否删除该条信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let params = {
              id:row.id
            }
            deleteAdministrators(params).then(response => {
              this.$message(this.successTip())
              this.pageChange();
            }).finally(() => {

            });
          }).catch(() => {

          })
          break;
      }
    },
    // 导出
    exportExc(){
      let params = {
        idCode: this.idCode,
        name: this.name,
        phone: this.phone
      }
      getHistoryExport(params);
    },
  }
}
</script>

<style scoped>
  .administrators{
    height: 100%;
  }
  .page-search-box >>> .el-input__inner{
    width: 280px;
  }
  .administrators >>> .base-label-box__label{
    width: auto;
  }
</style>

<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="社会组织名称">
        <el-input placeholder="请输入社会组织名称" v-model="name" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
    </div>

    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)" v-show="selfType != '1249241881183780864' || selfCode == '1001'"/>
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
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="社会组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="关联党组织" min-width="200px"  align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党员数" width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'memberNum')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增时间" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime') | processingDate}}</span>
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
      <sociology-add ref="refEdit" @refresh="pageChange" />
  </div>
</template>

<script>
import {sociologyPage,sociologyDelete,getSociologyExport} from "@/api/backstage/consulting/enterprise/sociology/sociology.js"
import SociologyAdd from './sociology-add'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "index",
  components: {
    SociologyAdd
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
      name:"",
      phone:"",
      ids:[],
      multipleSelection:[],
      tableData:[
        {
          "adminName": "",//	管理员姓名
          "createTime": "",//	新增时间
          "id": 0,//	主键
          "memberNum": 0,//	党员人数
          "name": "",//	名称
          "nature": 0,//性质
          "orgId": {//	组织
            "data": "",
            "key": 0
          },
          "phone": ""//	联系电话
        }
      ],//企业管理格数据
      title:"",
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      },
      selfType:''
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
          "nature":2,
          "adminName": this.phone,
          "name": this.name
        },
        size: this.pageSize
      }
      this.loading = true;
      sociologyPage(params).then(response => {
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
              "adminName": this.phone,
              "name": this.name
            }
          }
          getSociologyExport(params);
          break

        case 4://搜索
          this.pageNum = 1;
          this.pageChange()
          break

        case 5:
          this.pageNum = 1;
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
              ids:[row.id]
            }
            this.loading = true;
            sociologyDelete(param).then(response => {
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
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>

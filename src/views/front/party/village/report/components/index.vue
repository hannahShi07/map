<template>
  <div class="report" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable placeholder="请输入或选择" v-model='orgCode' value-key="id" style="width: 360px" clearable @change="selectChange" >
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </base-label-box>
      </div>
    </div>
    <div class="teble-line"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" :header-cell-style="{'text-align':'center'}"  header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="组织名称" min-width="400px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属党员总数" min-width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'total')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="居住在蜀山区内党员数" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'inShushan')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="已报到党员数" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'report')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="进小区报到党员数" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'xiaoqu')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="在社区报到党员数" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'shequ')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
  </div>
</template>

<script>
import {getReport} from "@/api/front/party/village/report/report.js"
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
export default {
  name: "index",
  components: {},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:10,
      orgCode:'',
      orgName:'',
      list:[],
      queryMonth:"",
      tableData:[],
      loading:false,
    }
  },
  mounted(){
    this.getOrg();
  },
  activated() {

  },
  methods: {
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.orgName=res.data.orgName;
        this.orgCode=res.data.orgCode;
        // this.getStatistics();
        this.getList ();

      })
    },
    //选择党组织
    getOrg(){
      let params={

      }
      commonReq.getOrglist(params).then(response => {
        const res = response;
        if(res && res.length <= 0){
          this.list = []
          this.orgCode = ""
        }else{
          this.list=res;
          this.getUser();
        }
      })
    },
    //选择党组织
    selectChange(value){
      if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
        for(var i=0;i<this.list.length;i++){
          if(value==this.list[i].code){
            this.orgName=this.list[i].name;
          }
        }
        // this.getPartyStatistics();
        this.getList();
      }
    },
    getList(){
      this.loading=true;
      let params={
        current:this.pageNum,
        model:{
          orgCode:this.orgCode
        },
        size:this.pageSize
      }
      getReport(params).then(response => {
        this.total = response.total;
        this.tableData = response.records;
        this.loading=false;
      }).finally(() => {
        this.loading=false;
      });
    },
    pageChange(){
      this.getList();
    },
  }
}
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr th{
    box-sizing:boder-box
  }
  .base-table /deep/ tr td{
    box-sizing:boder-box;
    color:#7D7D7D;
    font-weight: 400;
  }
  .base-table /deep/ .cell.el-tooltip{
    width:auto!important;
  }
  .teble-line{
    width:100%;
    height:10px;
    background:#eee;
  }
  .report{
    min-width: 1318px;
    position: relative;
  }
  .report >>> .el-tooltip{
    width: 100% !important;
  }
  .report >>> .base-table tr td:nth-of-type(2n){
    font-weight: 400;
  }
</style>

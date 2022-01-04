<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px" clearable >
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
    <div class="line"></div>
    <div class="list-content">
      <ul class='list-contentul'>
        <li class="list-left">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-img6.png">
          </div>
          <div class="ul-center">
            <span class="title">流入党员</span>
            <span class="num">{{lrNumber}}<i v-if="lrNumber!=0">人</i></span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/icon-img9.png">
          </div>
        </li>
        <li class="list-right">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-img7.png">
          </div>
          <div class="ul-center">
            <span class="title">流出党员</span>
            <span class="num">{{lcNumber}}<i v-if="lcNumber!=0">人</i></span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/icon-img8.png">
          </div>
        </li>
      </ul>
    </div>
    <div class="line"></div>

    <!--<div class="mr-20 ml-20 pd-20">-->
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="rowClick" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="姓名" width="320px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属组织" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="流动日期" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'flowDate')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="流动类型" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

    <!--新增流出详情-->
    <floatout-detail ref="refOutdetail" @refresh="pageChange"/>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import FloatoutDetail from './floatout-detail'//流出详情
  import {getFloatstatistics,getFloatpage} from "@/api/front/party/basic/float/float.js"

  export default {
    components: {
      FloatoutDetail
    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgCode:'',//组织编码
        lrNumber:'',//流入人数
        lcNumber:'',//流出人数
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据

      }
    },
    mounted(){
      // this.getUser();
      this.getOrg();

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
          this.getStatistics();
          this.pageChange ();

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
      //流动党员统计
      getStatistics(){
        let params = {
          orgCode:this.orgCode,
        }
        getFloatstatistics(params).then(response => {
          const res = response;
          this.lrNumber=res.lrCnt;
          this.lcNumber=res.lcCnt;

        })
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "orgCode": this.orgCode,
          },
        }
        this.loading = true;
        getFloatpage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      //选择党组织
      selectChange(value){
        if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
          for(var i=0;i<this.list.length;i++){
            if(value==this.list[i].code){
              this.orgName=this.list[i].name;
            }
          }
          this.getStatistics();
          this.pageChange ();
        }
      },
      //点击行获取该行数据
      rowClick(row){
        console.log('row: '+JSON.stringify(row))
        if(row.type.data=='流入'){
          this.$emit('handleSwitch', {name: 'FloatinDetail', params: row})
        }else if(row.type.data=='流出'){
          this.$refs['refOutdetail'].show(row)

        }

      }

    }
  }
</script>

<style lang="scss" scoped>
.base-table /deep/ tr th{
  box-sizing:border-box;
}
.base-table /deep/ tr td{
  box-sizing:border-box;
  color:#7D7D7D;
  font-weight: 400;
}
.base-table /deep/ tr td:hover{
  cursor: pointer;
}

.base-table /deep/ .cell.el-tooltip{
  width:auto!important;
}

.logotxt{
  display:flex;
  align-items:center;
  line-height:36px;
  font-size: 16px;
  color: #7D7D7D;
}
.logotxt img{
  width:21px;
  height:17px;
  margin-right:8px;
}

.list-contentul{
  background:#eee;
  width:100%;
  list-style: none;    /*清除列表默认样式*/
  padding: 0;      /*清除padding*/
  margin: 0;
  display:flex;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items:center;
}
.list-contentul li{
  height: 122px;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  margin-right:20px;
  /*margin-bottom:12px;*/
  background:#fff;
  border-radius:14px;
}
.list-left{
  width:49%;
}
.list-right{
  width:calc(100% - 49% - 20px);
}
.list-contentul li:last-of-type{
  margin-right:0;
}
.ul-left{
  height:122px;
  border-top-left-radius:14px;
  border-bottom-left-radius:14px;
}
.ul-left img{
  width:122px;
  height:122px;
}
.ul-right{
  height:122px;
  border-top-right-radius:14px;
  border-bottom-right-radius:14px;
}
.ul-right img{
  width:144px;
  height:122px;
}
.ul-center{
  width:calc(100% - 266px);
  height:122px;
  padding:25px 25px;
  text-align:left;
  display:flex;
  flex-flow:wrap;
  align-items:center;
}
.num{
  display:block;
  width:100%;
  font-size: 26px;
  font-weight: bold;
  color: #FF5044;
}
.num i{
  font-style: normal;
}
.title{
  display:block;
  width:100%;
  font-size: 16px;
  font-weight: 400;
  color: #646464;
}

</style>

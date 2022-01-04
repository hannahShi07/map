<template>
  <div class="use" v-cloak>
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
        <!-- 选择年份 -->
        <div class="year">
          <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear"></i>
          <el-date-picker
            v-model="year"
            :editable="false"
            type="year"
            format="yyyy"
            value-format="yyyy"
            @change="pageChange()"
            :picker-options="pickerOptions"
            :clearable="false">
          </el-date-picker>
          <div class="year-text">年</div>
          <i class="iconfont icon-xingzhuang1357 gt" @click="addYear"></i>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="list-content">
      <ul class='list-contentul'>
        <li class="list-left">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-img10.png">
          </div>
          <div class="ul-center">
            <span class="title">可使用金额与本年度党费使用占比</span>
            <span class="num">{{divide | statistics}}</i></span>
          </div>
        </li>
        <li class="list-middle">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-img16.png">
          </div>
          <div class="ul-center">
            <span class="title">本年度使用</span>
            <span class="num">{{totalAmount | statistics}}</i></span>
          </div>
        </li>
        <li class="list-right">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-img17.png">
          </div>
          <div class="ul-center">
            <span class="title">本年度结余</span>
            <span class="num">{{balance | statistics}}</i></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="line"></div>

    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="useInfo" header-row-class-name="page-table-header" v-loading="loading" :header-cell-style="{'text-align':'center'}" >
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="党组织名称" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="可使用金额" width="180px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'available')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="本年度使用金额" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'totalAmount')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="本年度结余金额" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'balance')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <use-info ref="refInit"></use-info>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getUseList,getUse} from "@/api/front/party/dues/use/use.js"
  import UseInfo from './use-info'

  export default {
    components: {
      UseInfo
    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgCode:'',//组织编码
        orgId:'',//组织ID
        lrNumber:'',//流入人数
        lcNumber:'',//流出人数
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        divide:0,//可使用金额与本年度党费使用占比
        totalAmount:0,//本年度使用
        balance:0,//本年度结余
        year:"",
        tableData: [],//列表数据
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
    mounted(){
      this.year=new Date().getFullYear()-1+"";
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
          this.orgId=res.data.orgId;
          // this.getStatistics();
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
        let date = this.year+"-01-01";
        let params = {
          orgCode:this.orgCode,
          useDate:date
        }
        getUse(params).then(response => {
          const res = response;
          this.divide=response.divide
          this.totalAmount=response.totalAmount
          this.balance=response.balance

        })
      },
      // 调用数据接口
      pageChange () {
        this.getStatistics();
        let date = this.year+"-01-01";
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "orgCode": this.orgCode,
            "useDate":date
          },
          "sort": ""
        }
        this.loading = true;
        getUseList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
          this.loading = false;
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
              this.orgCode=this.list[i].code;
              this.orgId=this.list[i].id;
            }
          }
          this.pageChange ();
        }
      },
      addYear(){
        this.year = parseInt(this.year)+1+"";
        this.pageChange();
      },
      reduceYear(){
        this.year = parseInt(this.year)-1+"";
        this.pageChange();
      },
      // 使用详情页
      useInfo(row){
        this.$refs['refInit'].show(row.orgId.data,row.orgId.key,this.year)
      }

    },
    filters:{
      statistics(val){
        val=val+"";
        let company=val.replace(/[\d|\.\-]/g, "")
        if(parseInt(val).toFixed(2) == val){
          if(parseInt(val).toFixed(2) <= 0){
            return 0+company;
          }else{
            return val;
          }
        }else{
          if(parseInt(val).toFixed(2) <= 0){
            let leng=(parseInt(val).toFixed(2)+"").length;
            return 0+company;
          }else{
            return val;
          }
        }
      }
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
.base-table /deep/ tr td:hover{
  cursor: pointer;
}
.base-table /deep/ .cell.el-tooltip{
  width:auto!important;
}
/*.logo-top{*/
  /*padding:14px 20px;*/
  /*padding-bottom:0;*/
/*}*/
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
.use{
  min-width: 1318px;
  position: relative;
}
.line{
  width:100%;
  height:20px;
  background:#eee;
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
  border-radius: 16px;
}
.list-left{
  width:calc((100% - 40px) / 3);
}
.list-middle{
  width:calc((100% - 40px) / 3);
}
.list-right{
  width:calc((100% - 40px) / 3);
}
.list-contentul li:last-of-type{
  margin-right:0;
}
.ul-left{
  height: 122px;
}
.ul-left img{
  width:122px;
  height:122px;
}
.list-left .ul-center{
  background: url('../../../../../../assets/page/icon-img12.png') no-repeat;
  background-position: right;
  background-size: 144px 122px;
}
.list-middle .ul-center{
  background: url('../../../../../../assets/page/icon-img14.png') no-repeat;
  background-position: right;
  background-size: 144px 122px;
}
.list-right .ul-center{
  background: url('../../../../../../assets/page/icon-img15.png') no-repeat;
  background-position: right;
  background-size: 144px 122px;
}
.ul-right img{
  width:144px;
  height:122px;
}
.ul-center{
  width: 100%;
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
.year{
  width: 100px;
  float: right;
  background-color: #fff;
}
.lt,.gt{
  height: 36px;
  width: 15px;
  padding:10px 0;
  display: inline-block;
  cursor: pointer;
  float: left;
}
.year >>> .el-input__inner{
  border:none;
  outline: none;
  padding:0;
  cursor:pointer;
  width: 38px;
  display: inline-block;
  font-size: 16px;
}
.year >>> .el-icon-date::before{
  content: "";
}
.year >>> .el-date-editor--year{
  width: 38px;
  float: left;
  margin-left:7px;
}
.year-text{
  font-size: 16px;
  height: 36px;
  line-height: 36px;
  width: 16px;
  float: left;
  margin-right: 7px;
  cursor: pointer;
}
</style>

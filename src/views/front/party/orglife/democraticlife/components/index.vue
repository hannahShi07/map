<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr rightbox">
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
        <div class="year">
          <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear"></i>
          <el-date-picker
            v-model="year"
            :editable="false"
            type="year"
            format="yyyy"
            value-format="yyyy"
            @change="selectYear"
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
            <img src="../../../../../../assets/page/icon-imgf1.png">
          </div>
          <div class="ul-center">
            <span class="title">参与人数</span>
            <span class="num">{{num}}<i v-if="num!=0">人</i></span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/icon-imgf2.png">
          </div>
        </li>
        <li class="list-left">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-imgf3.png">
          </div>
          <div class="ul-center">
            <span class="title">开展次数</span>
            <span class="num">{{count}}<i v-if="count!=0">次</i></span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/icon-imgf4.png">
          </div>
        </li>
        <li class="list-right">
          <div class="ul-left">
            <img src="../../../../../../assets/page/icon-imgf6.png">
            <el-progress type="circle" :percentage="Number(finishRate)" :stroke-width="10" :color="colors"></el-progress>

          </div>
          <div class="ul-center">
            <span class="title">完成率</span>
            <span class="num">{{finishRate==0.00? 0:finishRate}}<i v-if="finishRate!=0">%</i></span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/icon-imgf5.png">
          </div>
        </li>
      </ul>
    </div>
    <div class="line"></div>

    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="组织名称" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="会议开始时间" min-width="180px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'beginTime')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="地点" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'place')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会议名称" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'meetingName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="主持人" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'compere')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会议人数" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'num')}}</span>
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
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getMeetingList,getMeetingTable} from "@/api/front/party/orglife/democraticlife/democraticlife.js"

  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    components: {

    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgCode:'',//组织编码
        count:'',//开展次数
        finishRate:'',//完成率
        num:'',//参会人数
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
        year:(new Date().getFullYear()-1).toString(),//选择年份
        lifeType:'1294086001332846592',//会议类型
        colors:[
          {color: '#FFE0C4', percentage: 0},
          {color: '#FFFFFF', percentage: this.finishRate},

        ]

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
          this.orgId=res.data.orgId;
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
      //统计
      getStatistics(){
        let params = {
          orgCode:this.orgCode,
          year:this.year
        }
        getMeetingTable(params).then(response => {
          const res = response;
          this.count=res.count;
          this.num=res.num;
          this.finishRate=res.finishRate;

        })
      },
      // 调用数据接口
      pageChange () {
        let params = {
          current: this.pageNum,
          model: {
            orgCode:this.orgCode,//党组织编码
            // orgName:this.orgName,//党组织名称
            // orgId:this.orgId,//组织id
            meetingType:this.lifeType,//会议类型
            year:this.year//年份
          },
          size: this.pageSize
        }
        this.loading = true;
        getMeetingList(params).then(response => {
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
      //选择年份
      selectYear(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          this.getStatistics();
          this.pageChange ();
        }
      },
      addYear(){
        this.year = parseInt(this.year)+1+"";
        this.getStatistics();
        this.pageChange ();
      },
      reduceYear(){
        this.year = parseInt(this.year)-1+"";
        this.getStatistics();
        this.pageChange ();
      },
      //点击行获取该行数据
      // rowClick(row){
      //   this.$emit('handleSwitch', {name: 'HistoryDetail', params: row})
      // }


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
    /*cursor: pointer;*/
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
  .rightbox{
    display:flex;
    justify-content: flex-start;
    align-items:flex-start;
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
    border-radius:14px;
  }
  .list-left{
    width:32%;
  }
  .list-right{
    width:calc(100% - 64% - 40px);
  }
  .list-contentul li:last-of-type{
    margin-right:0;
  }
  .ul-left{
    height:122px;
    position:relative;
    border-top-left-radius:14px;
    border-bottom-left-radius:14px;
  }
  .ul-left img{
    width:122px;
    height:122px;
  }
  .ul-left /deep/ .el-progress--circle{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    padding:25px 25px;
  }
  .ul-left /deep/ .el-progress-circle{
    width:76px!important;
    height:76px!important;
  }
  .ul-left /deep/ .el-progress--circle .el-progress__text{
    color:#fff;
    font-size:14px;
  }
  .ul-right{
    height:122px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
  }
  .ul-right img{
    width:144px;
    height:122px;
  }
  .ul-center{
    width:calc(100% - 266px);
    height:122px;
    padding:25px 25px;
    padding-right:0;
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

  /*选择时间*/
  .year{
    display:flex;
    justify-content:flex-end;
    align-items:center;
    margin-top:0;
  }
  .lt,.gt{
    height: 36px;
    width: 14px;
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
    font-size: 14px;
    color:#666;
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
    font-size: 14px;
    color:#666;
    height: 36px;
    line-height: 36px;
    width: 14px;
    float: left;
    margin-right: 7px;
  }
</style>

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
    <!--图表-->
    <div class="echarts-content">
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
      <div class="echarts">
        <div id="addPartynumber" style="width:100%;height:400px;"/>
      </div>
    </div>
    <div class="line"></div>

    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="组织名称" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会议开始时间" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'beginTime')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="地点" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'place')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会议名称" min-width="200px"  align="left" show-overflow-tooltip>
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
  import {getMeetingList,getMeetingTable} from "@/api/front/party/orglife/partyday/partyday.js"
  import commonReq  from "@/api/public/commonReq.js"
  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    // mixins: [resize],
    components: {

    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码
        yearList:[],//年份数组
        monthlist:[],//月份
        finishRatelist:[],//完成率
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
        year:(new Date().getFullYear()-1).toString(),//选择年份
        lifeType:'1294086064859774976',//会议类型
      }
    },
    mounted(){
      // this.getUser();
      this.getOrg();
      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("addPartynumber")).resize();
        // this.$echarts.init(document.getElementById("partyNumber")).resize();
      };
      window.addEventListener("resize", this.resizefun);
    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("addPartynumber")).resize();
      };
      window.addEventListener("resize", this.resizefun);
    },
    //移除事件监听，避免内存泄漏
    deactivated() {
      window.removeEventListener("resize", this.resizefun);
      this.resizefun = null;
    },
    //移除事件监听，避免内存泄漏
    beforeDestroy() {
      window.removeEventListener("resize", this.resizefun);
      this.resizefun = null;
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
      //数据统计
      getStatistics(){
        this.yearList=[];
        this.monthlist=[];
        this.finishRatelist=[];
        let params = {
          orgCode: this.orgCode,
          year:this.year

        }

        getMeetingTable(params).then(response => {
          const res = response;
          for(let i=0;i<res.length;i++){
            this.monthlist.push(res[i].month+'月')//月份
            this.finishRatelist.push(res[i].finishRate)//完成率

          }
          this.getEchart();//新增党员人数图表
          // this.getPartyEchart();//正式、预备党员人数

        }).finally(() => {

        });

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
      //   this.$emit('handleSwitch', {name: 'ManageDetail', params: row})
      // },
      //新增单元人数图表
      getEchart(){
        var chart1 = echarts.init(document.getElementById('addPartynumber'))
        var option = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}: {c}%'
          },
          // legend: {
          //   data: ['新增党员数'],
          //   x:'center',
          //   y:'top',
          // },
          color: ["#FA874E"],
          grid: {
            top:'7%',
            left: '0%',
            right: '1%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            name: '',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'right',//位置靠左
            nameGap: 0, //与x轴距离
            type: 'category',
            boundaryGap: false,
            data: this.monthlist
          },
          yAxis: {
            name: '完成率',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',//位置靠左
            nameGap: 15, //与x轴距离
            //minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            },
            splitLine :{    //网格线
              lineStyle:{
                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:true //隐藏或显示
            },
            max: function(value) {
              return 100;
            },
            min: function(value) {
              return 0;
            }

          },
          series: [{
            name: '',
            data: this.finishRatelist,
            type: 'line',
            areaStyle : {
              color:'rgba(252, 143, 33, 0.3)'
            },
          }]
        }
        chart1.setOption(option,true)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr th{
    box-sizing:border-box;
  }
  .base-table /deep/  tr td{
    box-sizing:border-box;
    color:#7D7D7D;
    font-weight: 400;
  }

  .base-table /deep/ tr td:hover{
    /*cursor: pointer;*/
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
  .line{
    width:100%;
    height:20px;
    background:#eee;
  }
  /*图表*/
  .echarts-content{
    width:100%;
    background:#fff;
    padding:0 20px;
    padding-top:20px;
  }
  .echarts{
    background:#fff;
    width:100%;
  }

  .year{
    display:flex;
    justify-content:flex-end;
    align-items:center;
    margin-top:0;
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
  }



</style>

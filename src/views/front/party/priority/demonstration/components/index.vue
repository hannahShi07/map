<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable v-model='orgId' @change="selectChange" placeholder="请输入或选择" style="width: 360px" >
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
    <div class="echarts-content clearfix">
      <div class="echarts-left fl">
        <div id="tissueGrowth" style="width:100%;height:400px;"/>
      </div>
      <div class="echarts-right fr">
        <div id="cultivateOrganizationNumber" style="width:100%;height:400px;"/>
      </div>
    </div>
    <div class="line"></div>

    <!--<div class="mr-20 ml-20 pd-20">-->
    <div class="pd-20">
      <!-- @row-click="rowClick"-->
      <el-table class="base-table" border :data="tableData"   header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}"
                v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="组织名称" min-width="120px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="书记" width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'secretaryName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="党员人数" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'memberCnt')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="组织类型" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'category')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖励类型" min-width="120px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'rewardType.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="批准日期" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'rewardTime')}}</span>
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
    import {getDemonstrationList,getDemonstrationMap} from "@/api/front/party/priority/demonstration/demonstration.js"
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
                yearList:[],//年份数组
                awardedYearSum:[],//组织数组
                awardedNumber:[],//组织增量数组
                pageNum: 1,//当前页
                pageSize: 10,//每页大小
                total: 0,//总条数
                tableData: [],//列表数据
            }
        },
        mounted(){
            // this.getUser();
            this.getOrg();
            //图表自适应
            this.resizefun = () => {
                this.$echarts.init(document.getElementById("cultivateOrganizationNumber")).resize();
                this.$echarts.init(document.getElementById("tissueGrowth")).resize();
            };
            window.addEventListener("resize", this.resizefun);
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
                    //console.log('用户信息： '+JSON.stringify(response))
                    const res = response;
                    this.orgName=res.data.orgName;
                    // this.orgId=res.data.orgId;
                    this.orgCode=res.data.orgCode;
                    this.orgId = res.data.orgCode;
                    this.getStatistics();
                    this.pageChange ();

                }).finally(() => {
                    //console.log("finally");
                });
            },
            //选择党组织
            getOrg(){
                let params={

                }
                commonReq.getOrglist(params).then(response => {
                  //console.log('党组织信息： '+JSON.stringify(response))
                  const res = response;
                  if(res && res.length <= 0){
                    this.list = []
                    this.orgCode = ""
                  }else{
                    this.list=res;
                    this.getUser();
                  }

                }).finally(() => {
                    //console.log("finally");
                });
            },
            //数据统计
            getStatistics(){
                this.yearList=[];
                this.awardedYearSum=[];
                this.awardedNumber=[];
                let params = {
                    orgCode:this.orgId,
                    type:{key:'2279477819906842952'}
                }
                getDemonstrationMap(params).then(response => {
                    const res = response;
                    for(var i=1;i<res.length;i++){
                        this.yearList.push(res[i].year)//年份数组
                        this.awardedYearSum.push(res[i].awardedYearSum)
                        this.awardedNumber.push(res[i].awardedNumber)
                    }
                    this.getEchart();//示范组织增量图表
                    this.getTissueyEchart();//获奖组织数图表

                }).finally(() => {

                });

            },
            // 调用数据接口
            pageChange () {
                let params = {
                    "current":this.pageNum,
                    "size": this.pageSize,
                    "model": {
                        orgCode:this.orgId,
                        type:{key:'2279477819906842952'}
                    },
                }
                this.loading = true;
                getDemonstrationList(params).then(response => {
                    //console.log('列表： '+JSON.stringify(response))
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
                this.$emit('handleSwitch', {name: 'CultivateDetail', params: row})
            },
            //培育组织增量图表
            getEchart(){
                var chart1 = echarts.init(document.getElementById('cultivateOrganizationNumber'))
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['示范组织增量'],
                        x:'center',
                        y:'top',
                    },
                    color: ["#FCBA21"],
                    grid: {
                        left: '5%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.yearList
                    },
                    yAxis: {
                        name: '示范组织增量',
                        nameTextStyle: {
                            fontSize: 12
                        },
                        position: 'left',//位置靠左
                        nameGap: 35, //与y轴距离
                        type: 'value',
                        minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
                        splitLine :{    //网格线
                            lineStyle:{
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:true //隐藏或显示
                        }

                    },
                    series: [{
                        name: '示范组织增量',
                        data: this.awardedNumber,
                        type: 'line',
                        areaStyle : {
                            color:'rgba(252, 143, 33, 0.3)'
                        },
                    }]
                }
                chart1.setOption(option,true)
            },
            //获奖组织数图表
            getTissueyEchart(){
                var chart2 = echarts.init(document.getElementById('tissueGrowth'))
                var option2 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['获奖组织数'],
                        x:'center',
                        y:'top',
                    },
                    color: ["#FAC14E"],
                    grid: {
                        left: '4%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        // boundaryGap: false,
                        data: this.yearList
                    },
                    yAxis: {
                        name: '获奖组织数',
                        nameTextStyle: {
                            fontSize: 12
                        },
                        position: 'left',//位置靠左
                        nameGap: 35, //与y轴距离
                        type: 'value',
                        minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
                        splitLine :{    //网格线
                            lineStyle:{
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:true //隐藏或显示
                        }

                    },
                    series: [
                        {
                            name: '获奖组织数',
                            data: this.awardedYearSum,
                            type: 'bar',
                            barWidth : 30,//柱图宽度
                            stack: 'product',//堆叠
                        },
                    ]
                }
                chart2.setOption(option2,true)
            }
        }
    }
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr th{
    box-sizing:boder-box
  }
  .base-table /deep/  tr td{
    box-sizing:boder-box;
    color:#7D7D7D;
    font-weight: 400;
  }
  .base-table /deep/ tr td:nth-of-type(3){
    text-align:left;
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
    background:#eee;
  }
  .echarts-left{
    background:#fff;
    width:49%;
    /*margin-right:2%;*/
    margin-right:20px;
    /*margin-bottom:10px;*/
    // min-width:580px;
    // overflow-x:auto;
    padding-top:25px;
    // padding:12px 12px;
  }
  .echarts-right{
    background:#fff;
    width:calc(100% - 49% - 20px);
    // min-width:580px;
    // overflow-x:auto;
    padding-top:25px;
    // padding:12px 12px;
  }
</style>

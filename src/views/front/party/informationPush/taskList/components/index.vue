<!--任务清单-->
<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px"  >
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.id"
            />

          </el-select>
        </base-label-box>
      </div>
    </div>
    <div class="line"></div>
    <!--图表-->
    <div class="echarts-content clearfix">
      <div class="echarts-left fl">
        <div id="addPartynumber" style="width:100%;height:400px;"/>
      </div>
      <div class="echarts-right fl">
        <div id="partyNumber" style="width:100%;height:400px;"/>
      </div>
    </div>
    <div class="line"></div>
    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane :label="'接收任务清单'+  + num.TPCnt" name="first">
        <div class="pd-20">
          <el-table class="base-table" border :data="tableData"   header-row-class-name="page-table-header" v-loading="loading">
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column label="下发组织" min-width="200px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'issueOrgName')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="任务名称" min-width="200px"  align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'taskName')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="需完成时间" width="300px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'taskBeginTime')}}~{{isEmpty(tableData[scope.$index],'taskEndTime')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="完成情况" width="160px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'taskState.data')}}</span>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="taskTotal" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="'未完成任务'+  + num.undoneTPCnt" name="second">
        <div class="pd-20">
          <el-table class="base-table" border :data="noFinishTableData"  header-row-class-name="page-table-header" v-loading="loading">
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column label="下发组织" min-width="200px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(noFinishTableData[scope.$index],'issueOrgName')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="任务名称" min-width="200px"  align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(noFinishTableData[scope.$index],'taskName')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="需完成时间" width="300px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'taskBeginTime')}}~{{isEmpty(tableData[scope.$index],'taskEndTime')}}</span>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="noTotal" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="下发的任务" name="third">
        <div class="pd-20">
          <el-table class="base-table" border :data="taskTableData"  header-row-class-name="page-table-header" v-loading="loading">
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column label="接收组织" min-width="200px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(taskTableData[scope.$index],'orgList')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="任务名称" min-width="120px"  align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(taskTableData[scope.$index],'taskName')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="需完成时间" width="300px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(taskTableData[scope.$index],'taskBeginTime')}}~{{isEmpty(taskTableData[scope.$index],'taskEndTime')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="总数/完成数" width="160px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(taskTableData[scope.$index],'allOrgCount')}}/{{isEmpty(taskTableData[scope.$index],'finishOrgCount')}}</span>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="taskIssueTotal" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
    import db from '@/utils/localstorage'//  获取用户登录id
    import {getTaslList} from "@/api/front/party/informationPush/taskList/taskList.js"
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
                addPartyperson:[],//任务完成率数组
                formalParty:[],//任务完成数组
                prepParty:[],//任务未完数组
                pageNum: 1,//当前页
                pageSize: 10,//每页大小
                total: 0,//总条数
                taskTotal:0,//接收任务清单数
                noTotal:0, //未完成任务数
                num:{
                    TPCnt:'', //接受任务
                    undoneTPCnt:'', //未完成
                },//列表相应数字
                tableData: [],//接收任务清单列表数据
                noFinishTableData: [],//未完成任务列表数据
                taskTableData: [],//下发任务列表数据
                activeName: 'first',

              // 下发任务总条数
              taskIssueTotal: 0
            }
        },
        mounted(){
            // this.getUser();
            this.getOrg();
            //图表自适应
            // this.resizefun = () => {
            //   this.$echarts.init(document.getElementById("addPartynumber")).resize();
            //   this.$echarts.init(document.getElementById("partyNumber")).resize();
            // };
            // window.addEventListener("resize", this.resizefun);
        },
        activated() {
            this.resizefun = () => {
                this.$echarts.init(document.getElementById("addPartynumber")).resize();
                this.$echarts.init(document.getElementById("partyNumber")).resize();
            };
            window.addEventListener("resize", this.resizefun);
        },
        //移除事件监听，避免内存泄漏
        deactivated() {
            window.removeEventListener("resize", this.resizefun);
            this.resizefun = null;
        },
        //移除事件监听，避免内存泄漏
        // beforeDestroy() {
        //   window.removeEventListener("resize", this.resizefun);
        //   this.resizefun = null;
        // },
        methods: {
            //获取用户信息
            getUser(){
                let params = {
                    userId:db.get('USER').id,
                }
                commonReq.getUserinformation(params).then(response => {
                    const res = response;
                    this.orgName=res.data.orgName;
                    this.orgCode=res.data.orgId;
                    this.getStatistics();
                    this.pageChange ();

                }).finally(() => {
                });
            },
            //tab点击事件
            handleClick(tab, event) {
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
                }).finally(() => {
                });
            },
            //数据统计
            getStatistics(){
                this.yearList=[];
                this.addPartyperson=[];
                this.formalParty=[];
                this.prepParty=[];
                let params = {
                    current:this.pageNum,
                    size: this.pageSize,
                    model: {
                        "orgId":{key:this.orgCode},
                    },
                }
                getTaslList(params).then(response => {
                    const res = response;
                    for(var i=0;i<res.cntList.length;i++){
                        let map = res.cntList
                        this.yearList.push(map[i].year)//年份数组
                        map[i].completionRate =(map[i].completionRate)*100
                        this.addPartyperson.push(map[i].completionRate)//任务完成率数组
                        this.formalParty.push(map[i].completedNum)//任务完成数组
                        this.prepParty.push(map[i].undoneNum)//任务未完数组
                    }
                    this.getEchart();//任务完成率图表
                    this.getPartyEchart();//任务完成数和未完成数图表

                }).finally(() => {

                });

            },
            // 调用数据接口
            pageChange () {
                let params = {
                    current:this.pageNum,
                    size: this.pageSize,
                    model: {
                        "orgId":{key:this.orgCode},
                    },
                }
                this.loading = true;
                getTaslList(params).then(response => {
                    const res = response;
                    this.num = res
                    this.num.TPCnt= res.TPCnt, //接受任务
                    this.num.undoneTPCnt = res.undoneTPCnt, //未完成
                    this.tableData = res.taskPerformList.records;
                    this.taskTotal = res.taskPerformList.total;
                    this.noFinishTableData = res.undoneList.records;
                    this.noTotal = res.undoneList.total;
                    this.taskTableData = res.taskIssueList.records;
                    this.total = res.undoneList.total;
                    this.taskIssueTotal = res.taskIssueList.total
                }).finally(() => {
                    this.loading = false;
                });
            },

            //选择党组织
            selectChange(value){
                if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
                    for(var i=0;i<this.list.length;i++){
                        if(value==this.list[i].id){
                            this.orgName=this.list[i].name;
                        }
                    }
                    this.getStatistics();
                    this.pageChange ();
                }
            },
            //任务完成率图表
            getEchart(){
                var chart1 = echarts.init(document.getElementById('addPartynumber'))
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter:'{b}任务完成率: {c}%'
                    },
                    legend: {
                        data: ['任务完成率'],
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
                        name: '任务完成率',
                        nameTextStyle: {
                            fontSize: 12
                        },
                        position: 'left',//位置靠左
                        nameGap: 35, //与y轴距离
                        minInterval: 100, //设置成1保证坐标轴分割刻度显示成整数
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}%'
                        },
                        splitLine :{    //网格线
                            lineStyle:{
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:true //隐藏或显示
                        }

                    },
                    series: [{
                        name: '任务完成率',
                        data: this.addPartyperson,
                        type: 'line',
                        areaStyle : {
                            color:'rgba(252, 143, 33, 0.3)'
                        },
                    }]
                }
                chart1.setOption(option,true)
            },
            //任务完成数和未完成数图表
            getPartyEchart(){
                var chart2 = echarts.init(document.getElementById('partyNumber'))
                var option2 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['任务完成数','任务未完数'],
                        x:'center',
                        y:'top',
                    },
                    color: ["#FAC14E","#FC8F21"],
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
                        name: '数量',
                        nameTextStyle: {
                            fontSize: 12
                        },
                        position: 'left',//位置靠左
                        nameGap: 35, //与y轴距离
                        minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
                        type: 'value',
                        splitLine :{    //网格线
                            lineStyle:{
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:true //隐藏或显示
                        }

                    },
                    series: [
                        {
                            name: '任务完成数',
                            data: this.formalParty,
                            type: 'bar',
                            barWidth : 30,//柱图宽度
                            stack: 'finish',//堆叠
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                                emphasis: {
                                    barBorderRadius: 30
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[15, 15, 0, 0],
                                }
                            },
                        },
                        {
                            name: '任务未完数',
                            data: this.prepParty,
                            type: 'bar',
                            barWidth : 30,//柱图宽度
                            stack: 'unfinish',//堆叠
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                                emphasis: {
                                    barBorderRadius: 30
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[15, 15, 0, 0],
                                }
                            },
                        }
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
  .base-table /deep/ tr td:nth-of-type(2){
    text-align:left;
  }
  .base-table /deep/ tr td:nth-of-type(3){
    text-align:left;
  }
  .base-table /deep/ tr td:hover{
    /*cursor: pointer;*/
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
  /deep/.el-tabs__item{font-weight: normal !important}
  /deep/.el-tabs__item.is-active {
    font-weight:bold !important;
  }
</style>

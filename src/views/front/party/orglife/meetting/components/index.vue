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
    <div class="echarts-content clearfix">
      <div class="echarts-left fl">
        <div class="titleContent">
          <span>党员大会</span>
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
        <div class="eachartsDiv">
          <div id="addPartynumber" style="width:100%;height:400px;"/>
        </div>

      </div>
      <div class="echarts-right fl">
        <div class="titleContent">
          <span>党课教育</span>
          <div class="year">
            <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear1"></i>
            <el-date-picker
              v-model="year1"
              :editable="false"
              type="year"
              format="yyyy"
              value-format="yyyy"
              @change="selectYear1"
              :clearable="false">
            </el-date-picker>
            <div class="year-text">年</div>
            <i class="iconfont icon-xingzhuang1357 gt" @click="addYear1"></i>
          </div>
        </div>
        <div class="eachartsDiv">
          <div id="partyNumber" style="width:100%;height:400px;"/>
        </div>
      </div>
    </div>
    <div class="line"></div>

    <div class="pd-20">
      <div class="titleContent">
        <span>支部委员会</span>
        <div class="year">
          <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear2"></i>
          <el-date-picker
            v-model="year2"
            :editable="false"
            type="year"
            format="yyyy"
            value-format="yyyy"
            @change="selectYear2"
            :clearable="false">
          </el-date-picker>
          <div class="year-text">年</div>
          <i class="iconfont icon-xingzhuang1357 gt" @click="addYear2"></i>
        </div>
      </div>

      <div class="echarts">
        <div id="partyMeeting" style="width:100%;height:400px;"/>
      </div>

    </div>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import {getMeetingMember,getMeetingLesson,getMeetingCouncil} from "@/api/front/party/orglife/meeting/meeting.js"
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
        monthList:[],//月份数组
        quarterlyList:[],//季度数组
        quarterlyList1:[],//季度数组
        finishRatelist:[],//党员大会完成率
        finishRatelist1:[],//党课完成率
        finishRatelist2:[],//支部党员大会完成率
        year:(new Date().getFullYear()-1).toString(),//选择年份
        year1:(new Date().getFullYear()-1).toString(),//选择年份
        year2:(new Date().getFullYear()-1).toString(),//选择年份
        lifeType:'1249946782658461696',//会议类型
        lifeType1:'1294085454810841088',//会议类型
        lifeType2:'1249946834005131264',//会议类型


      }
    },
    mounted(){
      // this.getUser();
      this.getOrg();

      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("addPartynumber")).resize();
        this.$echarts.init(document.getElementById("partyNumber")).resize();
        this.$echarts.init(document.getElementById("partyMeeting")).resize();
      };
      window.addEventListener("resize", this.resizefun);
    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("addPartynumber")).resize();
        this.$echarts.init(document.getElementById("partyNumber")).resize();
        this.$echarts.init(document.getElementById("partyMeeting")).resize();
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
          this.getStatisticsmember();
          this.getStatisticslesson();
          this.getStatisticscouncil();

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
      //党员大会统计
      getStatisticsmember(){
        this.quarterlyList=[];//季度数组
        this.finishRatelist=[];//党员大会完成率
        let params = {
          orgCode: this.orgCode,
          year:this.year
        }
        getMeetingMember(params).then(response => {
          const res = response;
          for(let i=0;i<res.length;i++){
            this.quarterlyList.push('第'+res[i].quarter+'季度')//季度数组
            this.finishRatelist.push(parseFloat(res[i].finishRate))//新增党员人数数组
          }
          this.getEchart();//党员大会

        }).finally(() => {

        });

      },
      //党课统计
      getStatisticslesson(){
        this.quarterlyList1=[];//季度数组
        this.finishRatelist1=[];//党课完成率
        let params = {
          orgCode: this.orgCode,
          year:this.year1
        }
        getMeetingLesson(params).then(response => {
          const res = response;
          for(let i=0;i<res.length;i++){
            this.quarterlyList1.push(res[i].quarter)//季度数组
            // this.finishRatelist1.push(parseFloat(res[i].finishRate))//新增党员人数数组
            this.finishRatelist1.push({
              name:'第'+res[i].quarter+'季度',
              value:Number(res[i].finishRate)
            })
          }

          this.getPartyEchart();//党课


        }).finally(() => {

        });

      },
      //支部委员会
      getStatisticscouncil(){
        this.monthList=[];//月份数组
        this.finishRatelist2=[];//支部党员大会完成率
        let params = {
          orgCode: this.orgCode,
          year:this.year2
        }
        getMeetingCouncil(params).then(response => {

          const res = response;
          for(var i=0;i<res.length;i++){
            this.monthList.push(res[i].month+'月')//年份数组
            this.finishRatelist2.push(parseFloat(res[i].finishRate))
          }


          this.getPartyMeeting()//支部委员会

        }).finally(() => {

        });

      },
      //选择党组织
      selectChange(value){
        if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
          for(let i=0;i<this.list.length;i++){
            if(value==this.list[i].code){
              this.orgName=this.list[i].name;
              this.orgCode=this.list[i].code;
              this.orgId=this.list[i].id;
            }
          }
          this.getStatisticsmember();
          this.getStatisticslesson();
          this.getStatisticscouncil();
        }
      },
      //选择年份
      selectYear(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          this.getStatisticsmember();
        }
      },
      selectYear1(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          this.getStatisticslesson();
        }
      },
      selectYear2(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          this.getStatisticscouncil();
        }
      },
      addYear(){
        this.year = parseInt(this.year)+1+"";
        this.getStatisticsmember();
      },
      reduceYear(){
        this.year = parseInt(this.year)-1+"";
        this.getStatisticsmember();
      },
      addYear1(){
        this.year1 = parseInt(this.year1)+1+"";
        this.getStatisticslesson();
      },
      reduceYear1(){
        this.year1 = parseInt(this.year1)-1+"";
        this.getStatisticslesson();
      },
      addYear2(){
        this.year2 = parseInt(this.year2)+1+"";
        this.getStatisticscouncil();
      },
      reduceYear2(){
        this.year2 = parseInt(this.year2)-1+"";
        this.getStatisticscouncil();
      },

      //季度党员大会
      getEchart(){
        var chart1 = echarts.init(document.getElementById('addPartynumber'))
        var option1 = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}: {c}%'
          },
          // color: ["#FAC14E","#FC8F21"],
          grid: {
            top:'7%',
            left: '0',
            right: '8%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            name: '完成率',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'right',//位置靠左
            nameGap: 10, //与y轴距离
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
              show:false //隐藏或显示
            },
            max: function(value) {
              return 100;
            },
            min: function(value) {
              return 0;
            }

          },
          yAxis: {
            name: '季度',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',//位置靠左
            nameGap: 10, //与y轴距离
            type: 'category',
            // boundaryGap: false,
            data: this.quarterlyList

          },
          series: [
            {
              name: '',
              data: this.finishRatelist,
              type: 'bar',
              barWidth : 30,//柱图宽度
              // stack: 'product',//堆叠
              itemStyle: {
                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                emphasis: {
                  barBorderRadius: 30
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[0, 15, 15, 0],
                  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#FA7459','#FA824E','#FAAA4E','#FAC14E'
                    ];
                    return colorList[params.dataIndex]
                  },
                  //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}%'
                  }
                }
              },
            }
          ]
        }
        chart1.setOption(option1,true)
      },
      //党课教育
      getPartyEchart(){
        let chart2 = echarts.init(document.getElementById('partyNumber'))
        let color = ['#FF5D5D','#FC7121','#EBDD17','#46A2FF'];
        let chartData =this.finishRatelist1;
        let arrName = [];
        let arrValue = [];
        let sum = 100;
        let pieSeries = [];
        let lineYAxis = [];

        // 数据处理
        chartData.forEach((v, i) => {
          arrName.push(v.name);
          arrValue.push(v.value);
          // sum = sum + v.value;

        })


        // 图表option整理
        chartData.forEach((v, i) => {
          pieSeries.push({
            name: '党课完成率',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
            center: ["40%", "50%"],

            label: {
              show: true
            },
            labelLine:{
              show:true,
              showAbove:true,
              length:20,
              length2:80,
              lineStyle:{
                // color:'#46A2FF',
                width:1,
                type: 'solid' ,
                opacity: 1 ,
              }
            },
            data: [{
              value: v.value ==0 ?'' :v.value,
              name: v.value ==0 ? (v.name+': '+v.value) : (v.value,v.name+': '+v.value+'%')
            }, {
              value: sum - v.value,
              name: '',
              itemStyle: {
                color: "rgba(0,0,0,0)"
              }
            }]
          });
          pieSeries.push({
            name: '',
            type: 'pie',
            silent: true,
            z: 1,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [65 - i * 15 + '%',57 - i * 15 + '%'],
            center: ["40%", "50%"],
            label: {
              show: false
            },
            data: [{
              value: 7.5,
              itemStyle: {
                color: "#E0DEDE"
              }
            }, {
              value:0,
              name: '',
              itemStyle: {
                color: "rgba(0,0,0,0)"
              }
            }]
          });

        })
        let option2 = {
          backgroundColor: '#fff',
          color: color,
          grid: {
            top: '8%',
            // bottom: '54%',
            left: "40%",
            containLabel: false
          },
          legend: {
            right: 10,
            bottom: 60,
            orient: 'horizontal',
            align: 'left',
            icon: "circle",
            itemHeight: 10,
            itemGap: 10,
            show: true,
            selectedMode: false,
            textStyle: {
              color: "#666666",
              fontSize: 16
            }
          },
          yAxis: [{
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
          }],
          xAxis: [{
            show: false
          }],
          series: pieSeries
        }
        chart2.setOption(option2,true)
      },
      //支部党员大会
      getPartyMeeting(){
        var chart3 = echarts.init(document.getElementById('partyMeeting'))
        var option3 = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}: {c}%'
          },
          // color: ["#FAC14E","#FC8F21"],
          grid: {
            top:'13%',
            left: '0',
            right: '0%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            name: '',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'right',//位置靠左
            nameGap: 0, //与y轴距离
            type: 'category',
            data: this.monthList

          },
          yAxis: {
            name: '完成率',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',//位置靠左
            nameGap: 25, //与y轴距离
            type: 'value',
            // boundaryGap: false,
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
          series: [
            {
              name: '',
              data: this.finishRatelist2,
              type: 'bar',
              barWidth : 30,//柱图宽度
              // stack: 'product',//堆叠
              itemStyle: {
                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                emphasis: {
                  barBorderRadius: 30
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[15, 15, 0, 0],
                  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#FAC14E','#FAB84E','#FAAD4E','#FAA14E','#FA994E','#FA904E','#FA874E','#FA7F4E','#FA764E','#FA6E4E','#FA654E','#FA5C4E'
                    ];
                    return colorList[params.dataIndex]
                  },
                  //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: false,
                    position: 'top',
                    formatter: '{c}%'
                  }
                }
              },
            }
          ]
        }
        chart3.setOption(option3,true)
      }
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
  .base-table /deep/ tr td:nth-of-type(3){
    text-align:left;
  }
  .base-table /deep/ tr td:hover{
    cursor: pointer;
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
    padding:0 25px;
    padding-top:25px;
  }
  .echarts-right{
    background:#fff;
    width:calc(100% - 49% - 20px);
    padding:0 25px;
    padding-top:25px;
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
  .titleContent{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .titleContent span{
    font-size: 20px;
    font-weight: 400;
    color: #333333;
  }

</style>

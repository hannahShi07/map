<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="search-box">
      <base-label-box label="党组织选择">
        <el-select
          filterable
          v-model='orgCode'
          @change="selectChange"
          placeholder="请选择"
          clearable>
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </base-label-box>
      <base-page-button title="党组织发展统计" @click="editBtn()"/>
    </div>

    <div class="chart-content">
      <div class="chart-leftbox">
        <div class="title-box">
          <span class="title-logo">
            <i class="iconfont icon-fazhan"></i>
            党员发展数量统计
          </span>
          <span class="title-num">
           总人数：<i>{{totalnum}}</i>
          </span>
        </div>
        <div class="echarts" v-loading="loading" style="height:310px;">
          <div id="partyNumber" v-if="!isShow1" style="width:100%;height:300px;"/>
          <!-- 空数据样式 -->
          <base-table-empty v-if="isShow1" slot="empty"/>
        </div>
      </div>
      <div class="chart-rightbox">
        <div class="title-box">
          <span class="title-logo">
            <i class="iconfont icon-nianling"></i>
            年龄学历分布图
          </span>
          <span class="title-num">
            总人数：<i>{{totalnum}}</i>
          </span>
        </div>
        <div class="echarts" v-loading="loading" style="height:310px;">
          <div id="partyAge" v-if="!isShow2" style="width:100%;height:300px;"/>
          <!-- 空数据样式 -->
          <base-table-empty v-if="isShow2" slot="empty"/>
        </div>
      </div>

    </div>

    <div class="chart-content mp-20">
      <div class="chart-content-box">
        <div class="chart-leftbox">
          <div class="title-box">
            <span class="title-logo">
              <i class="iconfont icon-gangwei"></i>
              工作岗位分布图
            </span>
              <span class="title-num">
              总人数：<i>{{totalnum}}</i>
            </span>
          </div>
          <div class="echarts" v-loading="loading" style="height:310px;">
            <div id="partyJob" v-if="!isShow3" style="width:100%;height:300px;"/>
            <!-- 空数据样式 -->
            <base-table-empty v-if="isShow3" slot="empty"/>
          </div>
        </div>
        <div class="chart-rightbox">
          <div class="title-box">
            <span class="title-logo">
              <i class="iconfont icon-minzu"></i>
              民族分布图
            </span>
            <span class="title-num">
              总人数：<i>{{totalnum}}</i>
            </span>
          </div>
          <div class="echarts" v-loading="loading" style="height:310px;">
            <div id="partyNation" v-if="!isShow4" style="width:100%;height:230px;"/>
            <div class="echarts-title" v-if="!isShow4">
              <span>汉族</span>
              <span>少数民族</span>
            </div>
            <!-- 空数据样式 -->
            <base-table-empty v-if="isShow4" slot="empty"/>
          </div>
        </div>
      </div>
      <div class="chart-content-box">
        <div class="chart-leftbox">
          <div class="title-box">
            <span class="title-logo">
              <i class="iconfont icon-xingbie"></i>
              性别分布图
            </span>
            <span class="title-num">
              总人数：<i>{{totalnum}}</i>
            </span>
          </div>
          <div class="echarts echarts1" v-if="!isShow5" style="height:310px">
            <div class="echarts-sex-box">
              <img src="../../../../../../assets/page/icon-sex1.png">
              <span>男士</span>
              <span>{{manNumber}}人/{{manRate}}</span>
            </div>
            <div class="echarts-sex-box">
              <img src="../../../../../../assets/page/icon-sex2.png">
              <span>女士</span>
              <span>{{womanNumber}}人/{{womanRate}}</span>
            </div>
          </div>
          <div class="echarts echarts1" v-if="isShow5" style="height:310px">
            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </div>
        </div>
        <div class="chart-rightbox">
          <div class="title-box">
            <span class="title-logo">
              <i class="iconfont icon-tuiyi"></i>
              非公企业退役军人党员数
            </span>
            <span class="title-num">
              总人数：<i>{{totalnum}}</i>
            </span>
          </div>
          <div class="echarts" v-loading="loading" style="height:310px">
            <div id="partyTy" v-if="!isShow6" style="width:100%;height:230px;"/>
            <div class="echarts-title" v-if="!isShow6">
              <span>退役军人党员</span>
              <span>非退役军人党员</span>
            </div>
            <!-- 空数据样式 -->
            <base-table-empty v-if="isShow6" slot="empty"/>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>

  import db from "@/utils/localstorage";
  import commonReq from "@/api/public/commonReq";
  import {getNumbertable,getallNumbertable,getAgetable,getWorktable,getNationtable} from "@/api/backstage/statistical/analysis/partystatistical/partystatistical.js"

  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    name: "index",
    components: {

    },
    data() {
      return {
        loading:false,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码
        totalnum:0,

        partyNumber:[],//党员人数
        growpartyNumber:[],//新增人数
        yearList:[],//年份

        ageList:[],//学历年龄
        agedata1List:[],//研究生
        agedata2List:[],//本科
        agedata3List:[],//大专
        agedata4List:[],//中专
        agedata5List:[],//高中
        agedata6List:[],//初中及以下
        agedata7List:[],//党员总人数

        partyList:[],//工作岗位分布数据

        manNumber:0,//男士党员
        manRate:0,//男士党员占比
        womanNumber:0,//女士党员
        womanRate:0,//女士党员占比
        hanNumber:0,//汉族党员
        hanRate:0,//汉族党员占比
        minorityNumber:0,//少数民族党员
        minorityRate:0,//少数民族党员占比
        retiredSoldierNumber:0,//退役军人党员
        retiredSoldierRate:0,//退役军人党员占比
        unRetiredSoldierNumber:0,//非退役军人党员
        unRetiredSoldierRate:0,//非退役军人党员占比
        isShow1:false,
        isShow2:false,
        isShow3:false,
        isShow4:false,
        isShow5:false,
        isShow6:false,

      }
    },
    mounted() {
      this.getOrg();

      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("partyNumber")).resize();
        this.$echarts.init(document.getElementById("partyAge")).resize();
        this.$echarts.init(document.getElementById("partyJob")).resize();
        this.$echarts.init(document.getElementById("partyNation")).resize();
        this.$echarts.init(document.getElementById("partyTy")).resize()
      };
      window.addEventListener("resize", this.resizefun);

    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("partyNumber")).resize();
        this.$echarts.init(document.getElementById("partyAge")).resize();
        this.$echarts.init(document.getElementById("partyJob")).resize();
        this.$echarts.init(document.getElementById("partyNation")).resize()
        this.$echarts.init(document.getElementById("partyTy")).resize()
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
          this.getallNumberfun();
          this.getNumberfun();
          this.getAgefun();
          this.getWorkfun();
          this.getNationfun();

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
            this.orgCode ="";
            this.orgName="";
            this.orgId="";
          }else{
            this.list=res;
            this.getUser();
          }

        })
      },
      //选择党组织
      selectChange(value){
        this.getallNumberfun();
        this.getNumberfun();
        this.getAgefun();
        this.getWorkfun();
        this.getNationfun();


      },
      //点击查询
      editBtn(){
        this.getallNumberfun();
        this.getNumberfun();
        this.getAgefun();
        this.getWorkfun();
        this.getNationfun();


      },
      //党员发展数量统计
      getNumberfun(){
        this.partyNumber=[];
        this.growpartyNumber=[];
        this.yearList=[];

        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }
        this.loading = true;
        getNumbertable(params).then(response => {
          const res = response;
          if(res!='' && res!=undefined && res!=null && res!='null' && res.length>0){
            for(let i=0;i<res.length;i++){
              this.partyNumber.push(res[i].memberNumber);
              this.growpartyNumber.push(res[i].growthMemberNumber);
              this.yearList.push(res[i].year);
            }
            this.$nextTick(function(){
              this.getEchart();
            })
            this.isShow1=false

          }else{
            this.isShow1=true
          }

        }).finally(() => {
          this.loading = false;
        });

      },

      //党员发展统计总人数
      getallNumberfun(){
        this.totalnum=0;
        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }
        getallNumbertable(params).then(response => {
          //console.log('总人数：'+JSON.stringify(response))
          const res = response;
          if(res.memberNumber!='' && res.memberNumber!=undefined && res.memberNumber!=null && res.memberNumber!='null'){
            this.totalnum=res.memberNumber;
          }else{
            this.totalnum=0
          }

        }).finally(() => {

        });

      },

      //年龄学历分布图
      getAgefun(){
        this.ageList=[]//学历年龄
        this.agedata1List=[]//研究生
        this.agedata2List=[]//本科
        this.agedata3List=[]//大专
        this.agedata4List=[]//中专
        this.agedata5List=[]//高中
        this.agedata6List=[]//初中及以下
        this.agedata7List=[]//党员总人数

        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }
        this.loading = true;
        getAgetable(params).then(response => {
          const res = response;
          if(res!='' && res!=undefined && res!=null && res!='null' && res.length>0){
            for(let i=0;i<res.length;i++){
              this.ageList.push(res[i].ageInterval);
              this.agedata1List.push(res[i].graduateMemberNumber);
              this.agedata2List.push(res[i].regularMemberNumber);
              this.agedata3List.push(res[i].juniorMemberNumber);
              this.agedata4List.push(res[i].technicalMemberNumber);
              this.agedata5List.push(res[i].seniorMemberNumber);
              this.agedata6List.push(res[i].primaryMemberNumber);
              this.agedata7List.push(res[i].memberNumber);

            }

            this.$nextTick(function(){
              this.getechartsAge();
            })
            this.isShow2=false

          }else{
            this.isShow2=true
          }


        }).finally(() => {
          this.loading = false;
        });

      },


      //工作岗位分布图
      getWorkfun(){
        this.loading = true;
        this.partyList=[];
        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }

        getWorktable(params).then(response => {
          const res = response;
          if(res!='' && res!=undefined && res!=null && res!='null' && res.length>0){
            for(let i=0;i<res.length;i++){
              this.partyList.push({
                name:res[i].jobName,
                value:res[i].memberNumber
              })
            }
            this.isShow3=false;
            this.$nextTick(function(){
              this.getechartsJob();
            })

          }else{

            this.isShow3=true;
          }

        }).finally(() => {
          this.loading = false;
        });

      },

      //党员民族、退役军人、性别分布图
      getNationfun(){
        this.manNumber=0;//男士党员
        this.manRate=0;//男士党员占比
        this.womanNumber=0;//女士党员
        this.womanRate=0;//女士党员占比
        this.hanNumber=0;//汉族党员
        this.hanRate=0;//汉族党员占比
        this.minorityNumber=0;//少数民族党员
        this.minorityRate=0;//少数民族党员占比
        this.retiredSoldierNumber=0;//退役军人党员
        this.retiredSoldierRate=0;//退役军人党员占比
        this.unRetiredSoldierNumber=0;//非退役军人党员
        this.unRetiredSoldierRate=0;//非退役军人党员占比
        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }
        this.loading = true;
        getNationtable(params).then(response => {
          //console.log('数据：'+JSON.stringify(response))
          const res = response;
          if(res!='' && res!=undefined && res!=null && res!='null'){
            this.manNumber=res.manMemberNumber;//男士党员
            this.manRate=res.manMemberNumberRatio;//男士党员占比
            this.womanNumber=res.womanMemberNumber;//女士党员
            this.womanRate=res.womanMemberNumberRatio;//女士党员占比
            this.hanNumber=res.hanMemberNumber;//汉族党员
            this.hanRate=res.hanMemberNumberRatio;//汉族党员占比
            this.minorityNumber=res.minorityMemberNumber;//少数民族党员
            this.minorityRate=res.minorityMemberNumberRatio;//少数民族党员占比
            this.retiredSoldierNumber=res.retiredSoldierMemberNumber;//退役军人党员
            this.retiredSoldierRate=res.retiredSoldierMemberRatio;//退役军人党员占比
            this.unRetiredSoldierNumber=res.unRetiredSoldierMemberNumber;//非退役军人党员
            this.unRetiredSoldierRate=res.unRetiredSoldierMemberRatio;//非退役军人党员占比

            this.$nextTick(function(){
              this.getechartsNation();
              this.getechartsTy();
            })
            this.isShow4=false
            this.isShow5=false
            this.isShow6=false

          }else{
            this.isShow4=true
            this.isShow5=true
            this.isShow6=true
          }

        }).finally(() => {
          this.loading = false;
        });

      },

      //党员发展数量统计
      getEchart(){
        let chart1 = echarts.init(document.getElementById('partyNumber'))
        let colorList = ["#FF5454", '#FFAA54']
        let option1 = {
          backgroundColor: '#fff',
          title: {
            text: '',
            textStyle: {
              fontSize: 12,
              fontWeight: 400
            },
            left: 'center',
            top: '5%'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',

          },
          tooltip: {
            trigger: 'axis',

          },
          grid: {
            top: '20%',
            left: '2%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            name: '时间',
            nameTextStyle: {
              fontSize: 12,
              color: '#666666'
            },
            position: 'right',//位置靠左
            nameGap: 20, //与y轴距离
            data:this.yearList,
            axisTick: {
              show: true,
              alignWithLabel:true,//刻度与类目对齐
            },
            axisLabel: {
              interval: 0,
              fontSize: 12,
            },


          }],
          yAxis: [{
            name: '总人数',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'top',//位置靠左
            nameGap: 10, //与y轴距离
            type: 'value',
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
            axisTick: {
              show: true
            },
            splitLine: {    //网格线
              show: false
            },
          }, {
            name: '增长人数',
            nameTextStyle: {
              fontSize: 12
            },
            nameGap: 10, //与y轴距离
            type: 'value',
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
            position: 'right',
            axisTick: {
              show: true
            },

            splitLine: {
              show: false
            }
          }],
          series: [{
            name: '总人数',
            type: 'line',
            data: this.partyNumber,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#FFF'
              },
                {
                  offset: 1,
                  color: '#FF5454'
                }
              ]),
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0]
              }
            }
          },
            {
              name: '增长人数',
              type: 'line',
              data: this.growpartyNumber,
              symbolSize: 1,
              yAxisIndex: 1,

              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#FFF'
                },
                  {
                    offset: 1,
                    color: '#FFAA54'
                  }
                ]),
              },
              itemStyle: {
                normal: {
                  color: colorList[1],
                  borderColor: colorList[1]
                }
              }
            }
          ]
        }
        chart1.setOption(option1,true)
      },
      //年龄学历分布图
      getechartsAge(){
        let chart2 = echarts.init(document.getElementById('partyAge'))
        let option2 = {
          tooltip: {
            trigger: 'axis',
            axisPointer : {
              type : 'shadow'
            }

          },
          toolbox: {

          },
          legend: {
            show:true,
            x: 'right', //居右显示
            data: ['学历人数','研究生', '本科','大专','中专','高中','初中及以下'],
            textStyle: {
              fontSize: 12,
              color:'#999999',
            }
          },
          grid: {
            top:'12%',
            left: '0',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '年龄',
              nameTextStyle: {
                fontSize: 12
              },
              position: 'right',//位置靠左
              nameGap: 10, //与y轴距离
              data: this.ageList,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '人数',
              // min: 0,
              // max: 250,
              // interval: 50,
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '研究生',
              type: 'bar',
              barWidth : 10,//柱图宽度
              barGap: 0,//柱子之间无缝隙
              data: this.agedata1List,
              itemStyle:{
                normal:{color:'#E93F33'}
              }
            },
            {
              name: '本科',
              type: 'bar',
              barWidth : 10,//柱图宽度
              barGap: 0,//柱子之间无缝隙
              data: this.agedata2List,
              itemStyle:{
                normal:{color:'#FF9900'}
              }
            },
            {
              name: '大专',
              type: 'bar',
              barWidth : 10,//柱图宽度
              barGap: 0,//柱子之间无缝隙
              data: this.agedata3List,
              itemStyle:{
                normal:{color:'#CCCC00'}
              }
            },
            {
              name: '中专',
              type: 'bar',
              barWidth : 10,//柱图宽度
              barGap: 0,//柱子之间无缝隙
              data: this.agedata4List,
              itemStyle:{
                normal:{color:'#339900'}
              }
            },
            {
              name: '高中',
              type: 'bar',
              barWidth : 10,//柱图宽度
              barGap: 0,//柱子之间无缝隙
              data: this.agedata5List,
              itemStyle:{
                normal:{color:'#FF655A'}
              }
            },
            {
              name: '初中及以下',
              type: 'bar',
              barWidth : 10,//柱图宽度
              barGap: 0,//柱子之间无缝隙
              data: this.agedata6List,
              itemStyle:{
                normal:{color:'#37AFFF'}
              }
            },
            {
              name: '学历人数',
              type: 'line',
              data: this.agedata7List,
              itemStyle:{
                normal:{color:'#FFBF51'}
              }
            }
          ]

        }
        chart2.setOption(option2,true)
      },
      //工作岗位分布图
      //工作岗位分布图表引导线
      getRich(colorArr) {
        let result = {}
        colorArr.forEach((v, i) => {
          result[`normal${i}`]={
            fontSize: 16,
            fontWeight:'bold',
            align: 'left',
            padding: [10, 4],
            color: colorArr[i],
          },
            result[`value${i}`]={
              color: '#666666',
              align: 'left',
              fontSize: 12,
              padding: [2, 4],
            }
        })
        return result
      },
      getechartsJob(){
        let chart3 = echarts.init(document.getElementById('partyJob'))
        let colorArr = ['#FF655A', '#FFAC2E', '#3EE8BF', '#4DCAF1', '#1E87EF']
        let data = this.partyList;
        let option3 = {
          color: colorArr,
          legend: {
            show:false,
          },
          grid: {
            top:'0',
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          series: [
            {
              type: 'pie',
              radius: ['0', '50%'],
              center: ["50%", "50%"],
              // clockwise: true,
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 3,
                  color:function(params) {
                    //自定义颜色
                    return colorArr[params.dataIndex]
                  }
                }
              },
              label: {
                normal: {
                  formatter: function(params, ticket, callback) {
                    const index = params.dataIndex
                    return  [`{normal${index}|${data[index].value}}\n{value${index}|${params.name}}`].join('\n');
                  },
                  padding: [0, -75],
                  rich: this.getRich(colorArr)
                }

              },
              labelLine: {
                length: 10,
                length2: 80,
                lineStyle: {
                  color: '#E2E2E2',
                }
              },
              data:data
            }
          ]
        }
        chart3.setOption(option3,true)
      },
      //民族分布图
      getechartsNation(){
        let chart4 = echarts.init(document.getElementById('partyNation'))
        let placeHolderStyle = {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          },
          emphasis: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          }
        };


        let dataStyle = {
          normal: {
            formatter: '{c}人',
            position: 'center',
            show: true,
            textStyle: {
              fontWeight: '700',
              fontSize: '16',
              color: '#37AFFF',

            }
          }
        };

        let option4 = {
          backgroundColor: '#fff',
          title: [{
            text: this.hanRate,
            left: '23.8%',
            top: '67%',
            textAlign: 'center',
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal',
              color: '#666666',
              textAlign: 'center',
            },
          }, {
            text: this.minorityRate,
            left: '74%',
            top: '67%',
            textAlign: 'center',
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal',
              color: '#666666',
              textAlign: 'center',
            },
          }],

          //第一个图表
          series: [{
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            radius: ['47%', '48%'],
            center: ['25%', '65%'],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: (this.hanNumber+this.minorityNumber)==0 ? 100:(this.hanNumber+this.minorityNumber),
              itemStyle: {

                normal: {
                  color: '#37AFFF'
                }
              },
            }, {
              value: (this.hanNumber+this.minorityNumber)==0 ? 35:(this.hanNumber+this.minorityNumber)*0.35,
              itemStyle: placeHolderStyle,
            },

            ]
          },
            //上层环形配置
            {
              type: 'pie',
              hoverAnimation: false, //鼠标经过的特效
              radius: ['40%', '48%'],
              center: ['25%', '65%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: this.hanNumber==0 ? 0:this.hanNumber,
                itemStyle: {
                  normal: {
                    color: '#37AFFF'
                  }
                },
                label: dataStyle,
              }, {
                value: (this.hanNumber+this.minorityNumber)==0 ? 35:(this.hanNumber+this.minorityNumber)*0.35,
                itemStyle: placeHolderStyle,
              },

              ]
            },


            //第二个图表
            {
              type: 'pie',
              hoverAnimation: false,
              radius: ['47%', '48%'],
              center: ['75%', '65%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: (this.hanNumber+this.minorityNumber)==0 ? 100:(this.hanNumber+this.minorityNumber),
                itemStyle: {
                  normal: {
                    color: '#FF7C5A'


                  }
                },

              }, {
                value: (this.hanNumber+this.minorityNumber)==0 ? 35:(this.hanNumber+this.minorityNumber)*0.35,
                itemStyle: placeHolderStyle,
              },

              ]
            },

            //上层环形配置
            {
              type: 'pie',
              hoverAnimation: false,
              radius: ['40%', '48%'],
              center: ['75%', '65%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{

                value: this.minorityNumber==0 ? 0:this.minorityNumber,
                itemStyle: {
                  normal: {
                    color: '#FF7C5A'
                  }
                },
                label: dataStyle,
              }, {
                value: (this.hanNumber+this.minorityNumber)==0 ? 35:(this.hanNumber+this.minorityNumber)*0.35,
                itemStyle: placeHolderStyle,
              },

              ]
            },
          ]
        }
        chart4.setOption(option4,true)
      },
      //非公企业退役军人党员数
      getechartsTy(){
        let chart5 = echarts.init(document.getElementById('partyTy'))
        let placeHolderStyle = {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          },
          emphasis: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          }
        };


        let dataStyle = {
          normal: {
            formatter: '{c}人',
            position: 'center',
            show: true,
            textStyle: {
              fontWeight: '700',
              fontSize: '16',
              color: '#E93F33',
            }
          }
        };

        let option5 = {
          backgroundColor: '#fff',
          title: [{
            text: this.retiredSoldierRate,
            left: '23.8%',
            top: '67%',
            textAlign: 'center',
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal',
              color: '#666666',
              textAlign: 'center',
            },
          }, {
            text: this.unRetiredSoldierRate,
            left: '74%',
            top: '67%',
            textAlign: 'center',
            textStyle: {
              fontSize: '12',
              fontWeight: 'normal',
              color: '#666666',
              textAlign: 'center',
            },
          }],

          //第一个图表
          series: [{
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            radius: ['47%', '48%'],
            center: ['25%', '65%'],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: (this.retiredSoldierNumber+this.unRetiredSoldierNumber)==0 ? 100:(this.retiredSoldierNumber+this.unRetiredSoldierNumber),
              itemStyle: {

                normal: {
                  color: '#E93F33'
                }
              },
            }, {
              value: (this.retiredSoldierNumber+this.unRetiredSoldierNumber)==0 ? 35:(this.retiredSoldierNumber+this.unRetiredSoldierNumber)*0.35,
              itemStyle: placeHolderStyle,
            },

            ]
          },
            //上层环形配置
            {
              type: 'pie',
              hoverAnimation: false, //鼠标经过的特效
              radius: ['40%', '48%'],
              center: ['25%', '65%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: this.retiredSoldierNumber==0 ? 0:this.retiredSoldierNumber,
                itemStyle: {
                  normal: {
                    color: '#E93F33'
                  }
                },
                label: dataStyle,
              }, {
                value: (this.retiredSoldierNumber+this.unRetiredSoldierNumber)==0 ? 35:(this.retiredSoldierNumber+this.unRetiredSoldierNumber)*0.35,
                itemStyle: placeHolderStyle,
              },

              ]
            },


            //第二个图表
            {
              type: 'pie',
              hoverAnimation: false,
              radius: ['47%', '48%'],
              center: ['75%', '65%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: (this.retiredSoldierNumber+this.unRetiredSoldierNumber)==0 ? 100:(this.retiredSoldierNumber+this.unRetiredSoldierNumber),
                itemStyle: {
                  normal: {
                    color: '#FFD500'


                  }
                },

              }, {
                value: (this.retiredSoldierNumber+this.unRetiredSoldierNumber)==0 ? 35:(this.retiredSoldierNumber+this.unRetiredSoldierNumber)*0.35,
                itemStyle: placeHolderStyle,
              },

              ]
            },

            //上层环形配置
            {
              type: 'pie',
              hoverAnimation: false,
              radius: ['40%', '48%'],
              center: ['75%', '65%'],
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: this.unRetiredSoldierNumber==0 ? 0:this.unRetiredSoldierNumber,
                itemStyle: {
                  normal: {
                    color: '#FFD500'
                  }
                },
                label: dataStyle,
              }, {
                value: (this.retiredSoldierNumber+this.unRetiredSoldierNumber)==0 ? 35:(this.retiredSoldierNumber+this.unRetiredSoldierNumber)*0.35,
                itemStyle: placeHolderStyle,
              },

              ]
            },
          ]
        }
        chart5.setOption(option5,true)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .history {
    height: 100%;
    background: #eee;
  }
  .mp-20{
    margin-top:20px;
  }
  .base-table-empty{
    height:300px;
  }


  /*党组织下拉框样式*/
  .search-box{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom:20px;
  }
  .search-box /deep/ .base-label-box{
    margin-bottom:0!important;
    background:#fff;
    width:calc(100% - 288px);
    padding:10px 0;


  }
  .search-box /deep/ .base-label-box .base-label-box__label {
    display: inline-block;
    padding:0 20px;
    font-size: 16px;
    line-height:1;
    color: #666666;
    font-weight:400;
    width:auto;

  }
  .search-box /deep/ .base-label-box .base-label-box__content{
    width:calc(100% - 125px);
  }
  .search-box /deep/ .el-select{
    width:100%;
  }
  .search-box /deep/ .el-input--suffix .el-input__inner{
    border-right:none;
    border-top:none;
    border-bottom:none;
    border-radius:0!important;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
  }
  .search-box /deep/ .page-btn{
    width:268px;
    height:56px;
    line-height:56px;
    font-size: 16px;
    font-weight: bold;
    color: #ED3C3C;
    background: #FFF2F2;
    border: 2px solid #ED3C3C;
    margin-right: 0;
  }
  .el-select-dropdown__item {
    //display:inline-block;
    //width:100%;
    max-width:1064px!important;
  }

  .title-box{
    padding:16px 20px;
    border-bottom:1px solid #E4E4E4;
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .title-logo{
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
    color: #666666;
  }
  .title-logo i{
    margin-right:0px;
    color: #E93F33;
  }

  .chart-content{
    width:100%;
    display:flex;
    justify-content:space-between;
  }
  .chart-content-box{
    width:calc((100% - 20px)/2);
    display:flex;
    justify-content:space-between;
  }
  .chart-leftbox{
    width:calc((100% - 20px)/2);
    background:#fff;
  }
  .chart-rightbox{
    width:calc((100% - 20px)/2);
    background:#fff;
  }
  .title-num{
    display:block;
    font-size: 14px;
    color: #666;
  }
  .title-num i{
    font-style: normal;
    font-size: 14px;
    color: #FF5757;
  }
  .echarts{
    padding:5px 20px;
  }
  .echarts-title{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .echarts-title span{
    display:block;
    width:50%;
    text-align:center;
    font-size: 16px;
    color: #666666;
  }
  .echarts1{
    width:100%;
    display:flex;
    justify-content: space-between;
  }
  .echarts-sex-box{
    width:50%;
    text-align:center;
  }
  .echarts-sex-box img{
    width:114px;
    height:114px;
    overflow:hidden;
    margin:0 auto;
    margin-top:82px;
  }
  .echarts-sex-box span{
    display:block;
    color:#666;
    font-size: 12px;

  }
  .echarts-sex-box span:first-of-type{
    margin-top:12px;
  }
  .echarts-sex-box span:last-of-type{
    font-weight: bold;
    margin-top:10px;

  }



</style>

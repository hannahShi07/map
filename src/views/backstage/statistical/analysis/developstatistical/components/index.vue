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
      <base-page-button title="党组织统计" @click="editBtn()"/>
    </div>

    <div class="chart-content">
      <div class="chart-leftbox">
        <div class="title-box">
          <span class="title-logo">
            <i class="iconfont icon-fenbu"></i>
            党组织分布
          </span>
          <span class="title-num">
            总组织数：<i>{{partyTotal}}</i>
          </span>
        </div>
        <div class="echarts">
          <div id="partyNumber" style="width:100%;height:300px;"/>
        </div>
      </div>
      <div class="chart-rightbox">
        <div class="title-box">
          <span class="title-logo">
            <i class="iconfont icon-leixing"></i>
            组织类型
          </span>
          <span class="title-num">
            总组织数：<i>{{typeTotal}}</i>
          </span>
        </div>
        <div class="echarts">
          <div id="partyType" style="width:100%;height:300px;"/>
        </div>
      </div>

    </div>


  </div>
</template>

<script>

  import db from "@/utils/localstorage";
  import commonReq from "@/api/public/commonReq";
  import {getPartyfb,getPartytype} from "@/api/backstage/statistical/analysis/developstatistical/developstatistical.js"
  import {getMeetinglist} from "@/api/backstage/statistical/analysis/meetingstatistical/meetingstatistical";
  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    name: "index",
    components: {

    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码
        quarterlyList:[],
        quarterlyList1:[],
        finishRatelist:[],
        finishRatelist1:[],
        partyTotal:0,
        typeTotal:0,

      }
    },
    mounted() {
      this.getOrg();

      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("partyNumber")).resize();
        this.$echarts.init(document.getElementById("partyType")).resize();

      };
      window.addEventListener("resize", this.resizefun);

    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("partyNumber")).resize();
        this.$echarts.init(document.getElementById("partyType")).resize();
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
          this.getPartyfun();
          this.getPartytypefun();

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
            this.orgName=""
            this.orgId=""
          }else{
            this.list=res;
            this.getUser();
          }

        })
      },
      //选择党组织
      selectChange(value){
        this.getPartyfun();
        this.getPartytypefun();
      },
      //点击查询
      editBtn(){
        this.getPartyfun();
        this.getPartytypefun();
      },
      //党组织分布
      getPartyfun () {
        this.quarterlyList=[];
        this.finishRatelist=[];
        this.partyTotal=0;

        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }
        this.loading = true;
        getPartyfb(params).then(response => {
          const res = response;
          for(let i=0;i<res.length;i++){
            this.quarterlyList.push(res[i].categoryName)
            this.finishRatelist.push(res[i].orgNumber)
            this.partyTotal=this.partyTotal+res[i].orgNumber
          }

          this.getEchart();

        }).finally(() => {
          this.loading = false;
        });

      },
      //组织类型分布
      getPartytypefun () {
        this.quarterlyList1=[];
        this.finishRatelist1=[];
        this.typeTotal=0;
        let params = {
          code:this.orgCode,
          id:this.orgId,
          name:this.orgName
        }
        this.loading = true;
        getPartytype(params).then(response => {
          const res = response;
          for(let i=0;i<res.length;i++){
            this.quarterlyList1.push(res[i].typeName)
            this.finishRatelist1.push(res[i].orgNumber)
            this.typeTotal=this.typeTotal+res[i].orgNumber
          }

          this.getPartyMeeting();

        }).finally(() => {
          this.loading = false;
        });

      },
      //党组织分布echarts
      getEchart(){
        var chart1 = echarts.init(document.getElementById('partyNumber'))
        var option1 = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}: {c}'
          },
          // color: ["#FAC14E","#FC8F21"],
          grid: {
            top:'12%',
            left: '0',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            name: '数量',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'right',//位置靠左
            nameGap: 10, //与y轴距离
            type: 'value',
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
            axisLabel: {
              show: true,
              interval: 0,
              formatter: '{value}'
            },
            splitLine :{    //网格线
              lineStyle:{
                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:false //隐藏或显示
            },


          },
          yAxis: {
            name: '分布',
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
              barWidth : 22,//柱图宽度
              // stack: 'product',//堆叠
              itemStyle: {
                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                emphasis: {
                  barBorderRadius: 30
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[0, 4, 4, 0],
                  //柱体的颜色
                  //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                  color: new echarts.graphic.LinearGradient(1,0,0,0,[
                    {
                      offset:0,
                      color:"#FF5A5A"
                    },
                    {
                      offset:1,
                      color:"#FF3F30"
                    }
                  ],false),
                  //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: false,
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
      //组织分类echarts
      getPartyMeeting(){
        var chart2 = echarts.init(document.getElementById('partyType'))
        var option2 = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}: {c}'
          },
          // color: ["#FAC14E","#FC8F21"],
          grid: {
            top:'12%',
            left: '0',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            name: '分类',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'right',//位置靠左
            nameGap: 10, //与y轴距离
            type: 'category',
            axisLabel: {
              interval:0,
              rotate:0,
              // 坐标轴刻度标签换行处理
              formatter: function (params) {
                var newParamsName = '' // 最终拼接成的字符串
                var paramsNameNumber = params.length // 实际标签的个数
                var provideNumber = 5 // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ''// 表示每一次截取的字符串
                    var start = p * provideNumber // 开始截取的位置
                    var end = start + provideNumber // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p === rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + '\n'
                    }
                    newParamsName += tempStr // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params
                }
                return newParamsName
              }

            },
            data: this.quarterlyList1

          },
          yAxis: {
            name: '数量',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',//位置靠左
            nameGap: 10, //与y轴距离
            type: 'value',
            // boundaryGap: false,
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}'
            },
            splitLine :{    //网格线
              lineStyle:{
                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:true //隐藏或显示
            },


          },
          series: [
            {
              name: '',
              data: this.finishRatelist1,
              type: 'bar',
              barWidth : 42,//柱图宽度
              itemStyle: {
                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                emphasis: {
                  barBorderRadius: 30
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius:[10, 10, 0, 0],
                  //柱体的颜色
                  //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                  color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                      offset:0,
                      color:"#FF861D"
                    },
                    {
                      offset:1,
                      color:"#FF7030"
                    }
                  ],false),

                  //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    color:'#FF841E',
                    fontSize: 16,
                    fontWeight:700,

                  }
                }
              },
            }
          ]
        }
        chart2.setOption(option2,true)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .history {
    height: 80vh;
    background: #eee;
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
    padding:20px 20px;
  }


</style>

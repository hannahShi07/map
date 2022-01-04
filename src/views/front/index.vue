<template>
  <div class="party" v-cloak>
    <div class="list-content">
      <ul class='list-contentul'>
        <li>
          <div class="ul-left">
            <span class="num">{{getNumber(listSetting.dgw)}}</span>
            <span class="title">党工委</span>
          </div>
          <div class="ul-right">
            <img src="../../assets/page/icon-img1.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{getNumber(listSetting.sqcdw)}}</span>
            <span class="title">社区/村党委</span>
          </div>
          <div class="ul-right">
            <img src="../../assets/page/icon-img4.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{getNumber(listSetting.jgdzz)}}</span>
            <span class="title">机关党委</span>
          </div>
          <div class="ul-right">
            <img src="../../assets/page/icon-img3.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{getNumber(listSetting.gkdzz)}}</span>
            <span class="title">高科党总支</span>
          </div>
          <div class="ul-right">
            <img src="../../assets/page/icon-logo1.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{getNumber(listSetting.dzb)}}</span>
            <span class="title">企业党支部</span>
          </div>
          <div class="ul-right">
            <img src="../../assets/page/icon-logo3.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{getNumber(sexList.memberNumber)}}</span>
            <span class="title">党员</span>
          </div>
          <div class="ul-right">
            <img src="../../assets/page/icon-logo2.png">
          </div>
        </li>
      </ul>
    </div>

    <div class="secondBox">
      <div class="box infocontent">
        <div class="titlebox">
          <span class="lefttitle">用户信息</span>
          <span class="righttitle">用户名 <i>{{userData.userName}}</i></span>
        </div>
        <ul class="secondul">
          <li>
            <span class="number"><i>{{getNumber(userList.todayCnt)}}</i>次</span>
            <span class="lititle">登录次数</span>
            <span class="line"></span>
          </li>
          <li>
            <span class="number"><i>{{getNumber(userList.cntAll)}}</i>次</span>
            <span class="lititle">共登录次数</span>
            <span class="line"></span>
          </li>
          <li>
            <span class="number"><i>{{getNumber(userList.userCnt)}}</i>个</span>
            <span class="lititle">总用户数</span>
            <span class="line"></span>
          </li>
          <li>
            <span class="number"><i>{{getNumber(userList.todayUserCnt)}}</i>个</span>
            <span class="lititle">当天累计登录用户数</span>
          </li>
        </ul>

      </div>
      <div class="box partycontent">
        <div class="titlebox">
          <span class="lefttitle">党员性别分布</span>
        </div>
        <ul class="partyul">
          <li>
            <img src="../../assets/page/icon-man.png">
            <div class="partyulDiv">
              <span class="sex">男</span>
              <span class="num">{{getNumber(sexList.manMemberNumber)}}人 / {{getNumber(sexList.manMemberNumberRatio)}}%</span>
            </div>
            <span class="line"></span>
          </li>
          <li>
            <img src="../../assets/page/icon-woman.png">
            <div class="partyulDiv">
              <span class="sex">女</span>
              <span class="num">{{getNumber(sexList.womanMemberNumber)}}人 / {{getNumber(sexList.womanMemberNumberRatio)}}%</span>
            </div>
          </li>
        </ul>

      </div>
      <div class="box activecontent">
        <div class="titlebox">
          <span class="lefttitle">活动园地</span>
        </div>
        <div class="echartsActive">
          <div id="echartsActive" style="width:100%;height:124px;"/>
        </div>

      </div>

    </div>

    <div class="thirdBox">
      <div class="indrucontent">
        <div class="titlebox">
          <span class="lefttitle">园区简介</span>
        </div>
        <div class="infotxt">
<!--          <div class="infocontenttxt" v-if="listSetting.yqjj!='' && listSetting.yqjj!=undefined && listSetting.yqjj!=null && listSetting.yqjj!='null'" v-html="listSetting.yqjj"></div>-->
          <el-input v-if="listSetting.yqjj!='' && listSetting.yqjj!=undefined && listSetting.yqjj!=null && listSetting.yqjj!='null'" v-model="listSetting.yqjj" type="textarea" disabled :autosize='{ minRows: 18, maxRows: 18}' resize="none"></el-input>
          <!-- 空数据样式 -->
          <base-table-empty v-else slot="empty"/>
        </div>

      </div>
      <div class="lifecontent">
        <div class="titlebox">
          <span class="lefttitle">组织生活落实情况</span>
        </div>
        <div class="echartsLife">
          <div id="echartsLife" style="width:100%;height:374px;"/>
        </div>

      </div>

    </div>

    <div class="fouthBox">
      <div class="partyage">
        <div class="titlebox">
          <span class="lefttitle">党员学历年龄分布</span>
        </div>
        <div class="echartsAge">
          <div id="echartsAge" style="width:100%;height:420px;"/>
        </div>

      </div>
      <div class="partytype">
        <div class="titlebox">
          <span class="lefttitle">党员类型分布</span>
        </div>
        <div class="echartsType">
          <div id="echartsType" style="width:100%;height:420px;padding-top:10px;"/>
        </div>

      </div>
    </div>



  </div>

</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getStatisticsset,getStatisticseducation,getStatisticssex,getStatisticsparty,getStatisticsuser}  from "@/api/front/index.js"

  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    name: "index",
    components:{},
    data () {
      return {
        // drawer: true,//关闭右侧消息
        // activeName: 'first'
        listSetting:'',//统计设置
        learningList:[],//学习园地
        lifeList:[],//组织生活落实情况
        sexList:'',//性别分布统计
        userList:'',//用户登录信息统计
        ageList:[],//年龄分布
        agedata1List:[],//研究生及以上党员人数
        agedata2List:[],//本科党员人数
        agedata3List:[],//大专党员人数
        agedata4List:[],//中专党员人数
        agedata5List:[],//高中及以下党员人数
        agedata6List:[],//党员总人数
        partyList:[],//党员组织类型分布
        userData:'',//登录人信息
      }
    },
    mounted(){
      this.getUser();
      this.getStatisticssetfront();
      this.getStatisticssexfront();
      this.getStatisticsuserfront();
      this.getStatisticseducationfront();
      this.getStatisticspartyfront();

      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("echartsActive")).resize();
        this.$echarts.init(document.getElementById("echartsLife")).resize();
        this.$echarts.init(document.getElementById("echartsAge")).resize();
        this.$echarts.init(document.getElementById("echartsType")).resize();
      };
      window.addEventListener("resize", this.resizefun);

    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("echartsActive")).resize();
        this.$echarts.init(document.getElementById("echartsLife")).resize();
        this.$echarts.init(document.getElementById("echartsAge")).resize();
        this.$echarts.init(document.getElementById("echartsType")).resize();
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
    methods:{
      //获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.userData=res.data;
        }).finally(() => {

        });
      },
      //过滤数据为空时为0
      getNumber(val){
        if(val=='' || val==undefined || val==null || val=='null'){
          return 0
        }else{
          return val
        }
      },

      //统计设置详情
      getStatisticssetfront(){
        this.learningList=[];
        this.lifeList=[];
        let params = {
        }
        getStatisticsset(params).then(response => {
          const res = response;
          this.listSetting=res;
          //学习园地
          this.learningList.push(this.getNumber(res.fbhds));
          this.learningList.push(this.getNumber(res.cyrs));
          //组织生活情况
          this.lifeList.push(this.getNumber(res.qthd))
          this.lifeList.push(this.getNumber(res.ztdr))
          this.lifeList.push(this.getNumber(res.mzshh))
          this.lifeList.push(this.getNumber(res.zhshh))
          this.lifeList.push(this.getNumber(res.mzpydy))
          this.lifeList.push(this.getNumber(res.shyk))
          // if(this.lifeList!='' && this.lifeList!=undefined && this.lifeList!=null && this.lifeList!='null' && this.lifeList.length>0){
          //   for(let i=0;i<this.lifeList.length;i++){
          //     if(this.lifeList[i] > 9999999){
          //       this.lifeList[i]=9999999
          //     }
          //   }
          // }
          this.getechartsActive();
          this.getechartsLife();
        }).finally(() => {

        });

      },
      //年龄学历分布统计
      getStatisticseducationfront(){
        this.ageList=[];//年龄分布
        this.agedata1List=[];//研究生及以上党员人数
        this.agedata2List=[];//本科党员人数
        this.agedata3List=[];//大专党员人数
        this.agedata4List=[];//中专党员人数
        this.agedata5List=[];//高中及以下党员人数
        this.agedata6List=[];//党员总人数

        let params = {
        }
        getStatisticseducation(params).then(response => {
          const res = response;
          for(let i=0;i<res.length;i++){
            this.ageList.push(res[i].ageInterval);
            this.agedata1List.push(res[i].graduateMemberNumber);//研究生及以上党员人数
            this.agedata2List.push(res[i].regularMemberNumber);//本科党员人数
            this.agedata3List.push(res[i].juniorMemberNumber);//大专党员人数
            this.agedata4List.push(res[i].technicalMemberNumber);//中专党员人数
            this.agedata5List.push(res[i].seniorMemberNumber);//高中及以下党员人数
            this.agedata6List.push(res[i].memberNumber);//党员总人数
          }
          this.getechartsAge();
        }).finally(() => {

        });

      },
      //性别分布统计
      getStatisticssexfront(){
        let params = {
        }
        getStatisticssex(params).then(response => {
          const res = response;
          this.sexList=res;

        }).finally(() => {

        });
      },
      //党员按组织类型统计
      getStatisticspartyfront(){
        this.partyList=[];
        let params = {
        }
        getStatisticsparty(params).then(response => {
          const res = response;
          if(res!='' && res!=undefined && res!=null && res!='null' && res.length>0){
            for(let i=0;i<res.length;i++){
              if(res[i].value != '0'){
                this.partyList.push(res[i])
              }
            }
          }
          this.getechartsType();
        }).finally(() => {

        });
      },
      //用户登录信息统计
      getStatisticsuserfront(){
        let params = {
        }
        getStatisticsuser(params).then(response => {
          const res = response;
          this.userList=res;

        }).finally(() => {

        });
      },


      //活动园地
      getechartsActive(){
        let chart1 = echarts.init(document.getElementById('echartsActive'));
        let salvProName =["发布活动数","参与人数"];
        let salvProValue =this.learningList;
        let salvProMax =[];//背景按最大值
        let max=salvProValue[0];
        for (let i = 1; i < salvProValue.length; i++) {
          salvProMax =[];
          if (salvProValue[i] > max) {
            salvProMax.push(salvProValue[i])
          }
        }
        let option1 = {
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top: '20%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function(params) {
              return params[0].name  + ' : ' + params[0].value
            }
          },
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              margin: -56,
              verticalAlign: 'bottom',
              lineHeight: 30,
              textStyle: {
                color: '#666666',
                fontSize: '12',
                // align: 'left',
              },
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,

            },
            data: salvProName
          }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              align: 'right',
              margin: -20,
              verticalAlign: 'bottom',
              lineHeight: 30,
              textStyle: {
                color: '#666666',
                fontSize: '12',
                align: 'right',
              },
            },
            data:salvProValue
          }],
          series: [{
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color:function(params) {
                  var colorList = ['#FFB811','#46A2FF'];
                  return colorList[params.dataIndex]
                }

              }
            },
            barWidth: 6,
            data: salvProValue
          },
            {
              name: '背景',
              type: 'bar',
              barWidth: 6,
              barGap: '-100%',
              data: salvProMax,
              itemStyle: {
                normal: {
                  color: '#F6F6F6',
                  barBorderRadius: 6,
                }
              },
            },
          ]

        }
        chart1.setOption(option1,true)
      },
      //组织生活落实情况
      getechartsLife(){
        let chart2 = echarts.init(document.getElementById('echartsLife'))
        let option2 = {
          tooltip: {
            trigger: 'axis',
            formatter:'{b}: {c}'
          },
          grid: {
            top:'13%',
            left: '0',
            right: '16%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            show: false,
            name: '',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'right',//位置靠左
            nameGap: 0, //与y轴距离
            type: 'value',
            // axisLabel: {
            //   show: true,
            //   interval: 'auto',
            //   formatter: '{value} %'
            // },
            splitLine :{    //网格线
              lineStyle:{
                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:true //隐藏或显示
            },
            // max: function(value) {
            //   return 100;
            // },
            // min: function(value) {
            //   return 0;
            // }

          },
          yAxis: {
            name: '',
            nameTextStyle: {
              fontSize: 12
            },
            // position: 'left',//位置靠左
            // nameGap: 25, //与y轴距离
            type: 'category',
            data: ['其他活动','主题党日','民主生活会','组织生活会','民主评议党员','三会一课'],
            // boundaryGap: false,
            axisTick:{       //y轴刻度线
              "show":false
            },


          },
          series: [
            {
              name: '',
              data: this.lifeList,
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
                      '#FA544E','#FA6B4E','#FA824E','#FA994E','#FAAA4E','#FAC14E'
                    ];
                    return colorList[params.dataIndex]
                  },
                  //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: 'right',
                    // formatter: '{c}+'
                    formatter:function(params) {
                      if (params.value > 9999999) {
                        return '9999999+';
                      } else {
                        return params.value;
                      }
                    }
                  }
                }
              },
            }
          ]
        }
        chart2.setOption(option2,true)
      },
      //党员学历年龄分布
      getechartsAge(){
        let chart3 = echarts.init(document.getElementById('echartsAge'))
        let option3 = {
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
            data: ['学历人数','研究生及以上', '本科','大专','中专(高中)','高中以下'],
            textStyle: {
              fontSize: 12,
              color:'#999999',
            }
          },
          grid: {
            top:'13%',
            left: '0',
            right: '4%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '年龄',
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
              name: '研究生及以上',
              type: 'bar',
              barWidth : 20,//柱图宽度
              data: this.agedata1List,
              itemStyle:{
                normal:{color:'#E93F33'}
              }
            },
            {
              name: '本科',
              type: 'bar',
              barWidth : 20,//柱图宽度
              data: this.agedata2List,
              itemStyle:{
                normal:{color:'#FF9900'}
              }
            },
            {
              name: '大专',
              type: 'bar',
              barWidth : 20,//柱图宽度
              data: this.agedata3List,
              itemStyle:{
                normal:{color:'#FFD500'}
              }
            },
            {
              name: '中专(高中)',
              type: 'bar',
              barWidth : 20,//柱图宽度
              data: this.agedata4List,
              itemStyle:{
                normal:{color:'#95C81A'}
              }
            },
            {
              name: '高中以下',
              type: 'bar',
              barWidth : 20,//柱图宽度
              data: this.agedata5List,
              itemStyle:{
                normal:{color:'#46A2FF'}
              }
            },
            {
              name: '学历人数',
              type: 'line',
              data: this.agedata6List,
              itemStyle:{
                normal:{color:'#FFBF51'}
              }
            }
          ]

        }
        chart3.setOption(option3,true)
      },
      //党员类型分布图表引导线
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
      //党员类型分布
      getechartsType(){
        let chart4 = echarts.init(document.getElementById('echartsType'))
        let colorArr = ['#FE6054', '#FD6B34', '#FA7C20', '#F6961E', '#F2AE1B', '#F0BF1A','#ECD517', '#DCD82C', '#C2CE51', '#B0C869', '#97BF8D', '#7AB5B7','#65ADD3','#53A7ED']
        let data = this.partyList;
        let option4 = {
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
              radius: ['34%', '56%'],
              center: ["50%", "64%"],
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
        chart4.setOption(option4,true)
      },

    },
  }
</script>

<style scoped lang="scss">
  .list-content{
    margin-top:20px;
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
    width:calc((100% - 100px)/6);
    /*width:18.8%;*/
    min-width:204px;
    padding:20px 34px 18px 21px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-right:20px;
    /*margin-bottom:8px;*/
    background:#fff;
    height:118px;
    margin-bottom:10px;
  }
  .list-contentul li:last-of-type{
    /*width:calc(100% - 80% - 20px);*/
    margin-right:0;
  }
  .num{
    display:block;
    font-size: 40px;
    color: #999999;
  }
  .title{
    display:block;
    font-size: 16px;
    color: #666666;
  }
  .ul-right img{
    height:72px;
  }
  .secondBox{
    margin-top:10px;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .secondBox .box{
    width:calc((100% - 40px)/3);
    height:170px;
    margin-right:20px;
    padding:20px 20px;
    background:#fff;
  }
  .secondBox .box:last-of-type{
    margin-right:0;
  }
  .titlebox{
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .lefttitle{
    font-size: 20px;
    font-weight: 400;
    color: #333333;
  }
  .righttitle{
    font-size: 12px;
    line-height: 16px;
    color: #666666;
    display:flex;
    align-items: center;
  }
  .righttitle i{
    display:inline-block;
    font-style:normal;
    font-size: 14px;
    color: #ED3C3C;
    padding-left:5px;
    max-width:200px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .secondul{
    padding:0;
    margin:0;
    list-style:none;
    display:flex;
    justify-content: flex-start;
    padding-top:30px;
  }
  .secondul li{
    list-style:none;
    padding:0 10px;
    width:25%;
    text-align:center;
    position:relative;
  }
  .secondul li span{
    display:block;
  }
  .secondul li span i{
    font-style:normal;
    font-size: 24px;
    color: #FA824E;
  }
  .secondul li .number{
    font-size: 12px;
    color: #888888;
  }
  .secondul li .lititle{
    font-size: 14px;
    color: #666666;
    word-break: break-all;
    margin-top:20px;
  }
  .secondul li .line{
    position:absolute;
    top:12px;
    right:0;
    width:1px;
    height:39px;
    background:#D6D6D6;
  }
  .partyul{
    padding:0;
    margin:0;
    list-style:none;
    display:flex;
    justify-content: flex-start;
    padding-top:45px;
  }
  .partyul li{
    list-style:none;
    padding:0 10px;
    width:50%;
    text-align:center;
    position:relative;
    display:flex;
    justify-content: flex-start;
  }
  .partyul li .partyulDiv span{
    display:block;
  }
  .partyul li img{
    display:block;
    width:48px;
    height:52px;
  }
  .partyulDiv{
    padding-left:20px;
  }
  .partyulDiv .sex{
    font-size: 18px;
    font-weight: 400;
    color: #3D9EFF;
    text-align:left;
    margin-bottom:10px;
  }
  .partyulDiv .num{
    font-size: 16px;
    font-weight: 400;
    color: #888888;
    text-align:left;
  }
  .partyul li .line{
    position:absolute;
    bottom:0;
    right:0;
    width:1px;
    height:39px;
    background:#D6D6D6;
  }
  .partyul li:last-of-type{
    padding-left:30px;
  }

  .thirdBox{
    margin-top:20px;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .indrucontent{
    width:66.3%;
    height:440px;
    background:#fff;
    margin-right:20px;
  }
  .indrucontent .titlebox{
    padding:20px 20px;
  }
  .infotxt{
    padding:0px 20px;
    height:378px;
    overflow:hidden;
  }
  .infotxt /deep/ .el-textarea.is-disabled .el-textarea__inner {
     background-color: #fff;
     border-color: #fff;
     color: #666666;
     cursor:default;
     padding:0 0;
  }
  .infotxt /deep/ .base-table-empty{
    height:100%;
  }
  .infocontenttxt{
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #666666;
  }
  .lifecontent{
    padding:20px 20px;
    width:calc(33.7% - 20px);
    background:#fff;
    height:440px;
  }
  .fouthBox{
    margin-top:20px;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .partyage{
    padding:20px 20px;
    width:66.3%;
    background:#fff;
    margin-right:20px;
  }
  .partytype{
    padding:20px 20px;
    width:calc(33.7% - 20px);
    background:#fff;
  }


</style>

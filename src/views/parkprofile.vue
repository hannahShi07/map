<template>
  <div class="home-cla">
    <!--公用部分-->
    <com-backgroun-box :index="0">
      <!--页面内容-->
      <!--上半部分-->
      <div class="content-box">
        <div class="content-top">
          <div class="content-left-one">
            <div class="content-box-one">
              <div class="content-top-left-title">
                <img src="../assets/image/parkprofile/parkprofile-icon1.png">
                <span>纳入全省非公党建信息管理平台企业数</span>
              </div>
              <div class="echart1" id="echart1" style="width:100%;height:calc(100% - 5.92vh);"></div>
            </div>
            <div class="content-box-two">
              <div class="content-top-left-title">
                <img src="../assets/image/parkprofile/parkprofile-icon2.png">
                <span>非公企业数党员数</span>
              </div>
              <div class="echart2" id="echart2" style="width:100%;height:calc(100% - 5.92vh);"></div>
            </div>
          </div>
          <div class="content-left-two">
            <div :class="(i == 1)?'selected1':'map-northbox'" @click="nouthClick" style="cursor:pointer"><span>北区
            </span></div>
            <div :class="(i == 2)?'selected2':'map-southbox'" @click="southClick" style="cursor: pointer"><span>南区
            </span></div>
            <div id="container" class="map" tabindex="0"></div>
          </div>
          <div class="content-right-three">
            <div class="content-right-item">
              <img src="../assets/image/parkprofile/icon1.png">
              <span class="name">党务工作者</span>
              <div class="unit"><span>{{gardenPartyWorkerNum}}</span>名</div>
            </div>
            <div class="content-right-item">
              <img src="../assets/image/parkprofile/icon2.png">
              <span class="name">非公企业党组织书记</span>
              <div class="unit"><span>{{gardenPrivateSecretaryNum}}</span>名</div>
            </div>
            <div class="content-right-item">
              <img src="../assets/image/parkprofile/icon3.png">
              <span class="name">专职党务工作者</span>
              <div class="unit"><span>{{gardenFullPartyNum}}</span>名</div>
            </div>
            <div class="content-right-item">
              <img src="../assets/image/parkprofile/icon4.png">
              <span class="name">专职党组织书记 <br/>（不担任公司其他职务）</span>
              <div class="unit"><span>{{gardenOrgSecretaryNum}}</span>名</div>
            </div>
            <div class="content-right-item">
              <img src="../assets/image/parkprofile/icon5.png">
              <span class="name">有专职党务工作者的 <br/>非公企业</span>
              <div class="unit"><span>{{gardenCompanyFullPartyNum}}</span>名</div>
            </div>
            <div class="content-right-item">
              <img src="../assets/image/parkprofile/icon6.png">
              <span class="name">党建工作指导员 <br/>（联络员）</span>
              <div class="unit"><span>{{gardenGuideNum}}</span>名</div>
            </div>
          </div>
          <div class="content-right-four">
            <div class="content-box-one">
              <div class="content-top-left-title">
                <img src="../assets/image/parkprofile/parkprofile-icon3.png">
                <span>单位性质分布图</span>
              </div>
              <div class="echart3" id="echart3" style="width:100%;height:calc(100% - 5.92vh);"></div>
            </div>
            <div class="content-box-two">
              <div class="content-top-left-title">
                <img src="../assets/image/parkprofile/parkprofile-icon4.png">
                <span>党组织分布</span>
              </div>
              <div class="echart4" id="echart4" style="width:100%;height:calc(100% - 5.92vh);"></div>
            </div>
          </div>
        </div>
        <!--下半部分-->
        <div class="content-bottom">
          <div class="content-bottom-one">
            <div class="content-bottom-title">
              <img src="../assets/image/parkprofile/parkprofile-icon5.png">
              <span>党员发展数量统计</span>
            </div>
            <div class="echart1" id="echart5" style="width:100%;height:calc(100% - 5.92vh);"></div>
          </div>
          <div class="content-bottom-two">
            <div class="content-bottom-title">
              <img src="../assets/image/parkprofile/parkprofile-icon6.png">
              <span>年龄学历分布图</span>
            </div>
            <div class="echart1" id="echart6" style="width:100%;height:calc(100% - 5.92vh);"></div>
          </div>
          <div class="content-bottom-three">
            <div class="content-bottom-title">
              <img src="../assets/image/parkprofile/parkprofile-icon7.png">
              <span>性别分布</span>
            </div>
            <div class="echart1" id="echart7" style="width:100%;height:calc(100% - 5.92vh);"></div>
          </div>
        </div>
      </div>
    </com-backgroun-box>

  </div>
</template>

<script>
  import ComBackgrounBox from '@/components/com-background-box'
  import commonReq  from "@/api/public/commonReq.js"
  import {getEchartsData,getSexData,getAgeData,getStatisticsData,getDistributionData} from
      '@/api/screen/parkprofile.js'
  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    name: 'parkprofile',
    components: {
      ComBackgrounBox
    },
    data(){
      return {
        vw : 0, // 可是宽度
        vh : 0, // 可是高度
        i:2, //默认选中2
        loading:false,
        gardenPartyWorkerNum:'',   //党务工作者数
        gardenPrivateSecretaryNum:'',   //非公企业党组织书记人数
        gardenFullPartyNum:'',    //专职党务工作者人数
        gardenOrgSecretaryNum:'',    //专职党组织书记（不担任公司其他职务）
        gardenCompanyFullPartyNum:'',    //有专职党务工作者的非公企业
        gardenGuideNum:'',    //党建工作指导员（联络员）数
        park_south_coordinate:[],  //南区经纬度
        park_north_coordinate:[]   //北区经纬度
      }
    },
    mounted() {
      this.$nextTick(() =>{
        this.onResize();

        window.addEventListener('resize', this.onResize );

      })
      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("echart1")).resize();
        this.$echarts.init(document.getElementById("echart2")).resize();
        this.$echarts.init(document.getElementById("echart3")).resize();
        this.$echarts.init(document.getElementById("echart4")).resize();
        this.$echarts.init(document.getElementById("echart5")).resize();
        this.$echarts.init(document.getElementById("map")).resize();
      };
      window.addEventListener("resize", this.resizefun);

      this.toEchartsData()
      this.toSex()
      this.toAge()
      this.toStatistics()
      this.toDistribution()
      this.getCommDict()
    },
    methods:{
      getW(w) {
        return w / 3840 * this.vw;
      },
      getH(h) {
        return h / 2160 * this.vh;
      },
      // 比例缩放
      onResize() {
        this.vw = document.documentElement.clientWidth;
        this.vh = document.documentElement.clientHeight;
      },

        // 园区概况管理查看详情
      toEchartsData(){
        this.loading = true
        let params = {}
        getEchartsData(params).then(respone =>{
          const res = respone
          let gardenPrivateCompanyNum =res.gardenPrivateCompanyNum  //园区非公企业数
          let gardenPrivateOrgNum =res.gardenPrivateOrgNum   //非公企业成立党组织数
          let gardenManagerialNum =res.gardenManagerialNum   //管理岗位数
          let gardenBackboneNum =res.gardenBackboneNum   //技术骨干数
          let gardenWorkerNum =res.gardenWorkerNum   //一线员工数
          let gardenCompanyMoneyNum =res.gardenCompanyMoneyNum   //企业出资人数
          this.gardenPartyWorkerNum =res.gardenPartyWorkerNum   //党务工作者数
          this.gardenPrivateSecretaryNum =res.gardenPrivateSecretaryNum   //非公企业党组织书记人数
          this.gardenFullPartyNum =res.gardenFullPartyNum   //专职党务工作者人数
          this.gardenOrgSecretaryNum =res.gardenOrgSecretaryNum   //专职党组织书记（不担任公司其他职务）
          this.gardenCompanyFullPartyNum =res.gardenCompanyFullPartyNum   //有专职党务工作者的非公企业
          this.gardenGuideNum =res.gardenGuideNum   //党建工作指导员（联络员）数
          let gardenAllyPartyNum =res.gardenAllyPartyNum   //联合党支部
          let gardenPartyNum =res.gardenPartyNum   //党支部
          let gardenTradePoliticalNum =res.gardenTradePoliticalNum   //党委
          this.getParkNum(gardenPrivateCompanyNum,gardenPrivateOrgNum)
          this.getNonpublicNum(gardenManagerialNum,gardenBackboneNum,gardenWorkerNum,gardenCompanyMoneyNum)
          this.getOrganizations(gardenAllyPartyNum,gardenPartyNum,gardenTradePoliticalNum)
        })
        this.loading = true
      },
      // 性别分布图
      toSex(){
        this.loading = true
        let params = {}
        getSexData(params).then(respone =>{
          const res = respone
          let man =res.man  //男性人数
          let woman =res.woman   //女性人数
          let total =res.total   //总数
          this.getGender(man,woman)
        })
        this.loading = true
      },
      // 年龄分布图
      toAge(){
        this.loading = true
        let params = {}
        getAgeData(params).then(respone =>{
          const res = respone
          let age = []
          let seriesArr = [
            {name:'学历人数',data:[]},
            {name:'研究生',data:[]},
            {name:'本科',data:[]},
            {name:'大专',data:[]},
            {name:'中专(职高技校)',data:[]},
            {name:'高中',data:[]},
            {name:'初中及以下',data:[]},
          ];
          res.map(val=>{
            age.push(val.age+'岁')
            seriesArr.map(info => {
              if(info.name == '研究生'){
                info.data.push(val.graduateStudent)
              }else if(info.name == '本科'){
                info.data.push(val.regular)
              }else if(info.name == '大专'){
                info.data.push(val.junior)
              }else if(info.name == '中专(职高技校)'){
                info.data.push(val.technical)
              }else if(info.name == '高中'){
                info.data.push(val.senior)
              }else if(info.name == '初中及以下'){
                info.data.push(val.primarys)
              }else if(info.name == '学历人数'){
                info.data.push(val.num)
              }
            })
          })
          this.getEducation(age,seriesArr)
        })
        this.loading = true
      },
      // 党员发展数量统计
      toStatistics(){
        this.loading = true
        let params = {}
        getStatisticsData(params).then(respone =>{
          const res = respone.map
          let yearList = []
          let num = []
          res.map(val=>{
            yearList.push(val.YEAR)
            num.push(val.num)
          })
          this.getStatistics(yearList,num)
        })
        this.loading = true
      },
      // 单位性质
      toDistribution(){
        this.loading = true
        let params = {}
        getDistributionData(params).then(respone =>{
          const res = respone
          let nameList = [];
          let num = [];
          let mark = '';
          let data = [];
          res.map(value=>{
            if(value.workUnit !== undefined) {
              // if (value.workUnit == 1) {
              //   mark = '国有企业';
              // } else if (value.workUnit == 2) {
              //   mark = '有限责任公司';
              // } else if (value.workUnit == 3) {
              //   mark = '股份有限公司';
              // } else if (value.workUnit == 4) {
              //   mark = '集体所有制';
              // } else if (value.workUnit == 5) {
              //   mark = '个体工商户';
              // } else if (value.workUnit == 6) {
              //   mark = '港澳台合伙制企业';
              // } else if (value.workUnit == 7) {
              //   mark = '外商投资企业';
              // } else if (value.workUnit == 8) {
              //   mark = '私营独资企业';
              // } else if (value.workUnit == 9) {
              //   mark = '私营企业';
              // } else if (value.workUnit == 10) {
              //   mark = '个人独资企业';
              // } else if (value.workUnit == 11) {
              //   mark = '个人企业';
              // } else if (value.workUnit == 13) {
              //   mark = '其他';
              // } else {
              //   mark = '';
              // }
              // if (value.workUnit !== '') {
                nameList.push(value.workUnit + ' : ' + value.personNum + '人');
                data.push(value.workUnit);
                num.push(value.personNum);
              // }
            }
          })
          this.getDistribution(nameList,num,data)
        })
        this.loading = true
      },
      //纳入全省非公党建信息管理平台企业数
      getParkNum(gardenPrivateCompanyNum,gardenPrivateOrgNum){
        let chart1 = echarts.init(document.getElementById('echart1'))
        var xdata = ['非公企业', '非公企业成立党组织'];
        var data = [gardenPrivateCompanyNum,gardenPrivateOrgNum];
        var maxArr = [gardenPrivateCompanyNum,gardenPrivateOrgNum];
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: '#fff',
              fontSize: this.getW(24),
            },
            formatter: function(params) {
              return (
                params[0].name + ":" + params[0].value
              );
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            top: "15%",
            bottom: "5%",
            containLabel: true
          },
          xAxis: {
            data: xdata,
            triggerEvent: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              rotate: 0,
              interval: 0,
              textStyle: {
                fontSize: this.getW(24),
                color: '#fff'
              }
            }
          },
          yAxis: {
            // name: "单位：个数",
            triggerEvent: true,
            minInterval: 1,//y轴的刻度只显示整数
            splitLine: {
              show: true,
              lineStyle: {
                width:1,
                color: '#0173FA',
                opacity:0.2,
                type: 'dashed',
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                width:1,
                color: '#0173FA',
                opacity:0.2,
                type: 'dashed',
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ffffff",
                fontSize: this.getW(24)
              }
            }
          },
          series: [{
            name: "数量",
            barMinHeight: 10,
            type: "pictorialBar",
            barCategoryGap: "60%",
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                //渐变色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "#02FFFF"
                },
                  {
                    offset: 1,
                    color: "rgba(2, 255, 255, 0.1)"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize:this.getW(24)
                }
              }
            },
            data: data,
            z: 10
          },
            {
              name: "hill",
              type: "bar",
              barWidth: '20%',
              symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
              itemStyle: {
                normal: {
                  color: "rgba(11,47,68,.0)"
                }
              },
              data: maxArr,
              z: 9
            }
          ]
        }

        chart1.setOption(option,true)
      },
      //非公企业数党员数
      getNonpublicNum(gardenManagerialNum,gardenBackboneNum,gardenWorkerNum,gardenCompanyMoneyNum){
        let chart2 = echarts.init(document.getElementById('echart2'))
        let colorArr = [
          {
            top:'rgba(248, 207, 90, 0.1)',
            bottom: '#F8CF5A',
          },
          {
            top:'rgba(133, 246, 123, 0.1)',
            bottom: '#85F67B',
          },

          {
            top:'rgba(10, 218, 250, 0.1)',
            bottom: '#0ADAFA',
          },
          {
            top:'rgba(43, 161, 255, 0.1)',
            bottom: '#2BA1FF',
          }
        ];
        let option = {
          grid: {
            top: '5%',
            left: '2%',
            bottom: '5%',
            containLabel: true
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',          //标题背景色
            borderColor: 'rgba(0,0,0,0.5)',                     //边框颜色
            textStyle: {
              color: '#fff',
              fontSize: this.getW(24),
            },
            formatter: "{b} : {c}"
          },
          yAxis: [{
            type: 'category',
            color: '#59588D',
            data: [ '企业出资人', '一线员工', '技术骨干','管理岗位'],
            axisLabel: {
              color: '#FFFFFE',
              textStyle: {
                fontSize: this.getW(24)
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(107,107,107,0.37)',
              }
            },
            axisTick: {
              show: false
            },
          }],
          xAxis: [{
            min: 0,
            // max: 100,
            axisLabel: {
              formatter: '{value}',
              color: '#FFFFFE',
              textStyle: {
                fontSize: this.getW(24)
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(107,107,107,0.37)',
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                width:1,
                color: '#0173FA',
                opacity:0.2,
                type: 'dashed',
              }
            }
          }],
          series: [{
            type: 'bar',
            data: [gardenCompanyMoneyNum,gardenWorkerNum,gardenBackboneNum,gardenManagerialNum],
            barWidth: this.getW(50),
            itemStyle: {
              normal: {
                color: function(params) {
                  let num = colorArr.length;
                  return new echarts.graphic.LinearGradient(0, 1, 1, 1,[{
                    offset: 0,
                    color: colorArr[params.dataIndex % num].top // 0% 处的颜色
                  },
                    {
                      offset: 1,
                      color: colorArr[params.dataIndex % num].bottom
                    }
                  ])
                },
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: this.getW(24),
                fontWeight: 'bold',
                color: '#FFFFFE',
                position: 'right',
                formatter: '{c}名'
              }
            }
          }]
        };
        chart2.setOption(option,true)
      },
      //首页高德地图中心点调用字典接口
      getCommDict(){
        let params = {
          types:['park_south_coordinate','park_north_coordinate']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
            res.park_south_coordinate.map(val =>{
              this.park_south_coordinate.push(parseFloat(val.name))
            });
            res.park_north_coordinate.map(val=>{
              this.park_north_coordinate.push(parseFloat(val.name))
            })
          this.init( this.park_south_coordinate)

        })
      },
      southClick(){
        this.init(this.park_south_coordinate)
        this.i = 2
      },
      nouthClick(){
        this.init(this.park_north_coordinate)
        this.i = 1
      },
      init(arr){
        var map = new AMap.Map('container', {
          zoom: 15,
          center: arr,
          resizeEnable: true,
        })
        var satelliteLayer = new AMap.TileLayer.Traffic() // 高德图层
        map.add(satelliteLayer) // 添加卫星图层，不添加就是标准图层（如果要两个一起（卫星图层和标准图层）可以点击事件触发map.add(satelliteLayer)删除用map.remove(satelliteLayer)）

        // var citys = [
        //   {lnglat: [116.218446, 34.676622], name: '1生命公园', num: 10, count: 15, cou: 45},
        //   {lnglat: [113.223446, 36.686622], name: '2生命公园', num: 12, count: 15, cou: 45},
        //   {lnglat: [116.232446, 38.666622], name: '3生命公园', num: 13, count: 15, cou: 45}
        // ]
        // var mass = new AMap.MassMarks( {
        //   opacity: 0.8,
        //   zIndex: 111,
        //   cursor: 'pointer',
        //   style: { // mass.setStyle(style)
        //     // url: '../assets/image/flag.png', // 定位图标
        //     anchor: new AMap.Pixel(6, 6),
        //     size: new AMap.Size(25, 34)
        //   }
        // })
      //   mass.setMap(map)
      //   mass.on('mouseover', e => { // AMap.event.addListener(mass, 'mouseover', e => {})
      //     infoWindow = new AMap.InfoWindow({
      //       isCustom: true, // 使用自定义窗体
      //       content: `
      //   <div class="title">${e.data.name}</div>
      //   <div class="info-text">
      //     <div class="raduis"></div>数量: ${e.data.num}
      //   </div>
      //   <div class="info-text">
      //     <div class="raduis"></div>人数: ${e.data.count}
      //   </div>
      //   <div class="info-text">
      //     <div class="raduis"></div>姓名: ${e.data.cou}
      //   </div>
      // `,
      //       offset: new AMap.Pixel(8, -200) // 弹窗偏移位置(弹窗位置会根据content内容变动，先把内容写完再调试弹窗位置细节)
      //     })
      //     infoWindow.open(map, [e.data.lnglat.lng, e.data.lnglat.lat])
      //   })
      //   mass.on('mouseout', e => {
      //     if (infoWindow) infoWindow.close() // 关闭弹窗
      //   })
      },
      //单位性质分布图
      getDistribution(nameList,num,data){
        let chart3 = echarts.init(document.getElementById('echart3'))
        let colorList = ['#FF6666','#679DFF', '#43CB7D', '#FFC940', '#FF9066',
          '#8674FF','#e16d6d','#6d96e1','#3ac475','#e8bb4a','#de815d','#7c6fd5']
        let name = data
        let nameNum = nameList
        var option = {
          color:colorList,
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',          //标题背景色
            borderColor: 'rgba(0,0,0,0.8)',                     //边框颜色
            textStyle: {
              color: '#fff',
              fontSize:this.getW(24)
            },
            // formatter: "{b} : {c}"
            formatter: function (params) {
              return (nameNum[params.dataIndex] )
            },
          },
          legend:{
            show: false,
            textStyle:{   //图例文字颜色样式
              color:'#FFFFFF',
              fontSize: this.getW(24)
            }
          },
          series : [
            {
              type: 'pie',
              radius : '65%',
              center: ['50%', '50%'],
              // selectedMode: 'single',
              data:num,
              itemStyle: {
                normal: {
                  color: function(params) {
                    return colorList[params.dataIndex]
                  }
                },
              },
              label: {
                normal: {
                  show: true,
                  fontSize: this.getW(24),
                  color: '#FFFFFF',
                  formatter: function (params) {
                    return name[params.dataIndex]
                  },
                },
              }
            }
          ]
        };
        chart3.setOption(option,true)
      },
      //党组织分布
      getOrganizations(gardenAllyPartyNum,gardenPartyNum,gardenTradePoliticalNum){
        let arr1=[gardenAllyPartyNum,gardenPartyNum,gardenTradePoliticalNum]
        //let arr1=[30,2300,57680]
        // 最大值
        let max=Math.max(...arr1)

        let chart4 = echarts.init(document.getElementById('echart4'))
        let colorArr = [
          {
            top:'rgba(133, 246, 123, 0.1)',
            bottom: '#85F67B',
          },

          {
            top:'rgba(10, 218, 250, 0.1)',
            bottom: '#0ADAFA',
          },
          {
            top:'rgba(43, 161, 255, 0.1)',
            bottom: '#2BA1FF',
          }
        ];
        let option = {
          grid: {
            top: '5%',
            left: '2%',
            bottom: '5%',
            containLabel: true
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',          //标题背景色
            borderColor: 'rgba(0,0,0,0.5)',                     //边框颜色
            textStyle: {
              color: '#fff',
              fontSize: this.getW(24),
            },
            formatter: "{b} : {c} "
          },
          yAxis: [{
            type: 'category',
            color: '#59588D',
            data: [ '党委', '党支部', '联合党支部'],
            axisLabel: {
              margin: 20,
              color: '#FFFFFE',
              textStyle: {
                fontSize: this.getW(24)
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(107,107,107,0.37)',
              }
            },
            axisTick: {
              show: false
            },
          }],
          xAxis: [{
            min: 0,
            max: max,
            splitNumber:4,
            // interval:intervalNum,
            axisLabel: {
              formatter: '{value}',
              color: '#FFFFFE',
              textStyle: {
                fontSize: this.getW(24)
              },
            },
            axisLine: {
              show:false,
              lineStyle: {
                color: 'rgba(107,107,107,0.37)',
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                width:1,
                color: '#0173FA',
                opacity:0.2,
                type: 'dashed',
              }
            }
          }],
          series: [{
            type: 'bar',
            data: arr1,
            barWidth: this.getW(50),
            itemStyle: {
              normal: {
                color: function(params) {
                  let num = colorArr.length;
                  return new echarts.graphic.LinearGradient(0, 1, 1, 1,[{
                    offset: 0,
                    color: colorArr[params.dataIndex % num].top // 0% 处的颜色
                  },
                    {
                      offset: 1,
                      color: colorArr[params.dataIndex % num].bottom
                    }
                  ])
                },
              }
            },
          }]
        };
        chart4.setOption(option,true)
      },
      //党员发展数量统计
      getStatistics(yearList,num){
        let chart5 = echarts.init(document.getElementById('echart5'))
        let option = {
          grid: {
            left: '3%',
            right: '4%',
            top: '5%',
            bottom: '5%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.5)',          //标题背景色
            borderColor: 'rgba(0,0,0,0.5)',                     //边框颜色
            textStyle: {
              color: '#fff' ,
              fontSize:this.getW(24)
            },
            formatter: "{b}<br>{a} : {c}",
            axisPointer: {
              lineStyle: {
                width: 0
              }
            },
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                textStyle: {
                  color: '#FFFFFF',  //更改坐标轴文字颜色
                  fontSize : this.getW(24)      //更改坐标轴文字大小
                }
              },
              axisTick: {
                show: false
              },
              axisLine:{
                lineStyle:{
                  color: '#0173FA',
                  opacity:0.2,
                  width: 1,
                  type:'dashed'
                }
              },
              data: yearList
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale : true,
              min : 0,
              splitNumber : 5,
              axisLabel: {
                textStyle: {
                  color: '#FFFFFF',  //更改坐标轴文字颜色
                  fontSize : this.getW(24)      //更改坐标轴文字大小
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#0173FA',
                  opacity:0.2,
                  type:'dashed'
                }
              },
              splitLine:{
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#0173FA',
                  opacity:0.2,
                  type:'dashed'
                }
              }
            },

          ],
          series: [
            {
              name: '党员人数统计',
              type: 'line',
              stack: '总量',
              areaStyle: {
                backgroundColor:'#02FFFF',
                opacity:0.1
              },
              itemStyle:{
                borderColor:'#02FFFF',
                borderWidth:4,
                normal: {
                  color: '#02FFFF', //改变折线点的颜色
                  lineStyle: {
                    color: '#02FFFF' //改变折线颜色
                  }
                }
              },
              emphasis: {
                focus: 'series'
              },
              symbol:'none',
              data:num
            }
          ]
        };
        chart5.setOption(option,true)
      },
      //年龄学历分布图
      getEducation(age,seriesArr){
        let colorList = ['#02FFFF','#2BA1FF','#0ADAFA','#85F67B','#F8CF5A','#8197F5','#FF6666']
        let series = [];
        let legendData = [];
        seriesArr.map((value,index)=>{
          legendData.push(value.name);
          var obj = {
            name:value.name,
            type:'bar',
            // symbol: 'none',
            barWidth: this.getW(20),//柱图宽度
            // barGap: 0,//柱子之间无缝隙
            data:value.data,
            itemStyle: {
              normal: {
                color: colorList[index],
              }
            },
          };
          if(value.name == '学历人数'){
            obj.type = 'line';
            obj.symbol = 'none';
            obj.zlevel = 1;
          }
          series.push(obj)
        })
        let chart6 = echarts.init(document.getElementById('echart6'));
        let option = {
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',          //标题背景色
            borderColor: 'rgba(0,0,0,0.5)',                     //边框颜色
            textStyle: {
              color: '#fff',
              fontSize:this.getW(24)
            },
            trigger: 'axis',
            axisPointer : {
              type : 'shadow'
            },
            // formatter: "{b}<br />{a0} : {c0}<br />{a1} : {c1}<br />{a2} : {c2}<br />{a3} : {c3}<br />{a4} : {c4}<br />{a5} : {c5}<br />{a6} : {c6}"
          },
          legend: {
            show:true,
            x: 'right', //居右显示
            itemHeight  :5,//改变图标大小
            itemWidth  :9,//改变图标大小
            textStyle: {
              fontSize: this.getW(24),
              color:'#FFFFFF',
            },
          },
          grid: {
            top:'15%',
            left: '1%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              nameTextStyle: {
                fontSize: this.getW(24)
              },
              axisTick: {
                show: false
              },
              position: 'left',//位置靠左
              axisLabel: {
                // interval:0,
                // rotate:40,
                textStyle: {
                  color: '#FFFFFF',  //更改坐标轴文字颜色
                  fontSize : this.getW(24)      //更改坐标轴文字大小
                }
              },
              axisLine:{
                lineStyle:{
                  color: '#FFC70D',
                  opacity:0.2,
                  width: 1,
                  type:'dashed'
                }
              },
              splitLine:{
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#FFC70D',
                  opacity:0.2,
                  type:'dashed'
                }
              },
              data: age,
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLabel: {
                // formatter: '{value}',
                textStyle: {
                  color: '#FFFFFF',  //更改坐标轴文字颜色
                  fontSize : this.getW(24)      //更改坐标轴文字大小
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#FFC70D',
                  opacity:0.2,
                  type:'dashed'
                }
              },
              splitLine:{
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#FFC70D',
                  opacity:0.2,
                  type:'dashed'
                }
              }
            }
          ],
          series:series
        };
        chart6.setOption(option,true)
      },
      //性别分布
      getGender(manPer,womanPer){
        let chart7 = echarts.init(document.getElementById('echart7'));
        let option = {
          title: {
            x: "center",
            y: "30%",
            textStyle: {
              color: "#333",
              fontSize: this.getW(24)
            }
          },
          // tooltip: {
          //     backgroundColor: 'rgba(0,0,0,0.5)',          //标题背景色
          //     borderColor: 'rgba(0,0,0,0.5)',                     //边框颜色
          //     textStyle: { color: '#fff' },
          //     formatter: "{b} : {d}%"
          // },

          // calculable: true,
          series: [{
            name: "",
            type: "pie",
            radius: ["45%", "80%"],
            center: ["50%", "50%"],
            data: [{
              value: manPer,
              name: "男性"
            },
              {
                value: womanPer,
                name: "女性"
              }
            ],
            label: {
              normal: {
                formatter:function(data){
                  return data.name + data.percent.toFixed(2)+"%";
                },
                fontSize: this.getW(24),
                color:'#fff',
                // position: 'out'
                show: true,
                position: 'outside'
              },
              show: true,
            },
            labelLine: {
              normal: {
                show: true,
                length: 10,
                length2: 10,
                // lineStyle: {
                //     color: '#FFE8B7'
                // }
              }
            },
          },
          ],
          color: ["#FF6666", "#679DFF"]
        };
        chart7.setOption(option,true)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content-box {

  }
  .content-top {
    display: flex;
    justify-content: left;
    margin-bottom:1.56vw;
  }
  .content-left-one {
    .content-box-one{
      width:22.7vw;
      height:25.9vh;
      background:url('../assets/image/parkprofile/park-bg-img1.png') no-repeat;
      background-size:100% 100%;
      margin:0 1.56vw 1.56vw 0;

      .content-top-left-title {
        width:22.4vw;
        height:5.92vh;
        background:url('../assets/image/parkprofile/park-top-bg1.png') no-repeat;
        background-size:100% 100%;
        font-size: 0.9375vw;
        /*font-weight: bold;*/
        color: #FFFFFF;
        padding-left:1.16vw;
        display:flex;
        justify-content: flex-start;
        align-items: center;
      }
      .content-top-left-title img{
        width:1.05vw;
        height:1.05vw;
        margin-right:0.57vw;
      }
    }
    .content-box-two{
      width:22.7vw;
      height:25.9vh;
      background:url('../assets/image/parkprofile/park-bg-img1.png') no-repeat;
      background-size:100% 100%;
      .content-top-left-title {
        width:22.4vw;
        height:5.92vh;
        background:url('../assets/image/parkprofile/park-top-bg1.png') no-repeat;
        background-size:100% 100%;
        font-size: 0.9375vw;
        /*font-weight: bold;*/
        color: #FFFFFF;
        padding-left:1.16vw;
        display:flex;
        justify-content: flex-start;
        align-items: center;
      }
      .content-top-left-title img{
        width:1.05vw;
        height:1.05vw;
        margin-right:0.57vw;
      }
    }
  }
  .content-left-two{
    width:30.7vw;
    height: 54.6vh;
    margin-right:1.56vw;
    position: relative;


    .map-northbox{
      position: absolute;
      z-index: 9999;
      text-align: center;
      top: 1vw;
      left: 1vw;
      width: 6.25vw;
      height: 3.7vh;
      display:flex;
      justify-content: center;
      align-items:center;
      background: linear-gradient(90deg, rgba(0, 34, 65, 0.6), rgba(0, 79, 153, 0.6));
      border: 4px solid;
      border-image: radial-gradient(circle, rgba(0, 54, 104, 0.5), rgba(2, 187, 255, 0.5), rgba(0, 132, 255, 0.5)) 4 4;
    }
    .map-northbox span{
      font-size: 0.78vw;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #02DEFF;
      opacity: 0.7;
    }
    .selected1{
      position: absolute;
      z-index: 9999;
      text-align: center;
      top: 1vw;
      left: 1vw;
      width: 6.25vw;
      height: 3.7vh;
      display:flex;
      justify-content: center;
      align-items:center;
      background: linear-gradient(90deg, rgba(0, 34, 65, 0.6), rgba(0, 79, 153, 0.6));
      border: 4px solid;
      border-image: radial-gradient(circle, rgba(0, 54, 104, 0.5), rgba(2, 187, 255, 0.5), rgba(0, 132, 255, 0.5)) 4 4;
    }
    .selected1 span{
      font-size: 0.78vw;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #02FFFF;
    }
    .selected2{
      position: absolute;
      z-index: 9999;
      text-align: center;
      top: 3.5vw;
      left: 1vw;
      width: 6.25vw;
      height: 3.7vh;
      display:flex;
      justify-content: center;
      align-items:center;
      background: linear-gradient(90deg, rgba(0, 34, 65, 0.6), rgba(0, 79, 153, 0.6));
      border: 4px solid;
      border-image: radial-gradient(circle, rgba(0, 54, 104, 0.5), rgba(2, 187, 255, 0.5), rgba(0, 132, 255, 0.5)) 4 4;
    }
    .selected2 span{
      font-size: 0.78vw;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #02FFFF;
    }
    .map-southbox{
      position: absolute;
      z-index: 9999;
      text-align: center;
      top: 3.5vw;
      left: 1vw;
      width: 6.25vw;
      height: 3.7vh;
      display:flex;
      justify-content: center;
      align-items:center;
      background: linear-gradient(90deg, rgba(0, 34, 65, 0.6), rgba(0, 79, 153, 0.6));
      border: 4px solid;
      border-image: radial-gradient(circle, rgba(0, 54, 104, 0.5), rgba(2, 187, 255, 0.5), rgba(0, 132, 255, 0.5)) 4 4;
    }
    .map-southbox span{
      font-size: 0.78vw;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #02DEFF;
      opacity: 0.7;
    }
    .map{
      width:30.7vw;
      height:54.6vh;
    }
  }
  .content-right-three{
    margin-right: 1.56vw;
    .content-right-item{
      display: flex;
      justify-content:left;
      align-items: center;
      width:14.9vw;
      height:7.5vh;
      background:url('../assets/image/parkprofile/six-bg.png') no-repeat;
      background-size:100% 100%;
      padding:0 1.0vw;
      margin-bottom: 1.0vw;
    }
    .content-right-item:last-child{
      margin-bottom: 0;
    }
    .content-right-item img{
      width: 1.6vw;
      height: 1.6vw;
      margin-right: 0.5vw;
    }
    .content-right-item .name{
      width: 7.0vw;
      font-size: 0.6vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      /*margin-right: 0.5vw;*/
    }
    .content-right-item .unit{
      font-size: 0.6vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      width: 4vw;
      text-align: right;
    }
    .content-right-item .unit span{
      font-size: 1.2vw;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #FFFFFF;
    }

  }
  .content-right-four {
    .content-box-one{
      width:22.7vw;
      height:25.9vh;
      background:url('../assets/image/parkprofile/park-bg-img1.png') no-repeat;
      background-size:100% 100%;
      margin:0 1.56vw 1.56vw 0;

      .content-top-left-title {
        width:22.4vw;
        height:5.92vh;
        background:url('../assets/image/parkprofile/park-top-bg1.png') no-repeat;
        background-size:100% 100%;
        font-size: 0.9375vw;
        /*font-weight: bold;*/
        color: #FFFFFF;
        padding-left:1.16vw;
        display:flex;
        justify-content: flex-start;
        align-items: center;
      }
      .content-top-left-title img{
        width:1.05vw;
        height:1.05vw;
        margin-right:0.57vw;
      }
    }
    .content-box-two{
      width:22.7vw;
      height:25.9vh;
      background:url('../assets/image/parkprofile/park-bg-img1.png') no-repeat;
      background-size:100% 100%;
      .content-top-left-title {
        width:22.4vw;
        height:5.92vh;
        background:url('../assets/image/parkprofile/park-top-bg1.png') no-repeat;
        background-size:100% 100%;
        font-size: 0.9375vw;
        /*font-weight: bold;*/
        color: #FFFFFF;
        padding-left:1.16vw;
        display:flex;
        justify-content: flex-start;
        align-items: center;
      }
      .content-top-left-title img{
        width:1.05vw;
        height:1.05vw;
        margin-right:0.57vw;
      }
    }
  }
  .content-bottom{
    display: flex;
    justify-content: left;
  }
  .content-bottom-one{
    width:30.98vw;
    height:25.9vh;
    background:url('../assets/image/parkprofile/park-bg-img2.png') no-repeat;
    background-size:100% 100%;
    margin:0 1.56vw 0 0;

    .content-bottom-title {
      width:30.7vw;
      height:5.92vh;
      background:url('../assets/image/parkprofile/park-top-bg2.png') no-repeat;
      background-size:100% 100%;
      font-size: 0.9375vw;
      /*font-weight: bold;*/
      color: #FFFFFF;
      padding-left:1.16vw;
      display:flex;
      justify-content: flex-start;
      align-items: center;
    }
    .content-bottom-title img{
      width:1.05vw;
      height:1.05vw;
      margin-right:0.57vw;
    }
  }
  .content-bottom-two{
    width:30.72vw;
    height:25.9vh;
    background:url('../assets/image/parkprofile/park-bg-img3.png') no-repeat;
    background-size:100% 100%;
    margin:0 1.56vw 0 0;

    .content-bottom-title {
      width:30.4vw;
      height:5.92vh;
      background:url('../assets/image/parkprofile/park-top-bg3.png') no-repeat;
      background-size:100% 100%;
      font-size: 0.9375vw;
      /*font-weight: bold;*/
      color: #FFFFFF;
      padding-left:1.16vw;
      display:flex;
      justify-content: flex-start;
      align-items: center;
    }
    .content-bottom-title img{
      width:1.05vw;
      height:1.05vw;
      margin-right:0.57vw;
    }
  }
  .content-bottom-three{
    width:30.98vw;
    height:25.9vh;
    background:url('../assets/image/parkprofile/park-bg-img2.png') no-repeat;
    background-size:100% 100%;
    margin:0 0 0 0;

    .content-bottom-title {
      width:30.4vw;
      height:5.92vh;
      background:url('../assets/image/parkprofile/park-top-bg3.png') no-repeat;
      background-size:100% 100%;
      font-size: 0.9375vw;
      /*font-weight: bold;*/
      color: #FFFFFF;
      padding-left:1.16vw;
      display:flex;
      justify-content: flex-start;
      align-items: center;
    }
    .content-bottom-title img{
      width:1.05vw;
      height:1.05vw;
      margin-right:0.57vw;
    }
  }
</style>

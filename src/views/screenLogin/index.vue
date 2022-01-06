<template>
  <div class="home-cla">
    <remote-js src="https://webapi.amap.com/maps?v=1.4.15&key=7d672eba11887a4fe23b906e62683577"></remote-js>
      <!--公用部分-->
      <com-background-box :index="4">
        <!--页面内容-->
        <div class="content-box">
          <div class="content-left">
            <div class="content-left-top" v-cloak v-loading="loading">
              <div class="content-left-top-title">
                <img src="@/assets/image/icon-img-027.png">
                <span>盐碱地概况</span>
              </div>
              <div class="content-left-top-box">
                <ul class="top-list">
                  <li class="cell">
                    <p class="num">42 <i>个</i></p>
                    <p class="tit">盐碱地数量</p>
                  </li>
                  <li class="cell">
                    <p class="num">4 <i>万平方</i></p>
                    <p class="tit">盐碱地总面积</p>
                  </li>
                  <li class="cell">
                    <p class="num">13 <i>个</i></p>
                    <p class="tit">盐碱地种植种类</p>
                  </li>
                </ul>
                <ul class="content-right-top-ul statistics-box">
                  <li>
                    <div class="content-right-top-ul-li-img">
                      <img src="@/assets/image/icon-img-031.png">
                      <img class="content-right-top-ul-li-imgtrian" src="@/assets/image/icon-img-8.png">
                    </div>
                    <div class="content-right-top-ul-li-txt">
                    <span>
                      <i>4</i>
                      个</span>
                      <span class="color-blur">重度盐碱地</span>
                    </div>
                  </li>
                  <li>
                    <div class="content-right-top-ul-li-img">
                      <img src="@/assets/image/icon-img-032.png">
                      <img class="content-right-top-ul-li-imgtrian" src="@/assets/image/icon-img-9.png">
                    </div>
                    <div class="content-right-top-ul-li-txt">
                    <span>
                      <i>10</i>
                      个</span>
                      <span class="color-blur">中度盐碱地</span>
                    </div>
                  </li>
                  <li>
                    <div class="content-right-top-ul-li-img">
                      <img src="@/assets/image/icon-img-033.png">
                      <img class="content-right-top-ul-li-imgtrian" src="@/assets/image/icon-img-11.png">
                    </div>
                    <div class="content-right-top-ul-li-txt">
                    <span>
                      <i>28</i>
                      个</span>
                      <span class="color-blur">轻度盐碱地</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="content-left-bottom" v-cloak v-loading="loading">
              <div class="content-left-bottom-title">
                <img src="@/assets/image/icon-img-028.png">
                <span>盐碱地参数</span>
              </div>
              <div class="content-left-bottom-box">
                 <el-select v-model="value" placeholder="请选择" class="select-box">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
                <ul class="area-parameter clearfix">
                  <li class="info"><label>温度: </label><span>9℃</span></li>
                  <li class="info"><label>光照强度: </label><span>45635LUX</span></li>
                  <li class="info"><label>有效活菌数: </label><span>234</span></li>
                  <li class="info"><label>硫化物: </label><span>0.3%</span></li>
                  <li class="info"><label>PH值: </label><span>9.0</span></li>
                  <li class="info"><label>有机质: </label><span>6%</span></li>
                  <li class="info"><label>全氮: </label><span>0.5%</span></li>
                  <li class="info"><label>水分: </label><span>47%</span></li>
                  <li class="info"><label>含盐量: </label><span>0.9%</span></li>
                  <li class="info"><label>含碱量: </label><span>0.6%</span></li>
                </ul>
              </div>
            </div>


          </div>
          <!--地图 start-->
          <div class="map-content">
<!--            <div class="map-box" id="id-map-content">
              <canvas id="canvas"></canvas>
              <canvas id="canvas2"></canvas>
            </div>

            &lt;!&ndash;按钮&ndash;&gt;
            <div class="button-box">
              <span class="boxactived" @click="editBtn(3)">智能家电<i></i></span>
              <span @click="editBtn(4)">生命健康<i></i></span>
            </div>-->

            <div id="container" class="map" style="position: fixed;width: 100%;height: 100%;left: 0;bottom: 0;z-index: 10"></div>
          </div>
          <!--地图 end-->

          <div class="content-right">
            <div class="content-right-top" v-cloak v-loading="loading">
              <div class="content-right-top-title">
                <img src="@/assets/image/icon-img-029.png">
                <span>成果</span>
              </div>
              <div class="content-right-top-img">
                <img src="@/assets/image/icon-img-034.png">
              </div>
              <div class="table-out-box table-box-scroll">
                <table class="table-box">
                  <colgroup>
                    <col width="32%">
                    <col width="22%">
                    <col width="22%">
                    <col width="24%">
                  </colgroup>
                  <thead>
                    <tr>
                      <th>盐碱地名称</th>
                      <th>品种类型</th>
                      <th>种植面积</th>
                      <th>产量（Kg）</th>
                    </tr>
                  </thead>
                </table>
                <div class="scroll-box">
                  <table class="table-box ">
                    <colgroup>
                      <col width="32%">
                      <col width="22%">
                      <col width="22%">
                      <col width="24%">
                    </colgroup>
                    <tbody>
                    <tr>
                      <td>齐齐哈尔A盐碱地</td>
                      <td>小麦</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>齐齐哈尔B盐碱地</td>
                      <td>水稻</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>绥化A盐碱地 </td>
                      <td>小麦</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>绥化B盐碱地</td>
                      <td>水稻</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>大庆A盐碱地 </td>
                      <td>小麦</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>大庆B盐碱地</td>
                      <td>水稻</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>佳木斯A盐碱地 </td>
                      <td>小麦</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>佳木斯B盐碱地</td>
                      <td>水稻</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>牡丹江A盐碱地 </td>
                      <td>小麦</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    <tr>
                      <td>牡丹江B盐碱地</td>
                      <td>水稻</td>
                      <td>50公顷</td>
                      <td>337500</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="content-right-bottom" v-cloak v-loading="loading">
              <div class="content-right-bottom-title">
                <img src="@/assets/image/icon-img-030.png">
                <span>治理结果</span>
              </div>
              <div class="table-out-box run-res">
                <el-select v-model="value2" placeholder="请选择" class="select-box">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div class="table-box-scroll">
                  <table class="table-box">
                    <thead>
                    <tr>
                      <th>类型</th>
                      <th>2020年参数</th>
                      <th>2021年参数</th>
                      <th>对比</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>含碱量</td>
                      <td>0.3cmol/kg</td>
                      <td>0.3cmol/kg</td>
                      <td>持平</td>
                    </tr>
                    <tr>
                      <td>产量</td>
                      <td>330000kg</td>
                      <td>337500kg</td>
                      <td>上升 <img src="@/assets/image/icon-img-035.png"></td>
                    </tr>
                    <tr>
                      <td>碱化度</td>
                      <td>15%</td>
                      <td>13%</td>
                      <td>下降 <img src="@/assets/image/icon-img-036.png"></td>
                    </tr>
                    <tr>
                      <td>PH值</td>
                      <td>8.5</td>
                      <td>9.0</td>
                      <td>上升 <img src="@/assets/image/icon-img-035.png"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

        </div>
      </com-background-box>

  </div>
</template>

<script>
  import pointIcon from '@/assets/image/icon-anmation-3.png';
  import centerIcon from '@/assets/image/icon-anmation-2.png';
  import circleIcon from '@/assets/image/icon-anmation-1.png';
  import Math from './animation.js';

  import ComBackgroundBox from '@/components/com-background-box'
  import {partyDetail,partyLine,getHistoryDict} from '@/api/screen/screenLogin.js'
  import {getEchartsData} from '@/api/screen/parkprofile.js'
  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

    export default {
      name: "screenLogin",
      components: {
        ComBackgroundBox,
        'remote-js': {
          render(createElement) {
            return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
          },
          props: {
            src: { type: String, required: true },
          },
        },
      },
      data() {
        let self = this;
        return {
          vw : 0, // 可是宽度
          vh : 0, // 可是高度
          loading:false,
          noData1:false,
          noData3:false,
          noData4:false,
          partylist1:[],
          partylist2:'',
          partylist3:[],
          partylist4:[],
          flagS: true,

          points:[],
          locusRAF: null,
          pointFlipXRAF: null,
          pointBounceYRAF: null,
          circleRAF: null,
          scale: 1,
          options: [
            {
              value: 'aa',
              label: '齐齐哈尔 A 盐碱地'
            },
            {
              value: 'bb',
              label: '齐齐哈尔 B 盐碱地'
            },
            {
              value: 'cc',
              label: '齐齐哈尔 C 盐碱地'
            },
          ],
          value: '',
          value2: '',
        }
      },
      computed: {
        classOption() {
          return {
            step: 0.3, //数值越大速度滚动越快
            limitMoveNum: this.partylist1.length, //开始无缝滚动的数据量  //this.fourDatata.length
            hoverStop: true, //是否开启鼠标悬停stop
            direction: 1, // 0向下 1向上 2向左 3向右
            openWatch: true, //开启数据实时监控刷新dom
            singleHeight: 0, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000 //单步运动停止的时间(默认值1000ms)
          };
        },
      },
      mounted(){
        this.getpartyDetail()
        this.getpartyLine()
        this.getpartyBrand()
        this.toEchartsData()

        this.$nextTick(() => {
          // 获取屏幕大小
          this.onResize();
          window.addEventListener('resize', this.onResize );

          // 禁用右键
          document.oncontextmenu = new Function("event.returnValue=false");
          // 禁用选择
          document.onselectstart = new Function("event.returnValue=false");

          this.initMapCanvas()
        });
        //图表自适应
        this.resizefun = () => {
          this.initMapCanvas(); //地图初始化
          this.$echarts.init(document.getElementById("echartsType")).resize();
          this.$echarts.init(document.getElementById("echartsJobs")).resize();
        };
        window.addEventListener("resize", this.resizefun);

      },
      activated() {
        this.resizefun = () => {
          this.initMapCanvas();
          this.$echarts.init(document.getElementById("echartsType")).resize();
          this.$echarts.init(document.getElementById("echartsJobs")).resize();
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
        //跳转页面
        editBtn(t){
          switch (t) {
            case 1:
              this.$router.push({
                path:'/overview',
                query:{

                }
              });
              break
            case 2:

              break
            case 3:// 智能家电

              break
            case 4:// 生命健康

              break
          }
        },
        // 获取园区简介
        getpartyDetail(){
          let params = {

          }
          this.loading = true;
          partyDetail(params).then(response => {
            this.partylist1 = response;
            this.loading = false;
            if(!this.partylist1 || this.partylist1.length<1){
              this.noData1=true
            }
            this.$nextTick(() => {
              let ulHight = this.$refs.ulH.clientHeight
              let  hg = ulHight/10.8
              if(hg < 38.9){
                  this.flagS = false
              }else{
                this.flagS = true
              }
              console.log("ulHight:",ulHight)
            })
          }).finally(() => {
            this.loading = false;
          });
        },
        // 获取园区企业规模
        getpartyLine(){
          let params = {

          }
          this.loading = true;
          partyLine(params).then(response => {
            this.partylist2 = response;
            this.loading = false;
          }).finally(() => {
            this.loading = false;
          });
        },
        // 获取园区从业人数
        getpartyBrand(){
          let params = {
            types:['park_company_type','park_person']

          }
          this.loading = true;
          getHistoryDict(params).then(response => {
            this.loading = false;
            this.partylist3 = response.park_person;
            this.partylist4 = response.park_company_type;
            if(!this.partylist3){
              this.noData3=true
            }
            if(!this.partylist4){
              this.noData4=true
            }
            let park_personYear=[]
            let park_personNum=[]
            this.partylist3.forEach((item,index)=>{
              park_personYear.push(item.code)
              park_personNum.push(item.name)
            })
            this.getechartsJobs(park_personYear,park_personNum)
            //
            // let typeList=[]
            // let nameList=[]
            // this.partylist4.forEach((item,index)=>{
            //   typeList.push({
            //     name:item.name,
            //     value:item.code
            //   })
            //   nameList.push(item.name)
            // })
            // this.getechartsType(typeList,nameList)

          }).finally(() => {
            this.loading = false;
          });
        },

        //获取园区企业类型
        toEchartsData(){
          this.loading = true
          let params = {}
          getEchartsData(params).then(respone =>{
            const res = respone
            let appliancesType =res.appliancesType  //智能家电
            let logisticsType =res.logisticsType  //物流
            let lifeType =res.lifeType  //生命健康
            let restType =res.restType  //其他类型
            let typeList=[]
            let nameList=[]
            typeList.push({
              name:'智能家电',
              value:appliancesType
            },{
              name:'智慧物流',
              value:logisticsType
            },{
              name:'生命健康',
              value:lifeType
            },{
              name:'其他类型',
              value:restType
            })
            nameList.push('智能家电','智慧物流','生命健康','其他类型')
            this.getechartsType(typeList,nameList)
          })
          this.loading = true
        },

        // 园区从业人数
        getechartsJobs(yearList,personNyum){
          let weekdata=yearList
          let datalist=personNyum
          let chart2 = echarts.init(document.getElementById('echartsJobs'))
          let option2 = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: '10%',
              right: '0',
              left: '15%',
              bottom: '15%'
            },
            xAxis: [{
              type: 'category',
              data: weekdata,
              axisLine: {
                lineStyle: {
                  color: '#FFFFFF',
                  width:0.5,
                }
              },
              axisLabel: {
                margin: 10,
                color: '#FFFFFF',
                textStyle: {
                  fontSize: this.getW(24)
                },
              },
              axisTick: {
                show: false
              }
            }],
            yAxis: [{
              axisLabel: {
                formatter: '{value}',
                color: '#FFFFFF',
                textStyle: {
                  fontSize: this.getW(24)
                },
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#FFFFFF',
                  width:0.5,

                }

              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)',
                  type: "dashed",
                }

              },
              // min:0,
              // max:5000,
              // splitNumber:5,
            }],
            series: [{
              type: 'bar',
              data: datalist,
              barWidth: '35%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: 'rgba(0, 132, 255, 1)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(0, 132, 255, 0.1)' // 100% 处的颜色
                  }], false),
                  shadowColor: 'rgba(0, 0, 0,0)',
                  shadowBlur: datalist.length,
                }
              }
            }]
          }
          chart2.setOption(option2,true)
        },
        //党员类型分布
        getechartsType(typeList,nameList){
          let color1 = new echarts.graphic.LinearGradient(0,0,1,0,[{ offset: 0, color: "#1364b2" }, { offset: 1, color: "#2BA1FF" }],false);
          let color2 = new echarts.graphic.LinearGradient(0,0,1,0,[{ offset: 0, color: "#04628c" }, { offset: 1, color: "#0ADAFA" }],false);
          let color4 = new echarts.graphic.LinearGradient(1,1,0,0,[{ offset: 0, color: "#2c7071" }, { offset: 1, color: "#FABF19" }],false);
          let color3 = new echarts.graphic.LinearGradient(0,0,0,1,[{ offset: 0, color: "#54655b" }, { offset: 1, color: "#85F67B" }],false);

          let chart1 = echarts.init(document.getElementById('echartsType'))
          let colorArr = [color1, color2, color3,color4]
          let data = typeList
          let dataname=nameList
          let option1 = {
            color: colorArr,
            tooltip: {
              trigger: 'item',
              // formatter: '{b} : {c} ({d}%)'
              formatter: '{b} : ({c}%)'
            },
            legend: {
              show:true,
              icon: "circle",
              orient: 'vertical',
              top: "center",
              right: "0",
              itemGap: 10,
              itemWidth: 6,
              itemHeight: 6,
              textStyle: {
                color: "rgba(255,255,255,1)",
                fontSize: this.getW(24),
              },
              formatter: function(name) {
                // 获取legend显示内容
                let datalist = data;
                let total = 0;
                let tarValue = 0;
                for (let i = 0, l = datalist.length; i < l; i++) {
                  total += parseFloat(datalist[i].value);
                  if (datalist[i].name == name) {
                    tarValue = datalist[i].value
                  }
                }
                // let p = (tarValue / total * 100).toFixed(2);
                let p = tarValue;
                return name + ' ' + ' ' + p + '%';
              },
              data: dataname
            },

            series: [
              {
                type: 'pie',
                radius: ['46%', '74%'],
                center: ["31%", "50%"],
                // radius: ['35vw', '60vw'],
                // center: ["83.5vw", "81vh"],
                label: {
                  show:false,


                },
                labelLine: {
                  show:false,

                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,   // 图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                    shadowOffsetX: 0, // 阴影水平方向上的偏移距离
                    shadowColor: 'rgba(0,0,0,0.5' // 阴影颜色
                  }
                },
                data:data
              }
            ]
          }
          chart1.setOption(option1,true)
        },


        // 初始化map
        initMapCanvas() {
         /* console.log("canvas init ....");

          this.clearRAF(); // 清除定时器

          let parent = document.getElementById("id-map-content"),
            canvas = document.getElementById("canvas"),
            canvas2 = document.getElementById("canvas2");

          canvas.width = canvas2.width = parent.clientWidth;
          canvas.height = canvas2.height = parent.clientHeight;

          this.scale = canvas.width / 1880;
          // this.heightRadio = canvas.height / 1840;

          this.points = [
            [0.91, 0.38], // 中心点
            [0.97, 0.415],
            [0.18, 0.84],
            [0.59, 0.75],
            [0.65, 0.68],
            [0.73, 0.67],
            [0.69, 0.7],
            [0.7, 0.75],
            [0.75, 0.76],
            [0.8, 0.77],
            [0.78, 0.8],
          ];

          this.pointIconDraw(); // 绘制分布点
          this.locusPointDraw(); // 绘制轨迹*/

          var map = new AMap.Map("container", {
            center: [123.931869,47.358575],
            showLabel: false,//不显示地图文字标记
            zoom: 17,
            mapStyle:'amap://styles/darkblue'
          });

          var  Line = [[117.200645,31.805094],[117.19601,31.797361],[117.192062,31.791817],[117.189659,31.788023],[117.187084,31.7835],[117.184681,31.779998],[117.182621,31.776204],[117.176441,31.768615],[117.170433,31.762047],[117.165969,31.757231],[117.16288,31.753727],[117.16288,31.753727],[117.161506,31.75183],[117.162708,31.750772],[117.163223,31.750845],[117.163952,31.750881],[117.164253,31.746575],[117.161592,31.7461],[117.161463,31.744495],[117.160948,31.742378],[117.161549,31.74183],[117.162965,31.741757],[117.163352,31.740225],[117.163352,31.739239],[117.164382,31.738728],[117.163909,31.737451],[117.163352,31.736757],[117.163867,31.735991],[117.167085,31.7361],[117.167944,31.735261],[117.169446,31.73621],[117.170304,31.736319],[117.171849,31.736392],[117.172063,31.735261],[117.169059,31.732779],[117.16657,31.731282],[117.167815,31.728727],[117.16966,31.72599],[117.171591,31.724055],[117.173866,31.722558],[117.178029,31.720916],[117.181762,31.718397],[117.188586,31.713468],[117.195281,31.711095],[117.201031,31.708686],[117.203864,31.707152],[117.206696,31.704597],[117.212704,31.703355],[117.216996,31.702187],[117.220343,31.698974],[117.224635,31.694227],[117.226523,31.688238],[117.228755,31.682176],[117.229613,31.678086],[117.231673,31.674872],[117.236479,31.673265],[117.237595,31.681081],[117.24017,31.689845],[117.24429,31.697659],[117.248667,31.703209],[117.254847,31.709197],[117.261885,31.715476],[117.26755,31.722047],[117.272442,31.730443],[117.277936,31.742268],[117.281111,31.755406],[117.28094,31.775766],[117.280768,31.782843],[117.278536,31.792911],[117.276047,31.794735],[117.266348,31.792619],[117.257594,31.790431],[117.247551,31.789264],[117.239483,31.789337],[117.229699,31.790504],[117.223176,31.792182],[117.217425,31.794662],[117.208499,31.799623],[117.200516,31.805677],[117.200645,31.805094]];


          var areapath = [
            {"title":"齐齐哈尔盐碱地1号",
              "color":"#01B964",
              "length":"2208",
              "address": "地址1",
              "ph": "9.0",
              "lntLat":[[123.93011,47.360596],[123.931698,47.360203],[123.931354,47.358953],[123.929702,47.359186]]
            },
            {"title":"齐齐哈尔盐碱地2号",
              "color":"#00BAFF",
              "length":"2018",
              "address": "地址2",
              "ph": "9.0",
              "lntLat":[[123.931848,47.358052],[123.933329,47.357761],[123.932728,47.35686],[123.931483,47.357034]]
            },
            {"title":"齐齐哈尔盐碱地3号",
              "color":"#FABF19",
              "length":"1819",
              "address": "地址3",
              "ph": "9.0",
              "lntLat":[[123.933414,47.358604],[123.934788,47.358386],[123.934573,47.359302],[123.933672,47.359331]]
            },
            ]

        /*  var polyLine = new AMap.Polyline({//创建折线
            path:Line,
            strokeColor:'#2699a7',
            strokeWeight:3,
            strokeOpacity:1
          })
          map.add(polyLine);*/

          var polygons = [];
          for(var i = 0; i < areapath.length;i++){//这是  创建覆盖层
            var polygon = new AMap.Polygon({
              map: map,
              strokeColor: areapath[i].color,
              strokeOpacity:0.4,
              fillColor:  areapath[i].color,
              fillOpacity:0.4,
              path: areapath[i].lntLat
            });
            polygons.push(polygon);
          }

//构建自定义信息窗体
          var infoWindow = new AMap.InfoWindow({
            isCustom:true,
            anchor: 'bottom-left'
          });

          for(var j = 0 ; j < polygons.length;  j++){
            polygons[j].index = j;
            polygons[j].on('mouseover',function(e){
              this.setOptions({
                fillOpacity:0.6,
                strokeOpacity:0.6
              })

              var area  = this.getArea();
              console.log('getBounds',this.getBounds())
              let contentBox = '<div class="tip-box">' +
                '<i></i>'+
                '<p> <label>盐碱地名称:</label><span>'+ areapath[this.index].title +'</span></p>' +
                '<p> <label>盐碱地面积:</label><span>'+ area +'平方米</span></p>' +
                '<p> <label>盐碱地地址:</label><span>'+ areapath[this.index].address +'</span></p>' +
                '<p> <label>周长:</label><span>'+ areapath[this.index].length +'</span></p>' +
                '<p> <label>PH值:</label><span>'+ areapath[this.index].ph +'</span></p>' +
                '</div>'
              infoWindow.open(map,e.lnglat);//打开位置
              infoWindow.setContent(contentBox);
            })
            polygons[j].on('mouseout',function(){
              this.setOptions({
                fillOpacity:0.4,
                strokeOpacity:0.4
              })
              infoWindow.close();//信息窗口关闭
            })
          }
        },
        clearRAF() {
          // 清除定时器
          cancelAnimationFrame(this.locusRAF);
          cancelAnimationFrame(this.pointFlipXRAF);
          cancelAnimationFrame(this.pointBounceYRAF);
          cancelAnimationFrame(this.circleRAF);
          this.locusRAF = null;
          this.pointFlipXRAF = null;
          this.pointBounceYRAF = null;
          this.circleRAF = null;
        },
        // 轨迹分布
        locusPointDraw() {
          let canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d"),
            width = canvas.width,
            height = canvas.height,
            centerX = this.points[0][0] * width,
            centerY = this.points[0][1] * height,
            percent = 0, // 绘制百分比
            t = 0.6,//  设置轨迹速度： 值越大速度越快，值越小速度越慢
            curveness = 0.2, // 曲度
            points = this.points,
            that = this;


          ctx.clearRect(0, 0, width, height); // 清除
          //********** 轨迹线 *********
            ctx.beginPath();
            // ctx.strokeStyle = "#02fdff"
            ctx.lineWidth = 4;
            for (var i = 0; i < points.length; i++) {
              if (i === 0) continue;
              var endX = points[i][0] * width,
                endY = points[i][1] * height;

              ctx.strokeStyle = that.createLinearGradient(
                ctx,
                [centerX, centerY],
                [endX, endY],
                [
                  [0, "rgba(2,253,255, .3)"],
                  [1, "rgba(2,253,255, .7)"],
                ]
              );
              // 控制点
              var cp = [
                (centerX + endX) / 2 + (centerY - endY) * curveness,
                (centerY + endY) / 2 + (endX - centerX) * curveness,
              ];
              ctx.moveTo(centerX, centerY); // 起始点
              ctx.quadraticCurveTo(
                cp[0],
                cp[1], // 控制点
                endX,
                endY // 结束点
              );
            }
            ctx.stroke();

          this.locusDraw()
        },
        /**
         * 动态轨迹
         */
        locusDraw() {
          let canvas = document.getElementById("canvas2"),
            ctx = canvas.getContext("2d"),
            width = canvas.width,
            height = canvas.height,
            centerX = this.points[0][0] * width,
            centerY = this.points[0][1] * height,
            percent = 0, // 绘制百分比
            t = 0.6,
            curveness = 0.2, // 曲度
            points = this.points,
            that = this;
          animate();
          // 轨迹分布 动画
          ctx.lineWidth = 4;
          function animate() {
            ctx.clearRect(0, 0, width, height); // 清除
            //********** 动画轨迹 *********

            for (var i = 0; i < points.length; i++) {
              if (i === 0) continue;
              var endX = points[i][0] * width,
                endY = points[i][1] * height;
              // 渐变
              ctx.strokeStyle = that.createLinearGradient(
                ctx,
                [centerX, centerY],
                [endX, endY],
                [
                  [0, "rgba(255,255,0, 0)"],
                  [0.8, "rgba(255,255,0, 1)"],
                  // [1, 'rgba(250,250,0,1)']
                ]
              );
              // 绘制曲线
              ctx.beginPath();
              that.drawCurvePath(
                ctx,
                [centerX, centerY],
                [endX, endY],
                curveness,
                percent
              );
            }

            percent = (percent + t) % 100;
            that.locusRAF = requestAnimationFrame(animate); // 循环动画
          }

          // 监督点击事件
          canvas.addEventListener('click', () => {
            that.clearAllScale()
          }, false)
        },
        /**
         * 绘制一条曲线路径(动画)
         * @param  {Object} ctx canvas渲染上下文
         * @param  {Array<number>} start 起点
         * @param  {Array<number>} end 终点
         * @param  {number} curveness 曲度(0-1)
         * @param  {number} percent 绘制百分比(0-100)
         */
        drawCurvePath(ctx, start, end, curveness, percent) {
          // 计算中间控制点 - 向下弯曲；+ 向上弯曲
          var cp = [
            (start[0] + end[0]) / 2 + (start[1] - end[1]) * curveness,
            (start[1] + end[1]) / 2 + (end[0] - start[0]) * curveness,
          ];

          var t = percent / 100;

          var p0 = start; // 起始点
          var p1 = cp;
          var p2 = end; // 结束点

          var v01 = [p1[0] - p0[0], p1[1] - p0[1]]; // 向量<p0, p1>
          var v12 = [p2[0] - p1[0], p2[1] - p1[1]]; // 向量<p1, p2>

          var q0 = [p0[0] + v01[0] * t, p0[1] + v01[1] * t];
          var q1 = [p1[0] + v12[0] * t, p1[1] + v12[1] * t];

          var v = [q1[0] - q0[0], q1[1] - q0[1]]; // 向量<q0, q1>

          var b = [q0[0] + v[0] * t, q0[1] + v[1] * t];

          ctx.moveTo(p0[0], p0[1]); // 起始点
          ctx.quadraticCurveTo(
            q0[0],
            q0[1], // 控制点
            b[0],
            b[1] // 结束点
          );
          ctx.stroke();
          // console.log('绘制 曲线。。。')

          this.createHeadLight(ctx,b[0], b[1]); // 绘制曲线头部亮点
        },
        /**
         * 创建线性渐变
         * @param  {Array<number>} start 起点
         * @param  {Array<number>} end 终点
         */
        createLinearGradient(ctx, start, end, stops) {
          let lineGradient = ctx.createLinearGradient(...start, ...end);
          stops.forEach((stop) => {
            lineGradient.addColorStop(stop[0], stop[1]);
          });
          return lineGradient;
        },
        /**
         * 头部高亮
         * @param  {number} x 每帧达到的x
         * @param  {number} y 每帧达到的y
         */
        createHeadLight(ctx, x, y) {
          ctx.beginPath();
          //创建径向渐变
          var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, 5*1.5);
          radialGradient.addColorStop(0, "rgba(250,250,0,1)");
          radialGradient.addColorStop(0.6, "rgba(250,250,0,.6)");
          radialGradient.addColorStop(1, "transparent");

          ctx.fillStyle = radialGradient;
          //画圆
          ctx.arc(x, y, 12*1.5, 0, 2 * Math.PI, false);
          ctx.fill();
        },
        // 分布点绘制
        pointIconDraw() {
          // 分布点
          let canvas = document.getElementById("canvas"),
            parent = document.getElementById("id-map-content"),
            that = this;

          // 其他分布点
          this.points.forEach((point, index) => {
            if (index > 0) {
              that.createPointCanvas(point[0]*canvas.width, point[1]*canvas.height, `point_${index}`, parent)
            }
          })

          // 中心点
          let cx = this.points[0][0] * canvas.width,
            cy = this.points[0][1] * canvas.height;
          this.createCenterPointCanvas(cx, cy);
        },
        // 创建canvas 图层 中心点
        createCenterPointCanvas(x, y) {
          let id = "point_0",
            that = this,
            canvas = document.getElementById(id),
            parent = document.getElementById("id-map-content");
          if (canvas) {
            parent.removeChild(canvas);
          }

          // 创建canvas
          canvas = document.createElement("canvas");
          canvas.setAttribute("id", id);
          parent.appendChild(canvas);

          let ctx = canvas.getContext("2d");

          // 绘制分布点图片
          let img = new Image();
          img.src = centerIcon;
          img.onload = function () {
            let w = img.width,
              h = img.height,
              r = h / w;
            w = w * that.scale;
            h = w * r;

            let top = y - h,
              left = x - w / 2;

            canvas.setAttribute(
              "style",
              `position:absolute;
              top:${top}px;
              left:${left}px`
            );
            canvas.width = w;
            canvas.height = h;

            ctx.drawImage(this, 0, 0, w, h);

            // 圈圈
            let cimg = new Image();
            cimg.src = circleIcon;
            cimg.onload = function () {
              let cw = cimg.width,
                ch = cimg.height,
                cr = h/w;
              cw = cw * that.scale
              ch = cw * cr
              ctx.drawImage(this, 0, 0, cw, ch)
              that.rotateAnimation(ctx, cimg, cw, img, w, h)

            }
            that.bounceAnimation(canvas, top)
          }

        },
        clearAllScale() {
          // 清除所有的放大状态
            this.points.forEach((point, index) => {
              if (index > 0) {
                let pCvs = document.getElementById(`point_${index}`)
                pCvs.style.transform = "scale(1)"
                pCvs.style.zIndex = "1"
              }
            })
        },
        // 创建canvas 图层
        createPointCanvas(x, y, id, parent) {
          let canvas = document.getElementById(id),
            that = this
          if (canvas) {
            parent.removeChild(canvas);
          }

          canvas = document.createElement("canvas");
          canvas.setAttribute("id", id);
          parent.appendChild(canvas);

          let ctx = canvas.getContext("2d");

          // 绘制分布点图片
          let img = new Image();
          img.src = pointIcon;
          img.onload = function () {
            let w = img.width,
              h = img.height,
              r = h / w;
            w = w * that.scale;
            h = w * r;

            let top = y - h,
              left = x - w / 2;

            canvas.setAttribute(
              "style",
              `position:absolute;
              top:${top}px;
              left:${left}px;
              z-index:1;
              cursor:pointer;
              transform-origin: 50% 100%;
              transition: all .3s`
            );
            canvas.width = w;
            canvas.height = h;

            ctx.drawImage(this, 0, 0, w, h);
            // that.flipAnimation(canvas, ctx, img, w, h)

            canvas.addEventListener('click', (e) => {

              // 清除所有的放大状态
              that.clearAllScale()

              // 当前的放大
              canvas.style.transform = "scale(1.2)"
              canvas.style.zIndex = "100"



            }, false)
            // canvas.addEventListener('mouseout', () => {
            //   canvas.style.transform = "scale(1)"
            //   canvas.style.zIndex = "1"

            // }, false)

          };
        },
        // 弹跳动画
        bounceAnimation(canvas, top) {
          // 弹跳
          var from = top,
            to = top - 10,
            that = this;
          var bounceY = () => {
            // Math.animation(form, to, duration, easing, callback);
            // 1，先弹起
            Math.animation( from, to, 500, "Quad.easeOut", function (value, isEnding) {
              canvas.style.top = value + "px";
              if (isEnding) {
                // 2. 再落下
                Math.animation( to, from, 500, "Quad.easeIn", function (value, isEnding) {
                  canvas.style.top = value + "px";
                  if (isEnding) {
                    that.pointBounceYRAF = requestAnimationFrame(bounceY);
                  }
                })
              }
            });
          };
          bounceY();
        },
        // 旋转动画
        rotateAnimation(ctx, cimg, cw, img, w, h) {
          const that = this;
          var rotateCircle = () => {
            ctx.clearRect(0, 0, w, h); // clear canvas

            ctx.save();
            ctx.translate(cw / 2, cw / 2);
            // 圈圈
            var time = new Date();
            ctx.rotate(
              ((2 * Math.PI) / 6) * time.getSeconds() +
                ((2 * Math.PI) / 6000) * time.getMilliseconds()
            );
            ctx.translate(-cw / 2, -cw / 2);
            ctx.drawImage(cimg, 0, 0, cw, cw);
            ctx.restore();
            ctx.drawImage(img, 0, 0, w, h);
            that.circleRAF = requestAnimationFrame(rotateCircle);
          };
          rotateCircle();
        },

      },
      filters:{
        getNum(val){
          if(val==='' && val===undefined && val===null && val==='null'){
            val=0
          }
          return val
        }
      }
    };
</script>
<style lang="scss" >
.tip-box {
  background-color: rgba(0, 186, 255, 0.6);
  //border: 2px solid #00BAFF;
  border-radius: 8px;
  position: relative;
  padding: 10px 30px;
  i {
    position: absolute;
    top: 100%;
    left: 36px;
    border: 14px solid transparent;
    border-left-width: 12px;
    border-right-width: 12px;
    border-top: 14px solid rgba(0, 186, 255, 0.6);
  }
  p {
    line-height: 1.6;
    margin: 0;
  }
  label {
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    color: #00BAFF;
    width: 76px;
    text-align: right;
    margin-right: 20px;
  }

  span {
    display: inline-block;
    font-size: 14px;
    color: #fff;
  }
}
</style>
<style lang="scss" scoped>
  /* 新增的样式 start */
  li {
    list-style: none;
  }
  .top-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 10px 0 5px 0;
    text-align: center;
    .num {
      font-size: 26px;
      color: #fff;
      line-height: 1;
      margin-bottom: 10px;
      i {
        font-size: 12px;
        font-style: normal;
      }
    }
    .tit {
      font-size: 14px;
      color: #00BAFF;
      line-height: 1;
    }
  }
  .content-right-top-ul.statistics-box {
    padding-left: 20px;
  }
  .select-box {
    width: 100%;
    margin-top: -10px;
    margin-bottom: 5px;
    /deep/ .el-input__inner {
      background-color: transparent;
      border-color: #02BBFF;
      color: #FFF;
    }
  }
  .area-parameter {
    padding: 0;
    margin-top: 10px;
    .info {
      float: left;
      width: 50%;
      label {
        display: inline-block;
        width: 5.2vw;
        text-align: right;
        margin-right: 0.8vw;
        color: #00BAFF;
        font-size: 15px;
        font-weight: normal;
        line-height: 40px;
      }
      span {
        //font-size: 15px;
        font-size: 0.8vw;
        line-height: 2.3;
        color: #fff;
        font-weight: bold;
      }
    }
  }
  .table-out-box {
    padding: 1.1vw;
    padding-top: 10vh;
    &.run-res {
      padding-top: 1.5vh;
      .select-box {
        margin-top: 0;
        margin-bottom: 2vh;
      }
      .table-box-scroll {
        height: 17vh;
        overflow: auto;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
          width:0.22vw;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
          width: 0.22vw;
          height: 33.5vh;
          background: transparent;
          border-radius: 0.21vw;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          width: 0.22vw;
          background: rgba(2, 187, 255, 1);
          border-radius: 1px;
        }
      }
    }
    table {
      width: 100%;
      border: 1px solid rgba(2, 187, 255, 1) ;
      border-collapse: collapse;
      td,th {
        border: 1px solid rgba(2, 187, 255, 0.5);
        padding: 0.8vw 0.4vw 0.8vw 0.8vw;
        font-size: 12px;
        line-height: 1;
        color: #fff;
        font-weight: bold;
        text-align: left;
      }
      th,tr td:first-child {
        color: rgba(0, 186, 255, 1);
        font-weight: normal;
        background: rgba(1, 115, 250, 0.2);
      }
      th {
        border-color: rgba(2, 187, 255, 1);
      }
      tr td:first-child {
        border-right-color: rgba(2, 187, 255, 1);
        border-left-color: rgba(2, 187, 255, 1);
      }
      img {
        width: 1vw;
        display: inline-block;
        vertical-align: inherit;
        margin-left: 0.5vw;
      }
    }
    &.table-box-scroll {
      height: 43vh;
      .scroll-box {
        margin-right: -0.22vw;
        margin-top: -1px;
        max-height: 25.5vh;
        overflow: auto;
        border-bottom: 1px solid rgba(2, 187, 255, 1);
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
          width:0.22vw;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
          width: 0.22vw;
          height: 33.5vh;
          background: transparent;
          border-radius: 0.21vw;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          width: 0.22vw;
          background: rgba(2, 187, 255, 1);
          border-radius: 1px;
        }
      }
    }
  }
  /* 新增的样式 end */
  .content-box{
    display:flex;
    justify-content:space-between;
  }
  .content-left{
    //display:flex;
    //justify-content:space-between;
    z-index: 11;
  }
  .content-left-top{
    width:23.7vw;
    height:auto;
    background:url('../../assets/image/icon-bg-44.png') no-repeat;
    background-size:100% 100%;
    margin-bottom:3.06vh;
  }
  .content-left-top-title{
    width:23.6vw;
    height:5.92vh;
    background:url('../../assets/image/icon-bg-2.png') no-repeat;
    background-size:100% 100%;
    font-size: 0.95vw;
    color: #FFFFFF;
    padding-left:1.16vw;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content-left-top-title img{
    width:1.05vw;
    height:1.05vw;
    margin-right:0.57vw;
  }
  .content-left-top-box{
    position:relative;
    width:100%;
    height:43vh;
    padding:2vh 3.68vw 2vh 1.05vw;
    overflow:hidden;
  }
  .content-left-top-ul{
    list-style:none;
    margin:0 0;
    padding:0 0;
    width:100%;
    /*height:39vh;*/
    overflow:hidden;
  }
  .content-left-top-ul li{
    list-style:none;
    //text-align:center;
  }
  .content-left-top-ul-li-top{
    display:block;
    width:2.55vw;
    height:2.73vh;
    margin:0 auto;
    margin-top:-0.8vh;
  }
  .content-left-top-ul-li-txt{
    display:block;
    width:100%;
    padding:1.05vh 1.5vw;
    background: rgba(0, 132, 255, 0.2);
    border: 0.052vw solid rgba(0, 132, 255, 0.5);
    border-radius: 0.52vw;
    //text-align:left;
    //line-height:1.5;
    //font-size: 0.78vw;
    //font-weight: 400;
    //color: #fff;
    margin-top:-0.3vh;
    word-wrap:break-word;
    word-break:break-all;
  }
  .content-left-top-ul li:first-of-type .content-left-top-ul-li-txt{
    margin-top:0;
  }
  .content-left-top-ul-li-txt i{
    font-style:normal;
    color: #FD5A5A;
    font-weight: bold;

  }
  /*防止滚动抖动*/
  .warp{
    height:100%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;/*定义当元素不面向屏幕时是否可见*/
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;/*设置元素被查看位置的视图*/
    -moz-perspective: 1000;
    -ms-perspective: 1000;
    perspective: 1000; /* Other transform properties here */
  }

  .content-left-bottom{
    position:relative;
    width:23.7vw;
    height:33.3vh;
    background:url('../../assets/image/icon-bg-7.png') no-repeat;
    background-size:100% 100%;

  }
  .content-left-bottom-title{
    width:23.6vw;
    height:5.92vh;
    background:url('../../assets/image/icon-bg-8.png') no-repeat;
    background-size:100% 100%;
    font-size: 0.95vw;
    color: #FFFFFF;
    padding-left:1.16vw;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content-left-bottom-title img{
    width:1.05vw;
    height:1.05vw;
    margin-right:0.57vw;
  }
  .content-left-bottom-box {
    width:100%;
    padding:2.3vh 1.2vw;
    height:27.22vh;
  }
  .content-right{
    //display:flex;
    //justify-content:space-between;
    //align-items: flex-end;
    z-index: 11;
  }
  .content-right-top{
    position:relative;
    width:23.7vw;
    height:auto;
    //background:url('../../assets/image/icon-bg-77.png') no-repeat;
    background:url('../../assets/image/icon-bg-5.png') no-repeat;
    background-size:100% 100%;
    margin-bottom:3.06vh;
    //margin-bottom:5.2vh;
  }
  .content-right-top-title{
    width:19.2vw;
    height:5.92vh;
    background:url('../../assets/image/icon-bg-3.png') no-repeat;
    background-size:100% 100%;
    font-size: 0.95vw;
    color: #FFFFFF;
    padding-left:1.16vw;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content-right-top-title img{
    width:1.05vw;
    height:1.05vw;
    margin-right:0.57vw;
  }
  .content-right-top-img{
    position:absolute;
    top:0;
    right:0;
    width:6.32vw;
    height:6.32vw;
    border-radius:50%;
  }
  .content-right-top-img img{
    width:100%;
    height:100%;
  }
  .content-right-top-ul{
    margin:0 0;
    width:100%;
    height:43vh;
    padding:2vh 1.05vw 2vh 3.68vw;
    overflow:hidden;
  }
  .content-right-top-ul li{
    display:flex;
    justify-content: flex-start;
    align-items:center;
    margin-bottom:1.8vh;
  }
  .content-right-top-ul li:last-of-type{
    margin-bottom:0;
  }
  .content-right-top-ul-li-img{
    position:relative;
    width:4.43vw;
    height:4.43vw;
    overflow:hidden;
  }
  .content-right-top-ul-li-img img{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
  .content-right-top-ul-li-imgtrian{
    animation: loading 5s linear infinite;
  }
  .content-right-top-ul-li-txt{
    padding-left:1.63vw;
  }
  .content-right-top-ul-li-txt span{
    display:block;
    font-size: 0.78vw;
    font-weight: 400;
    color: #fff;
    margin-bottom:0.92vh;
  }
  .content-right-top-ul-li-txt span:last-of-type{
    margin-bottom:0;
  }
  .content-right-top-ul-li-txt i{
    font-style:normal;
    font-size: 1.57vw;
    font-weight: bold;
  }
  .color-blur{
    font-weight: bold;
    color:#00BAFF!important;
  }

  .content-right-bottom{
    width:23.7vw;
    height:33.3vh;
    background:url('../../assets/image/icon-bg-5.png') no-repeat;
    background-size:100% 100%;
  }
  .content-right-bottom-title{
    width:23.6vw;
    height:5.92vh;
    background:url('../../assets/image/icon-bg-8.png') no-repeat;
    background-size:100% 100%;
    font-size: 0.95vw;
    color: #FFFFFF;
    padding-left:1.16vw;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content-right-bottom-title img{
    width:1.05vw;
    height:1.05vw;
    margin-right:0.57vw;
  }
  .content-right-bottom-box{
    position:relative;
    width:100%;
    padding:2.3vh 1.2vw;
    height:27.22vh;
  }
  .actived{
    //background:url('../assets/image/icon-bg-echarts.png') no-repeat 4.55vh 4.3vh;
    //background-size:18.63vh 18.63vh;
    background:url('../../assets/image/icon-bg-echarts.png') no-repeat 2.5vw 4.3vh;
    background-size:10.53vw 10.53vw;
  }

  /** map style **/
  .map-content{
    position:relative;
    width:53.2vw;
    height:84.5vh;
  }
  .button-box{
    position:absolute;
    z-index:10;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .button-box span{
    position:relative;
    cursor: pointer;
    display:block;
    width:6.54vw;
    height:4.21vh;
    line-height:4.21vh;
    text-align:center;
    margin:0 0.44vw;
    //background: linear-gradient(90deg, rgba(0, 34, 65, 0.6), rgba(0, 79, 153, 0.6));
    //border: 0.15vw solid rgba(2, 132, 255, 0.6);
    //border-bottom:0.15vw solid rgba(2, 222, 255, 0.6);
    background:url('../../assets/image/icon-button-bg.png') no-repeat;
    background-size:100% 100%;
    font-size: 0.78vw;
    font-weight: bold;
    color: #02DEFF;
    opacity: 0.7;
  }
  .button-box span i{
    position:absolute;
    bottom:0.3vh;
    left:3%;
    display:block;
    width:94%;
    height:0.185vh;
    background:#02FFFF;
    display:none;
  }
  .button-box span.boxactived{
    color: #02FFFF;
  }
  .button-box span.boxactived i{
    display:block;
  }
  .button-box span:hover{
    color: #02FFFF;
  }
  .button-box span:hover i{
    display:block;
  }

  /*暂无数据样式*/
  .no-data {
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    text-align: center;
    color:#fff;

    img {
      width: 6vw!important;
      height: 10vh!important;
      margin-bottom: 10px;
      margin-right: 0!important;
    }
    div{
      font-size: 0.78vw;
      color: #fff;
      line-height:0.8;
    }
  }

  /*地图动画样式*/
  .map-box{
    position:relative;
    width:100%;
    height:100%;
  }
  .map-img-div1{
    position:absolute;
    width:3.9vw;
    height:4.2vw;
    animation: translation 3s linear infinite;

  }
  .map-img-div1 img{
    width:100%;
    height:100%;

  }
  .map-img-div1 .map-img-div1-bg{
    position:absolute;
    width:3.9vw;
    height:3.9vw;
    top:0;
    left:0;
    animation: loading 3s linear infinite;
  }
  .map-img-div{
    position:absolute;
    width:2.1vw;
    height:2.1vw;
  }
  .map-img-div img{
    width:100%;
    height:100%;
    animation: rotation 3s linear infinite;
  }
  .map-img-position1{
    top:23vh;
    right:2.3vw;
  }

  .map-img-position2{
    top:31vh;
    right:0.3vw;
  }
  .map-img-position3{
    top:53.5vh;
    right:12.5vw;
  }
  .map-img-position4{
    top:54.5vh;
    right:14vw;
  }
  .map-img-position5{
    top:54.5vh;
    right:16.5vw;
  }
  .map-img-position6{
    top:59.5vh;
    right:19vw;
  }
  .map-img-position7{
    top:60.5vh;
    right:13.5vw;
  }
  .map-img-position8{
    top:61vh;
    right:11.5vw;
  }
  .map-img-position9{
    top:64vh;
    right:10vw;
  }
  .map-img-position10{
    top:61.5vh;
    right:9.2vw;
  }
  .map-img-position11{
    top:65vh;
    left:8vw;
  }

  /*运动的箭头初始样式*/
  .item{
    position: absolute;
    width:1.4vw;
    height: 1.4vw;
  }
  .item img{
    width:100%;
    height:100%;
  }

  /*箭头移动*/
  .item1 {
    top:25.5vh;
    right:4.8vw;
    animation: hor-animation1 3s linear 0s infinite;
  }
  .item2 {
    top:26.8vh;
    right:5.8vw;
    animation: hor-animation2 3s linear 0s infinite;
  }
  .item3 {
    top:26.8vh;
    right:5.8vw;
    animation: hor-animation3 3s linear 0s infinite;
  }
  .item4 {
    top:27vh;
    right:4.2vw;
    animation: hor-animation4 3s linear 0s infinite;
  }
  .item5 {
    top:25vh;
    right:3.5vw;
    transform: rotate(-30deg);
    animation: hor-animation5 3s linear 0s infinite;
  }
  .item6 {
    top:23vh;
    right:2.8vw;
    transform: rotate(-30deg);
    animation: hor-animation6 3s linear 0s infinite;
  }
  .item7 {
    top:23.5vh;
    right:1.8vw;
    transform: rotate(-30deg);
    animation: hor-animation7 3s linear 0s infinite;
  }
  .item8 {
    top:23.4vh;
    right:1vw;
    transform: rotate(-45deg);
    animation: hor-animation8 3s linear 0s infinite;
  }
  .item9 {
    top:23.4vh;
    right:1vw;
    transform: rotate(-60deg);
    animation: hor-animation9 3s linear 0s infinite;
  }

  .item10 {
    top:23.5vh;
    right:5.8vw;
    animation: hor-animation10 3s linear 0s infinite;
  }

  @keyframes hor-animation1 {
    0% { transform: translate(0,0); }
    100% { transform: translate(4vw,5vh); }
  }
  @keyframes hor-animation2 {
    0% { transform: translate(0,0);}
    100% { transform: translate(-14vw,34vh);}
  }
  @keyframes hor-animation3 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-11vw,28vh); }
  }
  @keyframes hor-animation4 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-10vw,28vh); }
  }
  @keyframes hor-animation5 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-9vw,28vh); }
  }
  @keyframes hor-animation6 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-11vw,38vh); }
  }
  @keyframes hor-animation7 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-9.5vw,37vh); }
  }
  @keyframes hor-animation8 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-9vw,41vh); }
  }
  @keyframes hor-animation9 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-8.5vw,39vh); }
  }
  @keyframes hor-animation10 {
    0% { transform: translate(0,0); }
    100% { transform: translate(-32.5vw,41.5vh); }
  }

  canvas {
    position: absolute;
    left: 0;
    top: 0;
  }

  @keyframes bounce {
    0% { top: 0 }
    50% { top: 100%}
    100% { top: 0 }
  }

</style>

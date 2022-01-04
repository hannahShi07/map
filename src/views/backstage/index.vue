<!-- 首页 -->
<template>
  <div class="party-index" v-cloak>
    <div class="partyOrgnizationTop clearfix">
      <div class="parkTotalNum">
        <!--  纳入全省非公党建信息管理平台企业数-->
        <div class="parkTotalPub">
          <div class="developAreaTit"><span class="icon"></span>纳入全省非公党建信息管理平台企业数
            <span class="numTxt">{{messages.fgqycldzzs | filtermath}}</span>户
          </div>
          <div class="chart01">
            <div id="chart01" style="width:100%;height:286px;"></div>
          </div>
        </div>
        <!--非公企业党员数 :-->
        <div class="parkTotalpri">
          <div class="developAreaTit"><span class="icon"></span>非公企业党员数 :
            <span class="numTxt">{{messages.fgqydys | filtermath}}</span>名
          </div>
          <div class="chart02">
            <div id="chart02" style="width:100%;height:280px;"></div>
          </div>
          <div class="partyNum" style="text-align: center">园区共有党员:<span style="color: #ED3C3C">{{messages.gydys |
            filtermath}}</span>名
          </div>
        </div>
      </div>
      <!--右侧数据-->
      <div class="parkListRight">
        <div class="parkList">
          <div class="parkListTit">
				<span>
					<span class="partydw">{{messages.fgqydzzsj | filtermath}}</span>名
				</span>
            <img src="@/assets/page/index_icon1.png" alt="">
          </div>
          <div class="parkListCont">非公企业党组织书记</div>
        </div>
        <div class="parkList">
          <div class="parkListTit">
				<span>
					<span class="partyfg">{{messages.zzdzzsj | filtermath}}</span>名
				</span>
            <img src="@/assets/page/index_icon2.png" alt="">
          </div>
          <div class="parkListCont">专职党组织书记(不担任公司其他职务）</div>
        </div>
        <div class="parkList">
          <div class="parkListTit">
				<span>
					<span class="partygz">{{messages.djgzzdy | filtermath}}</span>名
				</span>
            <img src="@/assets/page/index_icon3.png" alt="">
          </div>
          <div class="parkListCont">党建工作指导员（联络员）</div>
        </div>
        <div class="parkList">
          <div class="parkListTit">
				<span>
					<span class="partyzz">{{messages.dwgzz | filtermath}}</span>名
				</span>
            <img src="@/assets/page/index_icon4.png" alt="">
          </div>
          <div class="parkListCont">党务工作者</div>
        </div>
        <div class="parkList">
          <div class="parkListTit">
				<span>
					<span class="partyyz">{{messages.zzdwgzz | filtermath}}</span>户
				</span>
            <img src="@/assets/page/index_icon5.png" alt="">
          </div>
          <div class="parkListCont">专职党务工作者</div>
        </div>
        <div class="parkList">
          <div class="parkListTit">
				<span>
					<span class="partydj">{{messages.yzzdwgzzdfgqy | filtermath}}</span>名
				</span>
            <img src="@/assets/page/index_icon6.png" alt="">
          </div>
          <div class="parkListCont">有专职党务工作者的非公企业</div>
        </div>
      </div>
      <!--地图-->
      <div class="partyOrgnizationMap">
        <!-- 高德地图 -->
        <div class="partyOrgnizationMap" id="developMap" style="height: 100%;"></div>
        <div class="map_txt_box">
          <span>{{developmentName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ico from '@/assets/page/party_organization.png';
  import ico2 from '@/assets/page/party_organization.png';
  import ico3 from '@/assets/page/separate.png';
  import {getIndexInfo,getIndexMap} from "@/api/backstage/index.js"
  import commonReq from "@/api/public/commonReq";
  export default {
    components: {},
    name: 'index',
    data() {
      return {
        /*地图声明*/
        map: null,
        // 安徽省边界
        disProvince: null,
        // 城市编号
        adcodeNumber: [340000],
        // 显示层级
        depthNumber: 1,
        // 已对接党组织
        mapPositionG: [],
        mapPositionSData: [], //已对接党组织相应数据
        // 未对接党组织
        mapPositionS: [],
        mapPositionSData: [], //未对接党组织相应数据
        developmentByAreaList: [], //市开发区数据
        // 点集合
        markerG: [],
        // 点集合
        markerS: [],
        developmentName:'',//当前选中开发区名称
        infoWindow:'',
        dicts:{//字典表数据
          map_address:[],//地图字典
        },
        mapLongitude: '',//地图经度
        mapLatitude: '',//地图纬度
        mapName:'', //地图区名称
        //数值
        messages:{
          fgqydys:'',//非公企业党员数
          gydys:'',//园区共有党员
          fgqydzzsj:'',//非公企业党组织书记
          zzdzzsj:'',//专职党组织书记
          djgzzdy:'',//党建工作指导员
          dwgzz:'',//党务工作者
          zzdwgzz:'',//专职党务工作者
          yzzdwgzzdfgqy:'',//有专职党务工作者的非公企业
        }
      }
    },
    mounted(){
      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("chart01")).resize();
        this.$echarts.init(document.getElementById("chart02")).resize();
      };
      window.addEventListener("resize", this.resizefun);

      this.getStatisticssetfront()
      this.$nextTick(() => {
        this.init();//地图初始化
        // this.selectDjDevelopment();
      })
    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("chart01")).resize();
        this.$echarts.init(document.getElementById("chart02")).resize();
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
      //获取数值
      getStatisticssetfront(id){
        getIndexInfo().then(response => {
          const res = response;
          if(res.data==undefined || res.data==null || res.data=='null'){
            res.data ='';
          }
          this.messages={
            ddjldzzs:res.ddjldzzs, //单独建立党组织数
            djgzzdy:res.djgzzdy,//党建工作指导员
            dwgzz:res.dwgzz,//党务工作者
            fgqycldzzs:res.fgqycldzzs,//非公企业成立党组织数
            fgqydys:res.fgqydys,//非公企业党员数
            fgqydzzsj:res.fgqydzzsj,//非公企业党组织书记
            fgqys:res.fgqys,//非公企业数
            glgws:res.glgws,//管理岗位数
            gsqy:res.gsqy,//规上企业
            gydys:res.gydys,//园区共有党员数
            gyqys:res.gyqys,//园区共有企业数
            jsggs:res.jsggs,//技术骨干数
            qyczr:res.qyczr,//企业出资人
            ycllhdzzs:res.ycllhdzzs,//已成立联合党组织数
            yqjyrs:res.yqjyrs,//园区就业人数
            yxyg:res.yxyg,//一线员工
            yzzdwgzzdfgqy:res.yzzdwgzzdfgqy,//有专职党务工作者的非公企业
            zzdwgzz:res.zzdwgzz,//专职党务工作者
            zzdzzsj:res.zzdzzsj,//专职党组织书记
          };
          this.getechartsNonpublic()
          this.getechartsCompanies()
        }).finally(() => {
        });
      },

      getechartsCompanies(){
        let $this = this
        this.$nextTick(() => {
          window.addEventListener('resize', function() {
            if ($this.chart01) {
              $this.chart01.resize()
            }
          })
        })
        let str1 = $this.messages.fgqys == null?0:$this.messages.fgqys
        let str2 = $this.messages.ycllhdzzs == null?0:$this.messages.ycllhdzzs
        let str3 = $this.messages.ddjldzzs == null?0:$this.messages.ddjldzzs
        let data = [str1, str2, str3]
        if (document.getElementById('chart01')) {
          this.chart01 = this.$echarts.init(document.getElementById('chart01'));
          let option = {
            grid: {
              top: '15%',
              left: '5%',
              right: '10%',
              bottom: '5%',
              containLabel: true
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: ""
              },
              show: true,
              formatter: function(params) {
                let str = ''
                if (params[0].axisValue == '非公企业成立党组织') {
                  for (let i = 3; i > 0; i--) {
                    str += '<div>' + params[i].seriesName + ':' + params[i].value + '</div>'
                  }
                } else {
                  str += '<div>' + params[0].seriesName + ':' + params[0].value + '</div>'
                };
                return str
              }
            },
            calculable: true,
            xAxis: [{
              type: "category",
              data: ["非公企业", "非公企业成立党组织"],
              splitArea: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: "rgb(51, 51, 51)"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "rgb(204, 204, 204)",
                  width: 1
                }
              }
            }],
            yAxis: [{
              type: "value",
              minInterval: 1,
              splitArea: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: true,
                length: 5,
                lineStyle: {
                  color: "rgb(204, 204, 204)",
                  width: 1
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgb(51, 51, 51)",
                  fontSize: 14
                }
              },
              axisLine: {
                lineStyle: {
                  width: 1,
                  color: "rgb(204, 204, 204)"
                }
              },
              name: "户",
              nameTextStyle: {
                color: "rgb(51, 51, 51)",
                fontSize: 12
              }
            }],
            series: [{
              name: "非公企业",
              type: "bar",
              data: [data[0], null],
              stack: "非公企业",
              markPoint: {

              },
              barWidth: 55,
              itemStyle: {
                normal: {
                  barBorderRadius: [10, 10, 0, 0],
                }
              }
            },

              {
                name: "单独组建党组织",
                type: "bar",
                stack: "非公企业成立党组织",
                data: [null, data[2]],
                barWidth: 55,
                label: {
                  show: true,
                  position: 'right',
                  distance: 0,
                  color: '#fff',
                  fontSize: 12,
                  formatter: function(agr) {
                    let arg = agr.seriesName.split('')
                    arg.splice(4, 0, '\n')
                    return arg.join('')
                  },
                  backgroundColor: {
                    image: ico3,
                  },
                  padding: [10, 10, 10, 30],
                  // padding: [10,30,10,10,10],
                },
              },
              {
                name: "已成立联合党组织",
                type: "bar",
                data: [null, data[1]],
                label: {
                  show: true,
                  position: 'right',
                  distance: 0,
                  color: '#fff',
                  fontSize: 12,
                  backgroundColor: {
                    image: ico2,
                  },
                  formatter: function(agr) {
                    let arg = agr.seriesName.split('')
                    arg.splice(4, 0, '\n')
                    return arg.join('')
                  },
                  padding: [10, 10, 10, 30],
                },
                barWidth: 55,
                stack: "非公企业成立党组织",
                itemStyle: {
                  normal: {
                    barBorderRadius: [10, 10, 0, 0],
                  }
                }
              },
              {
                name: "非公企业成立党组织",
                type: "bar",
                barWidth: 55,
                itemStyle: {
                  normal: {
                    color: 'rgb(78, 183, 173)',
                    barBorderRadius: [10, 10, 0, 0],
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  distance: 0,
                  color: '#434343',
                  fontSize: 16,
                  rich: {},
                  width: 30,
                  height: 20,
                  textStyle: {
                    align: 'center',
                  },
                  padding: [14, 6, 14, 6],
                },
                z: -1,
                barGap: '-100%',
                data: [data[0], data[1] + data[2]]
              }
            ],
            color: ["#F5A83C", "#FF7334", "#56BBFF"]
          }
          this.chart01.setOption(option);
        }
      },
      getechartsNonpublic(){
        let $this = this
        this.$nextTick(() => {
          window.addEventListener('resize', function() {
            if ($this.chart02) {
              $this.chart02.resize()
            }
          })
        })
        let dashedPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC';
        let color = ['#769CE6', '#FE9900', '#C6B6E5', '#8FD2F1'];
        let chartData = [{
          name: "管理层人员"+"   |",
          value:this.messages.glgws==null ? 0:this.messages.glgws,
          unit: '名'
        },
          {
            name: "技术骨干"+"   |",
            value:this.messages.jsggs==null ? 0:this.messages.jsggs,
            unit: '名'
          },
          {
            name: "流动人员"+"   |",
            value: this.messages.yxyg==null ? 0:this.messages.yxyg,
            unit: '名'
          },
          {
            name: "企业出资人"+"   |",
            value: this.messages.qyczr==null ? 0:this.messages.qyczr,
            unit: '名'
          }
        ];
        let arrName = [];
        let arrValue = [];
        let sum = 0;
        let pieSeries = [],
          lineYAxis = [];
        // 数据处理
        chartData.forEach((v, i) => {
          arrName.push(v.name);
          arrValue.push(v.value);
          sum = sum + v.value;
        })
        // 图表option整理
        chartData.forEach((v, i) => {
          pieSeries.push({
            name: '学历',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
            center: ["30%", "50%"],
            label: {
              show: false
            },
            data: [{
              value: v.value,
              name: v.name
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
            center: ["30%", "50%"],
            label: {
              show: false
            },
            data: [{
              value: 7.5,
              itemStyle: {
                color: "#F5F5F5"
              }
            }, {
              value: 2.5,
              name: '',
              itemStyle: {
                color: "rgba(0,0,0,0)"
              }
            }]
          });
          v.percent = (v.value / sum * 100).toFixed(1) + "%";
          lineYAxis.push({
            value: i,
            textStyle: {
              rich: {
                circle: {
                  color: color[i],
                  padding: [0, 5]
                }
              }
            }
          });
        })
        if (document.getElementById('chart02')) {
          this.chart02 = this.$echarts.init(document.getElementById('chart02'));
          let option = {
            backgroundColor: '#fff',
            color: color,
            grid: {
              top: '15%',
              bottom: '54%',
              left: "30%",
              containLabel: false
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
                formatter: function(params) {
                  let item = chartData[params];
                  return '{line|}{circle|●}{name|' + item.name + '}{value|' + item.value + '}{unit|名}'
                },
                interval: 0,
                inside: true,
                textStyle: {
                  color: "#333",
                  fontSize: 14,
                  rich: {
                    line: {
                      width: 80,
                      height: 10,
                      backgroundColor: { image: dashedPic }
                    },
                    name: {
                      color: '#666',
                      fontSize: 14,
                    },
                    bd: {
                      color: '#ccc',
                      padding: [0, 5],
                      fontSize: 14,
                    },
                    percent: {
                      color: '#333',
                      fontSize: 14,
                    },
                    value: {
                      color: '#333',
                      fontSize: 16,
                      fontWeight: 500,
                      padding: [0, 0, 0, 20]
                    },
                    unit: {
                      fontSize: 14
                    }
                  }
                },
                show: true
              },
              data: lineYAxis
            }],
            xAxis: [{
              show: false
            }],
            series: pieSeries
          };
          this.chart02.setOption(option);
        }
      },
      // 地图使用
      init(){
        let params = {
          types:['map_address']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.map_address = res.map_address;
          for (let i = 0;i<res.map_address.length;i++){
            this.mapLongitude = res.map_address[0].name
            this.mapLatitude = res.map_address[1].name
            this.mapName = res.map_address[2].name
            this.developmentName = this.mapName
          }
        this.map = new AMap.Map('developMap', {
          mapStyle: 'amap://styles/ab92c8b6d66ec4460b1df7713868135b', //设置地图的显示样式
          zoom: 15,
          zoomEnable: true,
          dragEnable: true,
          zooms: [6, 17],
          center: [this.mapLongitude,this.mapLatitude],
        });
        // map.setFeatures(['bg', 'point']);
        // that.districtExplorer();
        this.ningguoMapS()
        })
      },

      ningguoMapS() {
        let disProvince = null
        AMap.plugin('AMap.DistrictSearch', () => {
          disProvince = new AMap.DistrictSearch({
            // 关键字对应的行政区级别，共有5种级别
            // level: 'district',
            //  是否显示下级行政区级数，1表示返回下一级行政区
            subdistrict: 0,
            // 返回行政区边界坐标点
            extensions: 'all',
          })
          // 搜索所有省/直辖市信息
          disProvince.search('蜀山区', (status, result) => {
            // 查询成功时，result即为对应的行政区信息
            // 外多边形坐标数组和内多边形坐标数组
            let bounds = result.districtList[0].boundaries
            if (bounds) {
              for (let i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                let polygon = new AMap.Polygon({
                  map: this.map,    // 指定地图对象
                  strokeWeight: 1,    // 轮廓线宽度
                  path: bounds[i],     //轮廓线的节点坐标数组
                  fillOpacity: 0.15,     //透明度
                  fillColor: '#256edc',     //填充颜色
                  strokeColor: '#256edc',    //线条颜色
                })
                polygon.on('click', (e) => {
                  // 点击绘制的区域时执行其他交互

                })
              }
            }
            // map.setFitView()
            // $.ajax({
            //   method: 'POST',
            //   headers: {'Content-Type': 'application/json;charset=utf8'},
            //   dataType: 'json',
            //   url: '/djapi/partycloud/homeMap/list',
            //   success: function (res) {
            this.mapPositionG = [];
            getIndexMap().then(response => {
              const res = response;
              if(res!=undefined || res!=null || res!='null'){
                this.mapPositionG = res
                this.drawIcon(this.mapPositionG)
              }
            }).finally(() => {
            });

            //   }
            // })
          })
        })

      },
      drawIcon(data){
        var markerS=[]
        this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        })
        markerS=[]
        let iconS = new AMap.Icon({
          size: new AMap.Size(16, 22),	// 图标尺寸
          image: require('../../assets/page/have.png') ,	// Icon的图像
          imageSize: new AMap.Size(16, 22),   // 根据所设置的大小拉伸或压缩图片
          fitZoom:14,		//最合适的级别，在此级别下显示为原始大小
          scaleFactor:2,	//地图放大一级的缩放比例系数
        });
        for(let i=0; i<data.length; i++){
          if(data[i].orgLongitude && data[i].orgDimensionality){
            let pos = []
            pos[0] = parseFloat(data[i].orgLongitude)
            pos[1] = parseFloat(data[i].orgDimensionality)
            let that = this
            let obj = new AMap.Marker({
              map:that.map,
              draggable:false,// 禁用缩放和拖动
              icon:	iconS,
              // title: data[i].name,
              position: pos,
              // ids:this.mapPositionSData[i].ids,
              cityName:that.mapName,
              offset: new AMap.Pixel(-10, -25),
            });
            // let orgType = '--'
            // if (data[i].category == 1) {
            //   orgType = '党委';
            // } else if (data[i].category == 2) {
            //   orgType = '党总支部';
            // } else if (data[i].category == 3) {
            //   orgType = '党支部';
            // } else if (data[i].category == 4) {
            //   orgType = '联合党支部';
            // } else if (data[i].category == 5) {
            //   orgType = '党小组';
            // } else if (data[i].category == 6) {
            //   orgType = '临时党委';
            // } else if (data[i].category == 7) {
            //   orgType = '临时党总支部';
            // } else if (data[i].category == 8) {
            //   orgType = '临时党支部';
            // } else if (data[i].category == 9) {
            //   orgType = '特设党支部';
            // }else{
            //   orgType = "--";
            // }
            obj.content =
              '<div class="map-box"><div style="font-size: 15px;font-weight: bold;line-height: 35px;color: #000;">'+data[i].name+'</div>';
            obj.content += '<div style="font-size: 14px;font-weight: bold;line-height: 35px;color: #000;">组织类别：'+data[i].category +'</div>';
            obj.content += '<div style="font-size: 14px;font-weight: bold;line-height: 35px;color: #000;">正式党员：'+data[i].memberCnt+'人</div>';
            obj.content += '<div style="font-size: 14px;font-weight: bold;line-height: 35px;color: #000;">预备党员：'+data[i].prepareMemberCnt+'人</div></div>';
            obj.on('mouseover', that.infoOpen);
            obj.on('mouseout', that.infoClose);
            // obj.emit('mouseover', {target: obj});
            // obj.emit('mouseout', {target: obj});
            // markerS.push(obj)
          }

        }
        // markerS.map((data=>{
        //     let clickHandle = AMap.event.addListener(data , 'mouseover', infoOpen());
        // }))

      },
      infoOpen(e) {
        console.log('1111')
        this.infoWindow.setContent(e.target.content);
        this.infoWindow.open(this.map, e.target.getPosition());
      },
      infoClose(e) {
        this.infoWindow.close(this.map, e.target.getPosition());
      },
    },
    filters: {
      filtermath(value) {
        if (value == '' || value == null || value == undefined) {
          return '0'
        } else {
          return value
        }
      }
    },
    watch: {
      state1: function(val) {
        if (val == '') {
          this.orgList = []
        }
      }
    }
  }
</script>

<style lang="scss">
  /deep/.app-main {
    background:#eee;
  }
  /deep/.amap-info-content {
    padding: 0;
  }
  .map-box {
    /*padding: 10px;*/
    /*background-color: rgba(50, 50, 50, 0.7);*/
    /*border-width: 0px;*/
    /*border-color: rgb(51, 51, 51);*/
    /*border-radius: 4px;*/
    /*color: rgb(255, 255, 255);*/
  }
  /deep/ .amap-info-close{
     right: 0 !important;
  }
  .party-index {
    height: calc(100vh - 88px);
    min-height: 762px;
    padding: 20px 0 0 0;
    background-color: #eee;
    overflow: hidden;
  }
  .chart01 {
    background-color: #fff;
  }
  .chart02 {
    background-color: #fff;
  }
  .map_txt_box{
    right: 182px;
    width: auto;
    font-size: 16px;
  }
  .parkTotalNum{
    float: left;
    position: relative;
    padding-right: 20px;
    height: 100%;
  }
  .parkTotalPub{
    width: 460px;
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: calc(50% - 10px);
    .developAreaTit{
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 35px;
      color: #000000;
      text-align: left;
      padding-left: 10px;

      .numTxt{
        color:  #ED3C3C;
      }
      .icon{
        display: inline-block;
        width: 6px;
        height: 22px;
        background: #ED3C3C;
        position: relative;
        top: 4px;
        margin-right: 11px;
      }
    }
  }
  .parkTotalpri{
    width: 460px;
    background-color: #fff;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: calc(50% - 10px);

    .developAreaTit{
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 35px;
      color: #000000;
      text-align: left;
      padding-left: 10px;

      .numTxt{
        color:  #ED3C3C;
      }
      .icon{
        display: inline-block;
        width: 6px;
        height: 22px;
        background: #ED3C3C;
        position: relative;
        top: 4px;
        margin-right: 11px;
      }
      .partyNum {
        text-align: center;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #000000;
      }
    }
  }
  .parkListRight{
    /*width: 460px;*/
    float: right;
    position: relative;
    padding-left: 20px;
    height: 100%;
  }
  .parkList{
    width: 100%;
    height: calc(100%/6 - 2px);
    background-color: #fff;
    margin-bottom: 2px;
  }
  .partyOrgnizationTop{
    height: 100%;
  }
  .parkListTit{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 20px 20px 10px;
  }
  .partydw{
    color: #FE9900;
    font-size: 30px;
  }
  .parkListCont{
    text-align: left;
    padding: 0 20px;
  }
  .partyfg {
    color: #cdcc00;
    font-size: 30px;
  }
  .partyzz {
    color: #c6b6e5;
    font-size: 30px;
  }
  .partyyz {
    color: #e03d36;
    font-size: 30px;
  }
  .partydj {
    color: #769ce6;
    font-size: 30px;
  }
  .partygz{
    color: #72b94f;
    font-size: 30px;
  }
  .partyOrgnizationMap {
    /*position: absolute;*/
    /*z-index: 0;*/
    /*width: calc(100% - 550px);*/
    height: 100%;
  }
</style>

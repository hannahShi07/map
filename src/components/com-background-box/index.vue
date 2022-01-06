<template>
  <div class="bg-cla" :class="currentIndex!=4 ? '':'bg-active'">
    <div class="header-cla">
<!--      <div class="left-cla" v-for="(item,index) in typeList" @click="clickHandle(index)" :class="currentIndex === index  ? 'left-active' : 'left-disble'">
        <span class="header-time">
          <img class="middle-cla" :src="currentIndex === index ? item.imgActive : item.imgDisable" >
          <div class="reflect-cla">{{item.name}}</div>
        </span>
      </div>-->
      <div style="width: 21%;"></div>

      <div class="center-cla" @click="clickHandle(4)">
<!--        <img src="@/assets/image/icon-header-title.png">-->
      </div>

      <div  class="right-cla">
        <div class="header-weather">
          <img id="weatherimg" :src=weatherImg>
          <div class="header-weather-txt">
            <span id="weather">{{weatherTxt}}</span>
            <span id="temperature">{{weatherTmp}}℃</span>
          </div>
        </div>
        <div class="header-address">
          <img src="@/assets/image/icon-header-address.png">
          <span>黑龙江</span>
        </div>
        <div  class="time-cla">
          <span class="header-time">{{nowTime}}</span>
          <span class="header-date">{{nowWeek}} {{nowDate}}</span>
        </div>

      </div>

    </div>

<!--    <div class="title-cla" v-if="title">{{title}}</div>-->

    <div class="container-cla">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ComBackgrounBox",
    props: {
      // 是否是首页
      isHome: {
        type:Boolean,
        default: false
      },
      // 是否有标题
      // title: {
      //   type:String,
      //   default:''
      // },
      // 当前选中下标
      index: {
        type: Number,
        default: -1
      },
    },
    data() {
      return {
        nowWeek:'',//星期
        nowDate:'',//日期
        nowTime:'',//时间
        weatherImg: require("@/assets/image/icon-header-sunny.png"),//天气图片
        weatherTmp:'20',//温度
        weatherTxt:'晴',//天气
        currentIndex: this.index,// 当前选中下标
        typeList:[// 类型列表
          {
            name: '园区概况',
            imgDisable: require("@/assets/image/header/yqgk-disable.png"),
            imgActive: require("@/assets/image/header/yqgk-active.png")
          },
          {
            name: '党建联盟',
            imgDisable: require("@/assets/image/header/djlm-disable.png"),
            imgActive: require("@/assets/image/header/djlm-active.png")
          },
          {
            name: '一企一品牌',
            imgDisable: require("@/assets/image/header/yqypp-disable.png"),
            imgActive: require("@/assets/image/header/yqypp-active.png")
          },
          {
            name: '先进模范',
            imgDisable: require("@/assets/image/header/xjmf-disable.png"),
            imgActive: require("@/assets/image/header/xjmf-active.png")
          }

        ]
      }
    },
    mounted(){
      this.getTime()
      setInterval(this.getnowTime, 1000);
      this.weather()
    },
    methods:{
      // 获取时间
      getnowTime(){
        let weatherTxt = window.localStorage.getItem('weatherTxt')
        if(weatherTxt != undefined && weatherTxt){
          this.weatherTxt = weatherTxt
        }
        let weatherTmp = window.localStorage.getItem('weatherTmp')
        if(weatherTmp != undefined && weatherTmp){
          this.weatherTmp = weatherTmp
        }
        let weatherImg = window.localStorage.getItem('weatherImg')
        if(weatherImg != undefined && weatherImg){
          this.weatherImg = weatherImg
        }
        let nowWeek = window.localStorage.getItem('nowWeek')
        if(nowWeek != undefined && nowWeek){
          this.nowWeek = nowWeek
        }
        let nowDate = window.localStorage.getItem('nowDate')
        if(nowDate != undefined && nowDate){
          this.nowDate = nowDate
        }
        let nowTime = window.localStorage.getItem('nowTime')
        if(nowTime != undefined && nowTime){
          this.nowTime = nowTime
        }
      },
      // 点击事件
      clickHandle(index){
        this.currentIndex = index
        switch (index) {
          case 0:
            this.$router.push({
              path: '/parkprofile'
            })
            break
          case 1:
            this.$router.push({
              path: '/union'
            })
            break
          case 2:
            this.$router.push({
              path: '/enterprisebrand'
            })
            break
          case 3:
            this.$router.push({
              path: '/advanced'
            })
            break
          case 4:
            this.$router.push({
              path: '/screenLogin'
            })
            break
          default:
            this.getnowTime()
            break
        }
      },
      //天气查询
      weather() {
        axios.get('http://wthrcdn.etouch.cn/weather_mini?city=%E5%BD%93%E6%B6%82', {
        // axios.get('https://bird.ioliu.cn/weather?city=%E5%BD%93%E6%B6%82', {

        }).then((response) => {
          if(response!=='' && response!==undefined && response!==null && response!=='null'){
            if(response.data!=='' && response.data!==undefined && response.data!==null && response.data!=='null'){
              if(response.data.data!=='' && response.data.data!==undefined && response.data.data!==null && response.data.data!=='null'){
                if(response.data.data.forecast!=='' && response.data.data.forecast!==undefined && response.data.data.forecast!==null && response.data.data.forecast!=='null' && response.data.data.forecast.length>0){
                  this.weatherTxt=response.data.data.forecast[0].type
                  this.weatherTmp=response.data.data.wendu

                  if(response.data.data.forecast[0].type == '多云'){
                    this.weatherImg=require('@/assets/image/icon-header-sc.png')
                  }else if(rresponse.data.data.forecast[0].type == '小雨' || response.data.data.forecast[0].type == "雷阵雨" || response.data.data.forecast[0].type ==  "大雨"||response.data.data.forecast[0].type == "阵雨" || response.data.data.forecast[0].type == "中雨" || response.data.data.forecast[0].type  == "暴雨" || response.data.data.forecast[0].type  == "大暴雨"){
                    this.weatherImg=require("@/assets/image/icon-header-rain.png")
                  }else if(response.data.data.forecast[0].type == '晴'){
                    this.weatherImg=require("@/assets/image/icon-header-sunny.png")
                  }else if(response.data.data.forecast[0].type == '阴'){
                    this.weatherImg=require("@/assets/image/icon-header-cloudy.png")
                  }

                  window.sessionStorage.setItem('weatherTxt',this.weatherTxt)
                  window.sessionStorage.setItem('weatherTmp',this.weatherTmp)
                  window.sessionStorage.setItem('weatherImg',this.weatherImg)
                }else{
                  // 默认天气
                  this.weatherTxt='晴'
                  this.weatherTmp='20'
                  this.weatherImg=require('@/assets/image/icon-header-sunny.png')
                  window.sessionStorage.setItem('weatherTxt',this.weatherTxt)
                  window.sessionStorage.setItem('weatherTmp',this.weatherTmp)
                  window.sessionStorage.setItem('weatherImg',this.weatherImg)
                }
              }else{
                // 默认天气
                this.weatherTxt='晴'
                this.weatherTmp='20'
                this.weatherImg=require('@/assets/image/icon-header-sunny.png')
                window.sessionStorage.setItem('weatherTxt',this.weatherTxt)
                window.sessionStorage.setItem('weatherTmp',this.weatherTmp)
                window.sessionStorage.setItem('weatherImg',this.weatherImg)
              }
            }else{
              // 默认天气
              this.weatherTxt='晴'
              this.weatherTmp='20'
              this.weatherImg=require('@/assets/image/icon-header-sunny.png')
              window.sessionStorage.setItem('weatherTxt',this.weatherTxt)
              window.sessionStorage.setItem('weatherTmp',this.weatherTmp)
              window.sessionStorage.setItem('weatherImg',this.weatherImg)
            }
          }else{
            // 默认天气
            this.weatherTxt='晴'
            this.weatherTmp='20'
            this.weatherImg=require('@/assets/image/icon-header-sunny.png')
            window.sessionStorage.setItem('weatherTxt',this.weatherTxt)
            window.sessionStorage.setItem('weatherTmp',this.weatherTmp)
            window.sessionStorage.setItem('weatherImg',this.weatherImg)
          }
        }).catch(error => {
          // 默认天气
          this.weatherTxt='晴'
          this.weatherTmp='20'
          this.weatherImg=require('@/assets/image/icon-header-sunny.png')
          window.sessionStorage.setItem('weatherTxt',this.weatherTxt)
          window.sessionStorage.setItem('weatherTmp',this.weatherTmp)
          window.sessionStorage.setItem('weatherImg',this.weatherImg)
        })

      },
      // 获取当前时间
      getTime() {
        let myDate = new Date();
        let myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        let myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let myToday = myDate.getDate(); //获取当前日(1-31)
        let myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        let myHour = myDate.getHours(); //获取当前小时数(0-23)
        let myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
        let mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        // let nowTime;

        // nowTime = myYear + '年' + this.fillZero(myMonth) + '月' + this.fillZero(myToday) + '日' + ' ' + this.fillZero(myHour) + ':' +
        //   this.fillZero(myMinute) + ':' + this.fillZero(mySecond) + ' ' + week[myDay];

        this.nowWeek=week[myDay]
        this.nowDate=myYear + '-' + this.fillZero(myMonth) + '-' + this.fillZero(myToday)
        this.nowTime=this.fillZero(myHour) + ':' + this.fillZero(myMinute) + ':' + this.fillZero(mySecond)

        window.sessionStorage.setItem('nowWeek',this.nowWeek)
        window.sessionStorage.setItem('nowDate',this.nowDate)
        window.sessionStorage.setItem('nowTime',this.nowTime)

      },
      fillZero(str) {
        var realNum;
        if (str < 10) {
          realNum = '0' + str;
        } else {
          realNum = str;
        }
        return realNum;
      },


    },
    filters:{
      isEmity(val){
        if(val=='' || val==undefined || val==null || val=='null' || val.length<1){
          return '-'
        }else{
          return val
        }

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bg-cla {
    position:relative;
    z-index:1;
    color: #FFFFFF;
    height: 100vh;
    width: 100%;
    /*background:url('../../../assets/image/icon-bg.png') no-repeat;*/
    background:url('../../assets/image/orgstructure/orgstructure-index-bg.png') no-repeat;
    background-size:100% 100%;
    overflow:hidden;
  }
  .bg-active{
    background:url('../../assets/image/icon-bg.png') no-repeat;
    background-size:100% 100%;
  }

  .header-cla {
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    width: 100%;
    height: 8vh;
    padding-left:2vw;
    padding-right:3vw;
    color: rgba(255, 255, 255, 0.6);
    background: linear-gradient(90deg, rgba(0, 132, 255, 0.1), rgba(0, 132, 255, 0.3));
    display:flex;
    justify-content: space-between;
    align-items:center;
  }

  .left-cla {
    cursor: pointer;
    height:100%;
    display:flex;
    align-items:center;

  }
  .left-cla span{
    display:block;
  }
  .left-cla .header-time{
    font-size: 1.1vw;
    font-weight: bold;
    font-size: 0.9375vw;
  }

  .left-cla .middle-cla {
    display:block;
    width: 1.1vw;
    margin:0 auto;
    margin-top:-1.5vh;
    //vertical-align:middle;
  }

  .left-cla .reflect-cla {
    display: inline-block;
    margin-left: 0.5vw;
    text-shadow: 0 1.3vh 0 rgba(255,255,255,0.2);

  }
  .left-disble {
    color: rgba(255, 255, 255, 0.6);
    opacity: 0.8;
  }
  .left-active {
    color: #FFFFFF;
    opacity: 1;
  }

  .center-cla {
    //float: right;
    width:39.4vw;
    height:100%;
    background:url('../../assets/image/icon-header-bg.png') no-repeat;
    background-size:100% 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    //margin-left:5.5vw;
  }
  .center-cla img{
    width:63%;
  }

  .right-cla {
    //float: right;
    display:flex;
    justify-content:flex-end;
    align-items: center;
  }
  .header-address{
    display:flex;
    align-items: center;
    margin-left:3.425vw;
    margin-right:3.425vw;
  }
  .header-address img{
     width:0.84vw;
     height:1.05vw;
  }
  .header-address span{
    font-size: 0.94vw;
    font-weight: 400;
    color: #00BAFF;
    padding-left:0.5vw;
  }
  .header-weather{
    display:flex;
    justify-content:flex-start;
    align-items: center;

  }
  .header-weather img{
    width:2.15vw;
    height:2.15vw;

  }
  .header-weather-txt span{
    display:block;
    height: 2vh;
    width: 2.5vw;
    font-size: 0.78vw;
    font-weight: 400;
    color: #00BAFF;
    padding-left:0.5vw;
  }
  .time-cla {
    //width: 8vw;
  }
  .time-cla span{
    display:block;
    text-align:right;
  }
  .time-cla .header-time{
    font-size: 1.1vw;
    font-weight: bold;
    color: #00BAFF;
    opacity: 0.8;
  }
  .time-cla .header-date{
    font-size:0.78vw;
    font-weight: 400;
    color: #00BAFF;
    opacity: 0.8;
  }

  .container-cla {
    width:100vw;
    position:relative;
    z-index:9;
    padding-left:2vw;
    padding-right:2vw;
    padding-top:11.1vh;
    padding-bottom:3.57vh;
  }

</style>

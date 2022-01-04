<template>
  <com-background-box :index="1">
    <div  class="et-top">
      <div class="et-lef">
        <div class="left-top">
          <img src="@/assets/image/electric/left-top-icon1.png">
          智能电器产业链组织架构
        </div>
        <div class="left-bottom">
          <div class="left-bottom-content" v-if="industryList && industryList.length">
            <div :class="toClass(item,index)" @click="clikcHanlde(index)" v-for="(item,index) in industryList" v-if="isIndustryList ? index<15:index<14">
              <div class="original">
                <div>{{item.companyName}}</div>
                <div class="type-cir">{{item.product}}</div>
              </div>
            </div>
          </div>

          <div class="no-data"  v-else>
            <img src="@/assets/image/noData/noData.png">
            <div>暂无内容</div>
          </div>


        </div>
      </div>

      <div class="et-lef et-center">
        <div class="left-top">
          <img src="@/assets/image/electric/left-top-icon2.png">
          智能电器龙头企业
        </div>
        <div class="left-bottom ">

          <el-carousel trigger="click" class="img-center" arrow="always" v-if="guideList && guideList.length">
            <el-carousel-item v-for="(item,index) in guideList" :key="index">
              <img class="img-center" :src="item">
            </el-carousel-item>
          </el-carousel>

          <div class="no-data"  v-else>
            <img src="@/assets/image/noData/noData.png">
            <div>暂无内容</div>
          </div>

        </div>
      </div>

      <div class="et-lef et-right">
        <div class="left-top">
          <img src="@/assets/image/electric/left-top-icon3.png">
          智能电器产业集群数据
        </div>
        <div class="left-bottom right-content">
          <div class="right-one" v-for="(item,index) in rightList">
            <div class="content-bg" :style="{background: 'url('+ item.centerBg +')' + 'no-repeat', backgroundSize:'cover',backgroundPosition: 'center center', backgroundSize: '2.9166666666666vw 5.1851851851851vh' }">
              <img :src="item.icon" >
            </div>
            <div class="text">{{item.num}}</div>
            <div class="text word-top">{{item.cont}}</div>
          </div>

        </div>
      </div>

    </div>

    <div class="et-bottom">
      <div class="et-top">
        <div class="left-top">
          <img src="@/assets/image/electric/bt-icon1.png">
          智能电器党组织活动风采
        </div>
        <div class="btn">
          <img :src="currentIndex > 1 ? previousAct : previousDis " class="previous" @click="previous()" />
          <img :src="isNext() ? nextAct : nextDis " class="next" @click="next()" />
        </div>
      </div>

      <div class="orgstructure-bottom-list">
        <div class="new-list" v-for="(item,index) in currentdList" v-if="currentdList && currentdList.length">
          <div class="new-left">
            <div class="news-img">
              <el-carousel trigger="click" class="img-center1" arrow="always"  v-if="item.photoURL && item.photoURL.length">
                <el-carousel-item v-for="(ite,index) in item.photoURL" :key="index">
                  <img class="img-center" :src="ite">
                </el-carousel-item>
              </el-carousel>

              <div class="no-data" v-else>
                <img src="@/assets/image/noData/noData.png">
                <div>暂无内容</div>
              </div>

            </div>

          </div>
          <div class="news-right">
            <div class="news-intro" v-html="item.content"></div>
            <div class="news-time">{{item.createTime | timeDateFormat}}&nbsp;&nbsp;&nbsp;记录人：{{item
              .userName}}</div>
          </div>
        </div>

        <div class="no-data" v-if="!currentdList || !currentdList.length">
          <img src="@/assets/image/noData/noData.png">
          <div>暂无内容</div>
        </div>

      </div>
    </div>

  </com-background-box>
</template>

<script>
  import ComBackgroundBox from "@/components/com-background-box/";
  import { getClusterDetail, getMeetingPage, INTELLIGENCE, getIndustryList, ElECTRIC } from '@/api/screen/electric.js'

  export default {
    name: "electric",
    components: {
      ComBackgroundBox
    },
    data(){
      return {
        rightList: [
          {
            bg: "@/assets/image/electric/right-icon1.png",
            icon: require('@/assets/image/electric/right-bg1.png'),
            centerBg: require('@/assets/image/electric/right-icon1.png'),
            num: 0,
            cont: "产值(亿元)",
          },
          {
            bg: "@/assets/image/electric/right-icon2.png",
            icon: require('@/assets/image/electric/right-bg2.png'),
            centerBg: require('@/assets/image/electric/right-icon2.png'),
            num: 0,
            cont: "产值同期增长(%)",
          },
          {
            bg: "@/assets/image/electric/right-icon3.png",
            icon: require('@/assets/image/electric/right-bg3.png'),
            centerBg: require('@/assets/image/electric/right-icon3.png'),
            num: 0,
            cont: "重点项目(个)",
          },
          {
            bg: "@/assets/image/electric/right-icon4.png",
            icon: require('@/assets/image/electric/right-bg4.png'),
            centerBg: require('@/assets/image/electric/right-icon4.png'),
            num: 0,
            cont: "项目总投资(亿元)",
          }
        ],
        guideList:[],
        // 当前展示数据
        currentdList:[],
        // 每页数据条数
        size: 3,
        // 当前页数
        currentIndex: 1,
        //  智能电器党组织风采 - 所有数据 总长度
        recoredListlen: 0,
        // 智能电器产业链组织架构 高亮下标
        orgIndex: -1,
        //  上一页图标 禁用标签
        previousDis: require('@/assets/image/orgstructure/previous-disable.png'),
        //  上一页图标 可用标签
        previousAct: require('@/assets/image/orgstructure/previous-active.png'),
        //  下一页图标 禁用标签
        nextDis: require('@/assets/image/orgstructure/next-disable.png'),
        //  下一页图标 可用标签
        nextAct: require('@/assets/image/orgstructure/next-active.png'),
        // 智能电器产业链组织架构
        industryList: [],
      //   中心下标
        centerIndex: -1,
        isIndustryList:false //控制产业连组织架构显示个数
      }
    },
    mounted(){
      this.getNumber()
      this.getList()
      this.getIndustry()
    },
    methods: {
      // 返回对应class
      toClass(item, index){
        let duteIndex = index
        if((this.centerIndex  != -1) && (index > this.centerIndex)){
          duteIndex = index - 1
        }
        let onClass = 'other-one' + duteIndex
        if(this.orgIndex === index){
          let centeCla = 'top-center big-center'
          let cla = 'top-center-other big-cir ' + onClass
          if(item.isLeading == '1'){
            if(this.centerIndex != -1){
              this.centerIndex = index
            }
            return  centeCla
          }else {
            return  cla
          }
        }else{
          if(item.isLeading == '1'){
            this.centerIndex = index
            let centeCla = 'top-center'
            return  centeCla
          }else {
            let cla = 'top-center-other ' + onClass
            return  cla
          }
        }
      },
      // 获取智能电器产业链组织架构数据
      getIndustry(){
        let params = {
          industryType: ElECTRIC
        }
        getIndustryList(params).then(res => {
          this.industryList = res
          this.industryList.forEach((item,index)=>{
            if(item.isLeading==1){
              this.isIndustryList=true
            }
          })
        })
      },
      // 判断有无下一页
      isNext(){
        // if(this.recoredListlen > (this.currentIndex * 3)){
        //   return  true
        // }else {
        //   if(this.recoredListlen === 3){
        //     if( this.currentdList.length === 3){
        //       return true
        //     }else{
        //       return false
        //     }
        //   }else {
        //     return false
        //   }
        // }
        if(this.currentIndex < 2){
          return true
        }else {
          return false
        }
      },
      // 智能电器产业集群数据
      getNumber() {
        let params = {
          industryType: ElECTRIC
        }
        getClusterDetail({}).then(res => {
          this.rightList[0].num  = res.outputValue
          this.rightList[1].num  = res.growthRate
          this.rightList[2].num  = res.projectNum
          this.rightList[3].num  = res.investment
          this.guideList = res.fileUrlList

        }).catch(error => {
            this.$message.error("智能电器产业集群数据获取异常")
        })
      },
      // 智能电器产业链组织架构点击事件
      clikcHanlde(val){
        this.orgIndex = val
      },
      // 智能电器党组织活动风采
      getList(){
        let params = {
          size: this.size,
          current: this.currentIndex,
          model: {
            meetingType: {
              key: INTELLIGENCE,
              data: ''
            }
          }
        }
        getMeetingPage(params).then(res => {
          if(res && res.records){
            // if(this.size === 2){
            //   let arryData = this.currentdList[2]
            //   this.currentdList = []
            //   if(res.records.length === 1){
            //     this.currentdList.push(arryData)
            //   }
            //   for(let i=0; i<res.records.length; i++){
            //     this.currentdList.push(res.records[i])
            //   }
            // }else{
              this.currentdList = []
              this.currentdList = res.records
            // }
            // if(this.recoredListlen === 0){
            //   this.recoredListlen = res.total
            // }
          }

        }).catch(error => {
          this.$message.error("智能电器党组织活动风采数据获取异常")
        })
      },
      // 前一页
      previous(){
        if(this.currentIndex > 1){
          this.size = 3
          this.currentIndex--
          this.getList()
        }else {
          this.$message.info("已经在最前方了")
        }
      },
      // 下一页
      next(){
        if(this.currentIndex  < 2){
          this.size = 2
          this.currentIndex++
          this.getList()
        }else {
          this.$message.info("后面没有数据了")
        }
      }
    },
    filters:{
      timeDateFormat : function (msg) {
        //讲字符串转为Date格式
        var mt = new Date(msg);
        //获取年份
        var year = mt.getFullYear();
        //从0开始，获取月份
        var month = (mt.getMonth() + 1).toString().padStart(2,'0');
        //获取天数
        var day = mt.getDay().toString().padStart(2,'0');
        /* if (con === 'yyyy/mm/dd'){
             return year + "/" + month + "/" + day;
         }*/
        //获取小时
        var hh = mt.getHours().toString().padStart(2,'0');
        //获取分钟
        var mm = mt.getMinutes().toString().padStart(2,'0');
        //获取秒
        var ss = mt.getSeconds().toString().padStart(2,'0');

        return year + "年" + month + "月" + day + "日";
      }
    },
  }
</script>

<style scoped lang="scss">

  @keyframes fade-in {
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0;}/*过渡状态 透明度为0*/
    100% {opacity: 1;}/*结束状态 透明度为1*/
  }
  @-webkit-keyframes fade-in {/*针对webkit内核*/
    0% {opacity: 0;}
    40% {opacity: 0;}
    100% {opacity: 1;}
  }

  /* 轮播图样式-底部 */
  .orgstructure-bottom-list ::v-deep .el-carousel__container{
    height: 14.68vh;
    width: 14.66vw;
  }
  /* 轮播图样式-底部 图片横杠长短 */
  .orgstructure-bottom-list ::v-deep .el-carousel__button {
    width: 1.5vh;
    background-color: #1687ff;
  }
  /* 轮播图样式-底部 左右箭头大小 */
  .orgstructure-bottom-list ::v-deep .el-carousel__arrow {
    width: 2vh;
    height: 2vh;
    font-size: 0.625vw;
  }

  /* 轮播图样式-中间轮播图 start */
  .et-center ::v-deep .el-carousel__container{
    height: 49.444444444444vh;
    width: 30.5vw;
  }
  /* 轮播图样式-底部 图片横杠长短 */
  .et-center ::v-deep .el-carousel__button {
    background-color: #1687ff;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /*.el-carousel__item:nth-child(2n) {*/
    /*background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
    /*background-color: #d3dce6;*/
  /*}*/
  /*  轮播图样式 end */

  .et-top {
    height: 55.462962962962vh;
    width: 95.885416666666vw;
    margin-bottom: 2.8703703703703vh;
    display: flex;
    justify-content: space-around;


    .et-lef {
      height: 55.462962962962vh;
      width: 30.9375vw;
      color: #FFFFFF;
      font-family: Microsoft YaHei;
      background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));
    }

    .left-bottom {
      position: relative;
      height: 49.444444444444vh;
      margin: 0.4629629629629vh 0.46875vw 0 0.2604166666666vw;

      .big-cir {
        width: 12vh !important;
        height: 12vh !important;
        font-size: 0.92592592593vh!important;
        font-weight: bold;
        background: rgba(0, 92, 203, 0.8) !important;
        box-shadow: 0px 2px 14px 0px #0084FF !important;
        z-index: 1;
      }

      .big-center {
        width: 14vh !important;
        height: 14vh !important;
        background: rgba(0, 92, 203, 0.8) !important;
        box-shadow: 0px 2px 14px 0px #0084FF !important;
        z-index: 1;
      }


      .type-cir {
        margin-top: 10%;
        color: #00BAFF;
      }

      .top-center {
        position: absolute;
        width: 13vh;
        height: 13vh;
        border-radius: 50%;
        top:50%;
        left: 50%;
        transform:translate(-50%,-50%);
        text-align: center;
        font-size: 0.92592592593vh;
        font-weight: bold;
        line-height: 1.6;
        background: url('../assets/image/electric/center.png') no-repeat bottom center;
        background-size: 6.30208333333vw 4.81481481481vh;
        background-color: rgba(6, 85, 180, 0.26);
        box-shadow: 0px 5px 40px 1px rgba(0, 132, 255, 0.46);
        cursor: pointer;


        .original {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

        }

      }
      .top-center-other {
        position: absolute;
        width: 11vh;
        height:  11vh;
        border-radius: 50%;
        transform: translate(-50%,-50%);
        font-size: 0.74074074074vh;
        line-height: 1.6;
        text-align: center;
        background: rgba(6, 85, 180, 0.26);
        box-shadow: 0px 5px 40px 1px rgba(0, 132, 255, 0.46);
        cursor: pointer;

        .original {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

        }

      }
      .other-one6 {
        /*transform: translate(8vh, 11vh);*/
        top: 41%;
        left: 23%;
      }
      .other-one5 {
        /*transform: translate(13.8vh, 6vh);*/
        left: 29%;
        top: 29%;
      }
      .other-one7 {
        /*transform: translate(5vh, 24vh);*/
        top: 68%;
        left: 25%;
      }
      .other-one4 {
        /*transform: translate(5vh, 17vh);*/
        top: 55%;
        left: 22%;
      }
      .other-one8 {
        /*transform: translate(8.8vh, 30vh);*/
        top: 76%;
        left: 34%;
      }
      .other-one3 {
        /*transform: translate(21vh, 4vh);*/
        top: 22%;
        left: 40%;
      }

      .other-one9 {
        /*transform: translate(21.8vh, 37vh);*/
        top: 77%;
        left: 58%;
      }

      .other-one2 {
        /*transform: translate(28vh, 5vh);*/
        top: 20%;
        left: 52%;
      }

      .other-one1 {
        /*transform: translate(34.8vh, 9vh);*/
        top: 25%;
        left: 64%;
      }
      .other-one0 {
        /*transform: translate(38.8vh, 16vh);*/
        top: 33%;
        left: 74%;
      }
      .other-one10 {
        /*transform: translate(14.8vh, 35vh);*/
        top: 79%;
        left: 46%;
      }
      .other-one11 {
        /*transform: translate(28.8vh, 35vh);*/
        top: 73%;
        left: 69%;
      }
      .other-one12 {
        /*transform: translate(35.8vh, 31vh);*/
        top: 61%;
        left: 75%;
      }
      .other-one13 {
        /*transform: translate(38.8vh, 23.7vh)*/
        top: 47%;
        left: 78%;
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

    }

    .right-content {
      padding: 4.6296296296296vh 4vw 8.8888888888888vh 5vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .content-bg {
        display: flex;
        justify-content: center;
        height: 5.18518518519vw;
        width: 5.18518518519vw;
        margin-left: auto;
        margin-right: auto;

        img {
          height: 9.444444444444vh;
          vertical-align: middle;
          animation: loading 5s linear infinite;
        }
      }

      .right-one {
        width: 10.2vw;
        height: 17.4vh;
        display: flex;
        flex-direction: column;
        margin-bottom: 4.1666666666666vh;

        .text {
          margin: 2.1296296296296296vh auto 0 auto;
          font-size: 1.4583333333333vw;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #FFFFFF;
        }

        .word-top {
          margin-top: 1.2037037037037vh;
          font-size:  0.8854166666666vw;
          color: #00BAFF;
        }
      }

    }

    .img-center {
      height: 49.444444444444vh;
      width: 30.5vw;
      vertical-align: middle;
    }

  }

  .et-bottom {
    position: relative;
    height: 26.851851851851vh;
    width: 95.885416666666vw;
    background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));

    .orgstructure-bottom-list {
      //position:relative;
      //height: 14.68vh;
      display: flex;
      justify-content: left;
      margin:1.04vw 2.08vw;
      overflow: hidden;
      .new-list{
        width: 39.63vw;
        height: 17.04vh;
        background: linear-gradient(-90deg, rgba(0, 132, 255, 0.11), rgba(0, 132, 255, 0.05));
        display: flex;
        justify-content: space-between;
        margin-right: 1.07vw;
        padding: 0.65vw 1.30vw 0.65vw 0.65vw;

        animation: fade-in;/*动画名称*/
        animation-duration: 0.5s;/*动画持续时间*/
        -webkit-animation:fade-in 0.5s;/*针对webk
        it内核*/

        .new-left img{
          width: 14.66vw;
          height: 14.68vh;
          margin-right:1.41vw;
        }
        .img-center1 {
          margin-right:1.41vw;
          width: 14.66vw;
          height: 14.68vh;
          vertical-align: middle;
        }
        .news-right{
          width: 21.54vw;
          font-size: 0.63vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 1.09vw;
          margin-left:1.41vw;

          .news-intro{
            text-indent: 1rem;
            min-height: 12vh;
          }
          .news-time{
            text-align: right;
          }
        }
      }

      .no-data {
        position: absolute;
        top:50%;
        left: 50%;
        transform:translate(-50%,-50%);
        text-align: center;

        img {
          width: 5.46875vw!important;
          height: 8.333vh!important;
          margin-bottom: 1vh;
          margin-right: 0!important;
        }
      }

    }
    .et-top {
      display: flex;
      justify-content: space-between;
      height: 3.75vh;
      line-height: 3.75vh;

      .btn {
        height: 3.75vh;
        line-height: 3.75vh;
        padding-right:3.15vw ;
        margin-top: 1.2vh;

        .previous{
          width: 1.85vw;
          height: 3.75vh;
          cursor: pointer;
        }
        .next{
          width: 1.85vw;
          height: 3.75vh;
          margin-left: 22px;
          cursor: pointer;
        }
      }
    }


  }

  /* 公告样式 */
  .left-top {
    width: 30.208333333333vw;
    height: 6vh;
    line-height: 6vh;
    margin: 0.4629629629629vh 0.46875vw 0 0.2604166666666vw;
    /*padding-top: 0.4629629629629vh;*/
    background: url('../assets/image/union/union-left-bg.png') no-repeat;
    background-size: cover;
    font-size: 0.9375vw;

    img {
      height: 2.037037037037vh;
      margin-left: 1.09375vw;
      margin-right: 0.5729166666666vw;
      vertical-align: middle;
    }

  }

  .news-img {
    position: relative;
    width: 14.66vw;
    height: 14.68vh;
    font-size: 0.78125vw;

    .no-data {
      position: absolute;
      top:50%;
      left: 50%;
      transform:translate(-50%,-50%);
      text-align: center;

      img {
        width: 5.46875vw!important;
        height: 8.333vh!important;
        margin-bottom: 1vh;
        margin-right: 0!important;
      }
    }
  }

</style>

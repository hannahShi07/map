<template>
  <com-background-box :index="1">
    <div class="union-top">
      <div class="union-left">
        <div class="top-bg">
          <img src="@/assets/image/union/union-left-iocn.png">
          非公党建新路径
        </div>
<!--        <img src="@/assets/image/union/union-left-content.png" >-->
        <div class="union-left-top">
          <div class="union-left-top-img1-box">
            <img class="union-left-top-img1" src="@/assets/image/union/union-new-1.png" >
            <img class="union-left-top-img4" src="@/assets/image/union/union-new-4.png" >
            <img class="union-left-top-img5" src="@/assets/image/union/union-new-5.png" >
            <img class="union-left-top-img6" src="@/assets/image/union/union-new-6.png" >
            <img class="union-left-top-img7" src="@/assets/image/union/union-new-7.png" >
          </div>
          <img class="union-left-top-img2" src="@/assets/image/union/union-new-2.png" >
          <img class="union-left-top-img3" src="@/assets/image/union/union-new-3.png" >

        </div>
      </div>

      <div class="union-right">
        <div class="top-bg">
          <img src="@/assets/image/union/union-right-icon.png">
          联盟机制
        </div>

        <div class="content">
          <div class="content-box" v-for="(item, index) in contentList">
            <div class="top-pic" :style="{background: 'url('+ item.topBg +')', backgroundSize:'cover' }">
              <img :src="item.topPic" >
            </div>
            <div class="text-cla" v-show="item.isShow">
              {{item.content}}
            </div>
            <div class="bottom-pic" :class=" item.isShow ? '' : 'bottom-pic-show' " @click="showHandle(index)">
              <img  :src=" item.isShow ? item.btClose : item.btShow"  >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="union-bottom">
      <div class="top-bg">
        <img src="@/assets/image/union/union-bottom-icon.png">
        “1+2+X”组织架构
      </div>
      <div class="bt-content">

        <div class="bt-fist bt-one" @click="structHadnle(1)">
          <div class="bt-lef">
            <img class="img1" src="@/assets/image/union/bt-left-top.png">
            <!--<img class="img2" src="@/assets/image/union/bt-left-bottom.png">-->
          </div>
          <div class="bt-right">
            <div class="bt-right-box bt-width">党建联盟
              <img class="bt-right-img" src="@/assets/image/union/union-new-11.png">
            </div>
          </div>
        </div>

        <div class="bt-add">
          <img src="@/assets/image/union/bt-add-iocn.png">
        </div>

        <div class="bt-fist bt-two">
          <div class="bt-lef bt-default">
            <img class="img4" src="@/assets/image/union/bt-center-top.png">
            <!--<img class="img2" src="@/assets/image/union/bt-left-bottom.png">-->
          </div>
          <div class="bt-second">
            <div class="bt-size"  @click="structHadnle(2)">
              <div class="bt-size-box bt-width1">智能电器产业集群
                <img class="bt-right-img" src="@/assets/image/union/union-new-11.png">
              </div>
            </div>
            <div class="bt-size"   @click="structHadnle(3)">
              <div class="bt-size-box bt-width1">生命健康产业集群
                <img class="bt-right-img" src="@/assets/image/union/union-new-11.png">
              </div>
            </div>
          </div>
        </div>

        <div class="bt-add">
          <img src="@/assets/image/union/bt-add-iocn.png">
        </div>

        <div class="bt-fist bt-thir"  @click="structHadnle(4)">
          <div class="bt-lef">
            <img class="img3" src="@/assets/image/union/bt-right-top.png">
            <!--<img class="img2" src="@/assets/image/union/bt-left-bottom.png">-->
          </div>
          <div class="bt-right" >
            <div class="bt-right-box bt-width">产业链企业和职能部门党组织
              <img class="bt-right-img" src="@/assets/image/union/union-new-11.png">
            </div>
          </div>
        </div>

      </div>

    </div>
  </com-background-box>
</template>

<script>
  import ComBackgroundBox from '@/components/com-background-box';

  export default {
    name: "union",
    components: {
      ComBackgroundBox
    },
    data(){
      return {
        // 选中下标
        activeIndex: 0,
        // 联盟机制列表
        contentList:[
          {
            topBg: require('@/assets/image/union/top-pic-bg1.png'),
            topPic:  require('@/assets/image/union/top-pic-img1.png'),
            content: '每个联盟职能部门指派1名联络员，负责对接产业链联盟企业，为联盟企业提供各类党务政务服务。',
            btShow: require('@/assets/image/union/bottom-show1.png'),
            btClose: require('@/assets/image/union/bottom-close1.png'),
            isShow: false
          },{
            topBg: require('@/assets/image/union/top-pic-bg2.png'),
            topPic:  require('@/assets/image/union/top-pic-img2.png'),
            content: '每季度召开联盟党建联席会议，民主商议党建和联盟发展等重大事项，做到大事共议、难题共解、实事共办。',
            btShow: require('@/assets/image/union/bottom-show2.png'),
            btClose: require('@/assets/image/union/bottom-close2.png'),
            isShow: false
          },{
            topBg: require('@/assets/image/union/top-pic-bg3.png'),
            topPic:  require('@/assets/image/union/top-pic-img3.png'),
            content: '各联盟成员党组织结合各自优势，轮流牵头开展注意党日活动。',
            btShow: require('@/assets/image/union/bottom-show3.png'),
            btClose: require('@/assets/image/union/bottom-close3.png'),
            isShow: false
          },{
            topBg: require('@/assets/image/union/top-pic-bg4.png'),
              topPic:  require('@/assets/image/union/top-pic-img4.png'),
            content: '将党建责任落实、党组织作用发挥、参与联盟主题活动等内容列入党建联盟考评内容，考评结果与联盟政策扶持、资源调配相挂钩。',
            btShow: require('@/assets/image/union/bottom-show4.png'),
            btClose: require('@/assets/image/union/bottom-close4.png'),
            isShow: false
          },{
            topBg: require('@/assets/image/union/top-pic-bg5.png'),
            topPic:  require('@/assets/image/union/top-pic-img5.png'),
            content: '探索“党建联盟基金”方式，采取财政拨付、党费补充、企业共筹相结合的方式，多渠道解决工作经费、强化经费使用绩效。',
            btShow: require('@/assets/image/union/bottom-show5.png'),
            btClose: require('@/assets/image/union/bottom-close5.png'),
            isShow: false
          }
        ]

      }
    },
    methods:{
      // 联盟机制点击事件
      showHandle(index) {
        this.contentList[index].isShow = !this.contentList[index].isShow
      },
      // 组织架构点击事件
      structHadnle(val){
        switch (val) {
          case 1:
            // 产业链企业和职能部门
            this.$router.push({
              path: '/orgstructure'
            })
            break
          case 2:
            // 智能电器产业集群
            this.$router.push({
              path: '/electric'
            })
            break
          case 3:
            // 生命健康产业集群

            break
          case 4:
            // 党建联盟
            this.$router.push({
              path: '/partyalliance'
            })
            break

        }
      }

    }
  }
</script>

<style scoped lang="scss">
  .union-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.8vh;
    height: 49.1vh;
  }
  .union-left {
    width: 49%;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));
    flex-direction: row-reverse;

    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/union/union-left-bg.png') no-repeat;
      background-size: cover;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;

      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }

  }
  .union-right {
    width: 49%;
    right: 0;
    background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));

    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/union/union-right-bg.png') no-repeat;
      background-size: cover;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;

      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }

  .content {
      display: flex;
      justify-content: center;
      margin-top: 2.12963vh;
      background:rgba(0,0,0,0);

      .content-box {
        width: 8.594vw;
        height: 38.89vh;
        line-height: 38.89vh;
        margin-right: 0.520835vw;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        justify-content: center;
        flex-direction: column;


        .top-pic {
          position: relative;
          width: 7.1vw;
          height: 12.616vh;

          img {
            position: absolute;
            width: 7.1vw;
            /*height: 12.616vh;*/
            vertical-align: middle;
            /*animation (动画) :绑定选择器, 5s完成动画 linear(匀速) infinite(循环) */
            animation: loading 5s linear infinite;
          }
        }

        .text-cla {
          width: 6.875vw;
          height: 7.77777777778vh;
          font-size: 0.625vw;
          margin-top: 2.3148vh;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 1.666666vh;
          line-height: 1.66666666667vh;

        }

        .bottom-pic {
          width: 3.021vw;
          height: 3.519vh;
          margin-top: 5.55555vh;
          margin-left: auto;
          margin-right: auto;
          cursor: pointer;
          background-size: cover;

          img {
            position: absolute;
            width: 3.021vw;
            /*height: 3.519vh;*/
            vertical-align: middle;
          }
        }

        .bottom-pic-show {
          margin-top: 0;
          background-size: cover;
        }
      }

    }

    .content-box:last-of-type {
      margin-right: 0;
    }

  }

  .union-bottom {
    height: 33.4vh;
    background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));

    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/union/union-bottom-bg.png') no-repeat;
      background-size: cover;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;
      margin-bottom: 1.50463vh;

      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }

    .bt-content {
      display: flex;
      justify-content: space-around;
      //margin-left: 1.953125vw;
      //margin-right: 3.47222vh;
      font-size: 1.25vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;

      .bt-one {
        /*width: 24.74vw;*/
        width: 26.04vw;
      }

      .bt-two {
        width: 26.04vw;
      }

      .bt-thir {
        width: 26.04vw;
      }

      .bt-fist {
        height: 22.455vh;
        background:url('../assets/image/union/union-new-8.png') no-repeat;
        background-size:100% 100%;
        display: flex;
        justify-content:flex-start;
        cursor: pointer;

        .bt-lef {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          width: 8.464vw;
          height: 22.455vh;
          background:url('../assets/image/union/union-new-9.png') no-repeat;
          background-size:100% 100%;

          img {
            margin-left: auto;
            margin-right: auto;
          }

        }

        .bt-default {
          cursor: default;
        }

        .img1 {
          width: 1.563vw;
          /*height: 6.482vh;*/
          vertical-align: middle;
        }

        .img2 {
          width: 3.581vw;
          /*height: 5.672vh;*/
          vertical-align: middle;
        }

        .img3 {
          width: 3.646vw;
          /*height:  6.482vh;*/
        }

        .img4 {
          width: 3.907vw;
          /*height:  6.482vh;*/
        }

        .bt-right {
          padding-left: 0.69vw;
          padding-right: 0.69vw;
          display:flex;
          align-items:center;

        }

        .bt-right-box{
          position:relative;
          padding:2.08vh 3vw 2.08vh 1.09vw;
          background:url('../assets/image/union/union-new-10.png') no-repeat;
          background-size:100% 100%;
          text-align: left;
        }
        .bt-width{
          width:16.2vw;
        }
        .bt-right-img{
          width:0.729vw;
          position:absolute;
          top:50%;
          right:0.9vw;
          transform: translate(0,-50%);
        }


      }

      .bt-add {
        display: flex;
        align-items: center;

        img {
          width: 4.493vw;
          /*height: 7.987vh;*/
        }
      }

      .bt-second {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        /*padding-left: 2.01823vw;*/

        .bt-size {
          width: 17.576vw;
          padding-left: 0.69vw;
          padding-right: 0.69vw;
          height: 11.2275vh;
          text-align: center;
          display:flex;
          align-items:center;
        }
        .bt-size-box{
          position:relative;
          padding:2.08vh 3vw 2.08vh 1.09vw;
          background:url('../assets/image/union/union-new-10.png') no-repeat;
          background-size:100% 100%;
          text-align: left;
        }
        .bt-width1{
          width:17.576vw;
        }

      }

    }

  }

  /*非公党建新路径样式*/
  .union-left-top{
    position:relative;
    z-index:1;
    width:100%;
    padding:3.47vh 4.16vw;
  }
  .union-left-top-img1-box{
    position:relative;

  }
  .union-left-top-img1{
    display:block;
    width:38.8vw;
    height:36.11vh;
    margin:0 auto;
  }
  .union-left-top-img2{
    //width:16.67vw;
    height:29.62vh;
    position:absolute;
    z-index:-1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /*animation (动画) :绑定选择器, 5s完成动画 linear(匀速) infinite(循环) */
    animation: loading 5s linear infinite;
  }
  .union-left-top-img3{
    //width:21.04vw;
    height:19.81vh;
    position:absolute;
    z-index:-2;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .union-left-top-img4{
    width:1.71875vw;
    height:2.3148vh;
    position:absolute;
    z-index:3;
    top:1vh;
    left:10.7vw;
    animation: tranx1 4s linear infinite

  }
  .union-left-top-img5{
    width:1.302vw;
    height:3.056vh;
    position:absolute;
    z-index:3;
    top:10vh;
    right:0.5vw;
    animation: tranx2 4s linear infinite

  }
  .union-left-top-img6{
    width:1.71875vw;
    height:2.3148vh;
    position:absolute;
    z-index:3;
    bottom:1.1vh;
    right:10.4vw;
    animation: tranx3 4s linear infinite

  }
  .union-left-top-img7{
    width:1.302vw;
    height:3.056vh;
    position:absolute;
    z-index:3;
    bottom:10vh;
    left:0.6vw;
    animation: tranx4 4s linear infinite

  }
  @keyframes tranx1 {
    0%{
      transform: translateX(0);
    }
    100%{
      transform: translateX(15.5vw);
    }
  }
  @keyframes tranx2 {
    0%{
      transform: translateY(0);
    }
    100%{
      transform: translateY(13.5vh);
    }
  }
  @keyframes tranx3 {
    0%{
      transform: translateX(0);
    }
    100%{
      transform: translateX(-15.5vw);
    }
  }
  @keyframes tranx4 {
    0%{
      transform: translateY(0);
    }
    100%{
      transform: translateY(-13.5vh);
    }
  }
</style>

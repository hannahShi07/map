<!--当涂党建大屏-先进模范-->
<template>
  <com-background-box :index="3" v-cloak>
    <div class="advanced-content advanced-content1">
      <div class="advanced-content-title">
        <div class="advanced-content-left">
          <img src="@/assets/image/advanced/icon-title-2.png">
          组织风采
        </div>
<!--        <div class="btn" v-if="!noData && orglist.length>6">-->
<!--          &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
<!--          <img class="previous swiper-button-prev swiper-button-prev1" :src="previousAct" />-->
<!--          <img class="next swiper-button-next swiper-button-next1" :src="nextAct" />-->
<!--        </div>-->
      </div>
      <div class="advanced-content-list advanced-content-list1" v-loading="loading">
        <div class="swiper-container swiper-container1" v-if="!noData">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in orglist" :key="index">
              <div class="img-box">
                <img v-if="item.photoUrl" :src="item.photoUrl">
                <img v-else src="@/assets/image/advanced/icon-img-1.png">
              </div>

              <div class="advanced-content-list-title">
                <span v-if="item.orgName">{{item.orgName}}</span>
                <span v-else>--</span>
              </div>
              <div class="advanced-content-list-txt">
                <span v-if="item.punishName">{{item.punishName}}</span>
                <span v-else>--</span>
              </div>
            </div>

          </div>
        </div>

        <div class="no-data" v-if="noData">
          <img src="@/assets/image/noData/noData.png">
          <div>暂无内容</div>
        </div>
      </div>
    </div>

    <div class="advanced-content advanced-content2">
      <div class="advanced-content-title">
        <div class="advanced-content-left">
          <img src="@/assets/image/advanced/icon-title-1.png">
          党员风采
        </div>
<!--        <div class="btn" v-if="!noData1 && personlist.length>11">-->
<!--          &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
<!--          <img class="previous swiper-button-prev swiper-button-prev2" :src="previousAct" />-->
<!--          <img class="next swiper-button-next swiper-button-next2" :src="nextAct" />-->
<!--        </div>-->
      </div>
      <div class="advanced-content-list advanced-content-list2" v-loading="loading">
        <div class="swiper-container swiper-container2" v-if="!noData1" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(iteml,indexl) in personlist" :key="indexl">
              <div class="img-box">
                <img v-if="iteml.photoUrl" :src="iteml.photoUrl">
                <img v-else src="@/assets/image/advanced/icon-img-2.png">
              </div>

              <div class="advanced-content-list-title">
                <span v-if="iteml.memberName">{{iteml.memberName}}</span>
                <span v-else>--</span>
              </div>
              <div class="advanced-content-list-txt">
                <span v-if="iteml.orgName">{{iteml.orgName}}</span>
                <span v-else>--</span>
                <span v-if="iteml.punishName">{{iteml.punishName}}</span>
                <span v-else>--</span>
              </div>
            </div>

          </div>
        </div>

        <div class="no-data" v-if="noData1">
          <img src="@/assets/image/noData/noData.png">
          <div>暂无内容</div>
        </div>

      </div>
    </div>

  </com-background-box>
</template>

<script>
import ComBackgroundBox from '@/components/com-background-box'
import {getModellist} from '@/api/screen/advanced.js'
import Swiper from 'swiper';
import "swiper/css/swiper.css"

export default {
  name: "advanced",
  components: {
    ComBackgroundBox,
    Swiper
  },
  data() {
    return {
      noData:false,
      noData1:false,
      //  上一页图标 禁用标签
      // previousDis: require('@/assets/image/orgstructure/previous-disable.png'),
      //  下一页图标 禁用标签
      //  nextDis: require('@/assets/image/orgstructure/next-disable.png'),
      //  上一页图标 可用标签
      previousAct: require('@/assets/image/orgstructure/previous-active.png'),
      //  下一页图标 可用标签
      nextAct: require('@/assets/image/orgstructure/next-active.png'),
      orglist:[],
      personlist:[]

    }
  },
  created(){
    this.getorgList();
    this.getpersonList();

  },

  methods: {
    // 获取组织列表
    getorgList() {
      let params = {
        punishType:'ORG'
      }
      this.loading = true;
      getModellist(params).then(response => {
        this.orglist = response.data;
        this.loading = false;
        let isloop=false
        if (!this.orglist || this.orglist.length < 1) {
          this.noData = true
        }else{
          // 大于六张图片才循环滚动
          if(this.orglist.length>6){
            isloop=true
          }
        }
        // 必须要在数据加载完和dom节点完成之后，在初始化swiper，否则循环loop属性失效
        this.$nextTick(() => {
          new Swiper(".swiper-container1", {
            direction: "horizontal",
            //无缝轮播
            loop: isloop,
            speed: 4000, // 切换速度
            slidesPerView: 6, // 设置slider容器能够同时显示的slides数量
            spaceBetween: 20,　// 设置slide间的间距
            observer: true,　　　// 异步情况下数据渲染完成，再次初始化轮播图
            observeParents: true, // 异步情况下数据渲染完成，再次初始化轮
            // 自动轮播
            autoplay: {
              // 每秒钟自动切换
              delay: 0,
              // 用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false
            },
            // 左右切换
            // navigation: {
            //   nextEl: ".swiper-button-next1",
            //   prevEl: ".swiper-button-prev1",
            // }
          });
        })
      }).finally(() => {
        this.loading = false;
      });
    },
    // 获取人员列表
    getpersonList() {
      let params = {
        punishType:'OTHER'
      }
      this.loading = true;
      getModellist(params).then(response => {
        this.personlist = response.data;
        this.loading = false;
        let isloop1=false
        if (!this.personlist || this.personlist.length < 1) {
          this.noData1 = true
        }else{
          // 大于六张图片才循环滚动
          if(this.personlist.length>11){
            isloop1=true
          }
        }
        // 必须要在数据加载完和dom节点完成之后，在初始化swiper，否则循环loop属性失效
        this.$nextTick(() => {
          new Swiper(".swiper-container2", {
            direction: "horizontal",
            //无缝轮播
            loop: isloop1,
            speed: 4000, // 切换速度
            slidesPerView: 11, // 设置slider容器能够同时显示的slides数量
            spaceBetween: 20,　// 设置slide间的间距
            observer: true,　　　// 异步情况下数据渲染完成，再次初始化轮播图
            observeParents: true, // 异步情况下数据渲染完成，再次初始化轮
            // 自动轮播
            autoplay: {
              // 每秒钟自动切换
              delay: 0,
              // 用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false
            },
            // 左右切换
            // navigation: {
            //   nextEl: ".swiper-button-next2",
            //   prevEl: ".swiper-button-prev2",
            // }
          });
        })
      }).finally(() => {
        this.loading = false;
      });
    },
  }

}
</script>

<style scoped lang="scss">
.advanced-content{
  position: relative;
  width: 100%;
  background: url("../assets/image/advanced/icon-title-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom:2.31vh;
}
.advanced-content1{
  height:39.58vh;
}
.advanced-content2{
  height:44.21vh;
}
.advanced-content-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.advanced-content-left{
  height:5.92vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.9375vw;
  color: #FFFFFF;
  padding-left:1.16vw;
  display:flex;
  justify-content: flex-start;
  align-items: center;

}
.advanced-content-left img{
  width:1.05vw;
  height:1.05vw;
  margin-right:0.57vw;
}
.btn {
  position:relative;
  height: 5.92vh;
  line-height: 5.92vh;
  padding-right:3.15vw ;
  //margin-top: 1.2vh;

  .previous{
    top:3.5vh;
    left:auto;
    right:5.15vw;
    width: 1.85vw;
    height: 3.75vh;
    cursor: pointer;
  }
  .next{
    top:3.5vh;
    right:3.15vw;
    width: 1.85vw;
    height: 3.75vh;
    margin-left: 22px;
    cursor: pointer;
  }
}
.advanced-content-list{
  position:relative;
  width:100%;
  padding:3.70vh 3.18vw 2.78vh 3.18vw;
  overflow:hidden;
}
.advanced-content-list1{
  height:33.93vh;
}
.advanced-content-list2{
  height:38.73vh;
}

.swiper-container1{
  width:100%;
  height:27.35vh;
  overflow:hidden;
}
.swiper-container2{
  width:100%;
  height:32.15vh;
  overflow:hidden;
}
.swiper-container1 .swiper-slide{
  width:14.0625vw;
  height:27.35vh;
  background: rgba(1, 115, 250, 0.2);
  border-radius: 0.30vw;
  overflow:hidden;
}

.swiper-container2 .swiper-slide{
  width:7.24vw;
  height:32.15vh;
  background: rgba(1, 115, 250, 0.2);
  border-radius: 0.30vw;
  overflow:hidden;
}
.swiper-slide .img-box{
  width:100%;
  height:16.34vh;
  border-left-top-radius: 0.30vw;
  border-right-top-radius: 0.30vw;
  overflow:hidden;
}
.swiper-slide .img-box img{
  width:100%;
  border-left-top-radius: 0.30vw;
  border-right-top-radius: 0.30vw;
  //height:16.34vh;

}
.advanced-content-list-title{
  //width:100%;
  padding:1.48vh 0.67vw;
  margin-top:-0.5vh;
  background: linear-gradient(90deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0));
  font-size: 0.625vw;
  font-weight: bold;
  color: #FFFFFF;
  word-wrap: break-word;
  word-break:break-all;

}
.swiper-container1 .advanced-content-list-title span{
  display:block;
  //height:3.0vh;
  line-height:1.4;
  word-wrap: break-word;
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.swiper-container2 .advanced-content-list-title span{
  display:block;
  //height:1.5vh;
  line-height:1.4;
  word-wrap: break-word;
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.advanced-content-list-txt{
  //width:100%;
  display:block;
  word-wrap: break-word;
  word-break:break-all;
  padding:1.48vh 0.67vw;
  font-size: 0.625vw;
  //font-weight: bold;
  color: #FFFFFF;
  overflow: hidden;
  text-overflow: ellipsis;
}
.swiper-container1 .advanced-content-list-txt span{
  display:block;
  //height:2.8vh;
  line-height:1.4;
  word-wrap: break-word;
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.swiper-container2 .advanced-content-list-txt span{
  display:block;
  //height:4.5vh;
  line-height:1.4;
  word-wrap: break-word;
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom:0.4vh;
}
.swiper-container2 .advanced-content-list-txt span:last-of-type{
  margin-bottom:0;
}

::v-deep .el-loading-mask{
  background:rgba(0,0,0,0);
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
</style>

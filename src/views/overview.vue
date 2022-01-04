<template>
  <div class="home-cla">
    <!--公用部分-->
    <com-backgroun-box>
      <!--页面内容-->
      <div class="content-box">
        <div class="content-box-top">
          <div class="content-top-left">
            <div class="content-top-left-top">
              <div class="content-top-left-top-title">
                <img src="@/assets/image/icon-img-3.png">
                <span>纳入全省非公党建信息管理平台企业数</span>
              </div>

            </div>
            <div class="content-top-left-bottom">
              <div class="content-top-left-bottom-title">
                <img src="@/assets/image/icon-img-3.png">
                <span>非公企业数党员数</span>
              </div>
            </div>
          </div>
          <div class="content-top-center">

          </div>
          <div class="content-top-centerother">

          </div>
          <div class="content-top-right">
            <div class="content-top-right-top">
              <div class="content-top-right-top-title">
                <img src="@/assets/image/icon-img-3.png">
                <span>单位性质分布图</span>
              </div>
            </div>
            <div class="content-top-right-bottom">
              <div class="content-top-right-bottom-title">
                <img src="@/assets/image/icon-img-3.png">
                <span>党组织分布</span>
              </div>
            </div>
          </div>

        </div>
        <div class="content-box-bottom">
          <div class="content-bottom-left">
            <div class="content-bottom-left-title">
              <img src="@/assets/image/icon-img-3.png">
              <span>党员发展数量统计</span>
            </div>
          </div>
          <div class="content-bottom-center">
            <div class="content-bottom-center-title">
              <img src="@/assets/image/icon-img-3.png">
              <span>年龄学历分布图</span>
            </div>
          </div>
          <div class="content-bottom-right">
            <div class="content-bottom-right-title">
              <img src="@/assets/image/icon-img-3.png">
              <span>性别分布</span>
            </div>
          </div>
        </div>
      </div>
    </com-backgroun-box>
  </div>
</template>

<script>
  import ComBackgrounBox from '@/components/com-background-box'
  export default {
    name: "overview",
    components: {
      ComBackgrounBox
    },
    data() {
      return {
      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  .content-box{
    width:100vw;
    position:relative;
    z-index:9;
    padding-left:2vw;
    padding-right:2vw;
    padding-top:11.1vh;
    padding-bottom:3.57vh;
  }
</style>

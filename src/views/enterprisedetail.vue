<!--当涂党建联盟-企业详情-->
<template>
  <com-background-box :index="2" v-cloak>
    <!--页面内容-->
    <div class="detail-box" v-loading="loading">
      <div class="detail-title">
        <div class="detail-title-left">
          <img src="@/assets/image/enterprisebrand/icon-detail-title.png">
          <span>{{list.companyName}}</span>
        </div>
        <div class="detail-title-back" @click="goBack">
          <img src="../assets/image/enterprisebrand/icon-detail-back.png">
        </div>
      </div>
      <div class="detail-content">
        <div class="detail-content-left">
          <el-carousel height="63.98vh">
            <el-carousel-item v-for="(item,index) in list.fileUrlList">
              <img class="detail-img" :src="item">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="detail-content-right" v-if="!noData" v-html="list.companyDescription"></div>
        <div class="detail-content-right" v-if="noData">
          <div class="no-data">
            <img src="@/assets/image/noData/noData.png">
            <div>暂无内容</div>
          </div>
        </div>

      </div>
    </div>
  </com-background-box>
</template>

<script>
import ComBackgroundBox from '@/components/com-background-box'
import {companyDetail} from '@/api/screen/enterprisebrand.js'

export default {
  name: "enterprisedetail",
  components: {
    ComBackgroundBox
  },
  data() {
    return {
      loading:false,
      noData:false,
      id:'',
      list:'',
      imageList:[]

    }
  },
  mounted(){
    this.id=this.$route.query.id
    this.getCompanyDetail(this.id)

  },
  methods:{
    // 获取企业详情
    getCompanyDetail(id){
      let params = {
        id:id

      }
      this.loading = true;
      companyDetail(params).then(response => {
        this.loading = false;
        this.list = response;
        if(this.list){
          if(!this.list.companyDescription){
            this.noData=true
          }
        }

      }).finally(() => {
        this.loading = false;
      });
    },
    // 返回上一页
    goBack(){
      //this.$router.go(-1)
      this.$router.push({
        path:'/enterprisebrand',
        query:{
          opentype:this.$route.query.opentype
        }
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.detail-box{
  width:100%;
  height:85.27vh;
  background:url('../assets/image/enterprisebrand/icon-detail-bg.png') no-repeat;
  background-size:100% 100%;
}
.detail-title{
  width:100%;
  padding:2.92vh 3.38vw 2.92vh 1.20vw;
  background: linear-gradient(90deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0));
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.detail-title-left{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.30vw;
  color: #FFFFFF;

}
.detail-title-left img{
  width:1.32vw;
  height:1.32vw;
  margin-right:0.67vw;
}
.detail-title-back{
  width:3.46vw;
  height:4.95vh;
  overflow:hidden;
}
.detail-title-back img{
  width:100%;
  height:100%;
}
.detail-content{
  padding:4.16vh 2.34vw 8.33vh 2.34vw;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.detail-content-left{
  width:40.15vw;
  height:63.98vh;
}
.detail-content-right{
  position:relative;
  width:calc(100% - 40.15vw);
  height:63.98vh;
  overflow:auto;
  padding:3.45vh 1.95vw;
  //font-size: 1.04vw;
  //font-weight: bold;
  //color: #FFFFFF;
  //line-height:1.8;
  //opacity: 0.9;
}
/* 设置滚动条的样式 */
.detail-content-right::-webkit-scrollbar {
  width:0.95vw;
}
/* 滚动槽 */
.detail-content-right::-webkit-scrollbar-track {
  width: 0.95vw;
  height: 63.98vh;
  background: rgba(68, 123, 187, 0.16);
  border-radius: 0.5vw;
}
/* 滚动条滑块 */
.detail-content-right::-webkit-scrollbar-thumb {
  width:  0.95vw;
  background: rgba(145, 177, 215, 0.17);;
  border-radius: 0.5vw;
  border:none;
}
/*轮播图片大小*/
.detail-img{
  width:100%;
  height:100%;
}
::v-deep .el-carousel__button{
  width:2.78vw;
  height:0.6vh;
  background:rgba(22, 135, 255, 0.37);
  margin-bottom:4vh;
}
::v-deep .el-carousel__indicator.is-active button{
  background:rgba(22, 135, 255, 1);
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

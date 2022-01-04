<!--当涂党建联盟-一企一品牌-->
<template>
  <com-background-box :index="2" v-cloak>
    <!--页面内容-->
    <div class="enterprise-box" v-loading="loading">
      <div class="enterprise-contain" v-if="!noData" :class="num==2 ? 'activeopen' : ''">
        <div class="enterprise-list"  v-for="(item,index) in list">
          <div class="enterprise-list-content">
            <img :src="item.fileUrlList[0]">
            <span class="enterprise-list-content-title">{{item.companyName}}</span>
          </div>
          <div class="enterprise-list-txt" v-if="item.companyDescription" v-html="item.companyDescription"></div>
          <div class="enterprise-list-txt" v-else>--</div>
          <span class="enterprise-list-detail" @click="editpage(item)">详情</span>
        </div>
      </div>

      <div class="enterprise-buttom">
        <img :src="srcOpen" v-if="num==1 && list.length>3" @click="open">
      </div>

      <div class="no-data" v-if="noData">
        <img src="@/assets/image/noData/noData.png">
        <div>暂无内容</div>
      </div>


    </div>
  </com-background-box>
</template>

<script>
import ComBackgroundBox from '@/components/com-background-box'
import {companyList} from '@/api/screen/enterprisebrand.js'

export default {
  name: "enterprisebrand",
  components: {
    ComBackgroundBox
  },
  data() {
    return {
      loading:false,
      noData:false,
      srcOpen:require('@/assets/image/enterprisebrand/icon-button-1.png'),// 更多
      num:1,
      list:[]


    }
  },
  mounted(){
    if(this.$route.query.opentype){
      this.num=this.$route.query.opentype
    }else{
      this.num=1
    }
    this.getCompanylist()

  },
  methods:{
    // 获取企业列表
    getCompanylist(){
      let params = {

      }
      this.loading = true;
      companyList(params).then(response => {
        this.list = response;
        this.loading = false;
        if(!this.list || this.list.length<1){
          this.noData=true
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    // 打开更多
    open(){
      this.num=2
    },
    // 跳转详情页
    editpage(item){
      this.$router.push({
        path:'/enterprisedetail',
        query:{
           id:item.id,
           opentype:this.num
        }
      });
    }

  }
}
</script>

<style lang="scss" scoped>
//::v-deep .container-cla{
//  height:100vh;
//  overflow:auto;
//}
.enterprise-box{
  position:relative;
  width:100%;
  height:88.9vh;
  overflow:auto;
}
/* 设置滚动条的样式 */
.enterprise-box::-webkit-scrollbar {
  width:0.42vw;
}
/* 滚动槽 */
.enterprise-box::-webkit-scrollbar-track {
  width: 0.42vw;
  height: 45.74vh;
  background: rgba(68, 123, 187, 0.34);
  border-radius: 0.21vw;
}
/* 滚动条滑块 */
.enterprise-box::-webkit-scrollbar-thumb {
  width: 0.42vw;
  background: rgba(145, 177, 215, 0.34);
  border-radius: 0.42vw;
  border: 0 solid #999;
}
.enterprise-contain{
  width:100%;
  display:flex;
  flex-flow: wrap;
  justify-content: flex-start;
  height:76.6vh;
  overflow:hidden;
}
.activeclose{
  height:76.6vh;
  overflow:hidden;
}
.activeopen{
  height:auto;
  overflow:auto;
}
.enterprise-list{
  width:calc((100% - 3.75vw)/3);
  height:74.21vh;
  background:url('../assets/image/enterprisebrand/icon-bg-1.png') no-repeat;
  background-size:100% 100%;
  margin-right:1.875vw;
  padding:0.46vh 0.26vw;
  margin-bottom:3.24vh;
}
.enterprise-list:nth-of-type(3n){
  margin-right:0;
}
.enterprise-list-content img{
  width:100%;
  height:48.42vh;
  overflow:hidden;
}
.enterprise-list-content-title{
  width:100%;
  display:block;
  padding:2.13vh 1.12vw;
  background:url('../assets/image/enterprisebrand/icon-bg-2.png') no-repeat;
  background-size:100% 100%;
  font-size: 1.04vw;
  font-weight: bold;
  color: #FFFFFF;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top:-0.5vh;
}
.enterprise-list-txt{
  width:100%;
  height:4.7vh;
  padding:0 0.86vw;
  margin:2.08vh 0;
  font-size: 0.78vw;
  font-weight: bold;
  color: #FFFFFF;
  opacity: 0.9;
  //line-height:1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.enterprise-list-detail{
  padding:1.29vh 1.21vw;
  font-size:0.625vw;
  font-weight: 400;
  color: #00BAFF;
  background:url('../assets/image/enterprisebrand/icon-bg-3.png') bottom left no-repeat;
  background-size:100% 1.48vh;
  margin-left:0.86vw;
  margin-top:1.71vh;
  cursor: pointer;
}
.enterprise-buttom{
  margin:0 auto;
  text-align:center;
}
.enterprise-buttom img{
  width:6.25vw;
  overflow:hidden;
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

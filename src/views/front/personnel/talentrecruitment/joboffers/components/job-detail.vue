<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-bcakimg.png">
        <span>详情</span>
      </div>
      <div class="fr backButton">
        <el-button @click="back()" class="page-btn page-btn-hollow">返回</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="artContent pd-20" v-cloak v-loading="loading">
      <h2 class="title">{{list.title}}</h2>
      <div class="contentDiv">
        <div class="leftbox">
          <span :title="list.publishOrg">发布单位：{{list.publishOrg}}</span>
        </div>
        <div class="rightbox">
          <span>发布日期：{{list.publishDate}}</span>
        </div>
      </div>
      <div class="core" v-if="list.content!='' && list.content!=undefined && list.content!=null && list.content!='null'" v-html="list.content">

      </div>
      <div class="core" v-else>
        暂无内容
      </div>
      <div class="address-box">
        <div class="address-box-title">
          报名地址：
        </div>
        <div class="address-box-content" @click="open(list.address)">
          {{list.address}}
        </div>
      </div>

    </div>

  </div>


</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getRecruitDetail} from "@/api/front/personnel/talentrecruitment/recruitinfomanage/recruitinfomanage.js"
  export default {
    name: "job-detail",
    components: {

    },
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        loading:true,
        // list:'',//详情数据

        list:{},//详情数据
        // fileList:[],//附件
      }
    },
    activated(){
      this.list = {};
      this.getDetail();
    },
    mounted(){
      this.getDetail();
      // this.getFile();

    },
    methods:{
      //获取详情
      getDetail(){
        let params={
          id:this.params.id
        }
        getRecruitDetail(params).then(response => {
          //console.log('前台详情： '+JSON.stringify(response))
          const res = response;
          this.list=res;

        }).finally(() => {
          this.loading = false;
        });
      },
      //获取附件
      // getFile(){
      //   let params={
      //     bizIds:this.params.id,
      //   }
      //   commonReq.getAttachment(params).then(response => {
      //     const res = response;
      //     if(res.length > 0 && res[0].list.length > 0){
      //       if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
      //         this.fileList = res[0].list
      //       }
      //     }
      //   })
      // },

      //返回
      back(){
        this.$emit('handleSwitch', {name: 'Index'})
      },
      //打开网址
      open(url){
        window.open(url)
      }
    }
  }
</script>

<style scoped lang="scss">
  .artContent{
    height:auto;
    /*min-height:100vh;*/
    min-height:650px;
  }
  .logo-top{
    /*padding:14px 20px;*/
    padding-right:10px;
  }
  .logotxt{
    display:flex;
    align-items:center;
    line-height:36px;
    font-size: 16px;
    color: #7D7D7D;
  }
  .logotxt img{
    margin-right:5px;
  }
  .backButton /deep/ .el-button {
    height: 36px;
    line-height: 0.8;
  }
  .line{
    width:100%;
    height:20px;
    background:#eee;
  }
  .back{
    font-size: 12px;
    line-height: 16px;
    color: #FC5921;
  }
  .title{
    font-size: 37px;
    font-weight: bold;
    color: #333333;
    text-align:center;
    word-break: break-word;
    white-space: pre-wrap;
    margin:20px 0;
  }
  .contentDiv{
    border-bottom:1px solid #DDDDDD;
    padding-bottom:30px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-top:20px;
    color: #999999;
  }
  .leftbox{
    width:calc(100% - 350px);
    text-align:left;
  }
  .leftbox span{
    display:block;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    line-height:17px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .rightbox{
    width:350px;
    text-align:right;
  }
  .rightbox span{
    display:block;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    line-height:17px;
  }

  .core{
    padding-top:10px;
    /*font-size: 20px;*/
    /*font-weight: 400;*/
    /*line-height: 50px;*/
    /*color: #555555;*/
    word-break: break-all;
    overflow:hidden;
  }
  .address-box{
    /*position:absolute;*/
    /*bottom:0px;*/
    margin-top:40px;
  }
  .address-box-title{
    font-size: 20px;
    font-weight: 400;
    color: #999999;
  }
  .address-box-content{
    font-size: 20px;
    font-weight: 400;
    line-height:50px;
    color: #3D9EFF;
    cursor: pointer;
  }


</style>

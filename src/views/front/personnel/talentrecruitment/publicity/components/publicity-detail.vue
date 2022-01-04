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
      <div class="file-box"  v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0">
        <div class="file-box-title">
          附件：
        </div>
        <div class="file-box-content" style="cursor: pointer">
          <div class="file-file" v-for="(item,index) in fileList" @click="download(item.submittedFileName,item.url)">
            <img src="@/assets/page/file-icon1.png">
            <span>{{item.submittedFileName}}</span>
            <img src="@/assets/page/file-icon2.png" >
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getExamDetail} from "@/api/front/personnel/talentrecruitment/examinfomanage/examinfomanage.js"
  export default {
    name: "publicity-detail",
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
        list:'',//详情数据
        fileList:[],//附件
      }
    },
    mounted(){
      this.getDetail();
      this.getFile();

    },
    methods:{
      //获取详情
      getDetail(){
        let params={
          id:this.params.id
        }
        getExamDetail(params).then(response => {
          //console.log('前台详情： '+JSON.stringify(response))
          const res = response;
          this.list=res;

        }).finally(() => {
          this.loading = false;
        });
      },
      //获取附件
      getFile(){
        let params={
          bizIds:this.params.id,
        }
        commonReq.getAttachment(params).then(response => {
          //console.log('附件： '+JSON.stringify(response))
          const res = response;
          if(res.length > 0 && res[0].list.length > 0){
            if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
              this.fileList = res[0].list
            }
          }
        })
      },

      //返回
      back(){
        this.$emit('handleSwitch', {name: 'Index'})
      },
      //附件下载
      download(fileName,loadurl){
        commonReq.downloadFile(loadurl,fileName)
      },
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
    margin: 20px 0;
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
  .file-box{
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
    margin-top:50px;
  }
  .file-box-title{
    font-size: 20px;
    font-weight: 400;
    line-height:30px;
    color: #999999;
  }
  .file-file{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    background:#f9f9f9;
    padding:7px 12px;
    margin-bottom:10px;
    cursor: pointer;
  }

  .file-file span{
    display:block;
    max-width:600px;
    padding:0 10px;
    font-size: 14px;
    color: #999999;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }


</style>

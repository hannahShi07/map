<template>
  <div class="party">
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
      <h2 class="title">{{list.theme}}</h2>
      <div class="contentDiv">
          <span class="leftbox">发布部门：{{isEmpty(list,'department')}}</span>
          <span class="rightbox">发布日期：{{isEmpty(list,'createTime')}}</span>
          <span class="leftbox">培训地点：{{isEmpty(list,'address')}}</span>
          <span class="rightbox">培训时间：{{isEmpty(list,'trainStart')}} ~ {{isEmpty(list,'trainEnd')}}</span>
          <span class="leftbox">参与人员：{{isEmpty(nameList)}}</span>

      </div>
      <div class="core" v-if="list.articleDetails!='' && list.articleDetails!=undefined && list.articleDetails!=null && list.articleDetails!='null'" v-html="list.articleDetails">

      </div>
      <div class="core" v-else>
        暂无内容
      </div>
      <div class="file-box"  v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0">
        <div class="file-box-title">
          培训资料下载：
        </div>
        <div class="file-box-content" style="cursor: pointer">
          <div class="file-file" v-for="(item,index) in fileList"  @click="download(item.url,item.submittedFileName)">
            <img src="@/assets/page/file-icon1.png">
            <span>{{item.submittedFileName}}</span>
            <img src="@/assets/page/file-icon2.png">
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getTraindetail} from "@/api/front/personnel/educationtrain/trainrecords/trainrecords.js"

  export default {
    name: "records-detail",
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
        fileList:[],//附件
        nameList:'',//参与人员
      }
    },
    activated(){
      this.list = {},//详情数据
      this.fileList = [],//附件
      this.nameList = '',//参与人员
      this.getDetail();
      this.getFile();

    },
    mounted(){
      this.getDetail();
      this.getFile();

    },
    methods:{
      //获取详情
      getDetail(){
        let params={
          trainId:this.params.id
        }
        getTraindetail(params).then(response => {
          const res = response;
          this.list=res;
          let arr=[];
          if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null'){
            if(this.list.peoples!='' && this.list.peoples!=undefined && this.list.peoples!=null && this.list.peoples!='null' && this.list.peoples.length>0){
              for(let i=0;i<this.list.peoples.length;i++){
                if(this.list.peoples[i].userName!='' && this.list.peoples[i].userName!=undefined && this.list.peoples[i].userName!=null && this.list.peoples[i].userName!='null'){
                  arr.push(this.list.peoples[i].userName);
                  if(arr.length>10){
                    arr=arr.slice(0,10);
                    this.nameList=arr.join(',')+'...'
                  }else{
                    this.nameList=arr.join(',')
                  }

                }
              }

            }else{
              this.nameList=''
            }

            if(this.list.createTime!='' && this.list.createTime!=undefined && this.list.createTime!=null && this.list.createTime!='null'){
              this.list.createTime=this.list.createTime.substring(0,10)
            }
            if(this.list.trainStart!='' && this.list.trainStart!=undefined && this.list.trainStart!=null && this.list.trainStart!='null'){
              this.list.trainStart=this.list.trainStart.substring(0,16)
            }
            if(this.list.trainEnd!='' && this.list.trainEnd!=undefined && this.list.trainEnd!=null && this.list.trainEnd!='null'){
              this.list.trainEnd=this.list.trainEnd.substring(0,16)
            }

          }else{
            this.nameList=''
          }


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
      download(url,name){
        commonReq.downloadFile(url,name)
      }
    }
  }
</script>

<style scoped lang="scss">
  .artContent{
    height:auto;
    /*min-height:100vh;*/
    min-height:580px;
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
  }
  .contentDiv{
    border-bottom:1px solid #DDDDDD;
    padding-bottom:30px;
    display:flex;
    flex-flow: wrap;
    justify-content: space-between;
    margin-top:20px;
    color: #999999;
  }
  .contentDiv span{
    display:block;
  }
  .contentDiv .leftbox{
    width:70%;
    text-align:left;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    line-height:20px;
    word-break: break-all;
    white-space: pre-wrap;
    margin-bottom:20px;
  }

  .contentDiv .leftbox:last-of-type{
    margin-bottom: 0;
  }
  .contentDiv .rightbox{
    width:30%;
    text-align:right;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    line-height:17px;
    margin-bottom:20px;
  }

  .contentDiv .rightbox span:last-of-type{
    margin-bottom: 0;
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

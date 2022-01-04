<template>
  <div class="org-detail" v-cloak v-loading="loading">
    <div class="artContent pd-20" style="margin-bottom:80px;">
      <h2 class="title">{{list.title}}</h2>
      <div class="contentDiv">
        <div class="dateRouter">
          <span :title="list.publishOrg">发布单位： {{list.publishOrg}}</span>
        </div>
        <span class="printer">发布日期：{{list.publishDate}}</span>
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
        <div class="file-box-content">
          <div class="file-file" v-for="(item,index) in fileList"   @click="download(item.submittedFileName,item.url)">
            <img src="@/assets/page/file-icon1.png">
            <span>{{item.submittedFileName}}</span>
            <img src="@/assets/page/file-icon2.png">
          </div>
        </div>
      </div>


    </div>

    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getExamDetail} from "@/api/backstage/personnel/talentrecruitment/examinfomanage/examinfomanage.js"
  export default {
    name: "exam-detail",
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
      }
    },
    activated(){
      this.list = {}
      this.fileList = []
      this.getDetail();
      this.getFile();
    },
    mounted(){
      this.getDetail();
      this.getFile();

    },
    methods: {
      //获取详情
      getDetail() {
        let params = {
          id: this.params.id
        }
        getExamDetail(params).then(response => {
          //console.log('详情： ' + JSON.stringify(response))
          const res = response;
          this.list = res;

        }).finally(() => {
          this.loading = false;
        });
      },
      //获取附件
      getFile() {
        let params = {
          bizIds: this.params.id,
        }
        commonReq.getAttachment(params).then(response => {
          //console.log('附件： '+JSON.stringify(response))
          const res = response;
          if (res.length > 0 && res[0].list.length > 0) {
            if (res[0].list != undefined && res[0].list != null && res[0].list != "") {
              this.fileList = res[0].list
            }
          }
        })
      },

      //返回
      back() {
        this.$emit('handleSwitch', {name: 'Index'})
      },
      //附件下载
      download(fileName,loadurl){
        commonReq.downloadFile(loadurl,fileName)
      },
    }
  }
</script>

<style scoped>
  .artContent{
    height:auto;
    min-height: calc(100vh - 152px);
    /*position:relative;*/
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
  .dateRouter{
    display:block;
    width:calc(100% - 350px);
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .printer{
    display:block;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    width: 350px;
    text-align: right;

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
  .fexid-clas{
    text-align: center;
    z-index: 6;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    opacity: 1;
    margin-left: -20px;
  }
</style>

<template>
  <div class="party" v-cloak>
    <div v-if="this.type === 1 ">
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
      <div class="artContent pd-20">
        <h2 class="title">{{isEmpty(list,'djOfficerTitle')}}</h2>
        <div class="contentDiv">
          <div class="dateRouter">
            <span>发布单位： {{isEmpty(list,'djOfficerOrg')}}</span>
          </div>
          <div class="dateRouter">
            <span>发布日期：{{isEmpty(list,'djOfficerDate')}}</span>
          </div>
        </div>
        <div class="core" v-if="list.djOfficerContent!='' && list.djOfficerContent!=undefined && list.djOfficerContent!=null && list.djOfficerContent!='null'" v-html="list.djOfficerContent">
        </div>
        <div class="core" v-else>
          暂无内容
        </div>
        <div class="file-box"  v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0">
          <div class="file-box-title">
            附件：
          </div>
          <div class="file-box-content">
            <div class="file-file" v-for="(item,index) in fileList">
              <img src="@/assets/page/file-icon1.png">
              <span>{{item.submittedFileName}}</span>
              <img src="@/assets/page/file-icon2.png" @click="download(item.url,item.submittedFileName)">
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-if="this.type === 2 ">
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
      <div class="artContent pd-20">
        <h2 class="title">{{isEmpty(informationList,'djInspectMessageTitle')}}</h2>
        <div class="contentDiv">
          <div class="dateRouter">
            <span>发布单位： {{isEmpty(informationList,'djInspectMessageOrg')}}</span>
          </div>
          <div class="dateRouter">
            <span>发布日期：{{isEmpty(informationList,'djInspectMessageDate')}}</span>
          </div>
        </div>
        <div class="core" v-if="informationList.djInspectMessageContect!='' && informationList.djInspectMessageContect!=undefined && informationList.djInspectMessageContect!=null && informationList.djInspectMessageContect!='null'" v-html="informationList.djInspectMessageContect">
        </div>
        <div class="core" v-else>
          暂无内容
        </div>
        <div class="file-box"  v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0">
          <div class="file-box-title">
            附件：
          </div>
          <div class="file-box-content">
            <div class="file-file" v-for="(item,index) in fileList">
              <img src="@/assets/page/file-icon1.png">
              <span>{{item.submittedFileName}}</span>
              <img src="@/assets/page/file-icon2.png" @click="download(item.url,item.submittedFileName)">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>


</template>

<script>
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import {getOfficerChangeDetail,getInspectMessageDetail} from "@/api/front/personnel/cadre/selection/selection.js"
    export default {
        name: "selectin-detail",
        components: {
        },
        props: {
            params: {
                type: Object,
                default: {}
            },
            type: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                list:'',//详情数据
                informationList:'',//详情数据
                fileList:[],//附件
            }
        },
        activated(){
          this.getDetail();
          this.getFile();
        },
        mounted(){
            this.getDetail();
            this.getFile();
            // console.log(this.type)

        },
        methods:{
            //获取详情
            getDetail(){
                let params={
                    id:this.params.id
                }
                if(this.type === 1){
                    getOfficerChangeDetail(params).then(response => {
                        const res = response;
                        this.list=res;
                    })
                } else {
                    getInspectMessageDetail(params).then(response => {
                        const res = response;
                        this.informationList=res;
                    })
                }

            },
            //获取附件
            getFile(){
                let params={
                    bizIds:this.params.id,
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res.length > 0 && res[0].list.length > 0){
                        if(res[0].list[0]!= undefined && res[0].list[0] != null && res[0].list[0] != ""){
                            this.fileList = res[0].list
                        }
                    }
                })
            },

            //返回
            back(){
                this.$emit('handleSwitch', {name: 'Index'})
            },
            //下载附件
            download(url,name){
                commonReq.downloadFile(url,name)
            },
        }
    }
</script>

<style scoped>
  .artContent{
    height:auto;
    min-height:100vh;
  }
  /*.logo-top{*/
  /*!*padding:14px 20px;*!*/
  /*padding-right:10px;*/
  /*}*/
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
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  .dateRouter span:first-of-type{
    padding-right:40px;
  }
  .printer{
    font-size: 16px;
    font-weight: 400;
    color: #999999;

  }
  .contentDiv /deep/ .el-icon-printer:before{
    margin-right:6px;
  }
  .core{
    padding-top:10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 50px;
    color: #555555;
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

<template>
  <div class="party">
    <el-form label-width="">
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
      <div v-cloak v-loading="loading">
      <base-card-box header="详情">
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                组织名称
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'orgName')}}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                活动主题
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'theme')}}
              </div>
            </div>
          </el-col>

        </el-row>

        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                开始时间
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'startTime')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                活动地点
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'address')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                参与人员
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'participants')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                附件
              </div>
              <div class="card-box-content card-box-content1">
                <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-filebox" v-for="(item,index) in fileList"  @click="download(item.submittedFileName,item.url)">
                  <div class="card-file">
                    <img src="@/assets/page/file-icon1.png">
                    <span>{{item.submittedFileName}}</span>
                    <img src="@/assets/page/file-icon2.png">
                  </div>
                </div>
                <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                活动内容
              </div>
              <div class="card-box-content" style="flex:1" v-html="isEmpty(list,'content')">
              </div>
            </div>
          </el-col>
        </el-row>
      </base-card-box>
      </div>



    </el-form>
  </div>

</template>

<script>

  import commonReq  from "@/api/public/commonReq.js"
  import {getProjectDetail} from "@/api/front/party/regionalparty/partymassbridge/partymassbridge.js"

  export default {
    name: 'partymassbridge-detail',
    components: {},
    props: {
      params: {
        type: Object,
        default: {}
      },
    },
    data () {
      return {
        loading:true,
        list:'',//详情数据
        fileList:[],//附件
      }
    },
    activated(){
      this.getDetail()
      this.getFile()
    },
    mounted () {
      this.getDetail()
      this.getFile()

    },
    methods: {
      //详情数据
      getDetail(){
        let params = {
          id:this.params.id,
        }
        getProjectDetail(params).then(response => {
          //console.log('详情列表： '+JSON.stringify(response))
          const res = response;
          this.list=res;

        }).finally(() => {
          this.loading=false;
        });
      },
      //获取附件
      getFile(){
        let params={
          bizIds:  this.params.id,
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
      //下载附件
      download(fileName,loadurl){
        commonReq.downloadFile(loadurl,fileName)
      },
      //返回
      back(){
        this.$emit('handleSwitch', {name: 'Index'})
      },


    }
  }
</script>

<style lang="scss" scoped>
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
  .text-center{
    width: 100%;
    position: fixed;
    z-index: 9999;
    bottom: 20px;
    padding: 20px 0;
  }
  .org-detail {
    background: #eee;
  }

  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 120px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding: 16px 0 16px 20px;
    }

    .card-box-content {
      // flex: 1;
      width:calc(100% - 120px);
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }
  .card-filebox{
    display:block;
  }
  .card-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:inline-flex;
    flex-flow:wrap;
    align-items:center;
  }
  .card-file{
    width:auto;
    margin-bottom:8px;
  }
  .card-file img:first-of-type{
    width:12px;
    height:16px;
  }
  .card-file img:last-of-type{
    width:17px;
    height:17px;
  }
  .card-file span{
    padding-left:10px;
    padding-right:30px;
    font-size:14px;
    color:#999;
  }
  .card-box-content /deep/ .el-form-item {
    margin-bottom: 0px;
  }
  .card-box-content /deep/ .el-form-item__content{
    line-height:16px;
  }
  .card-box-content /deep/ .el-radio{
    color:#000;
    font-weight:bold;
  }

</style>

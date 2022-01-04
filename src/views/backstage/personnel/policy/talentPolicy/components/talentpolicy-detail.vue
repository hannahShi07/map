<template>
  <div class="party">
    <div>
      <div class="content-box">
        <div class="content-title"> {{isEmpty(detailCont,'djHumanPolicyTitle')}}</div>
        <div class="contentDiv">
          <div class="dateRouter">
            <span  :title="detailCont.djHumanPolicyOrg">发布单位： {{detailCont.djHumanPolicyOrg}}</span>
          </div>
          <span class="printer">发布日期：{{detailCont.djHumanPolicyDate}}</span>
        </div>
        <div class="content-main" v-if="detailCont.djHumanPolicyContent!='' && detailCont.djHumanPolicyContent!=undefined && detailCont.djHumanPolicyContent!=null && detailCont.djHumanPolicyContent!='null'" v-html="detailCont.djHumanPolicyContent">
        </div>
        <div class="content-main" v-else>
          暂无内容
        </div>
<!--        <div class="content-attachment">-->
<!--          <div class="content-box-title">-->
<!--            附件:-->
<!--          </div>-->
<!--          <div class="content-box-content content-box-content1">-->
<!--            <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0"-->
<!--                 class="content-file" v-for="(item,index) in fileList"  @click="download(item.url,item.submittedFileName)">-->
<!--              <img src="@/assets/page/file-icon1.png">-->
<!--              <span>{{item.submittedFileName}}</span>-->
<!--              <img src="@/assets/page/file-icon2.png">-->
<!--            </div>-->
<!--            <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">&#45;&#45;</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    <div slot="footer" class="text-center">
      <el-button size="medium"  @click="cancel">返回</el-button>
    </div>
  </div>
</template>

<script>
    import commonReq  from "@/api/public/commonReq.js"
    import {getTalentpolicyDetail} from "@/api/backstage/personnel/policy/talentPolicy/talentPolicy.js"
    export default {
        name: "talentpolicy-detail",
        props: {
            params: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                title: '详情',
                id:'',
                detailCont:'',
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
        },
        methods: {
            //获取详情
            getDetail(){
                let params={
                    id:this.params.id
                }
                getTalentpolicyDetail(params).then(response => {
                    const res = response;
                    this.detailCont=res;

                }).finally(() => {
                });
            },
            //获取附件
            getFile(){
                let params={
                    bizIds: this.params.id,
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
            download(url,name){
                commonReq.downloadFile(url,name)
            },

            //返回
            cancel() {
                this.$emit('handleSwitch', {name: 'Index'})
            },
        },
    }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;
  }
  /deep/ .app-main {
    background: none;
    height: auto !important;
  }
  .content-box {
    padding: 20px;
    background: #fff;
  }
  .content-title {
    height: 49px;
    font-size: 37px;
    font-family: Segoe UI;
    font-weight: bold;
    line-height: 49px;
    color: #333333;
    text-align: center;
  }
  .content-txt {
    width: 100%;
    height: 21px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    line-height: 60px;
    color: #999999;
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
  .content-main{
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    line-height: 50px;
    color: #555555;
    text-indent:2em;
  }
  .content-attachment {
    display: flex;

    .content-box-title {
      width: 60px;
      height: 26px;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      line-height: 60px;
      color: #999999;
    }

    .content-box-content {
      // flex: 1;
      width: calc(100% - 120px);
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
      color:#333;
    }
  }
  .text-center {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    background: #fff;
    left:200px;
    z-index:999;
    overflow:visible;
    box-shadow: 3px -2px 4px rgba(0, 0, 0, 0.11);
  }
  .content-box-content1{
    cursor: pointer;
    width:auto!important;
  }

  .content-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:flex;
    flex-flow:wrap;
    align-items:center;
  }
  .content-file{
    width:auto;
    margin-bottom:8px;
  }
  .content-file img:first-of-type{
    width:12px;
    height:16px;
  }
  .content-file img:last-of-type{
    width:17px;
    height:17px;
  }
  .content-file span{
    padding-left:10px;
    padding-right:30px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #999999;
  }
</style>

<!--接收任务管理——详情（接口参数名一样  不知道怎么写）-->
<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1030px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <base-card-box header="">
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              下发组织
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'orgId.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              需完成时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'taskBeginTime')}}~ {{isEmpty(list,'taskEndTime')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              任务名称
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'taskName')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              完成情况
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'taskState.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              任务要求
            </div>
            <div class="card-box-content" v-html="isEmpty(list,'taskDemands')">
<!--              {{isEmpty(list,'taskDemands')}}-->
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              任务文件
            </div>
            <div class="card-box-content card-box-content1">
              <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-file" v-for="(item,index) in fileList"  @click="download(item.url,item.submittedFileName)"">
                <img src="@/assets/page/file-icon1.png">
                <span>{{item.submittedFileName}}</span>
                <img src="@/assets/page/file-icon2.png">
              </div>
              <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <div style="height: 20px;background: #eee"></div>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              完成任务文件
            </div>
            <div class="card-box-content card-box-content1">
              <div v-if="finishFileList!='' && finishFileList!=undefined && finishFileList!=null && finishFileList!='null' &&
              finishFileList.length>0" class="card-file" v-for="(item,index) in finishFileList"  @click="download(item.url,item.submittedFileName)">
                <img src="@/assets/page/file-icon1.png">
                <span>{{item.submittedFileName}}</span>
                <img src="@/assets/page/file-icon2.png">
              </div>
              <span v-if="!(finishFileList!='' && finishFileList!=undefined && finishFileList!=null && finishFileList!='null' && finishFileList.length>0)">--</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              任务完成情况
            </div>
            <div class="card-box-content" style="flex:1">
              {{isEmpty(list,'taskPerformance')}}
            </div>
          </div>
        </el-col>
      </el-row>

    </base-card-box>
    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="cancel">知道了</el-button>
    </div>

  </el-dialog>

</template>

<script>
    import commonReq  from "@/api/public/commonReq.js"
    import {getacceptTaskDetail} from "@/api/backstage/party/informationPush/acceptTaskManagement/acceptTaskManagement.js"
    export default {
        name: "accepttask-detail",
        data () {
            return {
                visible: false,
                title: '详情',
                list:'',
                fileList:[],//附件
                finishFileList:[]//完成任务文件
            }
        },
        mounted(){
        },
        methods: {
            show(t, row,type) {
              this.fileList = [],//附件
              this.finishFileList = []//完成任务文件
              this.visible = true;
              this.getDetail(row.id);
              this.getFile(type)
              this.getfinishFile(row.id)

            },
            //获取详情
            getDetail(id){
                let params={
                    id:id
                }
                getacceptTaskDetail(params).then(response => {
                    const res = response;
                    this.list=res;

                }).finally(() => {
                });
            },
            //完成任务文件
            getfinishFile(id){
                let params={
                    bizIds: id,
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res.length > 0 && res[0].list.length > 0){
                        if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
                            this.finishFileList = res[0].list
                        }else{
                          this.finishFileList = []
                        }
                    }else{
                      this.finishFileList = []
                    }
                })
            },
            //获取附件
            getFile(id){
                let params={
                    bizIds: id,
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res.length > 0 && res[0].list.length > 0){
                      if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
                          this.fileList = res[0].list
                      }else{
                        this.fileList = []
                      }
                    }else{
                      this.fileList = []
                    }
                })
            },
            //下载附件
            download(url,fileName){
                commonReq.downloadFile(url,fileName)
            },

            //取消
            cancel() {
                this.visible = false;
                this.list = ''
                this.fileList = []//附件
                this.finishFileList = []//完成任务文件
            },
        },
    }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;

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
      width: calc(100% - 120px);
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
      color:#333;
    }
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }

  .card-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:flex;
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

</style>

<!--接收任务管理——完成页面-->
<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1030px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <div class="history-detail" v-cloak v-loading="loading">
    <base-card-box header="" >
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
              <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' &&
              fileList.length>0" class="card-file" v-for="(item,index) in fileList"  @click="download(item.url,item.submittedFileName,)">
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
      <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px">
        <el-row class="card-row" style="margin-top: 20px;">
          <el-col :span="24">
              <el-form-item label="上传附件" >
                <base-file-upload
                  :limit='1'
                  list-type="text"
                  :acceptSize="20"
                  :accept='accept'
                  :autoUpload="true"
                  :otherData="otherData"
                  :action="action"
                  ref="fileRef"
                  @associationCallback="associationCallback"
                />
              </el-form-item>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <el-form-item label="任务完成情况" prop="taskPerformance" style="margin-right: 20px">
              <el-input type="textarea" v-model="messages.taskPerformance" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 5, maxRows: 5}"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </base-card-box>
    </div>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>

  </el-dialog>

</template>

<script>
    import commonReq  from "@/api/public/commonReq.js"
    import {getacceptTaskDetail,getacceptTaskComplete} from
            "@/api/backstage/party/informationPush/acceptTaskManagement/acceptTaskManagement.js"
    export default {
        name: "accepttask-finish",
        data () {
            return {
                loading:false,
                visible: false,
                title: '完成任务',
                list:'',
                fileList:[],//附件
                messages:{
                    taskPerformance:'',//任务完成情况
                    file:[],//附件
                },
                node: { // 必填项判断
                    'taskPerformance':[{
                        required: true,
                        message: '请输入任务完成情况',
                        trigger: 'blur'
                    }],
                },
                action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
                otherData:{
                    id: '',
                    bizId: "",
                    bizType: "acceptFinish",
                    isSingle: false
                },
                id:'',//保存传的id
                accept:'.doc,.docx,.pdf,.xlsx,.zip',
            }
        },
        mounted(){

        },
        methods: {
            // 成功回调
            associationCallback(val){
                if(val){
                    let params= {
                        taskPerformance:this.messages.taskPerformance,
                        id:this.id
                    }
                    getacceptTaskComplete(params).then(response => {
                        const res = response;
                        this.$message.success("保存成功")
                        this.cancel()
                        this.$emit('refresh')
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: '请再试一次 !!!',
                        type: 'error'
                    });
                }
            },
            show(t,row,type) {
                this.visible = true;
                this.getDetail(row.id);
                this.id = row.id
                this.otherData.bizId = row.id// 编辑时，附件自动回显
                this.$nextTick(function(){// 编辑时，附件自动回显
                    this.$refs.fileRef.init()
                })
                this.getFile(type)
            },
            //获取详情
            getDetail(id){
                let params={
                    id:id
                }
                getacceptTaskDetail(params).then(response => {
                    this.list = response;
                    this.messages.taskPerformance = response.taskPerformance
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
                        }
                    }
                })
            },
            //下载附件
            download(url,fileName){
                commonReq.downloadFile(url,fileName)
            },
            //保存
            saveBtn () {
                this.$refs['ruleForm'].validate(valid => { // 表单验证
                    if (!valid) {
                        return // 表单必填项判断
                    }
                    // this.$refs['fileRef'].submitFile(this.otherData.bizId,this.otherData.bizType);
                    this.$refs.fileRef.submitFile()
                })
            },
            //取消
            cancel() {
              this.visible = false;
              this.list='';
              this.fileList=[];//附件
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
    /*padding:8px 12px;*/
    background: #F9F9F9;
    border-radius:5px;
    display:flex;
    flex-flow:wrap;
    align-items:center;
  }
  .card-file{
    width:auto;
    /*margin-bottom:8px;*/
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

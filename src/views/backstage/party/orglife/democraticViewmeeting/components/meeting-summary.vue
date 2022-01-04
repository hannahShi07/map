<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1130px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="80px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item label="会议名称" prop="meetingName">
          <el-input v-model="messages.meetingName" placeholder="请输入" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="会议纪要" prop="summaryContent">
          <base-tinymce-editor  v-model="messages.summaryContent" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="file" label="上传附件" prop="">
          <base-file-upload
            :limit='9'
            list-type="text"
            :acceptSize="20"
            :accept='accept'
            :autoUpload="true"
            :otherData="otherData"
            :action="action"
            ref="fileRef"
            @associationCallback="associationCallback"/>
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  // import { VueEditor } from "vue2-editor";//引入富文本
  import commonReq  from "@/api/public/commonReq.js"
  import {getMeetingSummmary,getMeetingDetail} from "@/api/backstage/party/orglife/democraticviewmeeting/democraticviewmeeting.js"
  export default {
    name: "meeting-summary",
    components:{},
    data () {
      return {
        loading:true,//加载遮罩条件
        // 自己的
        visible: false,
        title:'会议纪要',
        messages:{
          meetingId:'',//会议id
          meetingName:'',//会议名称
          summaryContent:'',//会议纪要

        },
        node: { // 必填项判断
          'summaryContent':[{
            required: true,
            message: '请输入内容',
            trigger: 'change'
          }],
        },

        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "meetingsummary",
          isSingle: false
        },
        accept:'.pdf,.doc,.docx,.txt,.ppt,.pptx',
      }
    },
    mounted(){

    },
    watch:{
      'messages.summaryContent':{
        handler(newval){
          if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.clearValidate('summaryContent');//清除附件验证
            }

          }else{
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.validateField("summaryContent");//添加附件验证
            }


          }
        },
        deep:true
      }
    },
    methods: {
      show (t,row) {
        this.visible = true;
        this.otherData.bizId=row.id;
        this.$nextTick(function(){// 编辑时，附件自动回显
          this.$refs.fileRef.init()
        })
        this.getDetail(row.id);
      },
      //获取详情
      getDetail(id){
        let params={
          meetingId:id
        }
        getMeetingDetail(params).then(response => {
          const res = response;
          this.messages={
            meetingId:id,//会议id
            meetingName:res.meetingName,//会议名称
            summaryContent:res.meetingRecord,
          }
          if(this.messages.summaryContent==null || this.messages.summaryContent=='null' || this.messages.summaryContent==undefined){
            this.messages.summaryContent='';
          }
        }).finally(() => {
          this.loading = false;
        });
      },

      //取消
      cancel() {
        this.$refs['ruleForm'].resetFields();//清除附件
        this.visible = false;
        this.messages={
          meetingId:'',//会议id
          meetingName:'',//会议名称
          summaryContent:'',//会议纪要

        }
      },
      // 成功回调
      associationCallback(val){
        if(val){
          getMeetingSummmary(this.messages).then(response => {
            const res = response;
            this.$message(this.successTip())
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
      //保存
      saveBtn () {
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            // setTimeout(() => {
            //   const isError = document.getElementsByClassName('is-error')
            //   isError.length && isError[0].querySelector('input').focus()
            // }, 100)
            return // 表单必填项判断
          }
          //删除参数
          delete this.messages.meetingName;

          this.$refs.fileRef.submitFile()
          // getMeetingSummmary(this.messages).then(response => {
          //   const res = response;
          //   this.$message.success("保存成功")
          //   this.cancel()
          //   this.$emit('refresh')
          // })
        })

      }

    },
  }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 15px 40px;
  }
</style>


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
        <el-form-item label="培训主题" prop="theme">
          <el-input v-model="messages.theme" placeholder="请输入" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="培训现场" prop="record">
          <base-tinymce-editor  v-model="messages.record" />
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
  import commonReq  from "@/api/public/commonReq.js"
  import {getTrainRecord,getTrainDetail} from "@/api/backstage/personnel/educationtrain/trainmanage/trainmanage.js"


  export default {
    name: "training-record",
    components:{},
    data () {
      return {
        loading:true,
        // 自己的
        visible: false,
        title:'记录',
        messages:{
          id:'',//培训id
          theme:'',//培训主题
          record:'',//培训现场

        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "trainrecord",
          isSingle: false
        },
        accept:'.doc,.docx,.pdf,.xlsx,.zip',
        node: {
          'record': {
            required: true,
            message: "请输入培训现场",
            trigger: "blur"
          },
        }

      }
    },
    mounted(){

    },
    watch:{
      'messages.record':{
        handler(newval){
          if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.clearValidate('record');//清除验证
            }
          }else{
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.validateField("record");//添加验证
            }
          }
        },
        deep:true
      }
    },
    methods: {
      // 成功回调
      associationCallback(val){
        if(val){
          getTrainRecord(this.messages).then(response => {
            const res = response;
            this.$message(this.successTip());
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
      show (t,row) {
        this.visible = true;
        this.getDetail(row.id);
        this.otherData.bizId=row.id;
        this.$nextTick(function(){// 编辑时，附件自动回显
          this.$refs.fileRef.init()
        })

      },
      //获取详情
      getDetail(id){
        let params={
          id:id
        }
        getTrainDetail(params).then(response => {
          const res = response;
          if(res.record==undefined || res.record==null || res.record=='null'){
            res.record='';
          }
          this.messages={
            id:id,//培训id
            theme:res.theme,//培训主题
            record:res.record,//培训现场
          };

        }).finally(() => {
          this.loading = false;
        });
      },

      //取消
      cancel() {
        this.$refs.ruleForm.resetFields();//清除表单验证
        this.visible = false;
        this.messages={
          id:'',
          theme:'',//会议名称
          record:'',//会议纪要

        }
      },

      //保存
      saveBtn () {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) {

            return;
          }
          this.$refs.fileRef.submitFile();//回调附件上传方法

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

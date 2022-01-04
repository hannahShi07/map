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
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="文章标题" prop="articleTitle">
          <el-input v-model="messages.articleTitle" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="发布时间" prop="releaseTime">
          <el-date-picker
            v-model="messages.releaseTime"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd"
            :picker-options="selectoptions">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发布者" prop="articleSource">
          <el-input v-model="messages.articleSource" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="文章详情" prop="articleDetails">
<!--          <vue-editor v-model="messages.articleDetails" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.articleDetails" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required file" label="上传附件" prop="fileListExist">
          <base-file-upload
            :limit='9'
            list-type="text"
            :acceptSize="20"
            :accept='accept'
            :autoUpload="true"
            :fileListExist.sync="messages.fileListExist"
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
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import {getInspectionAdd,getInspectionEdit,getInspectionDetail} from "@/api/backstage/party/orglife/inspection/inspection.js"

    // import { VueEditor } from "vue2-editor";//引入富文本
    export default {
      name: "inspection-add",
      components:{},
      data () {
        return {
          loading:false,//加载遮罩
          // 自己的
          visible: false,
          title:'新增通报',
          messages:{
            id:'',
            articleTitle:'',//文章标题
            releaseTime:'',//发布时间
            articleSource:'',//发布来源
            articleDetails:'',//发布内容
            fileListExist:'',//是否已上传附件

          },
          node: { // 必填项判断
            'articleTitle':[{
              required: true,
              message: '请输入文章标题',
              trigger: 'blur'
            }],
            'releaseTime':[{
              required: true,
              message: '请输入发布时间',
              trigger: 'change'
            }],
            'fileListExist':[{
              required: true,
              message: '请上传附件',
              trigger: 'blur'
            }],

          },
          action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
          otherData:{
            id: '',
            bizId: "",
            bizType: "inspection",
            isSingle: false
          },
          accept:'.doc,.docx,.pdf,.xlsx,.txt',
          isEdit:'',//判断是新增还是编辑
          count:0,
          selectoptions:{
            disabledDate(time) {
              let nowdate=new Date();
              return time.getTime() < nowdate.getTime()-3600*1000*24;
            },
          }
        }
      },
      mounted(){

      },
      watch:{
        'messages.fileListExist':{
          handler(newval){
            if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
              this.$refs.ruleForm.clearValidate('fileListExist');//清除附件验证
            }else{

            }
          },
          deep:true
        }
      },
      methods: {
        // 重置数据
        resetData(){
          this.$nextTick(function(){
            this.messages={
              id:'',//数据id
              articleTitle:'',//文章标题
              releaseTime:'',//发布时间
              articleSource:'',//发布来源
              articleDetails:'',//发布内容
              // fileListExist: ''
            }
            this.$refs['ruleForm'].resetFields();//清除附件
          })
        },
        //新增时获取UID
        partyUid(){
          commonReq.getNewUid({}).then(response =>{
            const res = response
            this.messages.id = res;
            this.otherData.bizId = res;
          })

        },
        //打开页面
        show (t,row) {
          this.visible = true;
          if(t==1){//新增
            this.resetData()
            this.isEdit=1;
            this.title='新增通报';
            this.partyUid();
          }else if(t==4){//编辑
            this.loading=true;
            this.isEdit=2;
            this.title='编辑通报';
            this.getDetail(row.id);
            this.otherData.bizId = row.id// 编辑时，附件自动回显
            this.$nextTick(function(){// 编辑时，附件自动回显
              this.$refs.fileRef.init()
            })
          }

        },
        //获取编辑详情
        getDetail(id){
          let params={
            id:id
          }
          getInspectionDetail(params).then(response => {
            const res = response;
            this.messages.id = res.id
            this.messages.articleTitle = res.articleTitle
            this.messages.releaseTime = res.releaseTime
            this.messages.articleSource = res.articleSource
            this.messages.articleDetails = res.articleDetails

          }).finally(() =>{
            this.loading = false;
          })
        },

        //取消
        cancel() {
          // this.$refs['ruleForm'].resetFields();//清除附件
          this.visible = false;
          // this.messages={
          //     id:'',//数据id
          //     articleTitle:'',//文章标题
          //     releaseTime:'',//发布时间
          //     articleSource:'',//发布来源
          //     articleDetails:'',//发布内容
          //     // fileListExist: ''
          // }
          this.resetData()
        },

        // 成功回调
        associationCallback(val){
          if(val){
            if(this.isEdit==1){//新增
              getInspectionAdd(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip());
                this.cancel()
                this.$emit('refresh')
              })
            }else if(this.isEdit==2){//编辑
              getInspectionEdit(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip());
                this.cancel()
                this.$emit('refresh')
              })
            }
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
              setTimeout(()=>{
                const isError= document.getElementsByClassName('is-error')
                isError.length && isError[0].querySelector('input').focus()
              },100)
              return // 表单必填项判断
            }
            // this.$refs['fileRef'].submitFile()//删除附件调用方法
            // delete this.messages.fileListExist;

            this.$refs.fileRef.submitFile();

            // if(this.isEdit==1){//新增保存
            //   getInspectionAdd(this.messages).then(response => {
            //     const res = response;
            //     this.$message.success("保存成功")
            //     this.cancel()
            //     this.$emit('refresh')
            //   })
            //
            // }else if(this.isEdit==2){//编辑保存
            //   getInspectionEdit(this.messages).then(response => {
            //     const res = response;
            //     this.$message.success("保存成功")
            //     this.cancel()
            //     this.$emit('refresh')
            //   })
            // }


          })
        }

      },
    }
</script>

<style scoped>

</style>

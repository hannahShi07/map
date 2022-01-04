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
        <el-form-item class="is-required" label="标题" prop="title">
          <el-input v-model="messages.title" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布单位" prop="publishOrg">
          <el-input v-model="messages.publishOrg" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布日期" prop="publishDate">
          <el-date-picker
            v-model="messages.publishDate"
            type="date"
            placeholder="请选择"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="内容" prop="content">
<!--          <vue-editor class="is-required" v-model="messages.content" placeholder="20000个字符以内" :editorToolbar="customToolbar"  @blur="onInputBlur"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.content"/>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="filecontent">
        <el-form-item class="file" label="上传附件">
          <base-file-upload
            :limit='9'
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
  // import { VueEditor } from "vue2-editor";//引入富文本
  import {getExamDetail,getExamAdd,getExamEdit} from "@/api/backstage/personnel/talentrecruitment/examinfomanage/examinfomanage.js"


  export default {
    name: "exam-add",
    components:{},
    data () {
      return {
        loading:false,
        // 自己的
        visible: false,
        title:'新增',
        messages:{
          id:'',
          title:'',//信息标题
          publishOrg:'',//发布单位
          publishDate:'',//发布日期
          content:'',//内容

        },
        node: { // 必填项判断
          'title':[{
            required: true,
            message: '请输入信息标题',
            trigger: 'blur'
          }],
          'publishOrg':[{
            required: true,
            message: '请输入发布单位',
            trigger: 'blur'
          }],
          'publishDate':[{
            required: true,
            message: '请选择发布时间',
            trigger: 'change'
          }],
          'content':[{
            required: true,
            message: '请输入内容',
            trigger: 'change'
          }],

        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "exam",
          isSingle: false
        },
        accept:'.doc,.docx,.pdf,.xlsx,.txt',
        isEdit:'',//判断是新增还是编辑
      }
    },
    watch:{
      'messages.content':{
        handler(newval){
          if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.clearValidate('content');//清除附件验证
            }

          }else{
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.validateField("content");//添加附件验证
            }


          }
        },
        deep:true
      }
    },
    methods: {
      //校验内容
      // onInputBlur(){
      //   if(this.messages.content!='' && this.messages.content!=undefined && this.messages.content!=null && this.messages.content!='null'){
      //     this.$refs.ruleForm.clearValidate('content');//清除附件验证
      //   }else{
      //     this.$refs.ruleForm.validateField("content");//添加附件验证
      //   }
      // },
      //新增获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          console.log('信息： '+JSON.stringify(response))
          const res = response;
          this.messages.title=res.data.orgName+'考试公示';
          this.messages.publishOrg=res.data.orgName;
        }).finally(() => {

        });
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

        this.messages={
          id:'',
          title:'',//信息标题
          publishOrg:'',//发布单位
          publishDate:'',//发布日期
          content:'',//内容
        }
        this.$nextTick(function(){
          this.$refs['ruleForm'].resetFields()
        })

        if(t==1){//新增
          this.isEdit=1;
          this.title='新增';
          this.getUser();
          this.partyUid();
        }else if(t==4){//编辑
          this.loading=true;
          this.isEdit=2;
          this.title='编辑';
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
        getExamDetail(params).then(response => {
          const res = response;
          this.$refs.fileRef.init()
          this.messages={
            id:id,
            title:res.title,//信息标题
            publishOrg:res.publishOrg,//发布单位
            publishDate:res.publishDate,//发布日期
            content:res.content,//内容
          };

        }).finally(() => {
          this.loading = false;
        });
      },

      //取消
      cancel() {
        this.visible = false;
        this.messages={
          id:'',
          title:'',//信息标题
          publishOrg:'',//发布单位
          publishDate:'',//发布日期
          content:'',//内容
        };
        this.$refs['ruleForm'].resetFields();
      },
      // 成功回调
      associationCallback(val){
        if(val){
          if(this.isEdit==1){//新增
            getExamAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh',1)
            })
          }else if(this.isEdit==2){//编辑
            getExamEdit(this.messages).then(response => {
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
          this.$refs.fileRef.submitFile()


        })
      }

    },
  }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 15px 40px;
  }
  .filecontent /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    display:none;
  }
</style>

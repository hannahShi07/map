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
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px">
      <el-col :span="24">
        <el-form-item class="is-required" label="信息标题" prop="djOfficerTitle">
          <el-input v-model="messages.djOfficerTitle" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布单位" prop="djOfficerOrg">
          <el-input v-model="messages.djOfficerOrg" placeholder="请输入"maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="发布日期" prop="djOfficerDate">
          <el-date-picker
            v-model="messages.djOfficerDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="内容" prop="djOfficerContent">
         <!--<vue-editor v-model="messages.djOfficerContent" placeholder="20000个字符以内":editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.djOfficerContent" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="file" label="上传附件" >
          <base-file-upload
            :limit='1'
            list-type="text"
            :acceptSize="20"
            :accept='accept'
            :autoUpload="true"
            :fileListExist.sync="messages.fileListExist"
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
    import {getElectedofficialsAdd,getElectedofficialsEdit,getElectedofficialsDetail} from "@/api/backstage/personnel/cadreselection/electedofficials/electedofficials.js"
    import { VueEditor } from "vue2-editor";//引入富文本
    export default {
      name: "electedofficials-add",
      components:{ VueEditor },
      data () {
        return {
          customToolbar: [//富文本编辑器
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'header': '2'}], [{'align': 'center'}, {'align': 'justify'}, {'align': 'right'}],
            [{'color': []}],[{'background': []}], ['image'], ['clean'],
          ],
          // content: '',
          // 自己的
          visible: false,
          title:'',
          options:[],//参与人员列表
          messages:{
            id:'',
            djOfficerTitle:'',//信息标题
            djOfficerDate:'',//发布日期
            djOfficerOrg:db.get("USER").djOrg.name,//发布单位
            djOfficerContent:'',//内容
            fileListExist:'',//是否已上传附件
            isDelete:0,
          },
          node: { // 必填项判断
            'djOfficerTitle':[{
              required: true,
              message: '请输入信息标题',
              trigger: 'blur'
            }],
            'djOfficerOrg':[{
                required: true,
                message: '请输入发布单位',
                trigger: 'blur'
            }],
            'djOfficerDate':[{
                  required: true,
                  message: '请输入发布日期',
                  trigger: 'change'
              }],
              'djOfficerContent':[{
                  required: true,
                  message: '请输入内容',
                  trigger: 'blur'
              }],
          },
          action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
          otherData:{
            id: '',
            bizId: "",
            bizType: "electedofficials",
            isSingle: false
          },
          accept:'.doc,.docx,.pdf,.xlsx,.zip',
          isEdit:'',//判断是新增还是编辑
        }
      },
      mounted(){
      },
      watch:{
          'messages.djOfficerContent':{
              handler(newval){
                  if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
                      if(this.$refs.ruleForm){
                          this.$refs.ruleForm.clearValidate('djOfficerContent');//清除附件验证
                      }
                  }else{
                      if(this.$refs.ruleForm){
                          this.$refs.ruleForm.validateField("djOfficerContent");//添加附件验证
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
                  if(this.isEdit==1){//新增保存
                      getElectedofficialsAdd(this.messages).then(response => {
                          const res = response;
                          this.$message.success("保存成功")
                          this.cancel()
                          this.$emit('refresh')
                      })
                  }else if(this.isEdit==2){//编辑保存
                      getElectedofficialsEdit(this.messages).then(response => {
                          const res = response;
                          this.$message.success("保存成功")
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
            this.isEdit=1;
            this.title='新增';
            this.partyUid();
          }else if(t==4){//编辑
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
          getElectedofficialsDetail(params).then(response => {
            const res = response;
            this.messages=res;
          })
        },

        //取消
        cancel() {
          this.$refs['ruleForm'].resetFields();//清除附件
          this.visible = false;
          this.messages={
              id:'',//数据id
              djOfficerTitle:'',//信息标题
              djOfficerDate:'',//发布日期
              djOfficerOrg:'',//发布单位
              djOfficerContent:'',//发布内容
              fileListExist: ''
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
            // delete this.messages.fileListExist;
          })
        }

      },
    }
</script>

<style scoped>

</style>

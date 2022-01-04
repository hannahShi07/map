<!--工作动态新增或编辑页-->
<template>
  <div>
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
          <el-form-item class="is-required" label="信息标题" prop="title">
            <el-input v-model="messages.title" placeholder="请输入" maxlength="200" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  class="is-required" label="发布组织" prop="orgId.data">
            <el-input v-model="messages.orgId.data" placeholder="请输入" @click.native="getTree" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开展日期" prop="wageDate">
            <el-date-picker
              v-model="messages.wageDate"
              type="date"
              placeholder="请选择"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容" prop="content">
<!--            <vue-editor v-model="messages.content" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
            <base-tinymce-editor  v-model="messages.content" />
          </el-form-item>
        </el-col>
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

      </el-form>
      <div slot="footer" class="text-center">
        <el-button size="medium" @click="cancel">取消</el-button>
        <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
      </div>
    </el-dialog>
    <!--所属党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss'
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import {getDynamicworkAdd,getDynamicworkEdit,getDynamicworkDetail} from "@/api/backstage/party/informationPush/dynamicwork/dynamicwork.js"

    import { VueEditor } from "vue2-editor";//引入富文本
    export default {
        name: "dynamicwork-add",
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
                messages:{
                    id:'',
                    title:'',//信息标题
                    wageDate:'',//开展日期
                    orgId:{key:"",data:""},//发布组织
                    content:'',//内容
                    file:[],//附件

                },
                node: { // 必填项判断
                    'title':[{
                        required: true,
                        message: '请输入信息标题',
                        trigger: 'blur'
                    }],
                    'wageDate':[{
                        required: true,
                        message: '请输入开展日期',
                        trigger: 'change'
                    }],
                    'orgId.data':[{
                        required: true,
                        message: '请输入发布组织',
                        trigger: 'blur'
                    }],
                    'content':[{
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }],

                },
                action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
                otherData:{
                    id: '',
                    bizId: "",
                    bizType: "dynamicwork",
                    isSingle: false
                },
                accept:'.doc,.docx,.pdf,.xlsx,.zip',
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
          // 重置数据
          resetData(){
            this.$nextTick(function(){
              this.messages={
                id:'',//数据id
                title:'',//标题
                wageDate:'',//开展时间
                orgId:{data:''},//发布组织
                content:'',//内容
              }
              this.$refs['ruleForm'].resetFields();//清除附件
            })
          },

            // 成功回调
            associationCallback(val){
                if(val){
                    if(this.isEdit==1){//新增保存
                        getDynamicworkAdd(this.messages).then(response => {
                            const res = response;
                            // this.$message.success("保存成功")
                            this.$message(this.successTip())
                            this.cancel()
                            this.$emit('refresh',1)
                        })
                    }else if(this.isEdit==2){//编辑保存
                        getDynamicworkEdit(this.messages).then(response => {
                            const res = response;
                            // this.$message.success("保存成功")
                            this.$message(this.successTip())
                            this.cancel()
                            this.$emit('refresh')
                        }).finally(() => {
                        });
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
                  this.resetData()
                  this.title = '新增'
                  this.isEdit=1;
                  this.partyUid();
                }else if(t==4){//编辑
                    this.title = '编辑'
                    this.isEdit=2;
                    this.getDetail(row.id);
                    this.otherData.bizId = row.id// 编辑时，附件自动回显
                    this.$nextTick(function(){// 编辑时，附件自动回显
                        this.$refs.fileRef.init()
                    })
                }
            },
            //选择的上级党组织回调
            getParentId(val) {
                this.messages.orgId.key = ""
                this.messages.orgId.data = ""
                if (val != "") {
                    this.messages.orgId.data = val.data
                    this.messages.orgId.key = val.key
                    this.$refs['ruleForm'].clearValidate(['orgId.data']);
                }
            },
            //打开上级党组织弹窗
            getTree() {
                this.$refs['orgTree'].show()
            },
            //获取编辑详情
            getDetail(id){
                let params={
                    id:id
                }
                getDynamicworkDetail(params).then(response => {
                    const res = response;
                    this.messages=res;

                }).finally(() => {
                });
            },

            //取消
            cancel() {
                // this.$refs['ruleForm'].resetFields();//清除附件
                this.visible = false;
                // this.messages={
                //     id:'',//数据id
                //     title:'',//标题
                //     wageDate:'',//开展时间
                //     orgId:{data:''},//发布组织
                //     content:'',//内容
                // }
              this.resetData()
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
  /deep/ .el-dialog__body{
   padding-right: 50px;
  }
</style>

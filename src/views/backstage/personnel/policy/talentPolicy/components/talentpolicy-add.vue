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
        <el-form-item class="is-required" label="信息标题" prop="djHumanPolicyTitle">
          <el-input v-model="messages.djHumanPolicyTitle" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布单位" prop="djHumanPolicyOrg">
          <el-input v-model="messages.djHumanPolicyOrg" placeholder="请输入"  maxlength="100"  clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="发布日期" prop="djHumanPolicyDate">
          <el-date-picker
            v-model="messages.djHumanPolicyDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item  label="政策地址" >
          <el-input v-model="messages.djHumanPolicyUrl" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="内容">
       <!-- <vue-editor v-model="messages.djHumanPolicyContent" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.djHumanPolicyContent" />
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
    import {getTalentpolicyAdd,getTalentpolicyEdit,getTalentpolicyDetail} from "@/api/backstage/personnel/policy/talentPolicy/talentPolicy.js"
    import { VueEditor } from "vue2-editor";//引入富文本
    export default {
        name: "talentpolicy-add",
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
                    djHumanPolicyTitle:'',//信息标题
                    djHumanPolicyDate:'',//发布日期
                    djHumanPolicyOrg:db.get("USER").djOrg.name,//发布单位
                    djHumanPolicyContent:'',//内容
                    djHumanPolicyUrl:'',//政策地址
                    person:'',//参与人员
                },
                node: { // 必填项判断
                    'djHumanPolicyTitle':[{
                        required: true,
                        message: '请输入信息标题',
                        trigger: 'blur'
                    }],
                    'djHumanPolicyOrg':[{
                        required: true,
                        message: '请输入发布单位',
                        trigger: 'blur'
                    }],
                    'djHumanPolicyDate':[{
                        required: true,
                        message: '请输入发布日期',
                        trigger: 'change'
                    }],
                    'djHumanPolicyUrl':[{
                        required: false,
                        // pattern:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
                        message: '请输入正确的政策地址',
                        trigger: 'blur'
                    },{
                        pattern: /^((((https|http)(:\/\/))(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                        message: '网址格式错误',
                        trigger: 'blur'
                    }],

                },
                action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
                otherData:{
                    id: '',
                    bizId: "",
                    bizType: "generalelection",
                    isSingle: false
                },
                accept:'.doc,.docx,.pdf,.xlsx,.zip',
                isEdit:'',//判断是新增还是编辑
            }
        },
        mounted(){
        },
        methods: {
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
                    // this.otherData.bizId = row.id// 编辑时，附件自动回显
                    // this.$nextTick(function(){// 编辑时，附件自动回显
                    //     this.$refs.fileRef.init()
                    // })
                }

            },
            //获取编辑详情
            getDetail(id){
                let params={
                    id:id
                }
                getTalentpolicyDetail(params).then(response => {
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
                    djHumanPolicyTitle:'',//信息标题
                    djHumanPolicyDate:'',//发布日期
                    djHumanPolicyOrg:'',//发布单位
                    djHumanPolicyContent:'',//发布内容
                    djHumanPolicyUrl:'',//政策地址
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
                    if(this.isEdit==1){//新增保存
                        let params= {
                            djHumanPolicyTitle:this.messages.djHumanPolicyTitle,
                            djHumanPolicyDate:this.messages.djHumanPolicyDate,
                            djHumanPolicyOrg:this.messages.djHumanPolicyOrg,
                            djHumanPolicyContent:this.messages.djHumanPolicyContent,
                            djHumanPolicyUrl:this.messages.djHumanPolicyUrl,
                            id:this.messages.id,
                            isDelete:0
                        }
                        getTalentpolicyAdd(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        })

                    }else if(this.isEdit==2){//编辑保存
                        let params= {
                            djHumanPolicyTitle:this.messages.djHumanPolicyTitle,
                            djHumanPolicyDate:this.messages.djHumanPolicyDate,
                            djHumanPolicyOrg:this.messages.djHumanPolicyOrg,
                            djHumanPolicyContent:this.messages.djHumanPolicyContent,
                            djHumanPolicyUrl:this.messages.djHumanPolicyUrl,
                            id:this.messages.id,
                            isDelete:0
                        }
                        getTalentpolicyEdit(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        })
                    }
                })
            }

        },
    }
</script>

<style scoped>

</style>

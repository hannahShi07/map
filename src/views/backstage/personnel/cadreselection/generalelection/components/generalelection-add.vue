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
        <el-form-item class="is-required" label="信息标题" prop="changeTermTitle">
          <el-input v-model="messages.changeTermTitle" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布单位" prop="changeTermUnit">
          <el-input v-model="messages.changeTermUnit" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="发布日期" prop="changeTermDate">
          <el-date-picker
            v-model="messages.changeTermDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="开展组织" prop="changeTermOrg">
          <el-input v-model="messages.changeTermOrg"  @click.native="getTree" placeholder="请输入" maxlength="200"
                    clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="换届地点" prop="changeTermAddress">
          <el-input v-model="messages.changeTermAddress" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="内容" prop="changeTermContent">
<!--          <vue-editor v-model="messages.changeTermContent" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.changeTermContent" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="参与人员" prop="person">
         <!-- collapse-tags 叠加-->
          <el-select v-model="messages.person" multiple  placeholder="请选择" style="width: 100%" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
    <!--所属党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>
  </el-dialog>

</template>

<script>
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import {getGeneralelectionAdd,getGeneralelectionEdit,getGeneralelectionDetail,getGeneralelectionPerson} from
    "@/api/backstage/personnel/cadreselection/generalelection/generalelection.js"
    import { VueEditor } from "vue2-editor";//引入富文本
    export default {
        name: "generalelection-add",
        components:{ VueEditor },
        data () {
            return {
                visible: false,
                title:'',
                options:[],//参与人员列表
                messages:{
                    id:'',
                    changeTermTitle:'',//信息标题
                    changeTermDate:'',//发布日期
                    changeTermUnit:db.get("USER").djOrg.name,//发布单位
                    changeTermAddress:'',//换届地址
                    // changeTermOrgName:{data:'',key:''},//开展组织名称
                    changeTermOrgId:'',//开展组织名称
                    changeTermOrg:'',//开展组织
                    changeTermContent:'',//内容
                    person:[],//参与人员id
                    fileListExist:'',//是否已上传附件
                },
                node: { // 必填项判断
                    'changeTermTitle':[{
                        required: true,
                        message: '请输入信息标题',
                        trigger: 'blur'
                    }],
                    'changeTermUnit':[{
                        required: true,
                        message: '请输入发布单位',
                        trigger: 'blur'
                    }],
                    'changeTermDate':[{
                        required: true,
                        message: '请输入发布日期',
                        trigger: 'change'
                    }],
                    'changeTermOrg':[{
                        required: true,
                        message: '请输入开展组织',
                        trigger: 'blur'
                    }],
                    'changeTermAddress':[{
                        required: true,
                        message: '请输入换届地点',
                        trigger: 'blur'
                    }],
                    'changeTermContent':[{
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }],
                    'person':[{
                        required: true,
                        message: '请选择参与人员',
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
        watch:{
            'messages.changeTermContent':{
                handler(newval){
                    if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
                        if(this.$refs.ruleForm){
                            this.$refs.ruleForm.clearValidate('changeTermContent');//清除附件验证
                        }
                    }else{
                        if(this.$refs.ruleForm){
                            this.$refs.ruleForm.validateField("changeTermContent");//添加附件验证
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
                    let arr = this.messages.person;
                    let str1 = "";
                    for (let i = 0; i < arr.length; i++) {
                        if (i < arr.length - 1) {
                            str1 += arr[i] + ",";
                        } else {
                            str1 += arr[i];
                        }
                        this.messages.person = str1
                    }
                    if(this.isEdit==1){//新增保存
                        let params= {
                            changeTermTitle:this.messages.changeTermTitle,
                            changeTermDate:this.messages.changeTermDate,
                            changeTermUnit:this.messages.changeTermUnit,
                            changeTermAddress:this.messages.changeTermAddress,
                            changeTermOrg:this.messages.changeTermOrgId,
                            changeTermContent:this.messages.changeTermContent,
                            person:this.messages.person,
                            id:this.messages.id,
                            isDelete:0
                        }
                        getGeneralelectionAdd(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        })

                    }else if(this.isEdit==2){//编辑保存
                        let params= {
                            changeTermTitle:this.messages.changeTermTitle,
                            changeTermDate:this.messages.changeTermDate,
                            changeTermUnit:this.messages.changeTermUnit,
                            changeTermAddress:this.messages.changeTermAddress,
                            changeTermOrg:this.messages.changeTermOrgId,
                            changeTermContent:this.messages.changeTermContent,
                            person:this.messages.person,
                            id:this.messages.id,
                            isDelete:0
                        }

                        getGeneralelectionEdit(params).then(response => {
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
            //选择的上级党组织回调
            getParentId(val){
                if((val != "") && (this.messages.changeTermOrg != val.data)){
                  this.messages.person = []
                  this.messages.changeTermOrg=''
                  this.messages.changeTermOrgId =''
                  this.messages.changeTermOrg= val.data
                  this.messages.changeTermOrgId= val.key
                  this.$refs['ruleForm'].clearValidate(['changeTermOrg'])
                  this.getPerson(this.messages.changeTermOrgId)
                }
            },
            //打开上级党组织弹窗
            getTree(){
                this.$refs['orgTree'].show()
            },
            //打开页面
            show (t,row) {
                this.visible = true;
                if(t==1){//新增
                    this.messages.changeTermUnit = db.get("USER").djOrg.name,//发布单位
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
            //获取参与人员
            getPerson(id){
                let params={
                    orgId:{key:id}
                }
                getGeneralelectionPerson(params).then(response => {
                    const res = response;
                    this.options=res;
                })
            },
            //获取编辑详情
            getDetail(id){
                let params={
                    id:id
                }
                getGeneralelectionDetail(params).then(response => {
                    const res = response;
                    this.messages=res;
                    this.messages.changeTermOrgId = res.changeTermOrg
                    this.messages.changeTermOrg = res.changeTermOrgName
                    let array = []
                    for (let i=0;i<res.list.length;i++){
                        array.push(res.list[i].id)
                    }
                    this.messages.person = array
                })
                this.getPerson(this.messages.changeTermOrgId)
            },
            //取消
            cancel() {
                this.$refs['ruleForm'].resetFields();//清除附件
                this.visible = false;
                this.messages={
                    id:'',//数据id
                    changeTermTitle:'',//信息标题
                    changeTermDate:'',//发布日期
                    changeTermUnit:'',//发布单位
                    changeTermContent:'',//发布内容
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

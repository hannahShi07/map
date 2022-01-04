<template>
  <div class="sociology-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <div class="information">
          <el-row>
            <el-col :span="24">
              <el-form-item label="项目名称" prop="name">
                <el-input class="select" v-model="formData.name" maxlength="200" clearable placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="项目概述" prop="content">
                <base-tinymce-editor v-model="formData.content" placeholder="20000个字符以内"></base-tinymce-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="投资总额" prop="investment">
                <el-input placeholder="请输入" v-model="formData.investment" clearable maxlength="100">
                  <span slot="suffix">万元</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目成熟度" prop="checkList">
                <el-checkbox-group v-model="formData.checkList">
                  <el-checkbox v-for="item in projectMaturityList" :key="item.id" :label="item.name"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="行业分类" prop="industryCategory">
                <el-select v-model="formData.industryCategory" placeholder="请选择" :editable="false" clearable>
                  <el-option
                    v-for="item in industryCategoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合作方式" prop="cooperationType">
                <el-radio v-for="item in cooperationTypeList" :key="item.id" v-model="formData.cooperationType" :label="item.id">{{item.name}}</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目联系人" prop="contacts">
                <el-input placeholder="请输入" maxlength="100" clearable v-model="formData.contacts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <base-telephone v-model="formData.contact" :phone="'contact'" :isImport="true"></base-telephone>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目载体" prop="carrier">
                <el-select v-model="formData.carrier" placeholder="请选择" :editable="false" clearable>
                  <el-option
                    v-for="item in carrierList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="company" :span="24">
              <el-form-item label="上传图片" class="rel">
                <base-file-upload
                  :folio='true'
                  list-type="picture-card"
                  :acceptSize="20"
                  :accept="accept"
                  :otherData="otherData"
                  ref="fileRef"
                @associationCallback="associationCallback"/>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="">
                <el-input v-model="formData.comment" :autosize="{minRows: 12, maxRows: 12}" placeholder="请输入备注" resize="none" type="textarea" maxlength="500" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">发 布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {gatewaySave,gatewayEdit,gatewayInfo} from "@/api/backstage/sysset/administration/gateway/gateway.js"
export default {
  name: "InstructorAdd",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"新增",//标题
      formData:{
        "id":"",
        "name":"",//项目名称
        "content":"",//项目概述
        "investment":"",//投资总额
        "projectMaturity":[],//项目成熟度
        "industryCategory":"",//行业分类
        "cooperationType":"",//合作方式
        "contacts":"",//项目联系人
        "contact":"",//联系方式
        "carrier":"",//项目载体
        "comment":"",//备注
        "type":"2412585934552456725",//推荐项目
        "checkList":[],
      },
      node:{
        name:{
          required: true,
          message: "请输入项目名称",
          trigger: "blur"
        },
        content:{
          required: true,
          message: "请输入项目概述",
          trigger: "blur"
        },
        investment:[{
          required: true,
          message: "请输入投资总额",
          trigger: "blur"
        },{ pattern: /\d/, message: '请输入正确的投资总额' }],
        checkList:{
          required: true,
          message: "请选择项目成熟度",
          trigger: ["blur","change"]
        },
        industryCategory:{
          required: true,
          message: "请选择行业分类",
          trigger: ["blur","change"]
        },
        cooperationType:{
          required: true,
          message: "请选择合作方式",
          trigger: ["blur","change"]
        },
        contacts:{
          required: true,
          message: "请输入项目联系人",
          trigger: "blur"
        },
        contact:{
          required: true,
          message: "请输入联系方式",
          trigger: "blur"
        },
        carrier:{
          required: true,
          message: "请选择项目载体",
          trigger: ["blur","change"]
        }
      },
      accept:".png,.jpg,.jpeg",
      action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
      otherData:{
        bizId: '',
        bizType: "recommendFile",
        isSingle: false
      },
      projectMaturityList:[],//项目成熟度
      industryCategoryList:[],//行业分类
      cooperationTypeList:[],//合作方式
      carrierList:[],//项目载体
      saveFile:false
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    getTerm(t,row){
      let params = {
        types:['project_maturity','dj_industry','cooperation_ways','project_carrier']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.projectMaturityList=response.project_maturity;
        this.industryCategoryList=response.dj_industry;
        this.cooperationTypeList=response.cooperation_ways;
        this.carrierList=response.project_carrier;
        if(t==1){
          this.title="新增";
          this.partyUid()
        }else{
          this.title="编辑"
          this.formData.id = row.id;
          this.otherData.bizId = row.id;
          this.getDetail(row.id);
        }
      })
    },
    //附件保存
    associationCallback(val){
      let projectArr=[]
      this.formData.projectMaturity=""
      for(let i=0;i<this.projectMaturityList.length;i++){
        if(this.formData.checkList.indexOf(this.projectMaturityList[i].name)>-1){
          projectArr.push(this.projectMaturityList[i].id)
        }
      }
      this.formData.projectMaturity = projectArr.join(",")
      let params = {
        "id":this.formData.id,
        "name":this.formData.name,
        "content":this.formData.content,
        "investment":this.formData.investment,
        "projectMaturity":this.formData.projectMaturity,
        "industryCategory":this.formData.industryCategory,
        "cooperationType":this.formData.cooperationType,
        "contacts":this.formData.contacts,
        "contact":this.formData.contact,
        "carrier":this.formData.carrier,
        "comment":this.formData.comment,
        "type":this.formData.type,
      };
      if(val){
        if(this.title=="新增"){
          gatewaySave(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }).finally(() => {

          });
        }else{
          gatewayEdit(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
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
    close(){
      this.otherData={
        bizId: '',
        bizType: "recommendFile",
        isSingle: false
      }
      this.formData={
        "id":"",
        "name":"",//项目名称
        "content":"",//项目概述
        "investment":"",//投资总额
        "projectMaturity":[],//项目成熟度
        "industryCategory":"",//行业分类
        "cooperationType":"",//合作方式
        "contacts":"",//项目联系人
        "contact":"",//联系方式
        "carrier":"",//项目载体
        "comment":"",//备注
        "type":"2412585934552456725",//推荐项目
        "checkList":[],
      }
      this.visible=false;
    },
    show(t,row){
      this.formData={
        "id":"",
        "name":"",//项目名称
        "content":"",//项目概述
        "investment":"",//投资总额
        "projectMaturity":[],//项目成熟度
        "industryCategory":"",//行业分类
        "cooperationType":"",//合作方式
        "contacts":"",//项目联系人
        "contact":"",//联系方式
        "carrier":"",//项目载体
        "comment":"",//备注
        "type":"2412585934552456725",//推荐项目
        "checkList":[],
      }
      this.getTerm(t,row);
      this.visible=true;
    },
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          this.$refs['fileRef'].submitFile(this.otherData.bizId,this.otherData.bizType);
        }
      })
    },
    //新增时获取UID
    partyUid(){
      commonReq.getNewUid({}).then(response =>{
        const res = response
        this.formData.id = res;
        this.otherData.bizId = res;
      })
    },
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      gatewayInfo(params).then(response => {
        response.checkList = []
        response.carrier = response.carrier.key
        response.industryCategory = response.industryCategory.key
        response.cooperationType = response.cooperationType.key
        this.formData = response
        if(response.projectMaturityArr){
          for(let i=0;i<this.projectMaturityList.length;i++){
            if(response.projectMaturityArr.indexOf(this.projectMaturityList[i].id)>-1){
              this.formData.checkList.push(this.projectMaturityList[i].name)
            }
          }
        }
        this.$refs.fileRef.init()
      })
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 1131px;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .sociology-add >>> .el-select{
    width: 100%;
  }
  .sociology-add >>> .txt{
    color: #CCCCCC !important;
  }
</style>

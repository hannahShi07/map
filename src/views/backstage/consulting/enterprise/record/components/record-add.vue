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
            <el-col :span="12">
              <el-form-item label="指导员姓名" prop="guidanceName">
                <el-input class="select" maxlength="200" clearable placeholder="请选择指导员" readonly v-model="formData.guidanceName" @mousedown="" @click.native="chooseEnterprise(1)">
                  <i slot="suffix" class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <base-telephone v-model="formData.phone" :phone="'phone'" :isImport="true"></base-telephone>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="指导方式" prop="manner">
                <el-select v-model="formData.manner" placeholder="请选择指导方式" :editable="false" clearable>
                  <el-option
                    v-for="item in guidanceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="指导时间" prop="guidanceTime">
                <el-date-picker
                  v-model="formData.guidanceTime"
                  type="date"
                  clearable
                  placeholder="请选择指导时间"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="company">
              <el-form-item label="指导对象" prop="enterpriseName">
                <el-input class="select" maxlength="200" clearable placeholder="请输入指导对象" v-model="formData.enterpriseName" readonly @click.native="chooseEnterprise(2)">
                  <i slot="suffix" class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                </el-input>
                <div class="enterprise" v-show="formData.enterpriseName">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="法定代表人：" prop="">
                        {{isEmpty(tableData.legalPerson)}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系方式：" prop="">
                        {{isEmpty(tableData.phone)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="组织机构代码：" prop="">
                        {{isEmpty(tableData.orgCode)}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="credit-code">
                      <el-form-item label="统一社会信用代码：" prop="">
                        {{isEmpty(tableData.creditCode)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="企业类型：" prop="">
                        {{isEmpty(tableData.type.data)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="注册地址：" prop="">
                        {{isEmpty(tableData.registeredAddres)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="指导内容" prop="content">
                <base-tinymce-editor v-model="formData.content" placeholder="20000个字符以内"></base-tinymce-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="整改建议" prop="">
                <base-tinymce-editor v-model="formData.suggest" placeholder="20000个字符以内"></base-tinymce-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="company" :span="24">
              <el-form-item label="附件" prop="upFile" class="smallHeight">
                <base-file-upload
                  :limit='1'
                  list-type="text"
                  :acceptSize="100"
                  :autoUpload="true"
                  :otherData="otherData"
                  :action="action"
                  :accept="accept"
                  @associationCallback="associationCallback"
                  ref="fileRef"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
    <select-record ref="refChoose" @refresh="getEnterprise" />
  </div>
</template>

<script>
import {recordInfo,recordSave,recordEdit} from "@/api/backstage/consulting/enterprise/record/record.js"
import SelectRecord from './select-record'
import commonReq from "@/api/public/commonReq.js"
export default {
  name: "RecordInfo",
  components: {
    SelectRecord
  },
  data() {
    return {
      visible:false,
      title:"",//标题
      options:[
        {
          label:"是",
          value:0
        },
        {
          label:"否",
          value:1
        }
      ],
      photo:"",
      formData:{
        "content": "",//指导内容(富文本编辑器)
        "enterpriseId": "",//指导对象(企业id)
        "enterpriseName":"",//指导对象
        "guidanceId": "",//	指导员id
        "guidanceName": "",//	指导员
        "guidanceTime": "",//	指导时间
        "id": "",
        "isDelete": 0,//	是否删除
        "manner": "",//	指导方式<字典表>
        "num": "",//	走访次数
        "phone": "",//	联系电话
        "suggest": ""//	整改建议(富文本编辑器)
      },
      otherData:{
        bizId: '',
        bizType: "record",
        isSingle: false
      },
      tableData:{
        type:{}
      },//企业详情
      node:{
        guidanceName:{
          required: true,
          message: "请选择指导员",
          trigger: "blur"
        },
        phone:{
          required: true,
          message: "请输入联系方式",
          trigger: "blur"
        },
        manner:{
          required: true,
          message: "请选择指导方案",
          trigger: "change"
        },
        guidanceTime:{
          required: true,
          message: "请选择指导时间",
          trigger: "change"
        },
        enterpriseName:{
          required: true,
          message: "请选择指导对象",
          trigger: "change"
        },
        content:{
          required: true,
          message: "请输入指导内容",
          trigger: "blur"
        },
      },
      imageUrl:'',
      action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
      accept:".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.ppt,.pptx",
      guidanceList:[]
    }
  },
  mounted() {
    this.getTerm()
  },
  computed: {

  },
  methods: {
    close(){
      this.formData={
        "content": "",//指导内容(富文本编辑器)
        "enterpriseId": "",//指导对象(企业id)
        "enterpriseName":"",//指导对象
        "guidanceId": "",//	指导员id
        "guidanceName": "",//	指导员
        "guidanceTime": "",//	指导时间
        "id": "",
        "isDelete": 0,//	是否删除
        "manner": "",//	指导方式<字典表>
        "num": "",//	走访次数
        "phone": "",//	联系电话
        "suggest": ""//	整改建议(富文本编辑器)
      }
      this.tableData={
        type:{}
      }
      this.visible=false;
    },
    show(t,row){
      this.visible=true;
      if(t == 1){
        this.title="新增";
        this.partyUid();
      }else{
        this.title="编辑";
        this.getInfo(row.id)
      }
    },
    getInfo(id){
      let params = {
        id:id
      }
      this.loading = true;
      recordInfo(params).then(response => {
        this.formData = response;
        this.otherData.bizId = this.formData.id;
        this.formData.manner = this.formData.manner.key;
        this.tableData = response.djGuidanceEnterpeiseVo
        this.$refs.fileRef.init()
        this.loading = false;
      }).finally(() => {

      });
    },
    //选择企业/指导员
    chooseEnterprise(type){
      if(type == 1){
        let list=[{id:this.formData.guidanceId,name:this.formData.guidanceName,phone:this.formData.phone}];
        this.$refs.refChoose.show(type,list);
      }else{
        if(this.formData.guidanceName != ""){
          let list=[this.tableData];
          this.$refs.refChoose.show(type,list,this.formData.guidanceId,this.formData.guidanceName);
        }else{
          this.$message("请选择指导员");
        }
      }
    },
    getEnterprise(list){
      if(list.type){
        this.formData.guidanceName = list.data[0].name;
        this.formData.guidanceId = list.data[0].id;
        this.formData.phone = list.data[0].phone;
        this.$refs['refForm'].clearValidate(['guidanceName']);
      }else{
        this.formData.enterpriseId = list.data[0].id;
        this.formData.enterpriseName = list.data[0].name;
        this.tableData = list.data[0]
        this.$refs['refForm'].clearValidate(['enterpriseName']);
      }
    },
    getTerm(){
      let params = {
        types:["guidance_way"]
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.guidanceList=response.guidance_way;
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
    //附件保存
    associationCallback(val){
      if(val){
        let params = {
          "content": this.formData.content,
          "enterpriseId": this.formData.enterpriseId,
          "guidanceId": this.formData.guidanceId,
          "guidanceTime": this.formData.guidanceTime,
          "isDelete": this.formData.isDelete,
          "manner": this.formData.manner,
          "phone": this.formData.phone,
          "suggest": this.formData.suggest,
          "id": this.formData.id
        };
        if(this.title=="新增"){
          recordSave(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }).finally(() => {

          });
        }else{
          recordEdit(params).then(response => {
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
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          this.$refs['fileRef'].submitFile(this.otherData.bizId,this.otherData.bizType);
        }
      })
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 900px;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 0!important;
    color: #333;
    font-weight: bold;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .sociology-add >>> .el-select{
    width: 100%;
  }
  .sociology-add >>> .upload-tip{
    color:#CCCCCC;
    font-size: 14px;
    font-weight: 400;
  }
  .information{
    width: 100%;
    float: left;
  }
  .information >>> .el-form-item__label{
    text-align: right;
  }
  .information .enterprise >>> .el-form-item__label{
    text-align: left;
  }
  .information >>> .el-form-item{
    height: auto;
    padding: 5px 0;
    padding-bottom: 15px;
    margin:0;
  }
  .enterprise{
    float: left;
    width: 100%;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    margin-top: 8px;
    padding:14px;
  }
  .enterprise-title{
    color: #333;
    font-weight: bold;
  }
  .sociology-add .enterprise >>> .el-form-item{
    border:none;
    color: #666;
    font-weight: 400;
  }
  .enterprise >>> .el-form-item__label{
    width: 140px !important;
    color: #333;
  }
  .company >>> .el-form-item{
    height: auto;
  }
  .smallHeight /deep/ .el-form-item__content{
    text-align: left !important;
    line-height: 20px !important;
  }
  .smallHeight /deep/ .upload-tip{
    width: calc(100% - 135px) !important;
    text-align: left !important;
    line-height: 40px !important;
    float: right;
  }
  .smallHeight >>> .el-upload--text{
    width: 100%;
  }
  .select >>> .el-icon-arrow-up{
    transform: rotate(90deg)
  }
  .enterprise>>>.el-form-item__label{
    width: 130px !important;
    padding: 0;
  }
  .credit-code>>>.el-form-item__content{
    margin-left: 130px !important;
    line-height: 20px;
    padding: 10px 0 0 0;
  }
</style>

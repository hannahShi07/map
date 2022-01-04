<template>
  <div class="management-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="140px">
        <div class="title">机构基本信息</div>
        <div class="information">
          <el-row>
            <el-col :span="24">
              <el-form-item label="社会组织名称" prop="name">
                <el-input maxlength="100" placeholder="请输入社会组织名称" clearable v-model="formData.name"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="统一信用社代码" prop="creditCode">
                <el-input maxlength="100" placeholder="请输入统一信用社代码" clearable v-model="formData.creditCode"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <base-telephone :phone="'phone'" :isImport="true" v-model="formData.phone"></base-telephone>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="从业人数" prop="employNum">
                <el-input placeholder="请输入从业人数" maxlength="5" @blur="formData.employNum = $event.target.value" onkeyup="this.value=this.value.replace(/\D/gi,'')" clearable v-model="formData.employNum"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="director" label="是否有业务主管单位">
                <el-select v-model="formData.isExecutive.key" placeholder="请选择" :editable="false" clearable>
                  <el-option
                    v-for="item in entList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="formData.isExecutive.key == 1">
            <el-col :span="12">
              <el-form-item label="主管单位名称">
                <el-input maxlength="100" placeholder="请输入主管单位名称" clearable v-model="formData.executiveName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级单位">
                <el-input maxlength="100" placeholder="请输入二级单位" clearable v-model="formData.secondExecutive"/>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="radio">
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否建立工会组织" prop="isUnion.key">
                  <el-radio v-model="formData.isUnion.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isUnion.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否位于省级以上开发区" prop="isProdev.key">
                  <el-radio v-model="formData.isProdev.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isProdev.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否单独组建党组织" prop="isBuildOrgOnly.key">
                  <el-radio v-model="formData.isBuildOrgOnly.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isBuildOrgOnly.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否建立党组织" prop="isBuildOrg.key">
                  <el-radio v-model="formData.isBuildOrg.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isBuildOrg.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否设专职副书记" prop="isDeputySecretary.key">
                  <el-radio v-model="formData.isDeputySecretary.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isDeputySecretary.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否建立共青团组织" prop="isYouthLeague.key">
                  <el-radio v-model="formData.isYouthLeague.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isYouthLeague.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否互联网企业">
                  <el-radio v-model="formData.isInternet.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isInternet.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构地址" prop="businessAddres">
                <el-input placeholder="请输入机构地址" style="width: calc(100% - 40px)" maxlength="100" clearable v-model="formData.businessAddres"/>
                <img class="ml-10 pointer" src="@/assets/page/icon-map.png" width="23" height="21" alt="" @click="toMap()">
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="税收规模">
                <el-input placeholder="请输入税收规模" maxlength="13" @blur="formData.taxScale = $event.target.value" clearable v-model="formData.taxScale" oninput="this.value=this.value.replace(/[^\d.]/g,'');if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')<0){ if(value.length>10){ value =value.slice(0,value.length-1) } } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}">
                  <i slot="suffix">万以上</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="社会组织简介">
                <el-input v-model="formData.brief" :autosize="{minRows: 12, maxRows: 12}" placeholder="请输入社会组织简介" resize="none" type="textarea" maxlength="500" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="title">法定代表人情况</div>
        <div class="information">
          <el-row>
            <el-col :span="12">
              <el-form-item label="法人代表" prop="legalPerson">
                <el-input maxlength="100" placeholder="请输入法人代表" clearable v-model="formData.legalPerson"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码" prop="idCard">
                <el-input maxlength="18" placeholder="请输入身份证号码" clearable v-model="formData.idCard"/>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="radio">
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否中共党员" prop="isMemeber.key">
                  <el-radio v-model="formData.isMemeber.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isMemeber.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否“两代表一委员”" prop="isBehalfMember.key">
                  <el-radio v-model="formData.isBehalfMember.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isBehalfMember.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否兼任企业党组织书记" prop="isPartySecretary.key">
                  <el-radio v-model="formData.isPartySecretary.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isPartySecretary.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否参加各级非公工委组织的培训" prop="isCouncilTrain.key">
                  <el-radio v-model="formData.isCouncilTrain.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isCouncilTrain.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="关联党组织" prop="">
                <el-input maxlength="200" placeholder="请选择关联组织" clearable v-model="formData.orgId.data" @click.native="chooseOrg()"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <base-org-tree ref="chooseOrg" @refresh='setCheckedOrg'></base-org-tree>
    <b-map :mapVisible="mapVisible" @mapClose="mapClose"  ref="refmap"></b-map>
  </div>
</template>

<script>
import BMap from '@/components/BMap/BMap'
import VDistpicker from 'v-distpicker'
import commonReq  from "@/api/public/commonReq.js"
import Vue from "vue"
import {sociologySave,sociologyEdit,sociologyInfo} from "@/api/backstage/consulting/enterprise/sociology/sociology.js"
export default {
  name: "ManagementAdd",
  components: {
    BMap,
    VDistpicker,
    // SelectManagement
  },
  data() {
    return {
      visible:false,
      title:"新增",//标题
      mapVisible:false,
      businessAddres:false,
      registeredAddres:false,
      formData:{
        "brief": "",//	简介
        "businessAddres": "",//	经营地址
        "creditCode": "",//统一信用社代码
        "employNum": "",//从业人数
        "executiveName": "",//主管单位名称
        "idCard": "",//	身份证
        "isBehalfMember": {//	是否两代表一委员
          "data": "是",
          "key": '1'
        },
        "isBuildOrg": {//	是否建立党组织
          "data": "否",
          "key": '0'
        },
        "isBuildOrgOnly": {//	是否单独建立党组织
          "data": "否",
          "key": '0'
        },
        "isCouncilTrain": {//	是否参加非公委员会培训
          "data": "是",
          "key": '1'
        },
        "isDeputySecretary": {//	是否设专职副书记
          "data": "否",
          "key": '0'
        },
        "isExecutive": {//	是否有业务主管
          "data": "否",
          "key": '0'
        },
        "isInternet": {//	是否互联网企业
          "data": "否",
          "key": '0'
        },
        "isMemeber": {//	是否中共党员
          "data": "是",
          "key": '1'
        },
        "isPartySecretary": {//	是否兼任企业党支部书记
          "data": "是",
          "key": '1'
        },
        "isProdev": {//	是否省级以上开发区
          "data": "否",
          "key": '0'
        },
        "isUnion": {//	是否建立工会组织
          "data": "否",
          "key": '0'
        },
        "isYouthLeague": {//	是否建立共青团
          "data": "否",
          "key": '0'
        },
        "legalPerson": "",//	法人代表
        "name": "",//	社会组织名称
        "phone": "",//联系电话
        "registeredAddres": "",//	注册地址
        "secondExecutive": "",//	二级单位
        "taxScale": "",//	税收规模(万元)
        "orgId":{
          "data":"",
          "key":""
        }
      },
      entList:[{
        id:'0',
        name:"否"
      },{
        id:'1',
        name:"是"
      }],
      node:{
        "name":{
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        },
        "creditCode":{
          required: true,
          message: "请输入统一信用社代码",
          trigger: "change"
        },
        "employNum":{
          required: true,
          message: "请输入从业人数",
          trigger: "change"
        },
        "businessAddres":{
          required: true,
          message: "请输入机构地址",
          trigger: "change"
        },
        "legalPerson":{
          required: true,
          message: "请输入法人代表",
          trigger: "change"
        },
        "idCard":[{
          required: true,
          message: "请输入身份证号码",
          trigger: "blur"
        },{
            validator: (rule, value, callback)=>{this.verificationId(rule, value, callback)},
            trigger: 'blur'
        }],
        "isUnion.key":{
          required: true,
          message: "请选择是否建立工会组织",
          trigger: "change"
        },
        "isProdev.key":{
          required: true,
          message: "请选择是否位于省级以上开发区",
          trigger: "change"
        },
        "isBuildOrg.key":{
          required: true,
          message: "请选择是否建立党组织",
          trigger: "change"
        },
        "isBuildOrgOnly.key":{
          required: true,
          message: "请选择是否单独组建党组织",
          trigger: "change"
        },
        "isYouthLeague.key":{
          required: true,
          message: "请选择是否建立共青团组织",
          trigger: "change"
        },
        "isDeputySecretary.key":{
          required: true,
          message: "请选择是否专职副书记",
          trigger: "change"
        },
        "isMemeber.key":{
          required: true,
          message: "请选择是否中共党员",
          trigger: "change"
        },
        "isBehalfMember.key":{
          required: true,
          message: "请选择是否“两代表一委员”",
          trigger: "change"
        },
        "isPartySecretary.key":{
          required: true,
          message: "请选择是否兼任企业党组织书记",
          trigger: "change"
        },
        "isCouncilTrain.key":{
          required: true,
          message: "请选择是否参加各级非公工委组织的培训",
          trigger: "change"
        },
      },
      options:[]
    }
  },
  mounted() {
    // this.getTerm()
  },
  computed: {

  },
  methods: {
    close(){
      this.formData={
        "brief": "",//	简介
        "businessAddres": "",//	经营地址
        "creditCode": "",//统一信用社代码
        "employNum": "",//从业人数
        "executiveName": "",//主管单位名称
        "idCard": "",//	身份证
        "isBehalfMember": {//	是否两代表一委员
          "data": "是",
          "key": '1'
        },
        "isBuildOrg": {//	是否建立党组织
          "data": "否",
          "key": '0'
        },
        "isBuildOrgOnly": {//	是否单独建立党组织
          "data": "否",
          "key": '0'
        },
        "isCouncilTrain": {//	是否参加非公委员会培训
          "data": "是",
          "key": '1'
        },
        "isDeputySecretary": {//	是否设专职副书记
          "data": "否",
          "key": '0'
        },
        "isExecutive": {//	是否有业务主管
          "data": "否",
          "key": '0'
        },
        "isInternet": {//	是否互联网企业
          "data": "否",
          "key": '0'
        },
        "isMemeber": {//	是否中共党员
          "data": "是",
          "key": '1'
        },
        "isPartySecretary": {//	是否兼任企业党支部书记
          "data": "是",
          "key": '1'
        },
        "isProdev": {//	是否省级以上开发区
          "data": "否",
          "key": '0'
        },
        "isUnion": {//	是否建立工会组织
          "data": "否",
          "key": '0'
        },
        "isYouthLeague": {//	是否建立共青团
          "data": "否",
          "key": '0'
        },
        "legalPerson": "",//	法人代表
        "name": "",//	社会组织名称
        "phone": "",//联系电话
        "registeredAddres": "",//	注册地址
        "secondExecutive": "",//	二级单位
        "taxScale": "",//	税收规模(万元)
        "orgId":{
          "data":"",
          "key":""
        }
      }
      this.visible=false;
    },
    show(t,row){
      this.visible=true;
      if(t == 1){
        this.title = "新增";
      }else{
        this.title = "编辑";
        this.getInfo(row.id)
      }
    },
    getInfo(id){
      let params = {
        id:id
      }
      sociologyInfo(params).then(response =>{
        this.formData = response
        this.formData.phone = response.phone
      })
    },
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          let params = this.formData
          if(this.title == "新增"){
            sociologySave(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }else{
            sociologyEdit(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }
        }
      })
    },
    chooseOrg(){
      this.$refs.chooseOrg.show();
    },
    setCheckedOrg(data){
      this.formData.orgId = data;
    },
    // 关闭地图事件
    mapClose(data) {
      this.mapVisible = false
      if(data){
        this.formData.businessAddres = data.address;
      }
    },
    // 打开地图
    toMap(type){
      this.mapVisible = true;
      // this.$refs.refmap.setPosition(this.formData);
    },
    // 身份证号验证
    verificationId(rule, value, callback){
        if(value){
            let params = {
                opt: "idcode",
                value: value
            }
            commonReq.verificationIdCard(params).then(response =>{
                if (response.code == 2) {
                    callback(new Error("请输入正确的身份证号"))
                } else {
                    callback();
                }
            })
        }else {
            callback(new Error("请输入身份证号码"))
        }
    }
  }
}
</script>

<style scoped>
  .management-add >>> .el-dialog{
    width: 920px;
  }
  .management-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .management-add >>> .el-select{
    width: 100%;
  }
  .radio >>> .el-form-item__content{
    margin-left: 300px !important;
    text-align: right;
  }
  .radio >>> .el-form-item__label{
    width: 300px !important;
  }
  .radio >>> .el-form-item{
    margin-bottom: 0;
  }
  .title{
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    color: #666666;
    border-bottom: 1px solid #F3F3F3;
    font-weight: Bold;
  }
  .information{
    padding:20px;
    padding-left: 0;
  }
  .management-add >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
    color: black;
  }
  .director >>> .el-form-item__label{
    width: 90px!important;
    line-height: 20px;
    margin-left: 50px;
  }
</style>

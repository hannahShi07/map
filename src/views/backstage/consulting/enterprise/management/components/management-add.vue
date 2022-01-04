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
        <div class="title">企业基本信息</div>
        <div class="information">
          <el-row>
            <el-col :span="24" class="enterprise-name">
              <el-form-item label="企业名称" prop="name">
                <el-input maxlength="100" clearable v-model="formData.name" placeholder="请输入企业名称" @input="selectEnterprise" @blur="closeResult" @focus="result=true"/>
                <!-- <el-select
                  v-model="formData.name"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  @change.native="selectEnterprise"
                  @blur="selectBlur"
                  @visible-change="enterpriseinfor"
                  placeholder="请输入企业名称"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select> -->
              </el-form-item>
              <div class="search-result" v-if="result">
                <ul>
                  <li v-for="item in options" :key="item.id" @mousedown="enterpriseinfor(item.name)">{{item.name}}</li>
                  <li class="nodata" v-if="options.length<1">暂无数据</li>
                </ul>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="注册地址" prop="registeredAddres">
                <el-input maxlength="100" placeholder="请输入注册地址" clearable v-model="formData.registeredAddres"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="经营地址" prop="businessAddres">
                <!-- <el-input maxlength="200" clearable v-model="formData.businessAddres"/> -->
                <el-input placeholder="请输入经营地址" style="width: calc(100% - 40px)" maxlength="100" clearable v-model="formData.businessAddres"/>
                <img class="ml-10 pointer" src="@/assets/page/icon-map.png" width="23" height="21" alt="" @click="toMap">
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业类型" prop="type.key">
                <!-- <el-input maxlength="200" clearable v-model="formData.type.key"/> -->
                <el-select v-model="formData.type.key" placeholder="请选择企业类型" :editable="false" clearable>
                  <el-option
                    v-for="item in entList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业状态" prop="state.key">
                <el-select v-model="formData.state.key" placeholder="请选择企业状态" :editable="false" clearable>
                  <el-option
                    v-for="item in entStateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="从业人数" prop="employNum">
                <el-input maxlength="5" @blur="formData.employNum = $event.target.value" oninput="value=value.replace(/\D/gi,'')" clearable placeholder="请输入从业人数" v-model="formData.employNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统一信用社代码" prop="creditCode">
                <el-input maxlength="100" clearable placeholder="请输入统一信用社代码" v-model="formData.creditCode"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="税收规模" prop="taxScale">
                <el-input maxlength="13" clearable placeholder="请输入税收规模" @blur="formData.taxScale = $event.target.value" v-model="formData.taxScale" oninput="value=value.replace(/[^\d.]/g,'');if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')<0){ if(value.length>9){ value =value.slice(0,value.length-1) } } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3);}">
                  <i slot="suffix">万以上</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理员姓名" prop="adminName">
                <el-input maxlength="100" clearable placeholder="请输入管理员姓名" v-model="formData.adminName"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <base-telephone v-model="formData.phone" :phone="'phone'" :isImport="true"></base-telephone>
            </el-col>
          </el-row>
          <div class="radio">
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否位于省级以上开发区" prop="isProdev.key">
                  <el-radio v-model="formData.isProdev.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isProdev.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否规模以上企业" prop="isScale.key">
                  <el-radio v-model="formData.isScale.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isScale.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否建立党组织" prop="isBuildOrg.key">
                  <el-radio v-model="formData.isBuildOrg.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isBuildOrg.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否单独组建党组织" prop="isBuildOrgOnly.key">
                  <el-radio v-model="formData.isBuildOrgOnly.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isBuildOrgOnly.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否建立共青团组织" prop="isYouthLeague.key">
                  <el-radio v-model="formData.isYouthLeague.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isYouthLeague.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否设专职副书记" prop="isDeputySecretary.key">
                  <el-radio v-model="formData.isDeputySecretary.key" label="1">是</el-radio>
                  <el-radio v-model="formData.isDeputySecretary.key" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
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
                <div class="org" @mouseover="clearOrg" @mouseout="clear=false" @click="chooseOrg()">
                  {{formData.orgId.data}}
                  <div class="el-icon-circle-close" v-show="clear" @click.stop="clearOrgdata"></div>
                </div>
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
import {enterpriseSave,enterpriseInfo,enterpriseEdit,enterpriseSelect,enterpriseInformation} from "@/api/backstage/consulting/enterprise/management/management.js"
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
      clear:false,
      result:false,//企业搜索结果
      formData:{
        "adminName": "",//	管理员姓名
        "businessAddres": "",//	经营地址
        "creditCode": "",//	统一信用社代码
        "employNum": "",//	从业人数
        "idCard": "",//	身份证
        "isBehalfMember": {//	是否两代表一委员
          "data": "否",
          "key": '0'
        },
        "isBuildOrg": {//	是否建立党组织
          "data": "是",
          "key": '1'
        },
        "isBuildOrgOnly": {//	是否单独建立党组织
          "data": "是",
          "key": '1'
        },
        "isCouncilTrain": {//	是否参加非公委员会培训
          "data": "否",
          "key": '0'
        },
        "isDeputySecretary": {//是否设专职副书记
          "data": "是",
          "key": '1'
        },
        "isMemeber": {//	是否中共党员
          "data": "否",
          "key": '0'
        },
        "isPartySecretary": {//	是否兼任企业党组织书记
          "data": "否",
          "key": '0'
        },
        "isProdev": {//	是否省级以上开发区
          "data": "是",
          "key": '1'
        },
        "isScale": {//	是否规模以上企业
          "data": "是",
          "key": '1'
        },
        "isYouthLeague": {//	是否建立共青团
          "data": "是",
          "key": '1'
        },
        "legalPerson": "",//	法人代表
        "name": "",//	企业名称
        "phone": "",//	联系电话
        "registeredAddres": "",//	注册地址
        "taxScale": "",//	税收规模(万元)
        "type": {//	企业类型
          "data": "",
          "key": ''
        },
        "state":{// 企业状态
          "data":"",
          "key":""
        },
        "orgId": {
          "data": "",
          "key": ""
        }
      },
      entList:[],
      entStateList:[],
      node:{
        "name":{
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        },
        "registeredAddres":{
          required: true,
          message: "请输入注册地址",
          trigger: "blur"
        },
        "type.key":{
          required: true,
          message: "请选择企业类型",
          trigger: "change"
        },
        "state.key":{
          required: true,
          message: "请选择企业状态",
          trigger: "change"
        },
        "employNum":{
          required: true,
          message: "请输入从业人数",
          trigger: "change"
        },
        "creditCode":{
          required: true,
          message: "请输入统一信用社代码",
          trigger: "change"
        },
        "adminName":{
          required: true,
          message: "请输入管理员姓名",
          trigger: "blur"
        },
        "legalPerson":{
          required: true,
          message: "请输入法定代表人",
          trigger: "blur"
        },
        "idCard":[{
          required: true,
          message: "请输入身份证号码",
          trigger: "blur"
        },{
            validator: (rule, value, callback)=>{this.verificationId(rule, value, callback)},
            trigger: 'blur'
        }],
        "isProdev.key":{
          required: true,
          message: "请选择是否位于省级以上开发区",
          trigger: "change"
        },
        "isScale.key":{
          required: true,
          message: "请选择是否规模以上企业",
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
    this.getTerm()
  },
  computed: {

  },
  methods: {
    close(){
      this.formData={
        "adminName": "",//	管理员姓名
        "businessAddres": "",//	经营地址
        "creditCode": "",//	统一信用社代码
        "employNum": "",//	从业人数
        "idCard": "",//	身份证
        "isBehalfMember": {//	是否两代表一委员
          "data": "否",
          "key": '0'
        },
        "isBuildOrg": {//	是否建立党组织
          "data": "是",
          "key": '1'
        },
        "isBuildOrgOnly": {//	是否单独建立党组织
          "data": "是",
          "key": '1'
        },
        "isCouncilTrain": {//	是否参加非公委员会培训
          "data": "否",
          "key": '0'
        },
        "isDeputySecretary": {//是否设专职副书记
          "data": "是",
          "key": '1'
        },
        "isMemeber": {//	是否中共党员
          "data": "否",
          "key": '0'
        },
        "isPartySecretary": {//	是否兼任企业党组织书记
          "data": "否",
          "key": '0'
        },
        "isProdev": {//	是否省级以上开发区
          "data": "是",
          "key": '1'
        },
        "isScale": {//	是否规模以上企业
          "data": "是",
          "key": '1'
        },
        "isYouthLeague": {//	是否建立共青团
          "data": "是",
          "key": '1'
        },
        "legalPerson": "",//	法人代表
        "name": "",//	企业名称
        "phone": "",//	联系电话
        "registeredAddres": "",//	注册地址
        "taxScale": "",//	税收规模(万元)
        "type": {//	企业类型
          "data": "",
          "key": ''
        },
        "state":{// 企业状态
          "data":"",
          "key":""
        },
        "orgId": {
          "data": "",
          "key": ""
        }
      }
      this.options=[]
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
      enterpriseInfo(params).then(response =>{
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
            enterpriseSave(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }else{
            enterpriseEdit(params).then(response => {
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
    toMap(){
      this.mapVisible = true;
      // this.$refs.refmap.setPosition(this.formData);
    },
    //获取企业类型
    getTerm(){
      let params = {
        types:["WORK_UNIT","ent_state"]
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.entList=response.WORK_UNIT;
        this.entStateList=response.ent_state;
      })
    },
    // 企业模糊搜索
    selectEnterprise(e){
      let params = {
        entName:this.formData.name,
        pageNo:1,
        pageSize:10
      }
      enterpriseSelect(params).then(response =>{
        if(response){
          this.options = response.list
        }else{
          this.options = []
        }
      })
    },
    selectBlur(e){
      Vue.set(this.formData,"name",e.target.value)
    },
    // 企业基本信息
    enterpriseinfor(name){
      this.formData.name = name;
      let params = {
        entName:this.formData.name
      }
      enterpriseInformation(params).then(response =>{
        if(response.creditCode){
          this.formData.creditCode = response.creditCode;
        }else{
          this.formData.creditCode = "";
        }
        if(response.legalName){
          this.formData.legalPerson = response.legalName;
        }else{
          this.formData.legalPerson = "";
        }
        if(response.entStatus){
          let state=response.entStatus.substring(0,2)
          for(let i=0;i<this.entStateList.length;i++){
            if(this.entStateList[i].name.indexOf(state) != -1){
              this.formData.state.key = this.entStateList[i].id
            }
          }
        }else{
          this.formData.state.key = ""
        }
      })
    },
    clearOrg(){
      if(this.formData.orgId.data!=""){
        this.clear = true;
      }
    },
    clearOrgdata(){
      this.formData.orgId.data = "";
      this.formData.orgId.key = "";
      this.clear = false;
    },
    closeResult(){
      let than=this;
      setTimeout(function(){
        than.result=false
      },100)
    },
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
  .enterprise-name{
    position: relative;
  }
  .search-result{
    width: calc(100% - 140px);
    position: absolute;
    left: 140px;
    top: 35px;
    background-color: #fff;
    z-index: 10;
    margin: 12px 0 5px 0;
    padding: 0;
    border: 1px solid #dfe4ed;
    border-radius: 4px;
  }
  .search-result ul{
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 274px;
    overflow: auto;
  }
  .search-result::before{
    content: "";
    background-color: white;
    width:10px;
    height: 10px;
    border: 1px solid #dfe4ed;
    border-right: none;
    border-bottom: none;
    position: absolute;
    top: -6px;
    left: 16px;
    z-index: 11;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); 	/* IE 9 */
    -moz-transform:rotate(45deg); 	/* Firefox */
    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
    -o-transform:rotate(45deg); 
  }
  .search-result li{
    width: 100%;
    padding: 10px 15px;
    line-height: 18px;
    height: auto;
    font-size: 14px;
    float: left;
    cursor: pointer;
  }
  .nodata{
    width: 100%;
    text-align: center;
    color: #666666;
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
  .org{
    width: 100%;
    min-height: 38px;
    border-radius: 3px;
    border: 1px solid #DCDFE6;
    float: right;
    padding: 9px 30px 9px 15px;
    line-height: 18px;
    float: left;
  }
  .org .el-icon-circle-close{
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -7px;
  }
  .management-add >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
    color: black;
  }
</style>

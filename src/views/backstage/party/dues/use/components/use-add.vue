<template>
  <div class="add-content">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传组织" prop="orgName">
              <el-input disabled v-model="orgName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="类型" prop="type">
              <el-select v-model="formData.type" filterable placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="使用日期" prop="useDate">
              <el-date-picker
                v-model="formData.useDate"
                type="date"
                clearable
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                @change="getUseMoney()">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="总金额" prop="totalAmount">
              <el-input v-model="formData.totalAmount" oninput="value=value.replace(/[^\d.]/g,'');if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')<0){ if(value.length>9){ value =value.slice(0,value.length-1) } } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3);}" placeholder="请输入" maxlength="100" clearable>
                <i slot="suffix">元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传附件" prop="upFile" class="smallHeight">
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
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {addUse,useInfo,useEdit,useMoney} from "@/api/backstage/party/dues/use/use.js"
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "UseAdd",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"新增",//标题
      orgName:"",
      orgId:"",
      formData:{
        id:"",
        type:"",
        secretaryName:"",
        totalAmount:"",
        useDate:"",
        rewardType:{
          data:""
        }
      },
      options: [],//组织
      node:{
        type:{
          required: true,
          message: "请选择类型",
          trigger: "blur"
        },
        useDate:{
          required: true,
          message: "请选择使用日期",
          trigger: "blur"
        },
        totalAmount:{
          required: true,
          message: "请输入总金额",
          trigger: "blur"
        },
      },
      available:0,//可用金额
      balance:0,//结余金额
      returnTotalMoney:0,//返还总金额
      totalAmount:0,//	使用总金额
      otherData:{
        bizId: '',
        bizType: "duseType",
        isSingle: false
      },
      action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
      messages:{},
      accept:".png,.jpg,.jpeg,.pdf,.txt,.doc,.docx,.xlsx"
    }
  },
  mounted() {
    this.getOrgType()
  },
  computed: {
    headers() {
      return {
        token: 'Bearer ' + db.get("TOKEN", ""),
        tenant: db.get("TENANT", "") || "",
        Authorization: `Basic ${Base64.encode(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`)}`,
        ContentType: `multipart/form-data`
      };
    }
  },
  methods: {
    // 成功回调
    associationCallback(val){
      let params = {
        id:this.formData.id,
        orgId:this.orgId,
        totalAmount:this.formData.totalAmount,
        type:this.formData.type,
        useDate:this.formData.useDate
      }
      if(val){
        if(this.title=="新增"){
          addUse(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }).finally(() => {

          });
        }else{
          useEdit(params).then(response => {
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
    //取消
    close(){
      this.formData = {
        id:"",
        type:"",
        secretaryName:"",
        totalAmount:"",
        useDate:"",
        rewardType:{
          data:""
        }
      }
      this.visible = false;
    },
    //保存
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          let params = {
            id:this.formData.id,
            orgId:this.orgId,
            totalAmount:this.formData.totalAmount,
            type:this.formData.type,
            useDate:this.formData.useDate
          }
          if(this.returnTotalMoney-this.totalAmount>=this.formData.totalAmount){
            this.$refs['fileRef'].submitFile(this.otherData.bizId,this.otherData.bizType);
          }else{
            this.$confirm('党费使用已超出返还金额是否继续添加？', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              this.$refs['fileRef'].submitFile(this.otherData.bizId,this.otherData.bizType);
              // if(this.title=="新增"){
              //   addUse(params).then(response => {
              //     this.$emit('refresh')
              //     this.$message(this.successTip())
              //     this.close();
              //   }).finally(() => {

              //   });
              // }else{
              //   useEdit(params).then(response => {
              //     this.$emit('refresh')
              //     this.$message(this.successTip())
              //     this.close();
              //   }).finally(() => {

              //   });
              // }
            }).catch(() => {

            })
          }
        }
      })
      // this.visible = false;
    },
    //展示
    show(t,row){
      switch(t){
        case 1:
          this.title="新增";
          this.getUser()
          this.partyUid()
          // this.formData={};
          // this.options=options;
          break;
        case 2:
          this.title="编辑";
          this.otherData.bizId = row.id
          this.formData.id = row.id
          this.getInfo(row.id);
          break;
      }
      this.visible=true;
    },
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        this.orgName=response.data.orgName;
        this.orgId=response.data.orgId;
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
    //组织类别
    getOrgType(){
      let params = {
        types:['dues_use_type']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.options=response.dues_use_type;
      })
    },
    // 获取详情
    getInfo(id){
      let params = {
        id:id
      }
      useInfo(params).then(response =>{
        // this.options=response.employ_type;
        this.orgName=response.orgId.data;
        this.orgId=response.orgId.key;
        this.formData.type=response.type.key;
        this.formData.totalAmount=response.totalAmount;
        this.formData.useDate=response.useDate;
        this.$refs.fileRef.init()
        this.getUseMoney();
      })
    },
    // 获取
    getUseMoney(){
      if(this.formData.useDate){
        let params = {
          useDate:this.formData.useDate,
          orgId:this.orgId,
          id:this.formData.id
        }
        useMoney(params).then(response =>{
          this.available=response.available;
          this.balance=response.balance;
          this.returnTotalMoney=response.returnTotalMoney;
          this.totalAmount=response.totalAmount;
        })
      }
    }
  }
}
</script>

<style scoped>
  .add-content >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .add-content >>> .el-dialog{
    width: 560px;
  }
  .add-content >>> .el-form-item__content{
    width: 400px;
  }
  .add-content >>> .el-input__inner{
    width: 400px;
  }
  .add-content >>> .el-upload>span{
    margin-left: -9px;
  }
  .smallHeight /deep/ .el-form-item__content{
    text-align: left !important;
    line-height: 20px !important;
  }
  .smallHeight /deep/ .upload-tip{
    width: calc(100% - 135px) !important;
    text-align: left !important;
    line-height: 20px !important;
    float: right;
  }
</style>

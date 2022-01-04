<template>
  <div class="sociology-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="120px">
        <div class="information">
          <div class="information-left">
            <el-row>
              <el-col :span="24">
                <el-form-item label="指导员姓名" prop="name">
                  <el-input maxlength="100" v-model="formData.name" placeholder="请输入指导员姓名" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="专职/兼职" prop="isFullTime">
                  <el-radio v-for="(list,index) in positionList" v-model="formData.isFullTime" :key="index" :label="list.id">{{list.name}}</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <base-telephone v-model="formData.phone" :phone="'phone'" :isImport="true"></base-telephone>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="身份证号" prop="idCode">
                  <el-input maxlength="100" clearable placeholder="请输入身份证号" v-model="formData.idCode"/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="information-right">
            <el-col :span="24" class="person">
                <div class='person-img'>
                  <div class="img-content">
                    <img class="iconperson" v-if="imageUrl==''" src="../../../../../../assets/page/icon-person.png">
                    <img class="personimg"  v-else :src="imageUrl">
                  </div>
                  <el-upload
                    ref="commitment"
                    :action="action"
                    :data="otherData"
                    :headers="headers"
                    :auto-upload="true"
                    :before-upload="beforeUpload"
                    :on-success="successFile"
                    :on-error="handleError"
                    :on-change="handleChange"
                    accept=".jpg,.jpeg,.png,.gif"
                  >
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </div>
                <span class="warning"><i>注：</i>请上传两寸照片比例的证件照</span>
            </el-col>
          </div>
          <div class="information-bottom">
            <el-row>
              <el-col :span="24">
                <el-form-item label="所属企业" prop="">
                  <el-input maxlength="200" clearable placeholder="请输入所属企业" v-model="formData.company"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="担任职务" prop="">
                  <el-input maxlength="200" clearable placeholder="请输入担任职务" v-model="formData.position"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="驻派等级" prop="stationGrade">
                  <el-select v-model="formData.stationGrade" placeholder="请选择" :editable="false" clearable style="width:100%;">
                    <el-option
                      v-for="item in stationList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="company">
                <el-form-item label="指导企业" class="import" prop="enterpriseId">
                  <base-page-button title="选择企业" imgType="add" @click.native="chooseEnterprise"/>
                  <div class="company-list" v-for="(list,index) in enterpriseList" :key="index">
                    {{list.companyName}}
                    <img class="del" src="../../../../../../assets/page/icon-del.png" @click="delEnterprise(index)" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="走访频率" prop="frequency" :rules="{ required: formData.frequencyTime, message: '请选择走访频率', trigger: 'change' }">
                  <el-select v-model="formData.frequency" placeholder="请选择" :editable="false" clearable>
                    <el-option
                      v-for="item in interviewList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-form-item style="display:inline-block;" prop="frequencyTime" :rules="{ required: formData.frequency, message: '请选择走访频率', trigger: 'change' }">
                    <el-select v-model="formData.frequencyTime" placeholder="请选择" :editable="false" clearable>
                      <el-option
                        v-for="item in option"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    次
                  </el-form-item>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="">
                  <el-input v-model="formData.remarks" :autosize="{minRows: 12, maxRows: 12}" placeholder="请输入备注" resize="none" type="textarea" maxlength="500" show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <instructor-search ref="refChoose" @refresh="getEnterprise" />
  </div>
</template>

<script>
import {getGuidanceInfo,guidanceSave,guidanceEdit} from "@/api/backstage/consulting/enterprise/instructor/instructor.js"
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
import InstructorSearch from './instructor-search'
export default {
  name: "InstructorAdd",
  components: {
    InstructorSearch
  },
  data() {
    return {
      visible:false,
      title:"新增",//标题
      formData:{
        "id":"",
        "company": "",//所属企业
        "enterpriseId": "",//指导企业id(多选企业)
        "frequency": "",//走访频率<字典表>
        "frequencyTime": "",//走访频次
        "idCode": "",//	身份证号码
        "isDelete": "",//	是否删除
        "isFullTime": "",//专职/兼职(字典表)
        "name": "",//	指导员姓名
        "orgCode": "",//	所属组织
        "phone": "",//	联系电话
        "position": "",//	担任职务
        "remarks": "",//备注
        "stationGrade": ""//	驻派等级<县级党建指导员/区级联络员>
      },
      node:{
        "name":{
          required: true,
          message: "请输入指导员姓名",
          trigger: "blur"
        },
        "isFullTime":{
          required: true,
          message: "请选择专职/兼职",
          trigger: "change"
        },
        "stationGrade":{
          required: true,
          message: "请选择驻派等级",
          trigger: "change"
        },
        "idCode":[{
          required: false,
        },{
            validator: (rule, value, callback)=>{this.verificationId(rule, value, callback)},
            trigger: 'change'
        }],
        "enterpriseId":{
          required: true,
          message: "请选择指导企业",
          trigger: "change"
        }
      },
      imageUrl:'',
      action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
      otherData:{
        bizId: '',
        bizType: "instructor",
        isSingle: false
      },
      stationList:[],
      positionList:[],
      interviewList:[],
      ids:[],
      option:[{
        id:"1",
        name:"1"
      },{
        id:"2",
        name:"2"
      },{
        id:"3",
        name:"3"
      },{
        id:"4",
        name:"4"
      }],
      enterpriseList:[],
      saveFile:false
    }
  },
  mounted() {
    this.getGrade()
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
    //文件上传成功时的钩子
    successFile(response, file, fileList){
      const res = file
      if(res.response.code=='0'){
        this.imageUrl=file.response.data.url;
        this.ids.push(res.response.data.id)
        this.saveFile=true;
        this.$message.success('上传成功')
      }else{
        this.imageUrl=''
        this.$message.error(res.response.msg)
      }
      this.$refs.commitment.clearFiles();
    },
    //覆盖上传
    handleChange(files, fileList){
      this.$refs['refForm'].clearValidate(['fileList']);
    },
    // 附件上传失败
    handleError(err, file, fileList) {
      this.$message.error("附件上传失败，请重试");
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      const isLtSize = file.size / 1024 / 1024 < 20;
      if (!isLtSize) {
        this.$message.error('上传附件大小不能超过 20MB!');
      }
      return isLtSize;
    },
    close(){
      this.formData={
        "id":"",
        "company": "",//所属企业
        "enterpriseId": "",//指导企业id(多选企业)
        "frequency": "",//走访频率<字典表>
        "frequencyTime": "",//走访频次
        "idCode": "",//	身份证号码
        "isDelete": "",//	是否删除
        "isFullTime": "",//专职/兼职(字典表)
        "name": "",//	指导员姓名
        "orgCode": "",//	所属组织
        "phone": "",//	联系电话
        "position": "",//	担任职务
        "remarks": "",//备注
        "stationGrade": ""//	驻派等级<县级党建指导员/区级联络员>
      }
      this.otherData={
        bizId: '',
        bizType: "instructor",
        isSingle: false
      }
      this.imageUrl=''
      this.enterpriseList=[]
      this.visible=false;
      this.ids=[]
      this.saveFile=false;
    },
    show(t,row){
      this.visible=true;
      if(t == 1){
        this.title="新增"
        for(let i=0;i<this.positionList.length;i++){
          if(this.positionList[i].name == "兼职"){
            this.formData.isFullTime = this.positionList[i].id
          }
        }
        this.partyUid()
      }else{
        this.title="编辑"
        this.getInfo(row.id)
      }
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
      }else{
        callback();
      }
    },
    save(){
      let arry = [];
      for(let i=0;i<this.enterpriseList.length;i++){
        arry.push(this.enterpriseList[i].companyId)
      }
      this.formData.enterpriseId=arry.join(",")
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          this.$refs['refForm'].clearValidate(['enterpriseId']);
          if(this.title == "新增"){
            let params = this.formData;
            if(this.saveFile){
              let datas = {
                "bizId": this.otherData.bizId,
                "bizType": this.otherData.bizType,
                "ids": this.ids
              }
              commonReq.relationFile(datas).then(response =>{

              }).catch(() =>{

              })
            }
            guidanceSave(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {

            });
          }else{
            let params = this.formData;
            if(this.saveFile){
              let datas = {
                "bizId": this.otherData.bizId,
                "bizType": this.otherData.bizType,
                "ids": this.ids
              }
              commonReq.relationFile(datas).then(response =>{

              }).catch(() =>{

              })
            }
            guidanceEdit(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {

            });
          }
        }
      })
    },
    //获取详情
    getInfo(id){
      let params = {
        id:id
      }
      this.loading = true;
      getGuidanceInfo(params).then(response => {
        this.formData = response;
        this.formData.isFullTime = this.formData.isFullTime.key;
        this.formData.frequency = this.formData.frequency.key;
        this.enterpriseList = this.formData.companyList;
        this.formData.stationGrade = this.formData.stationGrade.key;
        this.otherData.bizId = response.id;
        delete this.formData.companyList;
        this.getFile(response.id)
        this.loading = false;
      }).finally(() => {

      });
    },
    //获取头像
    getFile(id){
      let params={
        bizIds: id,
      }
      commonReq.getAttachment(params).then(response => {
        const res = response;
        if(res.length > 0 && res[0].list.length > 0){
          if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
            this.imageUrl = res[0].list[0].url
          }
        }
      }).finally(() =>{
        this.loading = false
      })
    },
    getGrade(){
      let params = {
        types:['station_grade','position_type',"interview_frequency"]
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.stationList=response.station_grade;
        this.positionList=response.position_type;
        this.interviewList=response.interview_frequency;
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
    //选择企业
    chooseEnterprise(){
      let list=[];
      for(let i=0;i<this.enterpriseList.length;i++){
        list.push({
          id:this.enterpriseList[i].companyId,
          name:this.enterpriseList[i].companyName
        })
      }
      this.$refs.refChoose.show(list);
    },
    //选择企业回调
    getEnterprise(list){
      this.enterpriseList=[];
      for(let i=0;i<list.length;i++){
        this.enterpriseList.push({
          companyId:list[i].id,
          companyName:list[i].name
        })
      }
      if(this.enterpriseList.length){
        this.$refs['refForm'].clearValidate(['enterpriseId']);
      }
    },
    // 删除企业
    delEnterprise(index){
      this.enterpriseList.splice(index,1)
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 902px;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .information{
    width: 100%;
    float: left;
  }
  .information-left,.information-right{
    float: left;
    width: 50%;
    height: 212px;
  }
  .information-bottom{
    float: left;
    width: 100%;
  }
  .information-left >>> .el-form-item__content{
    line-height: 34px;
  }
  .information-left >>> .el-form-item__label{
    line-height: 34px;
  }
  .information{
    padding:20px;
    padding-left: 0;
  }
  .warning{
    display: inline-block;
  }
  .person-img{
    margin-left: 53px;
  }
  .person >>> .el-upload .el-button--primary{
    padding: 10px 15px;
    width: 142px;
    background: #D6EBFF;
    border-color: #D6EBFF;
    color: #3399FF;
    font-size: 18px;
    margin-right: 0;
  }
  .company >>> .el-form-item{
    height: auto;
  }
  .company-list{
    height: 26px;
    border-radius: 4px;
    background-color: #F2F2F2;
    line-height: 26px;
    margin-top: 8px;
    padding:0 10px;
    position: relative;
  }
  .del{
    color: #000;
    position: absolute;
    top: 6px;
    right: 10px;
    height: 14px;
    width: 14px;
    cursor: pointer;
  }
  .img-content{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 142px;
    height: 156px;
    overflow:hidden;
    border:none;
  }
  .img-content .personimg{
    width:100%;
  }
  .import >>> .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
</style>

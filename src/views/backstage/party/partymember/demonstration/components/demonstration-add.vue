<template>
  <div class="add-content">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" label-width="100px" :rules="node">
        <el-row>
          <el-col :span="24">
            <el-form-item label="党员姓名" prop="memberId.data">
              <el-input v-model="formData.memberId.data" readonly show-overflow-tooltip @click.native="getTree" placeholder="请选择" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="岗位名称" prop="name">
              <el-input v-model="formData.name" show-overflow-tooltip clearable maxlength="100" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="岗位标牌" prop="sign">
              <el-input v-model="formData.sign" show-overflow-tooltip clearable maxlength="100" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="formData.companyName" show-overflow-tooltip clearable maxlength="100" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="职位" prop="position">
              <el-input v-model="formData.position" show-overflow-tooltip clearable maxlength="100" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="示范岗时间" show-word-limit class="import">
              <div class="month">
                <el-form-item class="month-left" label="" show-word-limit prop="stDate">
                  <el-date-picker
                    type="date"
                    v-model="formData.stDate"
                    value-format="yyyy-MM-dd"
                    @change="changeOffice"
                    :picker-options="officeOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <div class="month-content">—</div>
                <el-form-item class="month-right" label="" show-word-limit prop="enDate">
                  <el-date-picker
                    type="date"
                    v-model="formData.enDate"
                    value-format="yyyy-MM-dd"
                    @change="changeDeparture"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工作内容" prop="jobContent">
              <el-input type="textarea" v-model="formData.jobContent" show-overflow-tooltip show-word-limit resize="none" :autosize='{ minRows: 4, maxRows: 4 }' maxlength="500" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传图片" class="rel" >
              <base-file-upload
                :folio='true'
                list-type="picture-card"
                :acceptSize="20"
                :fileListExist.sync="formData.fileListExist"
                :accept="accept"
                :otherData="otherData"
                :isSpecify="true"
                :widthSize="widthSize"
                :heightSize="heightSize"
                ref="fileRef"
                @upFileList="upFileList"
              @associationCallback="associationCallback"/>
          </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
      <demonstration-tree ref="orgTree" @refresh="getOrg"/>
    </el-dialog>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import DemonstrationTree from './demonstration-tree'
  import {demonstrationSave,demonstrationEdit,infoDemonstration,getPartyMember} from "@/api/backstage/party/partymember/demonstration/demonstration.js"
  export default {
    name: "demonstrationAdd",
    components: {DemonstrationTree},
    data() {
      return {
        visible:false,
        loading:true,
        title:"",//标题
        otherData:{
          bizId:"",
          bizType:"demFile"
        },
        accept:".png,.jpg,.jpeg",
        formData:{
          "companyName": "",
          "enDate": "",
          "id": "",
          "jobContent": "",
          "memberId": {
            "data": "",
            "key": ""
          },
          "fileListExist":"",
          "name": "",
          "position": "",
          "sign": "",
          "stDate": "",
          // 新增图片
          'photo':'',
        },
        node:{
          "memberId.data":{
            required: true,
            message: "请选择党员",
            trigger: "change"
          },
          name:{
            required: true,
            message: "请输入岗位名称",
            trigger: "blur"
          },
          sign:{
            required: true,
            message: "请输入岗位标牌",
            trigger: "blur"
          },
          companyName:{
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          },
          position:{
            required: true,
            message: "请输入职位",
            trigger: "blur"
          },
          stDate:{
            required: true,
            message: "请选择示范岗开始时间",
            trigger: "change"
          },
          enDate:{
            required: true,
            message: "请选择示范岗结束时间",
            trigger: "change"
          },
          fileListExist:{
            required: true,
              message: '请上传图片',
              trigger: 'blur'
          }
        },
        tableData:[],
        pickerOptions:{},
        officeOptions:{},
        // 图片宽度限制
        widthSize: 278,
        // 图片高度限制
        heightSize: 366,
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      //取消
      close(){
        this.formData={
          "companyName": "",
          "enDate": "",
          "id": "",
          "jobContent": "",
          "memberId": {
            "data": "",
            "key": ""
          },
          "name": "",
          "position": "",
          "sign": "",
          "stDate": "",
          'photo': ""
        }
        this.tableData = []
        this.otherData={
          bizId:"",
          bizType:"demFile"
        }
        this.pickerOptions={}
        this.officeOptions={}
        this.visible = false;
      },
      //展示
      show(t,row){
        if(t==1){
          this.title="新增";
          this.partyUid();
        }else{
          this.title="编辑";
          this.getDetail(row.id)
        }
        this.visible=true;
      },
      //获取详情
      getDetail(id){
        this.tableData=[]
        let params={
          id:id
        }
        infoDemonstration(params).then(response => {
          this.formData = response;
          this.tableData.push({
            memberId:response.memberId.key,
            memberName:response.memberId.data
          })
          this.otherData.bizId = response.id;
          this.$refs.fileRef.init()
          this.changeOffice()
          this.changeDeparture()
        })
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
      //返回数据
      upFileList(val){
        if(val && val.code==0 && val.data){
          if(val.data.bizType=='demFile'){
            this.formData.photo=val.data.id
          }
        }
      },
      // 成功回调
      associationCallback(val){
        let params = this.formData
        if(val){
          if(this.title=="新增"){
            demonstrationSave(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }else{
            demonstrationEdit(params).then(response => {
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
      // 展示组织树
      getTree(){
        this.$refs['orgTree'].show(this.tableData,this.formData.id)
      },
      //党小组人员
      getOrg(list){
        this.tableData = list;
        this.formData.memberId.data = list[0].memberName;
        this.formData.memberId.key = list[0].memberId;
        this.formData.name = list[0].name;
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;
        })
      },
      // 设置离职日期限制
      changeOffice(){
        let officeDate = this.formData.stDate
        this.pickerOptions={
          disabledDate(time) {
            if(officeDate){
              if (new Date(officeDate).getTime() > time.getTime()) {
                return true
              }
            }
            return false
          }
        }
      },
      // 设置任职日期限制
      changeDeparture(){
        let departureDate = this.formData.enDate
        this.officeOptions={
          disabledDate(time) {
            if(departureDate){
              if (new Date(departureDate).getTime() < time.getTime()) {
                return true
              }
            }
            return false
          }
        }
      }
    }
  }
</script>

<style scoped>
  .add-content >>> .el-dialog{
    width: 700px;
  }
  .month >>> .el-form-item{
    width: 190px;
  }
  .month-left{
    float: left;
  }
  .month-content{
    float: left;
    width: calc(100% - 380px);
    text-align: center;
  }
  .month-right{
    float: right;
  }
  .rel >>> .txt{
    color: #CCCCCC;
  }
  .import >>> .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
</style>

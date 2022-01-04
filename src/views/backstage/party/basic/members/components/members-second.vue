<template>
  <div class="members-second">
    <el-dialog
      :title="title"
      :visible.sync="visibleAdd"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visibleAdd"
      v-cloak>
      <el-form ref="refForm" :model="formData" :rules="node" class="information">
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择成员" prop="memberId.data">
              <el-input v-model="formData.memberId.data" placeholder="请选择成员" :clearable="false" readonly @click.native="choosePersn" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="党内职务" prop="position.key">
              <el-select v-model="formData.position.key" placeholder="请选择" :editable="false" :clearable="false" @change="getPositionId">
                <el-option
                  v-for="item in positionList"
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
            <el-form-item label="任职日期" prop="officeDate">
              <el-date-picker
                v-model="formData.officeDate"
                type="date"
                clearable
                placeholder="请选择"
                :editable="false"
                :clearable="false"
                @change="changeOffice"
                :picker-options="officeOptions"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="离职日期">
              <el-date-picker
                v-model="formData.departureDate"
                type="date"
                clearable
                placeholder="请选择"
                :editable="false"
                :clearable="false"
                @change="changeDeparture"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="职务描述" prop="electionWay">
              <el-input style="width:calc(100% - 107px);" v-model="formData.positionDescribe" :autosize="{minRows: 12, maxRows: 12}" type="textarea" maxlength="500" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <!--党小组选中人员-->
    <select-member ref="refChoose" @refresh="getPerson" :isSingle="true"/>
  </div>
</template>

<script>
  import {addLeadership} from "@/api/backstage/party/class/members/members.js"
  import commonReq from "@/api/public/commonReq";
  import SelectMember from './select-member'
  export default {
    name: "MembersSecond",
    components: {
      SelectMember
    },
    data() {
      return {
        visibleAdd:false,
        title:"新增",
        pageNum:1,
        pageSize:10,
        total:0,
        loading:false,
        formData:{
          id:'',
          electionId:"",//	换届选举id
          memberId:{//	党员id
            data:"",
            key:""
          },
          officeDate:"",//	任职日期
          departureDate:"",//	离职日期
          phone:"",//联系电话
          orgId:{//	组织id
            data:"",
            key:""
          },
          position:{//	党内职务
            data:"",
            key:""
          },
          positionDescribe:"",//	职务描述
        },
        positionList:[],
        tableData:[],
        node:{
          "memberId.data":{
            required: true,
            message: "请选择成员",
            trigger: "blur"
          },
          "position.key":{
            required: true,
            message: "请选择党内职务",
            trigger: "change"
          },
          officeDate:{
            required: true,
            message: "请选择任职时间",
            trigger: "blur"
          },
        },
        memberIds:[],// 班子成员
        parentRecords: [],
        pickerOptions:{},
        officeOptions:{}
      }
    },
    mounted() {
      this.getTerm();
    },
    computed: {

    },
    methods: {
      //党内职务
      getTerm(){
        let params = {
          types:['party_posts']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.positionList=response.party_posts;
        })
      },
      close(){
        this.tableData = [];
        this.memberIds = [];
        this.visibleAdd = false;
        this.formData = {
          electionId:"",//	换届选举id
          memberId:{//	党员id
            data:"",
            key:""
          },
          officeDate:"",//	任职日期
          departureDate:"",//	离职日期
          phone:"",//联系电话
          orgId:{//	组织id
            data:"",
            key:""
          },
          position:{//	党内职务
            data:"",
            key:""
          },
          positionDescribe:"",//	职务描述
        }
        this.pickerOptions={}
        this.officeOptions={}
      },
      show(id,orgId,orgName, records){
        this.visibleAdd = true;
        this.formData.electionId = id;
        this.formData.orgId.data = orgName;
        this.formData.orgId.key = orgId;
        this.parentRecords = records;
        for(let i=0;i<this.parentRecords.length;i++){
          this.memberIds.push(this.parentRecords[i].memberId.key)
        }
      },
      save(){
          this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            return ;// 表单必填项判断
          }else{
            let opt = true;
            this.parentRecords.forEach(obj =>{
              if(obj.position.key === '1249238204800827392' && this.formData.position.key === '1249238204800827392'){
                this.$message("每届换届选举只能有一位书记");
                opt = false;
                return false;
              }
            })
            if(opt){
              let params = this.formData
              addLeadership(params).then(response => {
                this.$message(this.successTip())
                this.formData.id = response.id;
                const formData = this.formData
                this.$emit('refresh',formData)
                this.close();
              }).finally(() => {

              });
            }
          }
        })
      },
      //党小组 - 选择人员
      choosePersn(){
        this.$refs.refChoose.show(this.formData.electionId,this.formData.orgId,this.tableData,this.memberIds);
      },
      //党小组人员
      getPerson(list){
        this.tableData = list;
        this.formData.memberId.data = list[0].name;
        this.formData.memberId.key = list[0].id;
        this.formData.phone = list[0].phone;
        this.$refs['refForm'].clearValidate(['memberId.data']);
      },
      getPositionId(value){
        for(let i=0;i<this.positionList.length;i++){
          if(value == this.positionList[i].id){
            this.formData.position.data = this.positionList[i].name
          }
        }
      },
      // 设置离职日期限制
      changeOffice(){
        let officeDate = this.formData.officeDate
        this.pickerOptions={
          disabledDate(time) {
            if (new Date(officeDate).getTime() > time.getTime()) {
              return true
            }
            return false
          }
        }
      },
      // 设置任职日期限制
      changeDeparture(){
        let departureDate = this.formData.departureDate
        this.officeOptions={
          disabledDate(time) {
            if (new Date(departureDate).getTime() < time.getTime()) {
              return true
            }
            return false
          }
        }
      }
    }
  }
</script>

<style scoped>
  .members-second >>> .el-dialog{
    width: 887px;
  }
  .members-second >>> .el-input{
    width: 300px;
  }
  .information{
    padding-left:34px;
    padding-bottom: 10px;
  }
  .fl{
    padding: 20px 0;
  }
  .member{
    margin-top: 3px;
    width: 300px;
    height: 36px;
    float: left;
    border:1px solid rgb(220, 223, 230);
    border-radius: 3px;
    padding: 0 30px;
    padding-left: 15px;
    line-height: 34px;
  }
  .members-second >>> .el-textarea .el-textarea__inner{
    resize: none;
  }
  .members-second >>> .information{
    padding-bottom: 0;
  }
  .members-second >>> .el-dialog__body{
    padding-bottom: 0;
  }
  .members-second >>> .el-dialog__footer{
    padding-top: 0;
  }
  .members-second >>> .el-form-item__error{
    left: 80px;
  }
</style>

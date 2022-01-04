<template>
  <div class="administrators-add">
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
            <el-form-item label="站点管理员" prop="manager">
              <el-input v-model="formData.manager" maxlength="100" clearable/>
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
            <el-form-item label="身份证号码" prop="idCode">
              <el-input v-model="formData.idCode" maxlength="18" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="学历" prop="education">
              <el-select v-model="formData.education" filterable placeholder="请选择" clearable>
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
            <el-form-item label="任职日期" class="import">
              <el-form-item style="width:auto;display:inline-block;" prop="appointmentStart">
                <el-date-picker
                  v-model="formData.appointmentStart"
                  type="date"
                  placeholder="选择任职开始日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="changeStart"
                  :picker-options="startOptions">
                </el-date-picker>
              </el-form-item>
              —
              <el-form-item style="width:auto;display:inline-block;" prop="appointmentEnd">
                <el-date-picker
                  v-model="formData.appointmentEnd"
                  type="date"
                  placeholder="选择任职结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="changeEnd"
                  :picker-options="endOptions"
                  :prop="'appointmentEnd'"
                  :rules="{required: true, message: '请选择',trigger: 'blur'}">
                </el-date-picker>
              </el-form-item>
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
import {findSave,getAdmInfo,admEdit} from "@/api/backstage/education/administrators/administrators.js"
import commonReq  from "@/api/public/commonReq.js"
import Vue from "vue"
export default {
  name: "AdministratorsAdd",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"",//标题
      formData:{
        "appointmentEnd": "",//任职结束日期
        "appointmentStart": "",//		任职开始日期
        "education": "",//	学历(数据字典查询)
        "idCode": "",//	身份证号码
        "manager":"",//管理员名称
        "phone": "",//联系方式
      },
      options: [],//学历
      manager: [],//管理员名称
      node:{
        manager:{
          required: true,
          message: "请输入站点管理员",
          trigger: "blur"
        },
        phone:{
          required: true,
          message: "请输入联系方式",
          trigger: "blur"
        },
        idCode:[{
          required: true,
          message: "请输入身份证号码",
          trigger: "blur"
        },{
            validator: (rule, value, callback)=>{this.verificationId(rule, value, callback)},
            trigger: 'blur'
        }],
        education:{
          required: true,
          message: "请选择学历",
          trigger: "blur"
        },
        appointmentStart:{
          required: true,
          message: "请选择任职开始日期",
          trigger: "blur"
        },
        appointmentEnd:{
          required: true,
          message: "请选择任职结束日期",
          trigger: "blur"
        }
      },
      startOptions:{},
      endOptions:{}
    }
  },
  mounted() {
    this.getEducation();
  },
  computed: {

  },
  methods: {
    //取消
    close(){
      this.formData = {
        "appointmentEnd": "",//任职结束日期
        "appointmentStart": "",//		任职开始日期
        "education": "",//	学历(数据字典查询)
        "idCode": "",//	身份证号码
        "manager":"",//管理员名称
        "phone": "",//联系方式
      }
      this.startOptions = {}
      this.endOptions = {}
      this.visible = false;
    },
    // 保存
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          let params = this.formData;
          this.loading = true;
          if(this.title == "新增"){
            findSave(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {
              this.loading = false;
            });
          }else{
            admEdit(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {
              this.loading = false;
            });
          }
        }
      })
    },
    //展示
    show(t,row){
      if(t == 1){
        this.title = "新增"
      }else{
        this.title = "编辑"
        this.getInfo(row.id)
      }
      this.visible=true;
    },
    // 获取学历
    getEducation(){
      let params = {
        types:['EDUCATION']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.options=response.EDUCATION;
      })
    },
    // 设置离职日期限制
    changeStart(){
      let appointmentStart = this.formData.appointmentStart
      this.endOptions={
        disabledDate(time) {
          if (new Date(appointmentStart).getTime() > time.getTime()) {
            return true
          }
          return false
        }
      }
    },
    // 设置任职日期限制
    changeEnd(){
      let appointmentEnd = this.formData.appointmentEnd
      this.startOptions={
        disabledDate(time) {
          if (new Date(appointmentEnd).getTime() < time.getTime()) {
            return true
          }
          return false
        }
      }
    },
    // 获取详情
    getInfo(id){
      let params = {
        id:id
      }
      getAdmInfo(params).then(response => {
        this.formData = response
        this.formData.id = id
        this.changeStart();
        this.changeEnd();
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    // 身份证号验证
    verificationId(rule, value, callback){
      let params = {
        opt: "idcode",
        value: this.formData.idCode
      }
      commonReq.verificationIdCard(params).then(response =>{
        // console.log(response)
        if (response.code == 2) {
          callback(new Error("请输入正确的身份证号"))
        } else {
          callback();
        }
      })
    }
  }
}
</script>

<style scoped>
  .administrators-add >>> .el-dialog{
    width: 573px;
  }
  .administrators-add >>> .el-input__inner{
    width: 403px;
  }
  .administrators-add >>> .el-date-editor{
    width: 190px;
  }
  .administrators-add >>> .el-form-item{
    width: 505px;
  }
  .administrators-add >>> .el-date-editor .el-input__inner{
    width: 100%;
  }
  .import >>> .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
</style>

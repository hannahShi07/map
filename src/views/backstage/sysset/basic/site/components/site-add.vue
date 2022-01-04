<template>
  <div class="site-add">
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
            <el-form-item label="站点名称" prop="name">
              <el-input v-model="formData.name" maxlength="200" placeholder="请输入站点名称" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="站点面积" prop="area">
              <el-input v-model="formData.area" maxlength="100" placeholder="请输入站点面积" clearable oninput="if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}">
                <i slot="suffix">平米</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点管理员" prop="managerId">
              <el-select v-model="formData.managerId" filterable placeholder="请选择站点管理员" clearable @change="changeManager">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.manager"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="站点地址" prop="address">
              <el-input v-model="formData.address" placeholder="请输入站点地址" clearable maxlength="200"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建立日期" prop="buildDate">
              <el-date-picker
                v-model="formData.buildDate"
                type="date"
                placeholder="选择建立日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="changeBuild">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="教育设备" prop="equipment">
              <el-input v-model="formData.equipment" resize="none" placeholder="请输入教育设备" type="textarea" maxlength="500" :autosize="{minRows: 10, maxRows: 10}" show-word-limit/>
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
import {siteSave,findAssume,getSiteInfo,siteEdit} from "@/api/backstage/education/site/site.js"
export default {
  name: "SiteAdd",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"新增",//标题
      formData:{
        "address": "",//地址
        "area": "",//	面积
        "buildDate": "",//	建立日期
        "equipment": "",//	教育设备
        "managerName":"",//站点管理员
        "managerId": "",//站点管理员id
        "name": ""//站点名称
      },
      options:[],
      node:{
        name:{
          required: true,
          message: "请输入名称",
          trigger: "blur"
        },
        managerId:{
          required: true,
          message: "请选择站点管理员",
          trigger: "blur"
        },
        address:{
          required: true,
          message: "请输入站点地址",
          trigger: "blur"
        },
        buildDate:{
          required: true,
          message: "请选择建立日期",
          trigger: "blur"
        },
        equipment:{
          required: true,
          message: "请输入教育设备",
          trigger: "blur"
        },
      }
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
        "address": "",//地址
        "area": "",//	面积
        "buildDate": "",//	建立日期
        "equipment": "",//	教育设备
        "managerName":"",//站点管理员
        "managerId": "",//站点管理员id
        "name": ""//站点名称
      }
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
            siteSave(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {
              this.loading = false;
            });
          }else{
            siteEdit(params).then(response => {
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
    changeBuild(){
      let params = {
        buildDate:this.formData.buildDate
      }
      findAssume(params).then(response =>{
        this.options=response;
        let change=true;
        for(let i=0;i<this.options.length;i++){
          if(this.options[i].id == this.formData.managerId){
            change=false;
          }
        }
        if(change){
          this.formData.managerId = ""
        }
      })
    },
    // 获取管理员
    getEducation(){
      let params = {
        buildDate:this.formData.buildDate
      }
      findAssume(params).then(response =>{
        this.options=response;
      })
    },
    getInfo(id){
      let params = {
        id:id
      }
      getSiteInfo(params).then(response => {
        this.formData = response
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    changeManager(){
      for(let i=0;i<this.options.length;i++){
        if(this.formData.managerId == this.options[i].id){
          this.formData.managerName = this.options[i].manager;
        }
        if(this.formData.managerId == ""){
          this.formData.managerName = "";
        }
      }
    }
  },
  watch:{
    visible(val){
      if(val){
        this.changeBuild();
      }
    }
  }
}
</script>

<style scoped>
  .site-add >>> .el-dialog{
    width: 1078px;
  }
  .site-add >>> .el-select{
    width: 100%;
  }
  .site-add >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .site-add >>> .el-dialog__body{
    padding-right: 40px;
  }
</style>

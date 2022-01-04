<template>
  <div class="introduce">
    <el-form ref="refForm" label-width="100px" :model="formData" :rules="node">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="name">
            <el-input v-model="formData.name" show-overflow-tooltip placeholder="投资服务" maxlength="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容" prop="content">
            <base-tinymce-editor v-model="formData.content" placeholder="20000个字符以内"></base-tinymce-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发布日期" prop="pubdate">
            <el-date-picker
              class="date"
              type="date"
              v-model="formData.pubdate"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="save">发布</el-button>
    </div>
  </div>
</template>

<script>
  import {gatewaySave,gatewayEdit,gatewaySearch} from "@/api/backstage/sysset/administration/gateway/gateway.js"
  export default {
    components: {},
    data () {
      return {
        title:"新增",
        formData:{
          name:"",
          content:"",
          pubdate:"",
        },
        type:"2412585934552533521",//投资服务
        node:{
          name:{
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          content:{
            required: true,
            message: "请输入内容",
            trigger: "blur"
          },
          pubdate:{
            required: true,
            message: "请选择发布日期",
            trigger: "blur"
          }
        },
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      save(){
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            return ;// 表单必填项判断
          }else{
            if(this.title=="新增"){
              let params = {
                name:this.formData.name,
                content:this.formData.content,
                pubdate:this.formData.pubdate,
                type:this.type,//园区风采
              };
              gatewaySave(params).then(response => {
                this.$message(this.successTip())
                this.getDetail()
              }).finally(() => {

              });
            }else{
              let params = {
                id:this.formData.id,
                name:this.formData.name,
                content:this.formData.content,
                pubdate:this.formData.pubdate,
                type:this.type,//园区风采
              };
              gatewayEdit(params).then(response => {
                this.$message(this.successTip())
                this.getDetail()
              }).finally(() => {

              });
            }
          }
        })
      },
      //获取详情
      getDetail(){
        let params={
          type:this.type
        }
        gatewaySearch(params).then(response => {
          if(response){
            this.title = "编辑"
            this.formData = response
          }else{
            this.formData.pubdate = new Date().getFullYear() + "-" + (new Date().getMonth()+1<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1) + "-" + (new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate())
          }
        })
      },
    }
  }
</script>

<style scoped>
.introduce{
  width: 100%;
  height: calc(100vh - 155px);
  background-color: #fff;
  padding: 40px 80px 40px 40px;
  overflow: auto;
}
.date >>> .el-input__inner{
  width: 280px
}
</style>

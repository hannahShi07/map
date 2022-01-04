<template>
  <el-dialog
    :title="title"
    width = '900px'
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
    v-if="visible"
    v-cloak>
    <el-form ref="refForm" :model="formData" label-width="80px" :rules="node">
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容展示" prop="parkContent">
            <base-tinymce-editor v-model="formData.parkContent" placeholder="500个字符以内，此处禁止粘贴图片，图片不会被保存" :isImage="isImage"></base-tinymce-editor>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>

</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {getpageAdd,getpageEdit,getpageDetail} from "@/api/backstage/sysset/bigscreen/homepage/introduction/introduction.js"
export default {
  name: "instroduction-add",
  data() {
    return {
      visible:false,
      loading:false,
      isImage:'1',
      title:"",
      formData:{
        parkContent:"",
      },
      node:{
        parkContent:[
          {
            required: true,
            validator: this.checkChina,
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    // 字数判断
    checkChina(rule,value,callback){
      //let reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/i
      let reg =/<img[^>]*>/gi
      let val= this.formData.parkContent
      this.formData.parkContent = val.replace(reg, ' ')
      let str=this.formData.parkContent
      str=str.replace(/(\n)/g, "")
      str=str.replace(/(&nbsp;)/g, "")
      str=str.replace(/(\t)/g, "")
      str=str.replace(/(\r)/g, "")
      str=str.replace(/<\/?[^>]*>/g, "")
      str=str.replace(/\s*/g, "")
      if(!str && str.length<1){
        this.formData.parkContent=str
      }


      if (this.formData.parkContent) {
        if (this.formData.parkContent.length > 500) {
          callback(new Error("最多只可输入500字"))
        }else{
          callback()
        }
      }else {
        callback(new Error("请输入内容"))
      }
    },
    show(t,row){
      this.loading = true;
      this.formData={
        parkContent:""
      }
      if(t==1){
        this.title="新增";
      }else{
        this.title="编辑"
        this.getDetail(row.id);
      }
      this.visible=true;
    },
    close(){
      this.formData={
        parkContent:""
      }
      this.visible=false;
    },
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{

          if(this.title=="新增"){
            getpageAdd(this.formData).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }else{
            getpageEdit(this.formData).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }
        }
      })
    },
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      getpageDetail(params).then(response => {
        this.formData = response
      })
    },
  }

}
</script>

<style scoped>

</style>

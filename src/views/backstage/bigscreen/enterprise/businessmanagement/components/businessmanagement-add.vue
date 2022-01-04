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
    <el-form ref="refForm" :model="formData" label-width="100px" :rules="node">
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="企业名称" prop="companyName">
            <el-input v-model="formData.companyName" clearable show-overflow-tooltip placeholder="请输入" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="rel is-required" label="上传图片" prop="fileListExist">
            <base-file-upload
              :limit='2'
              list-type="picture-card"
              :acceptSize="10"
              :accept='accept'
              :autoUpload="true"
              :fileListExist.sync="formData.fileListExist"
              :otherData="otherData"
              :action="action"
              ref="fileRef"
              @associationCallback="associationCallback"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="企业简介" prop="companyDescription">
            <base-tinymce-editor v-model="formData.companyDescription" placeholder="20000个字符以内，此处禁止粘贴图片，图片不会被保存" :isImage="isImage"></base-tinymce-editor>
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
import {getpageAdd,getpageEdit,getpageDetail} from "@/api/backstage/sysset/bigscreen/enterprise/businessmanagement/businessmanagement.js"
export default {
  name: "businessmanagement-add",
  data() {
    return {
      visible:false,
      loading:false,
      isImage:'1',
      title:"",
      carrierList:[],
      formData:{
        id:"",
        companyName:'',
        companyDescription:'',
        fileListExist:'',//是否已上传附件
      },
      node:{
        companyName:{
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        },
        // companyDescription:{
        //   required: true,
        //   message: "请输入企业描述",
        //   trigger: "blur"
        // },
        fileListExist:{
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        },
      },
      otherData:{
        id: '',
        bizId: "",
        bizType: "enterprise",
        isSingle: false
      },
      action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadVideo`,
      accept:".jpg,.jpeg,.png",
    }
  },
  watch:{
    'formData.fileListExist':{
      handler(newval){
        if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
          this.$refs.refForm.clearValidate('fileListExist');//清除附件验证
        }else{

        }
      },
      deep:true
    }
  },
  mounted() {

  },
  methods: {
    show(t,row){
      this.loading = true;
      this.formData={
        id:"",
        companyName:'',
        companyDescription:''
      }
      if(t==1){
        this.title="新增";
        this.partyUid()
      }else{
        this.title="编辑"
        this.getDetail(row.id);
        this.formData.id = row.id;
        this.otherData.bizId = row.id;
        this.$nextTick(function(){// 编辑时，附件自动回显
          this.$refs.fileRef.init()
        })
      }
      this.visible=true;
    },
    close(){
      this.visible=false;
      this.$nextTick(function() {
        this.formData = {
          id: "",
          companyName:'',
          companyDescription: ''
          // fileListExist: ''
        }
        if(this.$refs['refForm']){
          this.$refs['refForm'].resetFields();//清除附件
        }

      })

    },
    //新增时获取UID
    partyUid () {
      commonReq.getNewUid({}).then(response =>{
        const res = response
        this.formData.id = res;
        this.otherData.bizId = res;
      })
    },
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          this.$refs.fileRef.submitFile();
        }
      })
    },
    associationCallback(val){
      if(this.formData.companyDescription  != undefined && this.formData.companyDescription ){
        //let reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/i
        let reg =/<img[^>]*>/gi
        let value = this.formData.companyDescription
        this.formData.companyDescription = value.replace(reg, ' ')
        let str=this.formData.companyDescription
        str=str.replace(/(\n)/g, "")
        str=str.replace(/(&nbsp;)/g, "")
        str=str.replace(/(\t)/g, "")
        str=str.replace(/(\r)/g, "")
        str=str.replace(/<\/?[^>]*>/g, "")
        str=str.replace(/\s*/g, "")
        if(!str && str.length<1){
          this.formData.companyDescription=str
        }
      }
      let params = {
        companyName:this.formData.companyName,
        companyDescription:this.formData.companyDescription,
        id:this.formData.id,
        bizId:this.otherData.bizId
      };
      if(val){
        if(this.title=="新增"){
          getpageAdd(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }).finally(() => {

          });
        }else{
          getpageEdit(params).then(response => {
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
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      getpageDetail(params).then(response => {
        const res = response;
        this.formData.id = res.id
        this.formData.companyName = res.companyName
        this.formData.companyDescription = res.companyDescription
      })
    },
  }
}
</script>

<style scoped>

</style>

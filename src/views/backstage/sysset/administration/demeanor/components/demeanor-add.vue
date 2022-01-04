<template>
  <div class="demeanor-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <el-form ref="refForm" :model="formData" label-width="100px" :rules="node">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="name">
              <el-input v-model="formData.name" clearable show-overflow-tooltip placeholder="请输入" maxlength="100" />
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
            <el-form-item label="上传图片" class="rel" prop="fileListExist">
              <base-file-upload
                :folio='true'
                list-type="picture-card"
                :acceptSize="20"
                :accept="accept"
                :otherData="otherData"
                :fileListExist.sync="formData.fileListExist"
                ref="fileRef"
                @associationCallback="associationCallback"/>
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
                clearable
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">发 布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {gatewaySave,gatewayEdit,gatewayInfo} from "@/api/backstage/sysset/administration/gateway/gateway.js"
export default {
  name: "DemeanorAdd",
  components: {},
  data() {
    return {
      visible:false,
      loading:false,
      title:"",
      formData:{
        name:"",
        content:"",
        pubdate:"",
        id:"",
        type:"2412585934552439824",//园区风采
        fileListExist:"",
      },
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
        },
        fileListExist:{
          required: true,
            message: '请上传图片',
            trigger: 'blur'
        }
      },
      otherData:{
        bizId:"",
        bizType:"demeanourImage"
      },
      action:"",
      accept:".png,.jpg,.jpeg",
    }
  },
  mounted() {

  },
  methods: {
    show(t,row){
      this.loading = true;
      this.formData={
        name:"",
        content:"",
        pubdate:"",
        id:"",
        type:"2412585934552439824",//园区风采
      }
      if(t==1){
        this.title="新增";
        this.formData.pubdate = new Date().getFullYear() + "-" + (new Date().getMonth()+1<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1) + "-" + (new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate())
        this.partyUid()
      }else{
        this.title="编辑"
        this.formData.id = row.id;
        this.otherData.bizId = row.id;
        this.getDetail(row.id);
      }
      this.visible=true;
    },
    close(){
      this.formData={
        name:"",
        content:"",
        pubdate:"",
        id:"",
        type:"2412585934552439824",//园区风采
      }
      this.otherData={
        bizId:"",
        bizType:"demeanourImage"
      }
      this.visible=false;
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
    //新增时获取UID
    partyUid(){
      commonReq.getNewUid({}).then(response =>{
        const res = response
        this.formData.id = res;
        this.otherData.bizId = res;
      })
    },
    associationCallback(val){
      let params = {
        name:this.formData.name,
        content:this.formData.content,
        pubdate:this.formData.pubdate,
        id:this.formData.id,
        type:this.formData.type,//园区风采
      };
      if(val){
        if(this.title=="新增"){
          gatewaySave(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }).finally(() => {

          });
        }else{
          gatewayEdit(params).then(response => {
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
      gatewayInfo(params).then(response => {
        this.formData = response
        this.$refs.fileRef.init()
      })
    },
  }
}
</script>

<style scoped>
.rel >>> .txt{
  color: #CCCCCC;
}
</style>

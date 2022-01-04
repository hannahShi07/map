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
        <el-col :span="24">
          <el-form-item class="is-required" label="月份" prop="month">
            <el-input v-model="formData.month" clearable show-overflow-tooltip placeholder="请输入" maxlength="20" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="活动内容" prop="content">
            <el-input v-model="formData.content" :autosize="{minRows: 5, maxRows: 5}" resize="none" type="textarea" maxlength="100" show-word-limit placeholder="请输入"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="承办主体" prop="undertaker">
            <el-input v-model="formData.undertaker" clearable show-overflow-tooltip placeholder="请输入" maxlength="50" />
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
import {getpageAdd,getpageEdit,getpageDetail} from "@/api/backstage/sysset/bigscreen/alliance/industryactivities/industryactivities.js"
export default {
  name: "industryactivities-add",
  data() {
    return {
      visible:false,
      loading:false,
      title:"",
      formData:{
        month:'',
        content:'',
        undertaker:''
      },
      node:{
        month:{
          required: true,
          message: "请输入月份",
          trigger: "blur"
        },
        content:{
          required: true,
          message: "请输入活动内容",
          trigger: "blur"
        },
        undertaker:{
          required: true,
          message: "请输入承办主体",
          trigger: "blur"
        },
      }
    }
  },
  mounted() {

  },
  methods: {
    show(t,row){
      this.loading = true;
      this.formData={
        month:"",
        content:'',
        undertaker:''
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
        month:"",
        content:'',
        undertaker:''
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

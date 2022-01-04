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
          <el-form-item class="is-required" label="单位" prop="orgName">
            <el-input v-model="formData.orgName" clearable show-overflow-tooltip placeholder="请输入" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="服务职能" prop="serviceFunction">
            <el-input v-model="formData.serviceFunction" :autosize="{minRows: 12, maxRows: 12}" resize="none" type="textarea" maxlength="200" show-word-limit placeholder="请输入"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="服务类型" prop="type.key">
            <el-select v-model="formData.type.key" placeholder="请选择" :editable="false" clearable style="width:100%">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
import {getpageAdd,getpageEdit,getpageDetail} from "@/api/backstage/sysset/bigscreen/alliance/servicework/servicework.js"
export default {
  name: "servicework-add",
  data() {
    return {
      visible:false,
      loading:false,
      title:"",
      typeList:[],
      formData:{
        orgName:"",
        serviceFunction:'',
        type:{
          data:'',
          key:''
        }
      },
      node:{
        orgName:{
          required: true,
          message: "请输入单位",
          trigger: "blur"
        },
        serviceFunction:{
          required: true,
          message: "请输入服务职能",
          trigger: "blur"
        },
        'type.key':{
          required: true,
          message: "请选择服务类型",
          trigger: "change"
        }

      }
    }
  },
  mounted() {


  },
  methods: {
    getTerm(){
      let params = {
        types:['work_list_type']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.typeList=response.work_list_type;
      })
    },
    show(t,row){
      this.loading = true;
      this.getTerm()
      this.formData={
        orgName:"",
        serviceFunction:'',
        type:{
          data:'',
          key:''
        }
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
        name:""
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
::v-deep .el-textarea .el-input__count{
  right:25px;
}
</style>

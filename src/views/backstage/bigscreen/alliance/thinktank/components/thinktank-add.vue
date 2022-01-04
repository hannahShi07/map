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
          <el-form-item class="is-required" label="姓名" prop="name">
            <el-input v-model="formData.name" clearable show-overflow-tooltip placeholder="请输入" maxlength="20" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="所在单位" prop="company">
            <el-input v-model="formData.company" clearable show-overflow-tooltip placeholder="请输入" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="职务" prop="post">
            <el-input v-model="formData.post" clearable show-overflow-tooltip placeholder="请输入" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="人才类型" prop="talentType">
            <el-input v-model="formData.talentType" clearable show-overflow-tooltip placeholder="请输入,多个人才类型之间用英文逗号分隔开" maxlength="200" />
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
import {getpageAdd,getpageEdit,getpageDetail} from "@/api/backstage/sysset/bigscreen/alliance/thinktank/thinktank.js"
export default {
  name: "thinktank-add",
  data() {
    return {
      visible:false,
      loading:false,
      title:"",
      formData:{
        name:"",
        company:"",
        post:"",
        talentType:""
      },
      node:{
        name:{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        },
        company:{
          required: true,
          message: "请输入单位",
          trigger: "blur"
        },
        post:{
          required: true,
          message: "请输入职务",
          trigger: "blur"
        },
        talentType:{
          required: true,
          message: "请输入人才类型",
          trigger: "blur"
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    show(t,row){
      this.loading = true;
      this.formData={
        name:"",
        company:"",
        post:"",
        talentType:""
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
        name:"",
        company:"",
        post:"",
        talentType:""
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

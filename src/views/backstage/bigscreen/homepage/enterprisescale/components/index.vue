<template>
  <div class="enterprisescale">
    <el-form ref="refForm" :model="formData" label-width="110px" :rules="node">
      <el-row>
        <el-col :span="24">
          <el-form-item label="园区企业总数：" prop="scaleValue">
            <el-input-number v-model="formData.scaleValue" :precision="0" clearable placeholder="请输入" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="园区规上企业：" prop="scaleIncrease">
            <el-input-number v-model="formData.scaleIncrease" :precision="0" clearable placeholder="请输入" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="labelwidth">
          <el-form-item label="园区税收超千万企业：" prop="scaleItem">
            <el-input-number v-model="formData.scaleItem" :precision="0" clearable placeholder="请输入" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="labelwidth">
          <el-form-item label="园区上市公司及子公司：" prop="scaleInvest">
            <el-input-number v-model="formData.scaleInvest" :precision="0" clearable placeholder="请输入" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:100px;text-align:center">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {getpageAdd,getpageDetail} from "@/api/backstage/sysset/bigscreen/homepage/enterprisescale/enterprisescale.js"
export default {
  name: "index",
  data() {
    return {
      loading:false,
      formData:{
        id:'',
        scaleItem:'',
        scaleInvest:'',
        scaleIncrease:'',
        scaleValue:''
      },
      node:{
        // scaleValue:{
        //   required: true,
        //   message: "请输入产值",
        //   trigger: "blur"
        // },
        // scaleIncrease:{
        //   required: true,
        //   message: "请输入产值同期增长",
        //   trigger: "blur"
        // },
        // scaleItem:{
        //   required: true,
        //   message: "请输入重点项目",
        //   trigger: "blur"
        // },
        // scaleInvest:{
        //   required: true,
        //   message: "请输入总投资",
        //   trigger: "blur"
        // }
      }

    }
  },
  mounted() {
     this.getDetail()

  },
  methods: {
    // 获取详情
    getDetail(){
      let params={
        id:this.formData.id
      }
      getpageDetail(params).then(response => {
        this.formData={
          id:response.id,
          scaleItem:response.scaleItem,
          scaleInvest:response.scaleInvest,
          scaleIncrease:response.scaleIncrease,
          scaleValue:response.scaleValue
        }
      })
    },
    // 取消
    cancel(){
      this.getDetail()

    },
    // 保存
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
            getpageAdd(this.formData).then(response => {
              this.$message(this.successTip())
              this.getDetail()
            }).finally(() => {

            });
        }
      })
    }
  }
}
</script>

<style scoped>
.enterprisescale{
  width: 100%;
  height: calc(100vh - 155px);
  background-color: #fff;
  overflow: auto;
}
.enterprisescale >>> .el-form{
  width:60%;
  margin-left:20%;
  margin-top:50px;
}
.enterprisescale >>> .el-input-number__decrease{
  display:none;
}
.enterprisescale >>> .el-input-number__increase{
  display:none;
}
.enterprisescale >>> .el-input-number{
  width:100%;
}
.enterprisescale >>> .el-input-number .el-input__inner {
  -webkit-appearance: none;
  padding-left: 15px;
  padding-right: 15px;
  text-align: left;
}
.labelwidth >>> .el-form-item__label{
  line-height:20px;
}
</style>
